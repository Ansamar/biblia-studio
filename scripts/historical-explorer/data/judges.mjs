import {biblicalRef as ref, source} from '../lib/build-dataset.mjs'

const IRON_I = source('secondary', 'Victor H. Matthews · Settlement and Competition in Iron Age I Canaan', {
  citation: 'Victor H. Matthews, “Settlement and Competition in Iron Age I Canaan,” in The History of Bronze and Iron Age Israel, Oxford University Press, 2018.',
  url: 'https://academic.oup.com/book/3360/chapter-abstract/144441811',
  note: 'Per il quadro archeologico e sociale del Ferro I, insediamenti degli altopiani, Filistei e trasformazioni regionali.',
})
const PHILISTINES = source('bibliography', 'Carl S. Ehrlich · Philistines · Oxford Bibliographies', {
  citation: 'Carl S. Ehrlich, “Philistines,” Oxford Bibliographies in Biblical Studies, rev. 2018.',
  url: 'https://academic.oup.com/reference/62341/reference-article-abstract/554101700',
  note: 'Per la storia e cultura filistea e il rapporto fra dati archeologici e rappresentazione biblica.',
})
const DTR = source('bibliography', 'Knoppers · Greer · Fry · Deuteronomistic History', {
  citation: 'Gary N. Knoppers, Jonathan S. Greer, Alexiana Fry, “Deuteronomistic History,” Oxford Bibliographies in Biblical Studies, rev. 2025.',
  url: 'https://academic.oup.com/reference/62341/reference-article-abstract/561710003',
})
const HISTORY = source('secondary', 'Lester L. Grabbe · Iron Age: Tribes to Monarchy', {
  citation: 'Lester L. Grabbe, “Iron Age: Tribes to Monarchy,” in The Oxford History of the Holy Land, 2023.',
  url: 'https://academic.oup.com/book/45676/chapter-abstract/398059063',
  note: 'Per la cautela metodologica nell’uso dei racconti di Giudici e Samuele come fonti storiche.',
})
const EDITORIAL = source('editorial', 'Biblia Fontes · ricostruzione didattica', {note: 'Geometria approssimata, non confine etnico o politico certo.'})

export const judgesSeed = {
  datasetId: 'giudici-history',
  title: 'Giudici · storia intorno al testo',
  subtitle: 'Ferro I, società regionali, Filistei, memorie di conflitto e costruzione deuteronomistica sono mantenuti distinti.',
  bookRef: 'libro-giudici',
  defaultRange: {start: -1200, end: -400},
  quickYears: [-1175, -1100, -1050, -1000, -800, -586, -500],
  sharedEntities: [{id: 'central-highlands-iron-i'}, {id: 'early-israel-ethnogenesis'}],
  scenarios: [
    {id: 'iron-i-fragmentation', start: -1200, end: -1100, title: 'Ferro I · frammentazione regionale', summary: 'Nuovi insediamenti, crisi delle città del Tardo Bronzo e gruppi diversi convivono e competono nel Levante meridionale.'},
    {id: 'philistine-highland-competition', start: -1150, end: -1000, title: 'Filistei e società degli altopiani', summary: 'Le città filistee della costa e i gruppi degli altopiani rappresentano poli differenti del nuovo assetto del Ferro I.'},
    {id: 'monarchic-retrospect', start: -900, end: -700, title: 'Memoria premonarchica riletta dalla monarchia', summary: 'Le tradizioni dei giudici vengono lette retrospettivamente da società che conoscono già la monarchia e i suoi conflitti.'},
    {id: 'dtr-judges', start: -650, end: -450, title: 'Cornice deuteronomistica', summary: 'Il ciclo apostasia–oppressione–grido–liberazione organizza materiali diversi entro una teologia della storia.'},
  ],
  entities: [
    {id: 'philistines-iron-i', type: 'people', label: 'Filistei · Ferro I', summary: 'Gruppi con radici egee/anatoliche si stabiliscono lungo la costa meridionale di Canaan intorno al 1200 a.C.; archeologia e fonti egiziane ampliano e correggono l’immagine biblica.', temporal: {start: -1200, end: -950, precision: 'range'}, spatial: {point: {lat: 31.6, lng: 34.6}, region: 'Pianura costiera meridionale'}, epistemicStatus: 'attested', biblicalRefs: [ref('Gdc 3–16', 'giudici', 3, 16)], relations: [{targetId: 'philistine-pentapolis', kind: 'context', label: 'Organizzazione urbana nella pentapoli filistea'}, {targetId: 'samson-cycle', kind: 'memory', label: 'Avversari centrali nel ciclo di Sansone'}], sources: [PHILISTINES, IRON_I]},
    {id: 'philistine-pentapolis', type: 'region', label: 'Pentapoli filistea', summary: 'Ashdod, Ashkelon, Gaza, Ekron e Gath costituiscono il sistema urbano filisteo noto da testi e archeologia; il rapporto politico fra le città muta nel tempo.', temporal: {start: -1150, end: -700, precision: 'range'}, spatial: {point: {lat: 31.65, lng: 34.65}, region: 'Pianura costiera filistea'}, epistemicStatus: 'attested', biblicalRefs: [ref('Gdc 13–16', 'giudici', 13, 16)], relations: [{targetId: 'philistines-iron-i', kind: 'context', label: 'Sistema urbano filisteo'}, {targetId: 'samson-cycle', kind: 'memory', label: 'Scenario del ciclo di Sansone'}], sources: [PHILISTINES]},
    {id: 'tribal-fragmentation-judges', type: 'institution', label: 'Società regionali e identità tribali', summary: 'Giudici rappresenta Israele come aggregato di tribù e gruppi regionali senza monarchia stabile. Il modello letterario non va convertito direttamente in una costituzione storica uniforme.', temporal: {start: -1150, end: -1000, precision: 'range'}, spatial: {region: 'Altopiani e valli del Levante meridionale'}, epistemicStatus: 'probable', biblicalRefs: [ref('Gdc 1–21', 'giudici', 1, 21)], relations: [{targetId: 'early-israel-ethnogenesis', kind: 'context', label: 'Processi di formazione identitaria nel Ferro I'}, {targetId: 'judges-memory-cycles', kind: 'memory', label: 'Schema regionale dei racconti di liberatori'}], sources: [IRON_I, HISTORY]},
    {id: 'judges-memory-cycles', type: 'text', label: 'Cicli dei giudici · memorie regionali', summary: 'Debora, Gedeone, Iefte, Sansone e altri cicli conservano tradizioni differenti poi organizzate in una struttura letteraria comune.', temporal: {precision: 'unknown'}, spatial: {region: 'Più regioni del Levante nella geografia narrativa'}, epistemicStatus: 'memory', biblicalRefs: [ref('Gdc 3–16', 'giudici', 3, 16)], relations: [{targetId: 'tribal-fragmentation-judges', kind: 'memory', label: 'Riflettono un mondo narrativo regionalizzato'}, {targetId: 'judges-dtr-frame', kind: 'composition', label: 'Riorganizzati nella cornice deuteronomistica'}], sources: [DTR, HISTORY]},
    {id: 'deborah-barak-memory', type: 'event', label: 'Debora e Barak · memoria di conflitto', summary: 'Gdc 4–5 conserva due forme letterarie del conflitto contro Sisara/Jabin. Il Cantico di Debora è spesso discusso come tradizione poetica antica, ma datazione e rapporto con il racconto restano oggetto di ricerca.', temporal: {precision: 'unknown'}, spatial: {point: {lat: 32.6, lng: 35.35}, region: 'Galilea / valle di Izreel nella narrazione'}, epistemicStatus: 'memory', biblicalRefs: [ref('Gdc 4–5', 'giudici', 4, 5)], relations: [{targetId: 'judges-memory-cycles', kind: 'memory', label: 'Uno dei principali cicli regionali'}], sources: [HISTORY, DTR]},
    {id: 'samson-cycle', type: 'text', label: 'Ciclo di Sansone', summary: 'Gdc 13–16 mette in scena il confine fra gruppi degli altopiani e Filistei. Il valore storico risiede soprattutto nel quadro di contatto e conflitto, non nella verifica biografica di Sansone.', temporal: {precision: 'unknown'}, spatial: {point: {lat: 31.78, lng: 34.98}, region: 'Sefela e confine filisteo nella narrazione'}, epistemicStatus: 'memory', biblicalRefs: [ref('Gdc 13–16', 'giudici', 13, 16)], relations: [{targetId: 'philistines-iron-i', kind: 'context', label: 'Conflitto narrativo con i Filistei'}, {targetId: 'philistine-pentapolis', kind: 'context', label: 'Scenario urbano filisteo'}], sources: [PHILISTINES, IRON_I]},
    {id: 'no-king-refrain', type: 'text', label: '“In quei giorni non c’era re”', summary: 'Il ritornello di Gdc 17–21 costruisce un giudizio retrospettivo sul disordine premonarchico e prepara narrativamente la questione della monarchia.', temporal: {precision: 'unknown'}, epistemicStatus: 'narrative', biblicalRefs: [ref('Gdc 17–21', 'giudici', 17, 21)], relations: [{targetId: 'judges-dtr-frame', kind: 'composition', label: 'Funzione editoriale nella forma finale del libro'}], sources: [DTR]},
    {id: 'judges-dtr-frame', type: 'redaction', label: 'Cornice deuteronomistica di Giudici', summary: 'Lo schema peccato–oppressione–grido–salvezza interpreta tradizioni regionali entro una teologia della storia. L’estensione e le fasi della redazione restano discusse.', temporal: {start: -700, end: -450, precision: 'range'}, spatial: {region: 'Giuda / Yehud · contesto compositivo discusso'}, epistemicStatus: 'debated', biblicalRefs: [ref('Gdc 2–16', 'giudici', 2, 16)], relations: [{targetId: 'judges-memory-cycles', kind: 'composition', label: 'Organizza i cicli dei giudici'}, {targetId: 'no-king-refrain', kind: 'composition', label: 'Contribuisce alla valutazione del periodo premonarchico'}], sources: [DTR]},
    {id: 'judges-formation', type: 'redaction', label: 'Formazione del libro di Giudici', summary: 'La forma attuale integra prologo, cicli dei liberatori e appendici finali. Il rapporto con la Deuteronomistic History è importante ma non elimina la pluralità delle tradizioni.', temporal: {start: -700, end: -400, precision: 'range'}, epistemicStatus: 'debated', biblicalRefs: [ref('Gdc 1–21', 'giudici', 1, 21)], relations: [{targetId: 'judges-dtr-frame', kind: 'composition', label: 'Una delle principali cornici redazionali'}], sources: [DTR]},
  ],
  areas: [
    {id: 'philistine-context-area', entityId: 'philistines-iron-i', label: 'Area filistea · contesto approssimato', temporal: {start: -1150, end: -950}, confidence: 'approximate', note: 'Area didattica della concentrazione dei principali centri filistei, non confine politico costante.', points: [[34.25,32.05],[34.9,32.05],[35.0,31.05],[34.2,31.0],[34.25,32.05]], sources: [EDITORIAL, PHILISTINES]},
  ],
  noteEditoriali: 'Giudici privilegia dinamiche regionali e memoria sociale; nessun ciclo viene presentato come cronaca verificata nel dettaglio.',
}
