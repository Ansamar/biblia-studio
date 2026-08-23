# Biblia Fontes Relational Graph (BFRG) — Ontology v0.1

## Scopo

BFRG modella la Bibbia come rete di relazioni fra testi, popoli, culture, esperienze umane, tradizioni e ricezioni. Il grafo non sostituisce i documenti canonici, storici o testuali già presenti in Sanity: li collega mediante nodi semantici e relazioni qualificate, documentabili e revisionabili.

Principio guida: **ogni relazione editoriale è una micro-tesi scientifica**. Una relazione non afferma soltanto che due oggetti sono collegati; dichiara *come*, *perché*, *con quale evidenza*, *secondo quale metodo* e *con quale statuto epistemico*.

## Famiglie di nodi

1. **TEXT** — passi, unità, capitoli, libri, corpora o tradizioni testuali quando trattati come oggetti testuali.
2. **WORLD** — luoghi, eventi, entità politico-storiche, istituzioni, condizioni sociali ed economiche.
3. **CULTURE** — tradizioni culturali, sistemi simbolici, pratiche, generi, comparanda del Vicino Oriente, ellenistici, romani ecc.
4. **HUMANITY** — grandi questioni ed esperienze umane: vita, morte, libertà, fraternità, violenza, amore, giustizia, straniero, sofferenza, speranza, custodia, potere ecc.
5. **TRADITION** — storia compositiva e testuale: P, D, Dtr, MT, LXX, Qumran, Vulgata, redazioni, traduzioni, forme testuali.
6. **RECEPTION** — riletture canoniche, cristiane, cattoliche, liturgiche, patristiche, teologiche e culturali successive.

Un nodo può essere autonomo oppure fungere da *semantic wrapper* verso un documento canonico già esistente (`libro`, `capitolo`, `fonteBiblica`, `historicalEntity`, `historicalArea`). Non si duplicano i dati sorgente.

## Predicati controllati

### Relazioni testuali

- `CITES` — citazione esplicita o formalmente riconoscibile.
- `ALLUDES_TO` — allusione testuale plausibile e argomentabile.
- `REUSES` — riuso di formulazione, motivo o unità precedente.
- `INTERPRETS_TEXT` — un testo interpreta esplicitamente un altro testo.
- `CONTRASTS_WITH` — costruisce un contrasto significativo con altro testo.
- `PARALLELS_TEXT` — presenta un parallelo letterario senza presupporre dipendenza.

### Relazioni storico-culturali

- `EMERGES_IN` — un testo/fenomeno è collocabile in un determinato contesto storico-culturale.
- `LOCATED_IN` — relazione geografica o spaziale.
- `PARTICIPATES_IN` — partecipa a un fenomeno, istituzione o processo storico.
- `INTERACTS_WITH` — interazione attestata o fortemente sostenuta fra soggetti storici/culturali.
- `CULTURAL_PARALLEL_WITH` — comparandum culturale; **non implica dipendenza**.
- `POSSIBLE_INFLUENCE_FROM` — influenza possibile ma non dimostrata.
- `PROBABLE_DEPENDENCE_ON` — dipendenza probabile sostenuta da evidenza convergente; uso raro e severo.

### Relazioni antropologiche

- `THEMATIZES` — il testo rende un tema/esperienza umana parte esplicita o strutturale della propria costruzione.
- `PROBLEMATIZES` — il testo mette in tensione, interroga o complica un tema umano.
- `DEVELOPS` — sviluppa una linea già presente.
- `TRANSFORMS` — riformula significativamente una linea precedente.
- `EXEMPLIFIES` — un episodio o personaggio esemplifica una dinamica umana senza esaurirne il significato.

### Relazioni di tradizione e trasmissione

- `BELONGS_TO` — appartenenza a macro-unità, tradizione, forma o strato criticamente definito.
- `TRANSLATES` — traduzione di una forma testuale.
- `EXPANDS` — espansione rispetto a un'altra forma testuale.
- `ABBREVIATES` — abbreviazione rispetto a un'altra forma testuale.
- `PRESERVES_VARIANT_OF` — conserva una variante significativa di un testo.
- `REDACTS` — relazione redazionale esplicitamente modellata.

### Relazioni di ricezione

- `RECEIVES` — un autore, corpus o tradizione riceve un testo/tema precedente.
- `REINTERPRETS` — lo rilegge attribuendogli una nuova funzione o configurazione.
- `LITURGICALLY_USES` — uso liturgico documentabile.
- `THEOLOGICALLY_DEVELOPS` — sviluppo teologico successivo riconoscibile e documentato.

## Prospettive

Ogni edge deve dichiarare almeno una prospettiva primaria:

- `textual`
- `literary`
- `historical`
- `social`
- `cultural`
- `anthropological`
- `canonical`
- `reception`
- `confessional`

La prospettiva evita di presentare come dato storico ciò che appartiene, per esempio, a una lettura canonica o confessionale.

## Statuto epistemico

Lo statuto non misura la "verità" del contenuto, ma la forza della relazione proposta nel suo dominio metodologico.

- `explicit` — relazione esplicitamente stabilita dal testo o dalla fonte.
- `strongly_supported` — sostenuta da convergenza significativa di evidenze e ampio consenso.
- `plausible` — argomentazione solida ma non necessaria né universalmente condivisa.
- `debated` — proposta seriamente discussa o dipendente da modelli concorrenti.
- `comparative` — relazione usata come comparandum senza affermare dipendenza.
- `reception_attested` — ricezione storicamente attestata.

Non si usa un punteggio numerico di confidence: darebbe una precisione artificiale a giudizi qualitativi.

## Livello di evidenza

Ogni edge può avere una o più evidenze:

- `primary_text` — testo biblico o altra fonte primaria.
- `textual_variant` — variante o forma testuale.
- `lexical` — dato lessicale/semantico.
- `literary_structure` — struttura, forma o composizione.
- `historical_source` — fonte storica primaria.
- `archaeological` — dato archeologico/epigrafico.
- `comparative_corpus` — corpus comparativo.
- `secondary_literature` — bibliografia scientifica.
- `liturgical_source` — fonte liturgica.
- `magisterial_source` — documento magisteriale quando la prospettiva è confessionale/cattolica.

Ogni evidenza deve poter indicare un localizzatore puntuale quando disponibile.

## Regole metodologiche obbligatorie

1. **Contesto ≠ dipendenza.** Un testo può `EMERGES_IN` un ambiente senza dipendere da uno specifico documento.
2. **Somiglianza ≠ fonte.** `CULTURAL_PARALLEL_WITH` non autorizza automaticamente `POSSIBLE_INFLUENCE_FROM`.
3. **Variante testuale ≠ strato letterario.** Una differenza MT/LXX non prova da sola una fase compositiva.
4. **Memoria narrativa ≠ cronaca.** Il mondo narrato e il contesto di composizione restano distinti.
5. **Lettura canonica ≠ ricostruzione storica.** Entrambe sono legittime se marcate con prospettiva diversa.
6. **Ricezione cattolica ≠ dato storico-critico.** La ricezione confessionale viene modellata esplicitamente, mai mimetizzata come consenso storico.
7. **Nessuna relazione senza motivazione.** Ogni edge editoriale deve contenere una tesi sintetica e una motivazione verificabile.
8. **Nessun edge generato automaticamente viene pubblicato come curato.** Automazione e AI possono proporre candidati, mai promuoverli autonomamente a stato editoriale approvato.

## Stati editoriali

- `draft` — proposta iniziale.
- `review` — pronta per revisione scientifica.
- `approved` — revisionata e accettata per l'uso editoriale.
- `deprecated` — conservata per storia editoriale ma non più proposta.

Ogni edge approvato registra data di revisione e, quando disponibile, revisore/responsabile editoriale.

## Vincoli di dominio e codominio — v0.1

I predicati non sono liberi. Esempi:

- `TRANSLATES`: source `TRADITION|TEXT` → target `TEXT|TRADITION`
- `THEMATIZES`: source `TEXT` → target `HUMANITY`
- `CULTURAL_PARALLEL_WITH`: source `TEXT|CULTURE` → target `CULTURE|TEXT`
- `EMERGES_IN`: source `TEXT|TRADITION|RECEPTION` → target `WORLD|CULTURE`
- `BELONGS_TO`: source `TEXT|TRADITION` → target `TRADITION|TEXT`
- `REINTERPRETS`: source `TEXT|RECEPTION` → target `TEXT|HUMANITY|TRADITION`

La validazione completa di dominio/codominio sarà eseguita da un audit dedicato, perché Sanity non dereferenzia in modo affidabile i nodi durante la validazione sincrona del singolo documento.

## Politica dei concetti antropologici

I nodi `HUMANITY` non sono tag lessicali. Sono concetti editoriali con:

- definizione controllata;
- domanda umana guida;
- termini correlati;
- possibili trasformazioni lungo il canone;
- note metodologiche;
- bibliografia.

Esempio: `fraternità` non significa "capitolo contenente la parola fratello"; indica una traiettoria antropologica nella quale la relazione fra fratelli, prossimo e responsabilità reciproca viene tematizzata, negata, ricostruita o reinterpretata.

## Versionamento

- La specifica usa versionamento semantico concettuale: `0.1`, `0.2`… fino alla stabilizzazione `1.0`.
- Ogni modifica a predicati, statuti epistemici o famiglie di nodi deve essere documentata.
- Gli edge conservano `ontologyVersion` per garantire tracciabilità futura.

## Stato di implementazione

Questa v0.1 è **sperimentale**. Lo schema Sanity associato non deve essere registrato in `sanity.config.ts` né usato per mutare `production` finché il corpus pilota Genesi 1–11 e l'audit concettuale non avranno validato il modello.
