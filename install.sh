#!/bin/sh
set -eu

src=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
dest="${PI_AGENT_DIR:-$HOME/.pi/agent}"
mkdir -p "$dest/extensions" "$dest/skills"
cp "$src/AGENTS.md" "$dest/AGENTS.md"
cp "$src/extensions/"*.ts "$dest/extensions/"
for skill in "$src"/skills/*; do
  [ -d "$skill" ] || continue
  cp -R "$skill" "$dest/skills/"
done
pi install npm:@ff-labs/pi-fff
printf 'Setup Pi installato in %s. Riavvia Pi per applicare le modifiche.\n' "$dest"
