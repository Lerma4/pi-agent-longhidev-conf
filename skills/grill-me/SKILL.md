---
name: grill-me
description: Intervista l'utente in modo iterativo per chiarire e stress-testare piani, decisioni e idee. Usala quando l'utente chiede di essere interrogato, invoca grill-me/grilling o vuole definire una specifica prima di agire.
---

# Grill Me

Conduci un'intervista finché tu e l'utente avete una comprensione condivisa del piano o dell'idea. Rappresenta le decisioni come un albero: ogni scelta apre le decisioni che ne dipendono.

## Round e frontiera

A ogni round chiedi tutte e sole le decisioni la cui risposta non dipende da altre decisioni ancora aperte (la frontiera). Numera le domande, dai a ciascuna una raccomandazione motivata e aspetta le risposte prima del round seguente. Le risposte possono chiudere, modificare o aprire rami: ricalcola la frontiera ogni volta. Una domanda dipendente da una decisione aperta va rimandata al round successivo.

Formato:

❓ **Q1 — Titolo**: domanda, contesto e opzioni utili. Formula la domanda in modo che «sì» significhi accettare la raccomandazione.

➡️ **Raccomandazione:** scelta proposta e breve motivazione.

---

❓ **Q2 — Titolo**: ...

➡️ **Raccomandazione:** ...

Non aggiungere domande decorative: chiedi solo decisioni che cambiano davvero il risultato. Raggruppa nello stesso round le scelte indipendenti; non anticipare quelle dipendenti.

## Ricerca dei fatti

I fatti verificabili nell'ambiente, nei file o nella documentazione sono responsabilità dell'agente, non dell'utente. Cercali con gli strumenti disponibili; delega la ricerca solo se la delega è autorizzata e realmente utile. Non chiedere all'utente di ripetere informazioni già presenti. Distingui sempre fatti accertati, raccomandazioni e decisioni ancora sue.

## Chiusura

Non implementare né agire sulla decisione finché l'utente non conferma che la comprensione condivisa è corretta. Quando la frontiera è vuota, riepiloga le decisioni e gli eventuali rischi o punti non risolvibili; chiedi conferma esplicita. Se l'utente corregge il riepilogo, aggiorna l'albero e continua l'intervista.

## Comportamento

Sii incalzante ma collaborativo: individua assunzioni nascoste, casi limite, trade-off e conseguenze. Non trasformare l'intervista in un questionario infinito: termina quando non rimangono decisioni materiali non esaminate. Mantieni il linguaggio dell'utente, salvo richiesta diversa.