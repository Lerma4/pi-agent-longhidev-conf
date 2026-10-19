$ErrorActionPreference = 'Stop'

$src = $PSScriptRoot
$dest = if ($env:PI_AGENT_DIR) { $env:PI_AGENT_DIR } else { Join-Path $HOME '.pi/agent' }
New-Item -ItemType Directory -Force -Path (Join-Path $dest 'extensions'), (Join-Path $dest 'skills') | Out-Null
Copy-Item (Join-Path $src 'AGENTS.md') $dest -Force
Get-ChildItem (Join-Path $src 'extensions') -Filter '*.ts' -File | Copy-Item -Destination (Join-Path $dest 'extensions') -Force
Get-ChildItem (Join-Path $src 'skills') -Directory | ForEach-Object {
    Copy-Item $_.FullName (Join-Path $dest 'skills') -Recurse -Force
}
Write-Host "Setup Pi installato in $dest. Riavvia Pi per applicare le modifiche."
