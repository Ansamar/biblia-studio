import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-08-15'})
const commit = process.argv.includes('--commit')

const entityDocId = (id) => `historical-entity-${id}`
const areaDocId = (id) => `historical-area-${id}`
const key = (prefix, index) => `${prefix}-${index + 1}`

const source = (kind, label, note) => ({_type: 'historicalSource', kind, label, ...(note ? {note} : {})})
const ref = (display, bookSlug, chapterStart, chapterEnd, verseStart, verseEnd) => ({
  _type: 'historicalBiblicalReference',
  display,
  bookSlug,
  ...(chapterStart != null ? {chapterStart} : {}),
  ...(chapterEnd != null ? {chapterEnd} : {}),
  ...(verseStart != null ? {verseStart} : {}),
  ...(verseEnd != null ? {verseEnd} : {}),
})

const entities = [
  {
    id: 'neo-assyria', type: 'empire', label: 'Impero neo-assiro',
    summary: 'Grande potenza del Vicino Oriente del I millennio a.C.; costituisce uno degli sfondi imperiali entro cui maturano memorie e tradizioni bibliche.',
    temporal: {start: -911, end: -609, precision: 'range'},
    spatial: {point: {lat: 36.35, lng: 43.15}, region: 'Mesopotamia e Levante'},
    epistemicStatus: 'attested',
    relations: [
      {targetId: 'nineveh', kind: 'context', label: 'Ninive come capitale dell’ultima fase imperiale'},
      {targetId: 'fall-nineveh', kind: 'interaction', label: 'Caduta di Ninive nel 612 a.C.'},
    ],
    sources: [source('secondary', 'Cronologia storica del Vicino Oriente antico', 'Riferimento bibliografico puntuale da collegare nel dataset.')],
  },
  {
    id: 'neo-babylon', type: 'empire', label: 'Impero neobabilonese',
    summary: 'La conquista di Gerusalemme e l’esilio babilonese costituiscono un contesto decisivo per la rielaborazione dell’identità e delle tradizioni di Israele.',
    temporal: {start: -626, end: -539, precision: 'range'},
    spatial: {point: {lat: 32.54, lng: 44.42}, region: 'Mesopotamia e Levante'},
    epistemicStatus: 'attested',
    biblicalRefs: [ref('2Re 24–25', '2-re', 24, 25)],
    relations: [
      {targetId: 'babylon', kind: 'context', label: 'Babilonia come centro politico imperiale'},
      {targetId: 'jerusalem-586', kind: 'interaction', label: 'Distruzione di Gerusalemme nel 586 a.C.'},
      {targetId: 'genesis-formation', kind: 'composition', label: 'Contesto rilevante per fasi di rielaborazione delle tradizioni'},
    ],
    sources: [source('secondary', 'Storia neo-babilonese', 'Riferimento bibliografico puntuale da collegare nel dataset.')],
  },
  {
    id: 'achaemenid-persia', type: 'empire', label: 'Impero persiano achemenide',
    summary: 'Dopo il 539 a.C. il Levante entra nell’orizzonte imperiale persiano; Yehud e la ricostruzione comunitaria formano un contesto importante per la storia del Pentateuco.',
    temporal: {start: -539, end: -332, precision: 'range'},
    spatial: {point: {lat: 32.19, lng: 48.26}, region: 'Vicino Oriente'},
    epistemicStatus: 'attested',
    biblicalRefs: [ref('Esd 1', 'esdra', 1)],
    relations: [
      {targetId: 'susa', kind: 'context', label: 'Susa come uno dei principali centri achemenidi'},
      {targetId: 'jerusalem', kind: 'context', label: 'Yehud e Gerusalemme nel quadro imperiale persiano'},
      {targetId: 'cyrus-babylon', kind: 'interaction', label: 'Presa di Babilonia nel 539 a.C.'},
      {targetId: 'genesis-formation', kind: 'composition', label: 'Contesto spesso collegato a fasi dell’assetto pentateucale'},
    ],
    sources: [source('secondary', 'Storia achemenide e Yehud persiana', 'Riferimento bibliografico puntuale da collegare nel dataset.')],
  },
  {
    id: 'nineveh', type: 'city', label: 'Ninive',
    summary: 'Grande centro urbano dell’Assiria e capitale imperiale sotto gli ultimi sovrani neo-assiri.',
    temporal: {start: -705, end: -612, precision: 'range'},
    spatial: {point: {lat: 36.36, lng: 43.15}, region: 'Alta Mesopotamia'},
    epistemicStatus: 'attested',
    relations: [{targetId: 'neo-assyria', kind: 'context', label: 'Capitale neo-assira'}],
    sources: [source('secondary', 'Archeologia e storia neo-assira', 'Riferimento bibliografico puntuale da collegare nel dataset.')],
  },
  {
    id: 'babylon', type: 'city', label: 'Babilonia',
    summary: 'Centro urbano della Mesopotamia meridionale e capitale dell’impero neobabilonese nel VI secolo a.C.',
    temporal: {start: -626, end: -539, precision: 'range'},
    spatial: {point: {lat: 32.54, lng: 44.42}, region: 'Babilonia'},
    epistemicStatus: 'attested',
    biblicalRefs: [ref('2Re 24–25', '2-re', 24, 25)],
    relations: [{targetId: 'neo-babylon', kind: 'context', label: 'Capitale neobabilonese'}],
    sources: [source('secondary', 'Archeologia e storia di Babilonia', 'Riferimento bibliografico puntuale da collegare nel dataset.')],
  },
  {
    id: 'susa', type: 'city', label: 'Susa',
    summary: 'Antica città dell’Elam e importante residenza reale nel sistema politico achemenide.',
    temporal: {start: -550, end: -330, precision: 'range'},
    spatial: {point: {lat: 32.19, lng: 48.26}, region: 'Susiana / Elam'},
    epistemicStatus: 'attested',
    relations: [{targetId: 'achaemenid-persia', kind: 'context', label: 'Centro achemenide'}],
    sources: [source('secondary', 'Archeologia e storia achemenide', 'Riferimento bibliografico puntuale da collegare nel dataset.')],
  },
  {
    id: 'jerusalem', type: 'city', label: 'Gerusalemme',
    summary: 'Centro politico e cultuale di Giuda; dopo il 539 a.C. diventa il fulcro della provincia persiana di Yehud e della ricostruzione comunitaria.',
    temporal: {start: -1000, end: -400, precision: 'range'},
    spatial: {point: {lat: 31.78, lng: 35.22}, region: 'Giuda / Yehud'},
    epistemicStatus: 'attested',
    biblicalRefs: [ref('2Re 24–25', '2-re', 24, 25), ref('Esd 1', 'esdra', 1)],
    relations: [
      {targetId: 'jerusalem-586', kind: 'interaction', label: 'Distruzione del 586 a.C.'},
      {targetId: 'achaemenid-persia', kind: 'context', label: 'Ricostruzione in età persiana'},
    ],
    sources: [source('secondary', 'Archeologia e storia di Gerusalemme e Yehud', 'Riferimento bibliografico puntuale da collegare nel dataset.')],
  },
  {
    id: 'memphis', type: 'city', label: 'Menfi',
    summary: 'Grande centro dell’Egitto antico e utile ancoraggio geografico per il contesto egiziano evocato dalle tradizioni bibliche.',
    temporal: {start: -1000, end: -400, precision: 'range'},
    spatial: {point: {lat: 29.85, lng: 31.25}, region: 'Basso Egitto'},
    epistemicStatus: 'attested',
    relations: [{targetId: 'egypt', kind: 'context', label: 'Centro storico dell’Egitto'}],
    sources: [source('secondary', 'Storia e archeologia dell’Egitto antico', 'Riferimento bibliografico puntuale da collegare nel dataset.')],
  },
  {
    id: 'fall-nineveh', type: 'event', label: 'Caduta di Ninive',
    summary: 'Nel 612 a.C. Ninive viene conquistata dalla coalizione guidata da Babilonesi e Medi, segnando il collasso della principale capitale neo-assira.',
    temporal: {start: -612, end: -612, precision: 'year'},
    spatial: {point: {lat: 36.36, lng: 43.15}, region: 'Ninive / Alta Mesopotamia'},
    epistemicStatus: 'attested',
    relations: [
      {targetId: 'nineveh', kind: 'interaction', label: 'Caduta della città'},
      {targetId: 'neo-assyria', kind: 'interaction', label: 'Crisi terminale dell’impero neo-assiro'},
    ],
    sources: [
      source('primary', 'Cronache mesopotamiche', 'Corpus primario richiamato a livello generale; riferimento puntuale da completare.'),
      source('secondary', 'Ricostruzione storica della caduta di Ninive', 'Bibliografia specifica da collegare nel dataset.'),
    ],
  },
  {
    id: 'jerusalem-586', type: 'event', label: 'Gerusalemme 586 a.C.',
    summary: 'Distruzione di Gerusalemme e del tempio da parte delle forze babilonesi; evento centrale per la storia di Giuda e dell’esilio.',
    temporal: {start: -586, end: -586, precision: 'year'},
    spatial: {point: {lat: 31.78, lng: 35.22}, region: 'Gerusalemme / Giuda'},
    epistemicStatus: 'attested',
    biblicalRefs: [ref('2Re 25', '2-re', 25)],
    relations: [
      {targetId: 'jerusalem', kind: 'interaction', label: 'Distruzione della città e del tempio'},
      {targetId: 'neo-babylon', kind: 'interaction', label: 'Dominio neobabilonese su Giuda'},
      {targetId: 'genesis-formation', kind: 'composition', label: 'Contesto storico rilevante per la rielaborazione delle tradizioni'},
    ],
    sources: [source('secondary', 'Storia di Giuda e dell’impero neobabilonese', 'Riferimento bibliografico puntuale da collegare nel dataset.')],
  },
  {
    id: 'cyrus-babylon', type: 'event', label: 'Ciro entra a Babilonia',
    summary: 'Nel 539 a.C. Babilonia passa sotto il controllo di Ciro II; il passaggio apre la fase achemenide del Vicino Oriente.',
    temporal: {start: -539, end: -539, precision: 'year'},
    spatial: {point: {lat: 32.54, lng: 44.42}, region: 'Babilonia'},
    epistemicStatus: 'attested',
    biblicalRefs: [ref('Esd 1', 'esdra', 1)],
    relations: [
      {targetId: 'neo-babylon', kind: 'interaction', label: 'Fine del dominio neobabilonese'},
      {targetId: 'achaemenid-persia', kind: 'interaction', label: 'Inizio del controllo persiano'},
    ],
    sources: [
      source('primary', 'Fonti babilonesi sul passaggio al dominio persiano', 'Corpus primario richiamato a livello generale; riferimento puntuale da completare.'),
      source('secondary', 'Cronologia achemenide', 'Bibliografia specifica da collegare nel dataset.'),
    ],
  },
  {
    id: 'genesis-formation', type: 'redaction', label: 'Formazione di Genesi',
    summary: 'Processo plurale di tradizione, raccolta, riscrittura e redazione. Le datazioni precise dipendono dal modello critico adottato.',
    temporal: {start: -800, end: -400, precision: 'range'},
    spatial: {point: {lat: 31.78, lng: 35.22}, region: 'Israele / Giuda / diaspora'},
    epistemicStatus: 'debated',
    biblicalRefs: [ref('Genesi', 'genesi')],
    relations: [
      {targetId: 'neo-babylon', kind: 'context', label: 'Fase esilica'},
      {targetId: 'achaemenid-persia', kind: 'context', label: 'Fase persiana'},
    ],
    sources: [source('bibliography', 'Modelli storico-critici della formazione del Pentateuco', 'Cronologia e stratificazione restano discusse; riferimenti bibliografici puntuali da collegare.')],
  },
  {
    id: 'flood-traditions', type: 'event', label: 'Tradizioni di grandi inondazioni',
    summary: 'Tradizioni mesopotamiche di grandi inondazioni costituiscono un comparandum culturale per Gen 6–9; non sono una prova della storicità del racconto così come narrato.',
    temporal: {precision: 'unknown'},
    spatial: {point: {lat: 32.5, lng: 44.4}, region: 'Mesopotamia'},
    epistemicStatus: 'comparandum',
    biblicalRefs: [ref('Gen 6–9', 'genesi', 6, 9)],
    relations: [{targetId: 'mesopotamia', kind: 'memory', label: 'Comparazione culturale'}],
    sources: [source('bibliography', 'Tradizioni mesopotamiche del diluvio', 'Corpus e bibliografia comparativa da specificare con riferimenti puntuali.')],
  },
  {
    id: 'mesopotamia', type: 'region', label: 'Mesopotamia',
    summary: 'Area culturale fondamentale per il confronto con cosmogonie, genealogie, tradizioni di diluvio e culture urbane presenti nell’orizzonte comparativo di Genesi.',
    temporal: {precision: 'unknown'},
    spatial: {point: {lat: 33.3, lng: 44.4}, region: 'Mesopotamia'},
    epistemicStatus: 'attested',
    biblicalRefs: [ref('Gen 1–11', 'genesi', 1, 11)],
    relations: [],
    sources: [source('secondary', 'Vicino Oriente antico', 'Riferimento bibliografico puntuale da collegare nel dataset.')],
  },
  {
    id: 'canaan', type: 'region', label: 'Canaan / Levante',
    summary: 'Spazio geografico e culturale delle tradizioni patriarcali e delle successive memorie di Israele.',
    temporal: {precision: 'unknown'},
    spatial: {point: {lat: 31.8, lng: 35.2}, region: 'Levante'},
    epistemicStatus: 'attested',
    biblicalRefs: [ref('Gen 12–36', 'genesi', 12, 36)],
    relations: [],
    sources: [source('secondary', 'Archeologia e storia del Levante', 'Riferimento bibliografico puntuale da collegare nel dataset.')],
  },
  {
    id: 'egypt', type: 'region', label: 'Egitto',
    summary: 'Potenza regionale e spazio narrativo decisivo nel ciclo di Giuseppe. La relazione tra dettagli narrativi e specifiche fasi storiche va valutata caso per caso.',
    temporal: {precision: 'unknown'},
    spatial: {point: {lat: 30.04, lng: 31.24}, region: 'Egitto'},
    epistemicStatus: 'attested',
    biblicalRefs: [ref('Gen 37–50', 'genesi', 37, 50)],
    relations: [{targetId: 'memphis', kind: 'context', label: 'Menfi come ancoraggio storico-geografico'}],
    sources: [source('secondary', 'Storia dell’Egitto e relazioni con il Levante', 'Riferimento bibliografico puntuale da collegare nel dataset.')],
  },
]

const areaSeeds = [
  {
    id: 'neo-assyria-demo-area', entityId: 'neo-assyria', label: 'Sfera neo-assira · ricostruzione didattica',
    temporal: {start: -850, end: -627}, confidence: 'illustrative',
    note: 'Inviluppo dimostrativo per testare la variazione territoriale nel tempo; non rappresenta un confine politico puntuale.',
    points: [[34.2,29.3],[32.7,34.6],[36.4,38.3],[44.9,38.1],[48.3,34.0],[46.8,29.8],[40.0,28.3],[34.2,29.3]],
  },
  {
    id: 'neo-babylon-demo-area', entityId: 'neo-babylon', label: 'Sfera neobabilonese · ricostruzione didattica',
    temporal: {start: -626, end: -540}, confidence: 'illustrative',
    note: 'Inviluppo dimostrativo del sistema babilonese fra Mesopotamia e Levante; non va letto come frontiera amministrativa precisa.',
    points: [[34.0,29.0],[33.2,34.1],[37.6,36.9],[46.4,35.2],[48.0,30.2],[44.6,27.8],[37.4,27.6],[34.0,29.0]],
  },
  {
    id: 'achaemenid-demo-area', entityId: 'achaemenid-persia', label: 'Sfera achemenide · ricostruzione didattica',
    temporal: {start: -539, end: -400}, confidence: 'illustrative',
    note: 'Inviluppo didattico limitato alla finestra geografica del prototipo. L’impero achemenide reale si estendeva molto oltre la carta mostrata.',
    points: [[29.2,26.0],[28.8,34.8],[35.8,39.0],[49.8,39.0],[51.2,27.0],[43.8,23.4],[33.0,24.2],[29.2,26.0]],
  },
]

const scenarios = [
  {id: 'neo-assyrian-horizon', start: -911, end: -627, title: 'Orizzonte neo-assiro', summary: 'L’Assiria costituisce il principale quadro imperiale del Vicino Oriente. Ninive emerge come centro politico e il Levante vive dentro una rete di pressioni, tributi e conflitti regionali.'},
  {id: 'neo-babylonian-horizon', start: -626, end: -540, title: 'Orizzonte neobabilonese', summary: 'Babilonia sostituisce l’Assiria come potenza dominante. Le conquiste nel Levante, la crisi di Giuda e l’esilio diventano un contesto decisivo per la memoria e la rielaborazione delle tradizioni bibliche.'},
  {id: 'persian-horizon', start: -539, end: -400, title: 'Orizzonte persiano', summary: 'Con la conquista di Babilonia da parte di Ciro, il Levante entra nel sistema achemenide. Yehud, Gerusalemme e la ricostruzione comunitaria costituiscono un contesto importante per la storia del Pentateuco.'},
]

const entityIds = new Set(entities.map((entity) => entity.id))
const brokenRelations = entities.flatMap((entity) => (entity.relations || []).filter((relation) => !entityIds.has(relation.targetId)).map((relation) => `${entity.id} -> ${relation.targetId}`))
if (brokenRelations.length) throw new Error(`Relazioni rotte: ${brokenRelations.join(', ')}`)

function keyed(items, prefix) {
  return (items || []).map((item, index) => ({...item, _key: key(prefix, index)}))
}

const entityDocs = entities.map((entity) => ({
  _id: entityDocId(entity.id),
  _type: 'historicalEntity',
  id: entity.id,
  type: entity.type,
  label: entity.label,
  summary: entity.summary,
  temporal: {_type: 'object', ...entity.temporal},
  spatial: entity.spatial ? {
    _type: 'object',
    region: entity.spatial.region,
    point: entity.spatial.point ? {_type: 'geopoint', ...entity.spatial.point} : undefined,
  } : undefined,
  epistemicStatus: entity.epistemicStatus,
  biblicalRefs: keyed(entity.biblicalRefs, `${entity.id}-bib`).map((item) => ({...item, _type: 'historicalBiblicalReference'})),
  relations: keyed(entity.relations, `${entity.id}-rel`).map((relation) => ({
    _type: 'historicalRelation',
    _key: relation._key,
    kind: relation.kind,
    label: relation.label,
    target: {_type: 'reference', _ref: entityDocId(relation.targetId)},
  })),
  sources: keyed(entity.sources, `${entity.id}-src`).map((item) => ({...item, _type: 'historicalSource'})),
}))

const areaDocs = areaSeeds.map((area) => ({
  _id: areaDocId(area.id),
  _type: 'historicalArea',
  id: area.id,
  entity: {_type: 'reference', _ref: entityDocId(area.entityId)},
  label: area.label,
  temporal: {_type: 'object', ...area.temporal},
  confidence: area.confidence,
  note: area.note,
  geometry: {
    _type: 'object',
    type: 'Polygon',
    rings: [{
      _key: `${area.id}-ring-1`,
      _type: 'historicalPolygonRing',
      points: area.points.map(([lng, lat], index) => ({_key: `${area.id}-p-${index + 1}`, _type: 'geopoint', lat, lng})),
    }],
  },
  sources: [{
    _key: `${area.id}-src-1`,
    _type: 'historicalSource',
    kind: 'editorial',
    label: 'Biblia Fontes · geometria dimostrativa Historical Explorer',
    note: 'Poligono costruito editorialmente per validare il motore geo-temporale. Non derivato da un dataset cartografico storico pubblicato.',
  }],
}))

const datasetDoc = {
  _id: 'historical-dataset-genesis-history',
  _type: 'historicalExplorerDataset',
  id: 'genesis-history',
  title: 'Genesi · storia intorno al testo',
  subtitle: 'Popoli, poteri, luoghi, memorie e processi storici messi in relazione con Genesi senza confondere racconto e ricostruzione storica.',
  book: {_type: 'reference', _ref: 'libro-genesi'},
  defaultRange: {_type: 'object', start: -1000, end: -400},
  quickYears: [-900, -700, -612, -586, -539, -500, -400],
  scenarios: scenarios.map((scenario, index) => ({_key: key('scenario', index), _type: 'historicalScenario', ...scenario})),
  entities: entityDocs.map((doc, index) => ({_key: key('entity-ref', index), _type: 'reference', _ref: doc._id})),
  areas: areaDocs.map((doc, index) => ({_key: key('area-ref', index), _type: 'reference', _ref: doc._id})),
  noteEditoriali: 'Seed iniziale di Genesi per la migrazione dell’Historical Explorer dal prototipo TypeScript a Sanity. Le geometrie sono illustrative e le voci bibliografiche generiche richiedono progressivo arricchimento puntuale.',
}

const docs = [...entityDocs, ...areaDocs, datasetDoc]
const existingBook = await client.fetch(`defined(*[_id == "libro-genesi"][0]._id)`)
if (!existingBook) throw new Error('Riferimento libro-genesi non trovato nel dataset configurato.')

console.log('\n=== HISTORICAL EXPLORER · GENESI ===')
console.log(`Project: ${client.config().projectId}`)
console.log(`Dataset: ${client.config().dataset}`)
console.log(`Entità: ${entityDocs.length}`)
console.log(`Aree: ${areaDocs.length}`)
console.log(`Dataset: 1`)
console.log(`Documenti totali: ${docs.length}`)
console.log(`Relazioni rotte: ${brokenRelations.length}`)
console.log(`Modalità: ${commit ? 'COMMIT' : 'DRY RUN'}`)

if (!commit) {
  console.log('\nNessuna mutazione eseguita. Per scrivere:')
  console.log('npx sanity exec scripts/historical-explorer/seed-genesis.mjs --with-user-token -- --commit')
  process.exit(0)
}

let tx = client.transaction()
for (const doc of docs) tx = tx.createOrReplace(doc)
const result = await tx.commit({visibility: 'sync'})
console.log(`\n✓ Scritti ${docs.length} documenti Historical Explorer.`)
console.log(`Transaction: ${result.transactionId || 'completata'}`)
