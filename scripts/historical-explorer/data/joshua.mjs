import {biblicalRef as ref, source} from '../lib/build-dataset.mjs'

const JOSHUA_OB = source('bibliography', 'Thomas B. Dozeman · Joshua · Oxford Bibliographies', {
  citation: 'Thomas B. Dozeman, “Joshua,” Oxford Bibliographies in Biblical Studies, 2010.',
  url: 'https://academic.oup.com/reference/62341/reference-article-abstract/554106569',
  note: 'Quadro generale per testo, composizione, archeologia, geografia e rapporto con la Deuteronomistic History.',
})
const EARLY_ISRAEL = source('secondary', 'Ann E. Killebrew · Early Israel’s Origins, Settlement, and Ethnogenesis', {
  citation: 'Ann E. Killebrew, “Early Israel’s Origins, Settlement, and Ethnogenesis,” in The Oxford Handbook of the Historical Books of the Hebrew Bible, 2020.',
  url: 'https://academic.oup.com/edited-volume/34226/chapter-abstract/290214514',
  note: 'Usato per distinguere i modelli di conquista/infiltrazione dalla complessa emergenza di Israele nel passaggio Tardo Bronzo–Ferro I.',
})
const ISRAEL_HISTORY = source('bibliography', 'Marc Brettler · History of Israel · Oxford Bibliographies', {
  citation: 'Marc Brettler, “History of Israel,” Oxford Bibliographies in Biblical Studies, 2010.',
  url: 'https://academic.oup.com/reference/62341/reference-article-abstract/554100166',
  note: 'Riferimento metodologico per la distanza tra racconto biblico, storiografia e record archeologico.',
})
const DTR = source('bibliography', 'Knoppers · Greer · Fry · Deuteronomistic History', {
  citation: 'Gary N. Knoppers, Jonathan S. Greer, Alexiana Fry, “Deuteronomistic History,” Oxford Bibliographies in Biblical Studies, rev. 2025.',
  url: 'https://academic.oup.com/reference/62341/reference-article-abstract/561710003',
  note: 'Per la storia della ricerca sul rapporto fra Deuteronomio, Giosuè, Giudici, Samuele e Re.',
})
const EDITORIAL = source('editorial', 'Biblia Fontes · ricostruzione didattica', {
  note: 'Geometria volutamente approssimata: non rappresenta confini politici certi del Tardo Bronzo/Ferro I.',
})

export const joshuaSeed = {
  datasetId: 'giosue-history',
  title: 'Giosuè · storia intorno al testo',
  subtitle: 'Conquista narrata, città del Tardo Bronzo, emergere di Israele negli altopiani e formazione deuteronomistica sono distinti per statuto epistemico.',
  bookRef: 'libro-giosue',
  defaultRange: {start: -1300, end: -400},
  quickYears: [-1250, -1208, -1150, -1000, -722, -586, -500],
  sharedExternalEntityIds: ['israel-merneptah'],
  scenarios: [
    {id: 'late-bronze-canaan', start: -1300, end: -1200, title: 'Canaan del Tardo Bronzo', summary: 'Città-stato cananee e controllo egiziano definiscono il contesto regionale; il racconto di conquista non coincide automaticamente con una singola campagna archeologicamente documentabile.'},
    {id: 'iron-i-emergence', start: -1200, end: -1000, title: 'Ferro I · nuovi insediamenti e identità', summary: 'La trasformazione degli altopiani centrali e l’emergere di gruppi identificabili come proto-israeliti sono studiati come processo complesso di etnogenesi.'},
    {id: 'monarchic-memory', start: -900, end: -700, title: 'Memoria territoriale in età monarchica', summary: 'Tradizioni su territorio, confini e conquista vengono rilette in un contesto nel quale Israele e Giuda sono ormai società monarchiche.'},
    {id: 'dtr-formation', start: -650, end: -450, title: 'Rielaborazione deuteronomistica', summary: 'Il libro viene collocato nella discussione sulla Deuteronomistic History e sulle redazioni monarchiche, esiliche e post-esiliche.'},
  ],
  entities: [
    {id: 'canaan-late-bronze', type: 'region', label: 'Canaan nel Tardo Bronzo', summary: 'Mosaico di città-stato del Levante meridionale inserite nella sfera politica egiziana. È il contesto storico nel quale la narrazione di Giosuè ambienta l’ingresso nella terra.', temporal: {start: -1300, end: -1200, precision: 'range'}, spatial: {point: {lat: 31.8, lng: 35.1}, region: 'Levant meridionale'}, epistemicStatus: 'attested', biblicalRefs: [ref('Gs 1–12', 'giosue', 1, 12)], relations: [{targetId: 'jericho-joshua', kind: 'context', label: 'Gerico nel paesaggio della conquista narrata'}, {targetId: 'hazor-joshua', kind: 'context', label: 'Hazor come grande centro urbano del nord'}, {targetId: 'central-highlands-iron-i', kind: 'context', label: 'Trasformazione verso gli insediamenti del Ferro I'}], sources: [EARLY_ISRAEL, ISRAEL_HISTORY]},
    {id: 'jericho-joshua', type: 'city', label: 'Gerico · Tell es-Sultan', summary: 'Il sito ha una lunga storia archeologica; la relazione fra le fasi del Tardo Bronzo e il racconto di Gs 6 resta problematica e non consente di presentare la distruzione biblica come evento archeologicamente identificato con certezza.', temporal: {start: -1300, end: -1200, precision: 'range'}, spatial: {point: {lat: 31.87, lng: 35.44}, region: 'Valle del Giordano'}, epistemicStatus: 'debated', biblicalRefs: [ref('Gs 6', 'giosue', 6)], relations: [{targetId: 'conquest-memory-joshua', kind: 'memory', label: 'Centro emblematico della conquista narrata'}], sources: [JOSHUA_OB, ISRAEL_HISTORY]},
    {id: 'hazor-joshua', type: 'city', label: 'Hazor', summary: 'Grande centro urbano del nord di Canaan, distrutto alla fine del Tardo Bronzo. Il collegamento fra la distruzione archeologica e Gs 11 è discusso e non viene trattato come identificazione automatica.', temporal: {start: -1300, end: -1200, precision: 'range'}, spatial: {point: {lat: 33.02, lng: 35.57}, region: 'Alta Galilea'}, epistemicStatus: 'attested', biblicalRefs: [ref('Gs 11', 'giosue', 11)], relations: [{targetId: 'canaan-late-bronze', kind: 'context', label: 'Grande città-stato cananea'}, {targetId: 'conquest-memory-joshua', kind: 'memory', label: 'Assorbita nella memoria narrativa della conquista'}], sources: [JOSHUA_OB, EARLY_ISRAEL]},
    {id: 'central-highlands-iron-i', type: 'region', label: 'Altopiani centrali · insediamenti del Ferro I', summary: 'Nel Ferro I aumenta il numero di piccoli insediamenti negli altopiani. La loro interpretazione è centrale nella discussione sulle origini di Israele e non equivale a una prova di conquista unitaria.', temporal: {start: -1200, end: -1000, precision: 'range'}, spatial: {point: {lat: 31.9, lng: 35.2}, region: 'Altopiani centrali'}, epistemicStatus: 'attested', biblicalRefs: [ref('Gs 13–24', 'giosue', 13, 24)], relations: [{targetId: 'early-israel-ethnogenesis', kind: 'context', label: 'Quadro archeologico per l’emergere di nuove comunità'}, {targetId: 'israel-merneptah', kind: 'context', label: 'Da mettere in relazione con l’attestazione di Israel ca. 1208 a.C.'}], sources: [EARLY_ISRAEL]},
    {id: 'early-israel-ethnogenesis', type: 'people', label: 'Emergere di Israele · etnogenesi', summary: 'La formazione di Israele è trattata come processo complesso, con possibili componenti indigene e molteplici dinamiche sociali; non viene ridotta al modello di una conquista militare unica.', temporal: {start: -1220, end: -1000, precision: 'range'}, spatial: {point: {lat: 31.9, lng: 35.2}, region: 'Canaan centrale'}, epistemicStatus: 'debated', relations: [{targetId: 'central-highlands-iron-i', kind: 'context', label: 'Insediamenti degli altopiani come uno dei principali dati archeologici'}, {targetId: 'israel-merneptah', kind: 'context', label: 'Prima attestazione extrabiblica del nome Israel'}], sources: [EARLY_ISRAEL, ISRAEL_HISTORY]},
    {id: 'conquest-memory-joshua', type: 'event', label: 'Conquista di Canaan · narrazione e memoria', summary: 'Gs 1–12 presenta una conquista coordinata sotto Giosuè. Historical Explorer la tratta come costruzione narrativa e memoria territoriale, distinguendola dalle ricostruzioni archeologiche dell’emergere di Israele.', temporal: {precision: 'unknown'}, spatial: {region: 'Canaan nella geografia narrativa'}, epistemicStatus: 'memory', biblicalRefs: [ref('Gs 1–12', 'giosue', 1, 12)], relations: [{targetId: 'joshua-person', kind: 'memory', label: 'Giosuè come protagonista della conquista narrata'}, {targetId: 'canaan-late-bronze', kind: 'context', label: 'Messa in relazione con il Canaan storico senza identificarli'}, {targetId: 'joshua-formation', kind: 'composition', label: 'Memoria rielaborata nella forma letteraria del libro'}], sources: [JOSHUA_OB, ISRAEL_HISTORY]},
    {id: 'joshua-person', type: 'person', label: 'Giosuè', summary: 'Successore di Mosè e protagonista letterario del libro. La figura testuale è distinta da ogni tentativo di ricostruire un individuo storico.', temporal: {precision: 'unknown'}, spatial: {region: 'Canaan nella narrazione'}, epistemicStatus: 'narrative', biblicalRefs: [ref('Gs 1–24', 'giosue', 1, 24)], relations: [{targetId: 'conquest-memory-joshua', kind: 'memory', label: 'Guida narrativa dell’ingresso nella terra'}], sources: [JOSHUA_OB]},
    {id: 'land-allotment-joshua', type: 'institution', label: 'Ripartizione tribale della terra', summary: 'Gs 13–21 organizza il territorio in quote tribali, città levitiche e città di rifugio. Il materiale è studiato come geografia ideologica e memoria territoriale, non come catasto contemporaneo alla conquista.', temporal: {precision: 'unknown'}, spatial: {region: 'Terra d’Israele nella geografia del libro'}, epistemicStatus: 'narrative', biblicalRefs: [ref('Gs 13–21', 'giosue', 13, 21)], relations: [{targetId: 'joshua-formation', kind: 'composition', label: 'Parte della costruzione letteraria della terra promessa'}], sources: [JOSHUA_OB]},
    {id: 'joshua-formation', type: 'redaction', label: 'Formazione del libro di Giosuè', summary: 'Il libro partecipa alla discussione su Hexateuch, Deuteronomistic History e redazioni plurime. Historical Explorer visualizza questi modelli come ipotesi critiche, non come cronologia unica.', temporal: {start: -700, end: -400, precision: 'range'}, spatial: {region: 'Giuda / Yehud · contesto compositivo discusso'}, epistemicStatus: 'debated', biblicalRefs: [ref('Gs 1–24', 'giosue', 1, 24)], relations: [{targetId: 'conquest-memory-joshua', kind: 'composition', label: 'Rielaborazione della memoria di conquista'}, {targetId: 'land-allotment-joshua', kind: 'composition', label: 'Integrazione delle tradizioni territoriali'}], sources: [DTR, JOSHUA_OB]},
  ],
  areas: [
    {id: 'canaan-joshua-context-area', entityId: 'canaan-late-bronze', label: 'Canaan · area di contesto', temporal: {start: -1300, end: -1200}, confidence: 'illustrative', note: 'Inviluppo didattico del Levante meridionale; non rappresenta confini politici uniformi.', points: [[34.3,33.3],[35.9,33.3],[35.9,30.7],[34.4,30.7],[34.3,33.3]], sources: [EDITORIAL, EARLY_ISRAEL]},
    {id: 'highlands-iron-i-area', entityId: 'central-highlands-iron-i', label: 'Altopiani centrali · area approssimata', temporal: {start: -1200, end: -1000}, confidence: 'approximate', note: 'Area didattica per gli insediamenti degli altopiani, non frontiera etnica.', points: [[34.95,32.6],[35.45,32.4],[35.45,31.2],[35.0,31.1],[34.95,32.6]], sources: [EDITORIAL, EARLY_ISRAEL]},
  ],
  noteEditoriali: 'La mappa separa sistematicamente conquista narrata, dati archeologici e modelli di formazione del libro.',
}
