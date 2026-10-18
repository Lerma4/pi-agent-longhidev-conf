# Setup Pi di LonghiDev

Configurazione personale per [Pi](https://github.com/badlogic/pi-mono), condivisa come punto di partenza riutilizzabile. Non contiene credenziali, sessioni o configurazioni specifiche della macchina.

## Installazione rapida

Apri Pi e incolla questo link chiedendo: **«Copia questa repo e installa il setup sul mio computer»**:

```text
https://github.com/Lerma4/pi-agent-longhidev-conf
```

Pi può clonare la repo e copiare i file in `~/.pi/agent`. In alternativa, da terminale:

```sh
git clone https://github.com/Lerma4/pi-agent-longhidev-conf.git
cd pi-agent-longhidev-conf
./install.sh
```

Lo script sovrascrive solo i file omonimi inclusi in questa repo; non elimina altri file o dati esistenti. Riavvia Pi dopo l'installazione.

## Contenuto

- `AGENTS.md`: regole globali dell'assistente.
- `extensions/`: estensione indicatore utilizzo modello.
- `skills/`: skill animate, impeccable e review-animations.

Le estensioni potrebbero richiedere dipendenze/API disponibili nella tua installazione. Le credenziali e le preferenze private (provider, modello, sessioni, MCP personali) non vengono distribuite.

## Aggiornare

```sh
cd pi-agent-longhidev-conf
git pull
./install.sh
```

Questa è una configurazione personale pubblica: controlla i contenuti prima di riutilizzarli e non aggiungere mai token, file di autenticazione o dati di sessione.
