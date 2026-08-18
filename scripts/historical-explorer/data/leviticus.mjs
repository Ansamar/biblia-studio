import {biblicalRef as ref, source} from '../lib/build-dataset.mjs'

const LEVITICUS = source('bibliography', 'Jeffrey Stackert · Leviticus', {
  citation: 'Jeffrey Stackert, “Leviticus,” Oxford Bibliographies in Biblical Studies.',
  url: 'https://academic.oup.com/reference/62341/reference-article-abstract/554109696',
  note: 'Quadro generale su P, H, struttura e problemi compositivi di Levitico.',
})
const PRIESTLY_LAW = source('secondary', 'Reinhard Achenbach · Priestly Law', {
  citation: 'Reinhard Achenbach, “Priestly Law,” The Oxford Handbook of Biblical Law, 2019.',
  url: 'https://academic.oup.com/edited-volume/34224/chapter-abstract/290207365',
})
const PRIESTHOOD = source('bibliography', 'Priest / Priesthood · Oxford Bibliographies', {
  citation: '“Priest/Priesthood,” Oxford Bibliographies in Biblical Studies.',
  url: 'https://academic.oup.com/reference/62341/reference-article-abstract/554106703',
  note: 'La ricostruzione storica del sacerdozio, specialmente prima e dopo l’inizio del periodo persiano, resta discussa.',
})
const YEHUD = source('secondary', 'Mary Joan Winn Leith · Persian-period Yehud', {
  citation: 'Mary Joan Winn Leith, “New Perspectives on the Return from Exile and Persian-Period Yehud,” The Oxford Handbook of the Historical Books of the Hebrew Bible, 2020.',
  url: 'https://academic.oup.com/edited-volume/34226/chapter-abstract/290215432',
})
const IMPERIAL = source('secondary', 'Mark G. Brett · Imperial Context of the Pentateuch', {
  citation: 'Mark G. Brett, “The Imperial Context of the Pentateuch,” The Oxford Handbook of the Pentateuch, 2021.',
  url: 'https://academic.oup.com/edited-volume/34227/chapter-abstract/290231560',
})
const EDITORIAL_AREA = source('editorial', 'Biblia Fontes · inviluppo didattico di Yehud', {
  note: 'Geometria approssimata per orientamento; non rappresenta una frontiera amministrativa certa né immutabile.',
})

export const leviticusSeed = {
  datasetId: 'levitico-history',
  title: 'Levitico · storia intorno al testo',
  subtitle: 'Sacerdozio, santuario, sacrificio, purità, santità e contesto persiano studiati senza retroproiettare automaticamente le istituzioni del testo nel deserto narrato.',
  bookRef: 'libro-levitico',
  defaultRange: {start: -650, end: -330},
  quickYears: [-586, -539, -515, -500, -450, -400, -332],
  sharedEntities: [
    {id: 'jerusalem'},
    {id: 'achaemenid-persia'},
  ],
  scenarios: [
    {id: 'exilic-transition', start: -586, end: -539, title: 'Crisi del santuario e dell’ordine cultuale', summary: 'La distruzione del tempio e l’esilio costituiscono uno sfondo decisivo per la riformulazione di identità, culto e santità, senza imporre una data unica ai materiali sacerdotali.'},
    {id: 'early-persian-cult', start: -539, end: -480, title: 'Yehud e ricostruzione del culto', summary: 'Nel primo periodo persiano Gerusalemme e il Secondo Tempio diventano un contesto storico centrale per l’autorità sacerdotale e la riorganizzazione della comunità.'},
    {id: 'priestly-textualization', start: -500, end: -400, title: 'Sacerdozio, Torah e scrittura', summary: 'Molti modelli collocano nel periodo persiano fasi importanti della formalizzazione delle tradizioni sacerdotali e della loro relazione con altre legislazioni pentateucali.'},
    {id: 'late-persian-torah', start: -450, end: -332, title: 'Verso una Torah condivisa', summary: 'La forma e l’autorità del Pentateuco si consolidano progressivamente; i rapporti fra P, H e altri corpora legali restano oggetto di dibattito.'},
  ],
  entities: [
    {id: 'yehud-persian', type: 'region', label: 'Yehud in età persiana', summary: 'Provincia persiana centrata su Gerusalemme. È il contesto politico e sociale nel quale molti studiosi situano fasi importanti dell’elaborazione sacerdotale e della Torah.', temporal: {start: -539, end: -332, precision: 'range'}, spatial: {point: {lat: 31.78, lng: 35.22}, region: 'Giuda / Yehud'}, epistemicStatus: 'attested', biblicalRefs: [], relations: [{targetId: 'achaemenid-persia', kind: 'context', label: 'Provincia inserita nell’impero achemenide'}, {targetId: 'jerusalem', kind: 'context', label: 'Gerusalemme come centro cultuale e scribale'}], sources: [YEHUD, IMPERIAL]},
    {id: 'second-temple-cult', type: 'institution', label: 'Culto del Secondo Tempio', summary: 'Il tempio ricostruito a Gerusalemme e le sue istituzioni offrono un contesto storico concreto per comprendere il ruolo crescente di sacerdoti, rituali e testi normativi nel periodo persiano.', temporal: {start: -515, end: -332, precision: 'range'}, spatial: {point: {lat: 31.78, lng: 35.23}, region: 'Gerusalemme'}, epistemicStatus: 'attested', biblicalRefs: [], relations: [{targetId: 'jerusalem', kind: 'context', label: 'Santuario di Gerusalemme'}, {targetId: 'aaronide-priesthood', kind: 'context', label: 'Autorità sacerdotale'}, {targetId: 'leviticus-formation', kind: 'composition', label: 'Contesto pertinente alla formazione del libro'}], sources: [YEHUD, PRIESTHOOD]},
    {id: 'aaronide-priesthood', type: 'institution', label: 'Sacerdozio aronide', summary: 'La gerarchia aronide rappresentata nei testi sacerdotali è spesso messa in relazione con assetti del periodo persiano; il grado in cui il testo rifletta direttamente istituzioni storiche resta discusso.', temporal: {start: -539, end: -332, precision: 'range'}, spatial: {region: 'Gerusalemme / Yehud'}, epistemicStatus: 'probable', biblicalRefs: [ref('Lv 8–10', 'levitico', 8, 10), ref('Lv 21–22', 'levitico', 21, 22)], relations: [{targetId: 'second-temple-cult', kind: 'context', label: 'Servizio e autorità cultuale'}, {targetId: 'priestly-law-p', kind: 'composition', label: 'Istituzione tematizzata nella legislazione sacerdotale'}], sources: [PRIESTHOOD, PRIESTLY_LAW]},
    {id: 'priestly-law-p', type: 'redaction', label: 'Strato sacerdotale P', summary: 'Corpus sacerdotale che struttura gran parte di Lv 1–16 e collega sacrificio, santuario, consacrazione e purità. Datazione, estensione e rapporto con altri strati restano discussi.', temporal: {start: -600, end: -450, precision: 'range'}, spatial: {region: 'Giuda / Yehud / diaspora; localizzazione compositiva discussa'}, epistemicStatus: 'debated', biblicalRefs: [ref('Lv 1–16', 'levitico', 1, 16)], relations: [{targetId: 'holiness-code-h', kind: 'composition', label: 'H rielabora e integra tradizioni sacerdotali'}, {targetId: 'leviticus-formation', kind: 'composition', label: 'Componente principale della formazione di Levitico'}], sources: [LEVITICUS, PRIESTLY_LAW]},
    {id: 'holiness-code-h', type: 'redaction', label: 'Holiness Code · H', summary: 'Lv 17–26 e altre integrazioni sono comunemente distinti come strato di Santità. H condivide l’orizzonte sacerdotale ma introduce sviluppi propri e media fra legislazioni differenti.', temporal: {start: -550, end: -400, precision: 'range'}, spatial: {region: 'Yehud; localizzazione precisa discussa'}, epistemicStatus: 'debated', biblicalRefs: [ref('Lv 17–26', 'levitico', 17, 26)], relations: [{targetId: 'priestly-law-p', kind: 'composition', label: 'Revisione e integrazione della legislazione sacerdotale'}, {targetId: 'holiness-practice', kind: 'composition', label: 'Santità estesa alla comunità'}], sources: [LEVITICUS, PRIESTLY_LAW]},
    {id: 'sacrificial-practice', type: 'practice', label: 'Sistema sacrificale di Levitico', summary: 'Lv 1–7 organizza offerte e sacrifici in un sistema normativo testuale. Historical Explorer distingue il sistema letterario dalla ricostruzione delle pratiche effettive del culto in epoche differenti.', temporal: {precision: 'unknown'}, spatial: {region: 'Santuario nella rappresentazione testuale; Gerusalemme come principale contesto storico comparabile'}, epistemicStatus: 'debated', biblicalRefs: [ref('Lv 1–7', 'levitico', 1, 7)], relations: [{targetId: 'second-temple-cult', kind: 'context', label: 'Confronto con il culto templare storico'}, {targetId: 'priestly-law-p', kind: 'composition', label: 'Normativa sacerdotale'}], sources: [PRIESTLY_LAW, LEVITICUS]},
    {id: 'purity-practice', type: 'practice', label: 'Purità rituale', summary: 'Le norme di Lv 11–15 costruiscono una tassonomia di puro/impuro e procedure di reintegrazione. Il loro sviluppo storico non va ridotto a una singola fase.', temporal: {precision: 'unknown'}, spatial: {region: 'Comunità e santuario nella rappresentazione sacerdotale'}, epistemicStatus: 'debated', biblicalRefs: [ref('Lv 11–15', 'levitico', 11, 15)], relations: [{targetId: 'priestly-law-p', kind: 'composition', label: 'Torot sacerdotali su impurità e purificazione'}], sources: [PRIESTLY_LAW, LEVITICUS]},
    {id: 'day-atonement', type: 'practice', label: 'Giorno dell’Espiazione · Lv 16', summary: 'Rituale di purificazione del santuario e della comunità. Il testo riflette una costruzione sacerdotale complessa; la storia precisa della pratica e della sua codificazione resta oggetto di studio.', temporal: {precision: 'unknown'}, spatial: {region: 'Santuario'}, epistemicStatus: 'debated', biblicalRefs: [ref('Lv 16', 'levitico', 16)], relations: [{targetId: 'priestly-law-p', kind: 'composition', label: 'Rituale sacerdotale'}, {targetId: 'second-temple-cult', kind: 'context', label: 'Contesto templare storico di confronto'}], sources: [PRIESTLY_LAW, LEVITICUS]},
    {id: 'holiness-practice', type: 'practice', label: 'Santità comunitaria', summary: 'H estende la santità oltre il solo sacerdozio e struttura comportamenti cultuali, sociali ed etici. È un tratto letterario-teologico con implicazioni per la costruzione dell’identità comunitaria.', temporal: {precision: 'unknown'}, spatial: {region: 'Comunità di Israele nella rappresentazione normativa'}, epistemicStatus: 'debated', biblicalRefs: [ref('Lv 17–26', 'levitico', 17, 26)], relations: [{targetId: 'holiness-code-h', kind: 'composition', label: 'Programma della Santità'}], sources: [LEVITICUS]},
    {id: 'leviticus-formation', type: 'redaction', label: 'Formazione di Levitico', summary: 'Processo di composizione che mette in rapporto P, H, raccolte rituali e la forma finale del Pentateuco. Non esiste una cronologia unica condivisa.', temporal: {start: -600, end: -350, precision: 'range'}, spatial: {region: 'Giuda / Yehud e ambienti scribali sacerdotali'}, epistemicStatus: 'debated', biblicalRefs: [ref('Levitico', 'levitico')], relations: [{targetId: 'priestly-law-p', kind: 'composition', label: 'Strato sacerdotale'}, {targetId: 'holiness-code-h', kind: 'composition', label: 'Strato di Santità'}, {targetId: 'yehud-persian', kind: 'context', label: 'Contesto persiano rilevante per molti modelli'}], sources: [LEVITICUS, IMPERIAL]},
  ],
  areas: [
    {id: 'yehud-persian-leviticus', entityId: 'yehud-persian', label: 'Yehud · inviluppo didattico', temporal: {start: -539, end: -332}, confidence: 'approximate', note: 'Area di orientamento per la provincia persiana di Yehud. Non rappresenta confini amministrativi certi per ogni fase del periodo.', points: [[34.75,31.4],[35.45,31.4],[35.55,32.1],[34.85,32.2],[34.75,31.4]], sources: [EDITORIAL_AREA, YEHUD]},
  ],
  noteEditoriali: 'Levitico privilegia istituzioni e pratiche rispetto agli eventi. Le date di P e H sono intervalli euristici esplicitamente discussi, non cronologie certe. Gerusalemme e Persia sono riusate come entità condivise già presenti nel corpus Historical Explorer.',
}
