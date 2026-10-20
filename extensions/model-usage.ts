import { spawn } from "node:child_process";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

function readLimits(): Promise<any> {
  return new Promise((resolve, reject) => {
    const child = process.platform === "win32"
      ? spawn("cmd.exe", ["/d", "/s", "/c", "codex app-server --listen stdio://"], { stdio: ["pipe", "pipe", "ignore"] })
      : spawn("codex", ["app-server", "--listen", "stdio://"], { stdio: ["pipe", "pipe", "ignore"] });
    let buffer = "";
    let done = false;
    const finish = (error?: Error, value?: any) => {
      if (done) return;
      done = true;
      clearTimeout(timeout);
      child.kill();
      error ? reject(error) : resolve(value);
    };
    const timeout = setTimeout(() => finish(new Error("timeout")), 12000);
    child.on("error", (error) => finish(error));
    child.stdout.setEncoding("utf8");
    child.stdout.on("data", (chunk: string) => {
      buffer += chunk;
      let newline;
      while ((newline = buffer.indexOf("\n")) >= 0) {
        const line = buffer.slice(0, newline);
        buffer = buffer.slice(newline + 1);
        try {
          const msg = JSON.parse(line);
          if (msg.id === 1) {
            if (msg.error) return finish(new Error("initialize failed"));
            child.stdin.write('{"method":"initialized"}\n');
            child.stdin.write('{"id":2,"method":"account/rateLimits/read","params":{}}\n');
          } else if (msg.id === 2) {
            if (msg.error) return finish(new Error("rate limit read failed"));
            finish(undefined, msg.result);
          }
        } catch { /* ignore non-JSON output */ }
      }
    });
    child.stdin.write(JSON.stringify({ id: 1, method: "initialize", params: { clientInfo: { name: "pi-model-usage", title: "Pi model usage", version: "1" }, capabilities: null } }) + "\n");
  });
}

function battery(percent: number) {
  const filled = Math.round(Math.max(0, Math.min(100, percent)) / 10);
  return `[${"█".repeat(filled)}${"░".repeat(10 - filled)}]`;
}

function timeUntilReset(resetsAt: number | string | undefined): string | undefined {
  if (resetsAt == null) return;
  const timestamp = typeof resetsAt === "number" ? resetsAt * 1000 : Date.parse(resetsAt);
  if (!Number.isFinite(timestamp)) return;
  const minutes = Math.max(0, Math.ceil((timestamp - Date.now()) / 60_000));
  const days = Math.floor(minutes / 1440);
  const hours = Math.floor((minutes % 1440) / 60);
  return days ? `${days}d ${hours}h` : `${hours}h ${minutes % 60}m`;
}

export default function (pi: ExtensionAPI) {
  let timer: ReturnType<typeof setInterval> | undefined;
  let animation: ReturnType<typeof setInterval> | undefined;
  let busy = false;
  let refresh: (() => void) | undefined;
  let lastUsage: [number, number] | undefined;
  pi.on("session_start", (_event, ctx) => {
    const update = async () => {
      if (busy) return;
      busy = true;
      try {
        const model = ctx.model;
        const prefix = model ? `${model.provider}/${model.id}` : "modello non disponibile";
        if (model?.provider !== "openai-codex" && model?.provider !== "openai") {
          ctx.ui.setStatus("model-usage", ctx.ui.theme.fg("dim", `${prefix} · quote Codex: solo provider OpenAI`));
          return;
        }
        const data = await readLimits();
        const snap = data?.rateLimitsByLimitId?.codex ?? data?.rateLimits;
        const windows = [snap?.primary, snap?.secondary].filter(Boolean);
        const fiveHour = windows.find((w: any) => w.windowDurationMins === 300);
        const weekly = windows.find((w: any) => w.windowDurationMins === 10080);
        if (!fiveHour && !weekly) {
          ctx.ui.setStatus("model-usage", ctx.ui.theme.fg("dim", `${prefix} · quote non disponibili`));
          return;
        }
        const target: [number, number] = [fiveHour?.usedPercent ?? 0, weekly?.usedPercent ?? 0];
        const start = lastUsage ?? [0, 0];
        if (animation) clearInterval(animation);
        let frame = 0;
        const render = (values: [number, number]) => {
          const meter = (percent: number) => ctx.ui.theme.fg(percent >= 90 ? "error" : percent >= 70 ? "warning" : "success", battery(percent));
          const parts = [
            fiveHour && `5h ${meter(values[0])} ${Math.round(target[0])}%${timeUntilReset(fiveHour.resetsAt) ? ` · ↻ ${timeUntilReset(fiveHour.resetsAt)}` : ""}`,
            weekly && `7g ${meter(values[1])} ${Math.round(target[1])}%${timeUntilReset(weekly.resetsAt) ? ` · ↻ ${timeUntilReset(weekly.resetsAt)}` : ""}`,
          ].filter(Boolean).join(" · ");
          ctx.ui.setStatus("model-usage", `${ctx.ui.theme.fg("dim", `${prefix} · `)}${parts}`);
        };
        render(start);
        animation = setInterval(() => {
          frame++;
          const progress = Math.min(frame / 8, 1);
          render([start[0] + (target[0] - start[0]) * progress, start[1] + (target[1] - start[1]) * progress]);
          if (progress === 1 && animation) { clearInterval(animation); animation = undefined; }
        }, 35);
        lastUsage = target;
      } catch {
        const model = ctx.model;
        ctx.ui.setStatus("model-usage", ctx.ui.theme.fg("dim", `${model ? `${model.provider}/${model.id}` : "modello"} · quote Codex non disponibili`));
      } finally { busy = false; }
    };
    refresh = () => void update();
    refresh();
    timer = setInterval(refresh, 60_000);
  });
  pi.on("session_shutdown", () => {
    if (timer) clearInterval(timer);
    if (animation) clearInterval(animation);
    timer = undefined;
    animation = undefined;
  });
  pi.on("model_select", (_event, ctx) => {
    if (ctx.model?.provider === "openai-codex" || ctx.model?.provider === "openai") refresh?.();
    else ctx.ui.setStatus("model-usage", ctx.ui.theme.fg("dim", `${ctx.model?.provider ?? "modello"} · quote Codex: solo provider OpenAI`));
  });
}
