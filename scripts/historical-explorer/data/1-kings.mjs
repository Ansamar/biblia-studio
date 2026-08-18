import {biblicalRef as ref, source} from '../lib/build-dataset.mjs'

const KINGS = source('secondary', 'Oxford Handbook of the Books of Kings', {
  citation: 'Steven L. McKenzie and Matthieu Richelle (eds.), The Oxford Handbook of the Books of Kings, Oxford University Press, 2024.',
  url: 'https://academic.oup.com/edited-volume/57516',
  note: 'Quadro generale per storia, archeologia, testualità e formazione di 1–2 Re.',
})
const ISRAEL_JUDAH = source('secondary', 'André Lemaire · Israel and Judah', {
  citation: 'André Lemaire, “Israel and Judah (c.931–587 BCE),” in The Oxford History of the Holy Land, 2023.',
  url: 'https://academic.oup.com/book/45676/chapter-abstract/398059551',
})
const MESHA = source('primary', 'Stele di Mesha · Louvre AO 5066', {
  citation: 'Stèle de Mesha, Musée du Louvre, AO 5066, IX secolo a.C.',
  url: 'https://collections.louvre.fr/ark:/53355/cl010120339',
  note: 'Fonte moabita per Omri/Israele e la riconquista moabita; non conferma automaticamente la versione biblica.',
})
const EDITORIAL = source('editorial', 'Biblia Fontes · ricostruzione didattica', {
  note: 'Le aree sono inviluppi orientativi e non confini politici certi.',
})

export const firstKingsSeed = {
  datasetId: '1-re-history',
  title: '1 Re · storia intorno al testo',
  subtitle: 'Salomone, tempio, divisione monarchica, Omridi, Samaria, Moab e tradizioni profetiche vengono distinti fra memoria dinastica, attestazioni extrabibliche e costruzione storiografica.',
  bookRef: 'libro-1-re',
  defaultRange: {start: -1000, end: -450},
  quickYears: [-970, -930, -880, -850, -841, -800, -586, -500],
  sharedEntities: [
    {id: 'david-samuel'},
    {id: 'moab-kingdom'},
  ],
  scenarios: [
    {id: 'solomonic-memory', start: -970, end: -930, title: 'Memoria salomonica', summary: '1 Re 1–11 costruisce il passaggio da Davide a Salomone, il tempio e una monarchia estesa. Historical Explorer distingue memoria dinastica, realtà istituzionali e scala storica ricostruibile.'},
    {id: 'divided-kingdoms', start: -930, end: -885, title: 'Israele e Giuda come regni distinti', summary: 'Nel X–IX secolo emergono due monarchie con traiettorie politiche differenti. La narrazione teologica di 1 Re viene confrontata con archeologia ed epigrafia.'},
    {id: 'omride-israel', start: -885, end: -841, title: 'Israele omride e Samaria', summary: 'La dinastia di Omri segna una forte fase statale nel regno settentrionale, attestata anche da fonti extrabibliche.'},
    {id: 'kings-redaction', start: -650, end: -450, title: 'Rielaborazione storiografica', summary: 'Le memorie monarchiche vengono organizzate secondo criteri teologici e deuteronomistici in più fasi compositive.'},
  ],
  entities: [
    {id: 'solomon-memory', type: 'person', label: 'Salomone · memoria regale', summary: 'Salomone è il sovrano centrale di 1 Re 1–11. Historical Explorer distingue la figura letteraria dalla ricostruzione storica della monarchia del X secolo.', temporal: {start: -970, end: -930, precision: 'range'}, spatial: {point: {lat: 31.778, lng: 35.235}, region: 'Gerusalemme e Giuda nella tradizione'}, epistemicStatus: 'probable', biblicalRefs: [ref('1Re 1–11', '1-re', 1, 11)], relations: [{targetId: 'david-samuel', kind: 'memory', label: 'Successione davidica nella narrazione'}, {targetId: 'jerusalem-temple-first', kind: 'memory', label: 'Costruttore del tempio nella tradizione'}, {targetId: 'united-monarchy-kings', kind: 'memory', label: 'Figura centrale della monarchia unita narrata'}], sources: [KINGS, ISRAEL_JUDAH]},
    {id: 'jerusalem-temple-first', type: 'institution', label: 'Tempio di Gerusalemme · prima fase monarchica', summary: '1 Re 5–8 attribuisce a Salomone la costruzione del tempio. L’esistenza di un santuario monarchico a Gerusalemme è storicamente plausibile, mentre cronologia, forma e scala del complesso restano oggetto di ricostruzione.', temporal: {start: -950, end: -586, precision: 'range'}, spatial: {point: {lat: 31.778, lng: 35.235}, region: 'Gerusalemme'}, epistemicStatus: 'probable', biblicalRefs: [ref('1Re 5–8', '1-re', 5, 8)], relations: [{targetId: 'solomon-memory', kind: 'memory', label: 'Attribuito a Salomone dal racconto'}, {targetId: 'kingdom-judah', kind: 'context', label: 'Santuario centrale della monarchia di Giuda'}], sources: [KINGS, ISRAEL_JUDAH]},
    {id: 'united-monarchy-kings', type: 'institution', label: 'Monarchia unita · modello storico e memoria', summary: 'La rappresentazione di un vasto regno unitario sotto Davide e Salomone è oggetto di dibattito. Il dataset separa un nucleo monarchico plausibile dalla scala imperiale narrata.', temporal: {start: -1000, end: -930, precision: 'range'}, spatial: {region: 'Giuda e Israele nella memoria monarchica'}, epistemicStatus: 'debated', biblicalRefs: [ref('1Re 1–11', '1-re', 1, 11)], relations: [{targetId: 'solomon-memory', kind: 'memory', label: 'Salomone come vertice della memoria unitaria'}, {targetId: 'kingdom-israel', kind: 'context', label: 'Successiva monarchia settentrionale'}, {targetId: 'kingdom-judah', kind: 'context', label: 'Successiva monarchia meridionale'}], sources: [KINGS, ISRAEL_JUDAH]},
    {id: 'kingdom-israel', type: 'institution', label: 'Regno d’Israele', summary: 'Monarchia del nord attestata da archeologia ed epigrafia nel Ferro II, con dinastie diverse e capitale stabile a Samaria dall’epoca di Omri.', temporal: {start: -930, end: -722, precision: 'range'}, spatial: {point: {lat: 32.28, lng: 35.19}, region: 'Altopiani centrali e nord del Levante meridionale'}, epistemicStatus: 'attested', biblicalRefs: [ref('1Re 12–22', '1-re', 12, 22)], relations: [{targetId: 'samaria-capital', kind: 'context', label: 'Samaria come capitale dal IX secolo'}, {targetId: 'omride-dynasty', kind: 'context', label: 'Forte consolidamento sotto gli Omridi'}], sources: [ISRAEL_JUDAH, KINGS]},
    {id: 'kingdom-judah', type: 'institution', label: 'Regno di Giuda', summary: 'Monarchia meridionale con capitale Gerusalemme, attestata come entità politica del Ferro II e successivamente coinvolta nelle sfere di Israele, Assiria, Egitto e Babilonia.', temporal: {start: -930, end: -586, precision: 'range'}, spatial: {point: {lat: 31.78, lng: 35.23}, region: 'Altopiani meridionali'}, epistemicStatus: 'attested', biblicalRefs: [ref('1Re 12–22', '1-re', 12, 22)], relations: [{targetId: 'jerusalem-temple-first', kind: 'context', label: 'Gerusalemme e tempio come centro dinastico-cultuale'}], sources: [ISRAEL_JUDAH, KINGS]},
    {id: 'samaria-capital', type: 'city', label: 'Samaria', summary: 'Capitale fondata da Omri secondo 1 Re 16 e importante centro politico del regno settentrionale, ampiamente attestato archeologicamente.', temporal: {start: -880, end: -722, precision: 'range'}, spatial: {point: {lat: 32.276, lng: 35.19}, region: 'Samaria'}, epistemicStatus: 'attested', biblicalRefs: [ref('1Re 16–22', '1-re', 16, 22)], relations: [{targetId: 'omride-dynasty', kind: 'context', label: 'Capitale degli Omridi'}, {targetId: 'kingdom-israel', kind: 'context', label: 'Capitale del regno settentrionale'}], sources: [ISRAEL_JUDAH, KINGS]},
    {id: 'omride-dynasty', type: 'institution', label: 'Dinastia di Omri', summary: 'Dinastia del IX secolo a.C. ben inserita nel sistema politico levantino. Fonti extrabibliche ricordano “casa di Omri” e il dominio israelita su Moab.', temporal: {start: -885, end: -841, precision: 'range'}, spatial: {point: {lat: 32.276, lng: 35.19}, region: 'Regno d’Israele'}, epistemicStatus: 'attested', biblicalRefs: [ref('1Re 16–22', '1-re', 16, 22)], relations: [{targetId: 'samaria-capital', kind: 'context', label: 'Samaria come centro dinastico'}, {targetId: 'mesha-stele-kings', kind: 'interaction', label: 'Mesha ricorda il dominio della casa di Omri su Moab'}, {targetId: 'moab-kingdom', kind: 'interaction', label: 'Rapporto politico conflittuale con Moab'}], sources: [MESHA, ISRAEL_JUDAH, KINGS]},
    {id: 'mesha-stele-kings', type: 'witness', label: 'Stele di Mesha · Omri e Moab', summary: 'La stele di Mesha attesta il re moabita, il dominio di Omri su Moab e una successiva riconquista. È una fonte primaria contemporanea e ideologicamente costruita.', temporal: {start: -830, end: -805, precision: 'range'}, spatial: {point: {lat: 31.5, lng: 35.74}, region: 'Dibon / Moab'}, epistemicStatus: 'attested', biblicalRefs: [ref('1Re 16', '1-re', 16)], relations: [{targetId: 'omride-dynasty', kind: 'context', label: 'Menziona la casa/dominio di Omri'}, {targetId: 'moab-kingdom', kind: 'context', label: 'Fonte primaria moabita'}], sources: [MESHA]},
    {id: 'elijah-traditions', type: 'text', label: 'Tradizioni di Elia', summary: '1 Re 17–19 e 21 conserva cicli profetici su Elia, Achab e la casa di Omri. Il valore storico delle singole scene è distinto dalla loro funzione teologica e letteraria.', temporal: {precision: 'unknown'}, spatial: {region: 'Israele settentrionale nella narrazione'}, epistemicStatus: 'memory', biblicalRefs: [ref('1Re 17–19', '1-re', 17, 19), ref('1Re 21', '1-re', 21)], relations: [{targetId: 'omride-dynasty', kind: 'memory', label: 'Conflitto profetico con la casa di Omri'}, {targetId: 'first-kings-formation', kind: 'composition', label: 'Integrate nella forma letteraria di Re'}], sources: [KINGS]},
    {id: 'first-kings-formation', type: 'redaction', label: 'Formazione di 1 Re', summary: 'Annali, tradizioni profetiche, memorie dinastiche e valutazioni cultuali sono organizzati in una costruzione storiografica con forti criteri deuteronomistici.', temporal: {start: -650, end: -450, precision: 'range'}, spatial: {region: 'Giuda / esilio / periodo persiano · modello plurifase'}, epistemicStatus: 'debated', biblicalRefs: [ref('1Re 1–22', '1-re', 1, 22)], relations: [{targetId: 'elijah-traditions', kind: 'composition', label: 'Integra tradizioni profetiche'}, {targetId: 'kingdom-israel', kind: 'composition', label: 'Interpreta teologicamente la storia del nord'}, {targetId: 'kingdom-judah', kind: 'composition', label: 'Interpreta teologicamente la storia di Giuda'}], sources: [KINGS]},
  ],
  areas: [
    {id: 'israel-kingdom-core', entityId: 'kingdom-israel', label: 'Regno d’Israele · area didattica', temporal: {start: -880, end: -800}, confidence: 'approximate', note: 'Inquadramento orientativo del nucleo israelita del IX secolo; non confine stabile.', points: [[34.75,33.1],[35.65,33.0],[35.55,31.8],[34.85,31.7],[34.75,33.1]], sources: [EDITORIAL, ISRAEL_JUDAH]},
    {id: 'judah-kingdom-core', entityId: 'kingdom-judah', label: 'Giuda · area didattica', temporal: {start: -900, end: -700}, confidence: 'approximate', note: 'Area di orientamento del nucleo giudaico; non frontiera politica fissa.', points: [[34.75,31.9],[35.55,31.9],[35.45,30.8],[34.8,30.8],[34.75,31.9]], sources: [EDITORIAL, ISRAEL_JUDAH]},
  ],
  noteEditoriali: '1 Re distingue memoria salomonica, realtà dei regni di Israele e Giuda, testimonianze extrabibliche e costruzione deuteronomistica.'
}
