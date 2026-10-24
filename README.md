# LonghiDev Pi Setup

Personal configuration for [Pi](https://github.com/badlogic/pi-mono), shared as a reusable starting point. It contains no credentials, sessions, or machine-specific configuration.

## Quick installation

Open Pi and paste this link, asking: **“Clone this repository and install the setup on my computer.”**

```text
https://github.com/Lerma4/pi-agent-longhidev-conf
```

Pi can clone the repository and copy the files to `~/.pi/agent`. Alternatively, use the terminal. On Windows (PowerShell):

```powershell
git clone https://github.com/Lerma4/pi-agent-longhidev-conf.git
cd pi-agent-longhidev-conf
.\install.ps1
```

On macOS/Linux (or Git Bash):

```sh
git clone https://github.com/Lerma4/pi-agent-longhidev-conf.git
cd pi-agent-longhidev-conf
./install.sh
```

The installer overwrites only files with matching names that are included in this repository; it does not delete other files or existing data. Restart Pi after installation.

## Contents

- `AGENTS.md`: global assistant instructions.
- `extensions/model-usage.ts`: model-usage indicator.
- `extensions/git-info.ts`: themed Git information bar with branch, staged/modified/untracked file counts, ahead/behind counts, and the latest commit. Use `/git-commit` to show its complete title. Requires Git; the Git icon requires a Nerd Font. Installed automatically by both setup scripts, just like model-usage.
- `skills/`: animate, impeccable, review-animations, Taste Skill (`design-taste-frontend`), and selected Matt Pocock skills (`grill-me`, `to-spec`, `code-review`).
- Search tools: [pi-fff](https://github.com/dmtrKovalenko/fff/tree/main/packages/pi-fff), which provides `fffind`, `ffgrep`, and `fff-multi-grep`.
- [HyperFrames](https://github.com/heygen-com/hyperframes) core skills, installed by both setup scripts with `npx hyperframes skills update` (the full skill sources are not stored in this repo).

Extensions may require dependencies or APIs available in your installation. Credentials and private preferences (provider, model, sessions, personal MCP servers) are not distributed.

## Updating

```sh
cd pi-agent-longhidev-conf
git pull
./install.sh
```

This is a public personal configuration: review its contents before reuse, and never add tokens, authentication files, or session data.
