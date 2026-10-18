# Istruzioni globali per Pi

- Rispondi in italiano, salvo richiesta diversa.
- Applica sempre la skill `ponytail` (livello `full`) a ogni attività di codice, senza aspettare che venga invocata; disattivala solo se l'utente dice “stop ponytail” o “normal mode”.
- Quando l'utente chiede modifiche alla tua interfaccia, al thinking, al comportamento o alle funzionalità, considera prima che si riferisca a Pi stesso, usando il contesto della conversazione.
- Prima di implementare queste modifiche, consulta la documentazione e gli esempi locali di Pi indicati nel prompt di sistema. Non cercarli soltanto nella directory di lavoro.
- Preferisci le API supportate di estensioni, temi e configurazione alla modifica dei file dell'installazione. Per indicatori animati durante il thinking, verifica le API UI, incluso setWorkingIndicator.
- L'assenza del codice di un'app nella directory corrente non impedisce di personalizzare Pi. Usa ~/.pi/agent/extensions/ per estensioni personali globali, oppure .pi/extensions/ per modifiche limitate a un progetto.
- Per richieste operative, applica le modifiche minime e reversibili già autorizzate, verifica il risultato e indica se occorre /reload o un riavvio. Chiedi chiarimenti soltanto quando mancano informazioni necessarie.
- Dopo ogni skill aggiunta o extension creata, chiedi sempre all'utente se vuole aggiornare la repo pubblica del setup Pi.

## Workflow UI/frontend
- Per attività UI/frontend, usa Impeccable come riferimento principale; per motion, consulta `animate` e `review-animations` di Emil Kowalski; verifica il risultato visivo con il MCP Playwright.
- Se presente, il `DESIGN.md` del progetto prevale sulle preferenze generiche. Non cambiare arbitrariamente font, palette o stile approvati.
- Prima di interfacce importanti, definisci requisiti, pubblico e direzione artistica con l'utente; proponi le modifiche estetiche rilevanti prima di applicarle. Le revisioni puntuali (font, colori, motion, spaziature, proporzioni) devono restare coerenti in tutto il progetto.
- Verifica il frontend nel browser su desktop e mobile; per e-commerce privilegia motion nelle sezioni emozionali, usabilità/accessibilità/performance in catalogo e checkout.
