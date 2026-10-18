# LonghiDev Pi Setup

Personal configuration for [Pi](https://github.com/badlogic/pi-mono), shared as a reusable starting point. It contains no credentials, sessions, or machine-specific configuration.

## Quick installation

Open Pi and paste this link, asking: **“Clone this repository and install the setup on my computer.”**

```text
https://github.com/Lerma4/pi-agent-longhidev-conf
```

Pi can clone the repository and copy the files to `~/.pi/agent`. Alternatively, use the terminal:

```sh
git clone https://github.com/Lerma4/pi-agent-longhidev-conf.git
cd pi-agent-longhidev-conf
./install.sh
```

The installer overwrites only files with matching names that are included in this repository; it does not delete other files or existing data. Restart Pi after installation.

## Contents

- `AGENTS.md`: global assistant instructions.
- `extensions/`: model-usage indicator extension.
- `skills/`: animate, impeccable, and review-animations skills.

Extensions may require dependencies or APIs available in your installation. Credentials and private preferences (provider, model, sessions, personal MCP servers) are not distributed.

## Updating

```sh
cd pi-agent-longhidev-conf
git pull
./install.sh
```

This is a public personal configuration: review its contents before reuse, and never add tokens, authentication files, or session data.
