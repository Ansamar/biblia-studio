import {biblicalRef as ref, source} from '../lib/build-dataset.mjs'

const RUTH_OBO = source('bibliography', 'Jennifer Koosed · Ruth · Oxford Bibliographies', {
  citation: 'Jennifer Koosed, “Ruth,” Oxford Bibliographies in Biblical Studies, 2023.',
  url: 'https://academic.oup.com/reference/62341/reference-article-abstract/554099587',
  note: 'Quadro generale sulle principali ipotesi di datazione e finalità del libro, dalla lettura davidica a quella post-esilica.',
})
const RUTH_NARRATIVE = source('secondary', 'J. Andrew Dearman · Plot and Theme in the Book of Ruth', {
  citation: 'J. Andrew Dearman, “Plot and Theme in the Book of Ruth,” in Reading Hebrew Bible Narratives, Oxford University Press, 2018.',
  url: 'https://academic.oup.com/book/1372/chapter-abstract/140680492',
  note: 'Per il rapporto fra storia familiare, Betlemme, Moab e genealogia davidica.',
})
const POSTEXILIC = source('secondary', 'Cristiano Grottanelli · Ruth', {
  citation: 'Cristiano Grottanelli, “The King’s Grace and the Helpless Woman: Ruth, Charila, Sītā,” Oxford University Press, 1999.',
  url: 'https://academic.oup.com/book/49706/chapter/422506439',
  note: 'Una delle letture che collocano il libro in contesto post-esilico; usata come ipotesi critica, non come datazione certa.',
})
const MOAB = source('primary', 'Stele di Mesha · Louvre AO 5066', {
  citation: 'Stèle de Mesha, Musée du Louvre, AO 5066, IX secolo a.C.',
  url: 'https://collections.louvre.fr/ark:/53355/cl010120339',
  note: 'Fonte primaria per Moab nell’età del Ferro; non testimonianza delle vicende di Rut.',
})
const EDITORIAL = source('editorial', 'Biblia Fontes · ricostruzione didattica', {note: 'Localizzazione e area servono all’orientamento e non trasformano la novella in cronaca.'})

export const ruthSeed = {
  datasetId: 'rut-history',
  title: 'Rut · storia intorno al testo',
  subtitle: 'Moab e Betlemme, diritto familiare, pratiche agrarie, memoria davidica e dibattito sulla datazione del libro vengono esplorati senza confondere mondo narrato e composizione.',
  bookRef: 'libro-rut',
  defaultRange: {start: -1000, end: -350},
  quickYears: [-900, -800, -700, -586, -539, -450, -400],
  sharedExternalEntityIds: ['moab-kingdom'],
  scenarios: [
    {id: 'iron-age-moab-judah', start: -1000, end: -700, title: 'Moab e Giuda nell’età del Ferro', summary: 'Moab e Giuda sono realtà storiche del Levante dell’età del Ferro. Il racconto di Rut usa questo mondo come scenario, ma non è datato automaticamente a quel periodo.'},
    {id: 'davidic-memory-ruth', start: -900, end: -600, title: 'Memoria davidica e genealogia', summary: 'La genealogia finale collega Rut a Davide; alcuni modelli interpretano il libro in relazione alla legittimazione o memoria della dinastia davidica.'},
    {id: 'postexilic-identity-ruth', start: -550, end: -350, title: 'Identità e appartenenza in età persiana', summary: 'Altri modelli leggono Rut come racconto post-esilico capace di problematizzare confini etnici e matrimoniali attraverso la figura della moabita Rut.'},
  ],
  entities: [
    {id: 'bethlehem-ruth', type: 'city', label: 'Betlemme', summary: 'Piccolo centro di Giuda e principale scenario del racconto. La Betlemme storica fornisce il quadro geografico, mentre la vicenda di Rut resta una narrazione letteraria.', temporal: {start: -1000, end: -500, precision: 'range'}, spatial: {point: {lat: 31.705, lng: 35.202}, region: 'Giuda'}, epistemicStatus: 'attested', biblicalRefs: [ref('Rut 1–4', 'rut', 1, 4)], relations: [{targetId: 'ruth-narrative', kind: 'context', label: 'Scenario principale della novella'}, {targetId: 'davidic-genealogy-ruth', kind: 'memory', label: 'Luogo associato alla memoria davidica'}], sources: [RUTH_NARRATIVE]},
    {id: 'ruth-narrative', type: 'text', label: 'Rut · novella familiare', summary: 'La vicenda di Noemi, Rut e Booz è una narrazione costruita con grande cura letteraria. Historical Explorer distingue la coerenza del mondo sociale narrato dalla questione della data di composizione.', temporal: {precision: 'unknown'}, spatial: {region: 'Moab e Betlemme nella narrazione'}, epistemicStatus: 'narrative', biblicalRefs: [ref('Rut 1–4', 'rut', 1, 4)], relations: [{targetId: 'moab-kingdom', kind: 'context', label: 'Moab come referente storico-culturale dello scenario'}, {targetId: 'bethlehem-ruth', kind: 'context', label: 'Betlemme come centro della vicenda'}, {targetId: 'ruth-formation', kind: 'composition', label: 'Narrazione trasmessa nella forma letteraria del libro'}], sources: [RUTH_OBO, RUTH_NARRATIVE]},
    {id: 'gleaning-ruth', type: 'practice', label: 'Spigolatura e raccolta nei campi', summary: 'Rut 2 presuppone pratiche agrarie e norme di protezione dei vulnerabili. Il racconto le integra nella trama senza permettere di datarlo con precisione sulla sola base dell’istituto.', temporal: {precision: 'unknown'}, spatial: {region: 'Campagna di Betlemme nella narrazione'}, epistemicStatus: 'comparandum', biblicalRefs: [ref('Rut 2', 'rut', 2)], relations: [{targetId: 'ruth-narrative', kind: 'context', label: 'Pratica sociale che struttura l’incontro fra Rut e Booz'}], sources: [RUTH_OBO]},
    {id: 'goel-ruth', type: 'institution', label: 'Go’el · riscatto familiare', summary: 'La funzione del “redentore” familiare e la trattativa alla porta in Rut 4 combinano istituti di parentela, proprietà ed eredità. Il rapporto con altre norme bibliche è complesso e non equivale a un codice giuridico applicato uniformemente.', temporal: {precision: 'unknown'}, spatial: {region: 'Betlemme nella narrazione'}, epistemicStatus: 'comparandum', biblicalRefs: [ref('Rut 3–4', 'rut', 3, 4)], relations: [{targetId: 'ruth-narrative', kind: 'context', label: 'Meccanismo giuridico-narrativo della soluzione familiare'}], sources: [RUTH_OBO, RUTH_NARRATIVE]},
    {id: 'ruth-moabite-identity', type: 'person', label: 'Rut la moabita', summary: 'L’identità moabita di Rut è ripetutamente enfatizzata dal testo e diventa centrale nella riflessione su appartenenza, lealtà e genealogia davidica. La figura è trattata come personaggio narrativo.', temporal: {precision: 'unknown'}, spatial: {region: 'Moab → Betlemme nella narrazione'}, epistemicStatus: 'narrative', biblicalRefs: [ref('Rut 1–4', 'rut', 1, 4)], relations: [{targetId: 'moab-kingdom', kind: 'memory', label: 'Identità narrativa associata a Moab'}, {targetId: 'davidic-genealogy-ruth', kind: 'memory', label: 'Inserita nella genealogia di Davide'}], sources: [RUTH_OBO, RUTH_NARRATIVE, MOAB]},
    {id: 'davidic-genealogy-ruth', type: 'text', label: 'Genealogia di Davide', summary: 'Rut 4,18–22 collega Perez, Booz, Obed, Iesse e Davide. La funzione e l’età della genealogia sono elementi centrali nel dibattito sulla finalità del libro.', temporal: {precision: 'unknown'}, spatial: {region: 'Giuda nella memoria genealogica'}, epistemicStatus: 'memory', biblicalRefs: [ref('Rut 4,18–22', 'rut', 4, 4, 18, 22)], relations: [{targetId: 'ruth-moabite-identity', kind: 'memory', label: 'Integra Rut nella memoria davidica'}, {targetId: 'ruth-formation', kind: 'composition', label: 'Elemento chiave per le ipotesi sulla funzione del libro'}], sources: [RUTH_OBO, RUTH_NARRATIVE]},
    {id: 'ruth-formation', type: 'redaction', label: 'Datazione e funzione del libro di Rut', summary: 'Le principali proposte vanno da un contesto vicino alla monarchia davidica a una composizione post-esilica. Il dataset mantiene entrambe le famiglie di modelli come ipotesi concorrenti.', temporal: {start: -900, end: -350, precision: 'range'}, spatial: {region: 'Giuda / Yehud · contesto compositivo discusso'}, epistemicStatus: 'debated', biblicalRefs: [ref('Rut 1–4', 'rut', 1, 4)], relations: [{targetId: 'davidic-genealogy-ruth', kind: 'composition', label: 'Genealogia usata diversamente nei modelli di datazione'}, {targetId: 'ruth-moabite-identity', kind: 'composition', label: 'Identità moabita centrale nelle letture post-esiliche'}], sources: [RUTH_OBO, POSTEXILIC]},
  ],
  areas: [
    {id: 'bethlehem-ruth-context', entityId: 'bethlehem-ruth', label: 'Betlemme · area di orientamento', temporal: {start: -1000, end: -500}, confidence: 'illustrative', note: 'Marker territoriale didattico intorno a Betlemme, non ricostruzione del territorio cittadino antico.', points: [[35.13,31.76],[35.27,31.76],[35.27,31.65],[35.13,31.65],[35.13,31.76]], sources: [EDITORIAL]},
  ],
  noteEditoriali: 'Rut separa il mondo sociale narrato dalla data di composizione e rende visibili modelli alternativi sulla funzione del libro.',
}
