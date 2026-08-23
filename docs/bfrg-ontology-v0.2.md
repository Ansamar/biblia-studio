# Biblia Fontes Relational Graph (BFRG) — Ontology v0.2

## Esito dell'audit v0.1

La v0.1 ha validato il paradigma generale ma ha mostrato quattro problemi: (1) mescolava natura della tesi e forza della tesi in un solo `epistemicStatus`; (2) usava `RECEPTION` anche per testi canonici successivi; (3) allargava `HUMANITY` a oggetti storico-sociali come città, tecnica, lingua e popoli; (4) non descriveva formalmente direzionalità e simmetria dei predicati.

La v0.2 corregge questi punti senza cambiare il principio fondante: **ogni edge BFRG è una micro-tesi scientifica, qualificata, motivata, documentabile e revisionabile.**

## 1. Famiglie di nodi

1. **TEXT** — passi, pericopi, capitoli, libri, corpora e forme testuali quando considerate come oggetti testuali. Tutti i testi biblici canonici, AT e NT, restano `TEXT` anche quando rileggono testi precedenti.
2. **WORLD** — luoghi, eventi, entità politico-storiche, istituzioni, gruppi sociali, condizioni economiche e processi storici.
3. **CULTURE** — pratiche, sistemi simbolici, generi, tecniche, tradizioni culturali, modelli ideologici e corpora comparativi.
4. **HUMANITY** — questioni ed esperienze antropologiche durevoli: vita, morte, libertà, fraternità, violenza, amore, giustizia, alterità, sofferenza, speranza, responsabilità, limite, dignità, potere come esperienza antropologica ecc.
5. **TRADITION** — formazione, redazione e trasmissione testuale: P, D, Dtr, MT, LXX, Qumran, Vulgata, recensioni, traduzioni, forme testuali e modelli compositivi.
6. **RECEPTION** — ricezioni post-canoniche o extra-canoniche storicamente identificabili: patristica, liturgia, teologia, Magistero, arte, cultura, interpretazioni confessionali.

### Regola TEXT / RECEPTION

Giovanni, Paolo, Ebrei, 1 Pietro, 1 Giovanni e Atti sono sempre `TEXT`. La loro rilettura di Genesi è espressa dal predicato e dalla prospettiva `canonical`, non trasformandoli in nodi `RECEPTION`.

`RECEPTION` inizia quando l'oggetto non è più un testo canonico ma una ricezione successiva identificabile.

## 2. Confine HUMANITY / WORLD / CULTURE

Un nodo `HUMANITY` deve poter essere formulato come **domanda umana trasversale**.

Esempi validi: fraternità, mortalità, libertà, responsabilità, giustizia, violenza, dignità, limite, speranza.

Non sono normalmente `HUMANITY`:

- città → `WORLD` se città concreta/istituzione; `CULTURE` se urbanità/modello urbano;
- tecnica → `CULTURE`;
- lingua → `CULTURE` quando sistema/pratica; può collegarsi a un concetto `HUMANITY` come comunicazione/alterità;
- popoli → `WORLD`;
- genealogie/liste → `CULTURE` o `TEXT`;
- ziggurat → `WORLD` se monumento concreto, `CULTURE` se tipologia architettonica.

## 3. Predicati controllati

### Testuali

- `CITES` — citazione riconoscibile; direzionale.
- `ALLUDES_TO` — allusione argomentabile; direzionale.
- `REUSES` — riuso di formulazione, motivo o struttura; direzionale.
- `INTERPRETS_TEXT` — un testo attribuisce funzione interpretativa a un testo precedente; direzionale.
- `CONTRASTS_WITH` — contrasto letterario significativo; normalmente simmetrico come relazione di confronto, ma l'edge conserva la direzione editoriale della tesi.
- `PARALLELS_TEXT` — parallelo letterario senza affermare dipendenza; semanticamente simmetrico.

### Storico-culturali

- `EMERGES_IN` — collocazione di testo/tradizione/ricezione in un contesto storico-culturale; direzionale.
- `LOCATED_IN` — relazione spaziale; direzionale.
- `PARTICIPATES_IN` — partecipazione a fenomeno/istituzione/processo; direzionale.
- `INTERACTS_WITH` — interazione storicamente argomentabile; semanticamente simmetrico salvo specificazione.
- `CULTURAL_PARALLEL_WITH` — comparandum culturale; semanticamente simmetrico; **non implica dipendenza**.
- `POSSIBLE_INFLUENCE_FROM` — influenza possibile; direzionale e da usare con cautela.
- `PROBABLE_DEPENDENCE_ON` — dipendenza probabile sostenuta da evidenza convergente; direzionale, uso raro.

### Antropologici

- `THEMATIZES` — `TEXT` → `HUMANITY`: rende una questione umana strutturale nella costruzione del testo.
- `PROBLEMATIZES` — `TEXT` → `HUMANITY`: la mette in tensione o la interroga.
- `DEVELOPS_CONCEPT` — `TEXT` → `HUMANITY`: sviluppa una traiettoria antropologica già attestata.
- `TRANSFORMS_CONCEPT` — `TEXT` → `HUMANITY`: ne riformula significativamente la configurazione.
- `EXEMPLIFIES` — `TEXT|WORLD` → `HUMANITY`: un episodio, personaggio o fenomeno esemplifica una dinamica umana.

La rinomina di `DEVELOPS`/`TRANSFORMS` evita che predicati troppo generici diventino semanticamente incontrollabili.

### Tradizione e trasmissione

- `BELONGS_TO` — appartenenza a macro-unità, tradizione o forma criticamente definita.
- `TRANSLATES` — una traduzione rende una **forma testuale/Vorlage**, non automaticamente l'edizione critica o il testimone oggi assunto come base.
- `EXPANDS` — forma testuale più ampia rispetto a un'altra.
- `ABBREVIATES` — forma testuale più breve rispetto a un'altra.
- `PRESERVES_VARIANT_OF` — conserva una variante significativa.
- `REDACTS` — relazione redazionale esplicitamente modellata.

### Ricezione

- `RECEIVES` — un `TEXT` canonico successivo o un nodo `RECEPTION` assume un testo/tema precedente.
- `REINTERPRETS` — rilettura che attribuisce nuova funzione/configurazione.
- `LITURGICALLY_USES` — uso liturgico documentabile; source normalmente `RECEPTION`.
- `THEOLOGICALLY_DEVELOPS` — sviluppo teologico post-canonico; source normalmente `RECEPTION`.

## 4. Prospettiva della tesi

Ogni edge dichiara una prospettiva primaria:

`textual | literary | historical | social | cultural | anthropological | canonical | reception | confessional`

La prospettiva dice **da quale disciplina o livello ermeneutico viene formulata la micro-tesi**.

## 5. Claim mode — natura epistemica della tesi

La v0.2 separa la natura della tesi dalla sua forza.

- `direct_textual` — la relazione deriva direttamente dal testo/fonte primaria.
- `critical_inference` — inferenza storico-critica, letteraria, sociale o redazionale.
- `historical_attestation` — relazione documentata da fonti storiche/archivistiche/materiali.
- `comparative` — relazione costruita come comparandum, senza affermare genealogia.
- `canonical_reading` — relazione intracanonicamente formulata o editorialmente studiata come rilettura canonica.
- `reception_attestation` — ricezione post-canonica storicamente attestata.
- `confessional_reading` — lettura esplicitamente confessionale/cattolica, dichiarata come tale.

`claimMode` non dice quanto la tesi è solida; dice **che tipo di tesi è**.

## 6. Confidence — forza della tesi

Separatamente, ogni edge dichiara:

- `established` — relazione direttamente attestata o metodologicamente molto stabile nel proprio dominio.
- `strongly_supported` — sostenuta da evidenze convergenti e forte consenso.
- `plausible` — ben argomentata ma non necessaria o non universalmente condivisa.
- `debated` — seriamente discussa o dipendente da modelli concorrenti.

Non usiamo percentuali: produrrebbero falsa precisione.

Esempio: un `CULTURAL_PARALLEL_WITH` può avere `claimMode=comparative` e `confidence=strongly_supported`; una proposta di influenza può avere `claimMode=critical_inference` e `confidence=debated`.

## 7. Evidenza e provenance

Tipi di evidenza:

`primary_text | textual_variant | lexical | literary_structure | historical_source | archaeological | comparative_corpus | secondary_literature | liturgical_source | magisterial_source`

Ogni evidenza deve indicare, quando possibile, localizzatore puntuale e fonte. La bibliografia generale dell'edge non sostituisce l'evidenza: le citazioni di evidenza sostengono la micro-tesi; la bibliografia dell'edge documenta il quadro scientifico più ampio.

## 8. Regole metodologiche non negoziabili

1. **Contesto ≠ dipendenza.**
2. **Somiglianza ≠ fonte.**
3. **Variante testuale ≠ strato compositivo.**
4. **Vorlage ≠ MT per definizione.** Una traduzione antica è collegata alla forma ebraica ricostruibile appropriata, non automaticamente al MT.
5. **Memoria narrativa ≠ cronaca.**
6. **Lettura canonica ≠ ricostruzione storica.**
7. **Ricezione cattolica ≠ consenso storico-critico.**
8. **Un testo canonico successivo resta TEXT.** La ricezione canonica è una relazione/prospettiva, non una famiglia ontologica.
9. **HUMANITY non è un deposito di temi.** Ogni concetto deve rappresentare una domanda antropologica trasversale.
10. **Nessuna relazione senza micro-tesi, motivazione ed evidenza.**
11. **Nessun edge automatico diventa `approved` senza revisione umana.**

## 9. Proprietà dei predicati

Ogni predicato deve avere metadata ontologici nel validatore futuro:

- dominio ammesso;
- codominio ammesso;
- direzionale sì/no;
- semanticamente simmetrico sì/no;
- inverso, se utile;
- nota metodologica.

BFRG memorizza comunque un edge orientato per conservare la formulazione editoriale della tesi, anche quando il predicato è semanticamente simmetrico.

## 10. Stati editoriali

`draft | review | approved | deprecated`

Un edge `approved` deve registrare almeno data di revisione e responsabile editoriale; per relazioni non direttamente testuali richiede bibliografia scientifica sufficiente.

## 11. Vincoli v0.2 essenziali

- `THEMATIZES`, `PROBLEMATIZES`, `DEVELOPS_CONCEPT`, `TRANSFORMS_CONCEPT`: `TEXT → HUMANITY`.
- `CULTURAL_PARALLEL_WITH`: `TEXT|CULTURE ↔ CULTURE|TEXT`.
- `EMERGES_IN`: `TEXT|TRADITION|RECEPTION → WORLD|CULTURE`.
- `TRANSLATES`: `TEXT|TRADITION → TEXT|TRADITION`, ma target deve rappresentare la forma testuale/Vorlage appropriata.
- `RECEIVES`, `REINTERPRETS`: `TEXT|RECEPTION → TEXT|HUMANITY|TRADITION`.
- `LITURGICALLY_USES`, `THEOLOGICALLY_DEVELOPS`: source preferenziale `RECEPTION`.

La matrice completa sarà codificata in un audit dedicato, non nella validazione sincrona del singolo documento.

## 12. Politica HUMANITY

Ogni nodo `HUMANITY` richiede:

- definizione controllata;
- domanda guida;
- confini negativi: cosa **non** significa;
- concetti correlati;
- traiettorie possibili lungo il canone;
- note metodologiche;
- bibliografia.

Esempio: **fraternità** non equivale alla presenza lessicale di “fratello”; descrive una traiettoria sulla responsabilità reciproca che può essere affermata, negata, problematizzata o trasformata.

## 13. Versionamento

La v0.2 sostituisce concettualmente la v0.1 per i nuovi edge. Gli edge futuri conservano `ontologyVersion`. Nessun dato viene migrato perché lo schema non è ancora registrato in `production`.

## Stato

**v0.2 candidata alla validazione del corpus pilota.** Ancora nessuna registrazione in `sanity.config.ts` e nessuna mutazione del dataset `production`.