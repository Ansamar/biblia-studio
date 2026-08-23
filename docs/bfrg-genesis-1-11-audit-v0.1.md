# BFRG — Audit severo del pilota Genesi 1–11

## Verdetto sintetico

Il paradigma BFRG regge, ma la v0.1 non deve essere fusa così com'è. Il pilota ha individuato correzioni necessarie prima di ogni registrazione in Sanity.

### Problemi strutturali emersi

1. `epistemicStatus` della v0.1 mescola natura e forza della tesi: corretto in v0.2 con `claimMode` + `confidence`.
2. I testi canonici successivi (Giovanni, Paolo, Ebrei, Pietro, Atti) devono restare `TEXT`; `RECEPTION` è riservato alla ricezione post-canonica/extra-canonica.
3. `HUMANITY` era troppo ampia: città, tecnica, lingua, popoli e forme culturali vanno in `WORLD/CULTURE`.
4. Manca un predicato neutro `DEPICTS`: `TEXT → WORLD|CULTURE`, per rappresentazioni narrative/sociali/culturali che non sono né contesto di composizione né temi antropologici.
5. `DEVELOPS`/`TRANSFORMS` sono troppo generici: v0.2 usa `DEVELOPS_CONCEPT` / `TRANSFORMS_CONCEPT`.
6. `TRANSLATES` deve puntare alla forma testuale/Vorlage appropriata; LXX non va descritta semplicemente come traduzione del MT.
7. `PARALLELS_TEXT` non va usato per un oggetto culturale non testuale.
8. Babele → Pentecoste non deve essere presentato come rapporto testuale diretto se l'evidenza è principalmente una tradizione interpretativa successiva.

## Classificazione delle 60 relazioni

Legenda:
- **KEEP** — tesi sostanzialmente valida; va solo convertita ai campi v0.2.
- **REVISE** — tesi utile ma formulazione/predicato/claim mode va corretto.
- **RECLASSIFY** — il nodo destinazione appartiene a un'altra famiglia ontologica o richiede `DEPICTS`.
- **DROP** — non va mantenuta come edge diretto nella forma proposta.

| ID | Esito | Nota di audit |
|---|---|---|
| G01 | KEEP | Creazione è una traiettoria antropologico-teologica legittima; `direct_textual + established`. |
| G02 | KEEP | Ordine è strutturale; meglio `critical_inference + strongly_supported`. |
| G03 | KEEP | Dignità umana deriva dal linguaggio dell'immagine; `direct_textual + strongly_supported`. |
| G04 | REVISE | Custodia ecologica non va retroproiettata; mantenere come responsabilità verso il vivente, `critical_inference + plausible`. |
| G05 | KEEP | Macro-unità letteraria stabile. |
| G06 | KEEP | P resta `critical_inference + debated`; corretto dichiarare il modello. |
| G07 | KEEP | Comparazione cosmogonica correttamente non genealogica. |
| G08 | KEEP | Comparazione con regalità antica utile, ma richiede bibliografia specialistica. |
| G09 | REVISE | Target: forma ebraica/Vorlage di Gen 1, non MT come equivalenza automatica. |
| G10 | KEEP | Giovanni resta nodo TEXT; `canonical_reading + strongly_supported`. |
| G11 | KEEP | Parallelo letterario interno, senza bisogno di dipendenza. |
| G12 | KEEP | Lavoro come esperienza antropologica. |
| G13 | KEEP | Responsabilità/custodia direttamente ancorata a Gen 2,15. |
| G14 | KEEP | Limite normativo ben fondato. |
| G15 | KEEP | Libertà è interpretazione antropologica; `critical_inference + strongly_supported`. |
| G16 | KEEP | Relazione uomo-donna legittima come HUMANITY. |
| G17 | REVISE | Usare `DEVELOPS_CONCEPT`. |
| G18 | KEEP | Libertà problematizzata; non “esplicita” come metaconcetto, ma `critical_inference`. |
| G19 | KEEP | Vergogna testualmente esplicita. |
| G20 | KEEP | Mortalità testualmente esplicita. |
| G21 | KEEP | Romani resta TEXT; rilettura canonica. |
| G22 | KEEP | 1Cor resta TEXT; rilettura canonica. |
| G23 | KEEP | Fraternità è traiettoria antropologica centrale. |
| G24 | KEEP | Violenza fratricida diretta. |
| G25 | KEEP | Responsabilità verso l'altro fortemente ancorata alla domanda di Caino. |
| G26 | KEEP | Giustizia è interpretazione strutturale, non mero lemma. |
| G27 | REVISE | Usare `DEVELOPS_CONCEPT`; distinguere limite della vendetta e amplificazione di Lamec. |
| G28 | KEEP | 1Gv resta TEXT; rapporto con Caino esplicito e canonico. |
| G29 | RECLASSIFY | “Città” non è HUMANITY: usare `DEPICTS → CULTURE/WORLD` (urbanità/fondazione urbana). |
| G30 | RECLASSIFY | “Tecnica” è CULTURE; usare `DEPICTS`. |
| G31 | REVISE | Il nodo “Tecnica e violenza” è composto e instabile; meglio HUMANITY “ambivalenza del progresso/civiltà” oppure due edge distinti. |
| G32 | REVISE | Se destinazione è genere culturale, usare `CULTURAL_PARALLEL_WITH`; `PARALLELS_TEXT` solo verso un testo/corpus testuale definito. |
| G33 | KEEP | Mortalità strutturata dalla formula genealogica. |
| G34 | KEEP | Continuità della vita è inferenza antropologica forte. |
| G35 | KEEP | Corruzione/male umano: concetto da definire con cautela. |
| G36 | REVISE | Usare `DEVELOPS_CONCEPT → Violenza`. |
| G37 | KEEP | Giudizio è strutturale nel racconto. |
| G38 | KEEP | Salvezza/ preservazione della vita legittima; precisare lessico editoriale. |
| G39 | KEEP | Comparazione diluviale generale metodologicamente corretta. |
| G40 | KEEP | Atrahasis come comparandum, non fonte automaticamente. |
| G41 | KEEP | Gilgamesh come comparandum, non fonte automaticamente. |
| G42 | KEEP | Macro-unità letteraria. |
| G43 | KEEP | Alleanza noachica. |
| G44 | REVISE | “Universalità umana” può restare HUMANITY ma prospettiva primaria meglio anthropological/literary; la lettura canonica può essere secondaria. |
| G45 | KEEP | Vita/sangue/omicidio ben ancorati. |
| G46 | KEEP | Dignità umana collegata all'immagine di Dio. |
| G47 | KEEP | 1Pt è TEXT; `REINTERPRETS` può essere più preciso di `RECEIVES` se si enfatizza la funzione battesimale. |
| G48 | KEEP | Ebrei è TEXT; `RECEIVES` appropriato. |
| G49 | RECLASSIFY | “Popoli” è WORLD; usare `DEPICTS → WORLD` oppure un nodo HUMANITY diverso (“pluralità umana”). |
| G50 | REVISE | “Diversità” può restare HUMANITY solo se definita come pluralità/alterità umana; altrimenti è troppo generica. |
| G51 | KEEP | Contesto geografico-culturale: `critical_inference + plausible`; distinguere sempre tempo narrato e composizione. |
| G52 | RECLASSIFY | “Lingua” come sistema/pratica è CULTURE; usare `DEPICTS`. Un eventuale concetto HUMANITY può essere “comunicazione/alterità linguistica”. |
| G53 | KEEP | Potere può essere HUMANITY se definito come domanda antropologico-politica, non come istituzione concreta. |
| G54 | RECLASSIFY | “Città” va in CULTURE/WORLD; usare `DEPICTS` o collegare a un concetto HUMANITY diverso (concentrazione/autoaffermazione). |
| G55 | KEEP | Unità può essere HUMANITY se definita come comunione/omologazione; richiede confini concettuali. |
| G56 | RECLASSIFY | Dispersione è soprattutto processo WORLD; può avere un secondo edge antropologico verso frammentazione/alterità. |
| G57 | KEEP | Comparazione con urbanità mesopotamica corretta. |
| G58 | KEEP | Ziggurat come tipologia culturale/architettonica; evitare identificazione con monumento specifico. |
| G59 | REVISE | `EMERGES_IN` è troppo forte/ambiguo per “Babilonia come orizzonte comparativo”; meglio `CULTURAL_PARALLEL_WITH` o sospendere finché non si formula una vera tesi compositiva. |
| G60 | DROP | Non mantenere `Atti 2 PARALLELS_TEXT Gen 11` come edge diretto. Modellare invece una futura ricezione post-canonica “Pentecoste come contro-Babele”, che riceve entrambi i testi. |

## Risultato quantitativo

- KEEP: 40
- REVISE: 11
- RECLASSIFY: 8
- DROP: 1

Il conteggio non è un voto di qualità. Mostra che circa due terzi del pilota reggono senza modifica ontologica sostanziale, mentre un terzo ha svolto utilmente la funzione di stress-test.

## Predicato nuovo candidato

### `DEPICTS`

**Definizione:** un testo rappresenta narrativamente o descrittivamente un fenomeno, istituzione, pratica o configurazione storico-culturale senza affermare che il testo emerga da esso né che il fenomeno sia un concetto antropologico.

- dominio: `TEXT`
- codominio: `WORLD|CULTURE`
- direzionale: sì
- non implica storicità della scena narrata
- non implica contesto di composizione

Esempi pilota: Gen 4 → urbanità; Gen 4 → tecnica; Gen 10 → popoli; Gen 11 → pluralità linguistica/urbanità.

## Decisione di audit

**BFRG è PROMOSSO come paradigma, ma v0.1 è RESPINTA come schema finale.**

La v0.2 corregge il nucleo epistemico; prima della stabilizzazione v0.3 occorre incorporare `DEPICTS`, riesprimere le 19 relazioni non-KEEP e ricontrollare la matrice dominio/codominio.

Nessuna registrazione dello schema in `sanity.config.ts` e nessuna mutazione di `production` è autorizzata in questa fase.