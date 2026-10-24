import { execFile } from "node:child_process";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { truncateToWidth, visibleWidth } from "@earendil-works/pi-tui";

function git(cwd: string, ...args: string[]): Promise<string> {
  return new Promise((resolve) => {
    execFile("git", args, { cwd, windowsHide: true }, (error, stdout) => {
      resolve(error ? "" : stdout.trimEnd());
    });
  });
}

export default function (pi: ExtensionAPI) {
  let refresh = async () => {};

  pi.registerCommand("git-commit", {
    description: "Mostra il titolo completo dell'ultimo commit",
    handler: async (_args, ctx) => {
      const commit = await git(ctx.cwd, "log", "-1", "--format=%h%n%s");
      ctx.ui.notify(commit || "Nessun commit disponibile in questa cartella.", "info");
    },
  });

  pi.on("session_start", async (_event, ctx) => {
    if (!ctx.hasUI) return;

    refresh = async () => {
      const [branch, status, commit, upstream] = await Promise.all([
        git(ctx.cwd, "branch", "--show-current"),
        git(ctx.cwd, "status", "--porcelain=v1"),
        git(ctx.cwd, "log", "-1", "--format=%h %s"),
        git(ctx.cwd, "rev-list", "--left-right", "--count", "@{upstream}...HEAD"),
      ]);
      if (!branch) {
        ctx.ui.setWidget("git-info", undefined);
        return;
      }

      const files = status ? status.split("\n") : [];
      const staged = files.filter((line) => line[0] !== " " && line[0] !== "?").length;
      const unstaged = files.filter((line) => line[1] !== " " && line[0] !== "?").length;
      const untracked = files.filter((line) => line.startsWith("??")).length;
      const upstreamCounts = upstream.split(/\s+/).map(Number);
      ctx.ui.setWidget("git-info", (_tui, theme) => ({
        invalidate() {},
        render(width: number) {
          const separator = theme.fg("dim", " │ ");
          const sections = [
            theme.bold(theme.fg("accent", `\ue702 ${branch}`)),
            status
              ? [
                  theme.fg(staged ? "success" : "dim", `+ ${staged} staged`),
                  theme.fg(unstaged ? "warning" : "dim", `~ ${unstaged} modificati`),
                  theme.fg(untracked ? "warning" : "dim", `? ${untracked} nuovi`),
                ].join("  ")
              : theme.fg("success", "✓ pulito"),
          ];
          if (upstreamCounts.length === 2 && upstreamCounts.every(Number.isFinite)) {
            sections.push(theme.fg(upstreamCounts.some(Boolean) ? "warning" : "dim",
              `↑ ${upstreamCounts[1]}  ↓ ${upstreamCounts[0]}`));
          }
          if (commit) sections.push(theme.fg("muted", `◇ ${commit}`));
          const content = truncateToWidth(sections.join(separator), Math.max(0, width - 4));
          const line = `│ ${content}${" ".repeat(Math.max(0, width - 4 - visibleWidth(content)))} │`;
          return [theme.bg("userMessageBg", truncateToWidth(line, width))];
        },
      }));
    };

    await refresh();
  });

  pi.on("turn_end", () => refresh());
  pi.on("tool_execution_end", () => refresh());
}
