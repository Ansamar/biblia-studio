import {biblicalRef as ref, source} from '../lib/build-dataset.mjs'

const CHRON = source('bibliography', 'First and Second Chronicles · Oxford Bibliographies', {
  citation: '“First and Second Chronicles,” Oxford Bibliographies in Biblical Studies.',
  url: 'https://academic.oup.com/reference/62341/reference-article-abstract/554102424',
  note: 'Per datazione, composizione, storiografia e rapporto con Esdra-Neemia.',
})
const PERSIAN = source('secondary', 'Mary Joan Winn Leith · Persian-period Yehud', {
  citation: 'Mary Joan Winn Leith, “New Perspectives on the Return from Exile and Persian-Period Yehud,” Oxford Handbook, 2020.',
  url: 'https://academic.oup.com/edited-volume/34226/chapter-abstract/290215432',
})
const LEVITES = source('secondary', 'Mark Leuchter · Levites in the Persian Period', {
  citation: 'Mark Leuchter, “From Scribes to Sages: The Levites in the Persian Period,” Oxford University Press, 2017.',
  url: 'https://academic.oup.com/book/8514/chapter-abstract/154374360',
})
const CHRON_HISTORY = source('secondary', 'Ralph W. Klein · Chronicles, Ezra, Nehemiah', {
  citation: 'Ralph W. Klein, “The Rise and Fall of the So-Called Chronicler’s History,” Oxford Handbook, 2020.',
  url: 'https://academic.oup.com/edited-volume/34226/chapter-abstract/290219077',
})
const EDITORIAL = source('editorial', 'Biblia Fontes · ricostruzione didattica', {note: 'Area post-esilica orientativa, non frontiera amministrativa precisa.'})

export const firstChroniclesSeed = {
  datasetId: '1-cronache-history',
  title: '1 Cronache · storia intorno al testo',
  subtitle: 'Genealogie, “tutto Israele”, Davide, Leviti e organizzazione del tempio sono esplorati come riscrittura del passato monarchico da un contesto post-esilico.',
  bookRef: 'libro-1-cronache',
  defaultRange: {start: -550, end: -250},
  quickYears: [-539, -500, -450, -400, -350, -300],
  sharedEntities: [{id: 'david-samuel'}, {id: 'kingdom-judah'}],
  scenarios: [
    {id: 'persian-yehud', start: -539, end: -400, title: 'Yehud nell’impero persiano', summary: 'Gerusalemme e Yehud vivono senza monarchia davidica autonoma; tempio, genealogia, testo e memoria diventano strumenti centrali di identità.'},
    {id: 'late-persian-early-hellenistic', start: -400, end: -300, title: 'Tarda età persiana / primo ellenismo', summary: 'Una delle principali finestre proposte per la composizione di Cronache, pur con datazione ancora discussa.'},
    {id: 'chronistic-rewriting', start: -450, end: -250, title: 'Riscrivere la monarchia', summary: 'Il passato di Davide e Israele viene riorganizzato per parlare a una comunità post-monarchica centrata su Gerusalemme, culto e appartenenza.'},
  ],
  entities: [
    {id: 'achaemenid-empire-history', type: 'empire', label: 'Impero achemenide', summary: 'Impero persiano che domina il Levante dal 539 al 332 a.C. circa e costituisce il grande quadro politico di Yehud e della prima fase del Secondo Tempio.', temporal: {start: -539, end: -332, precision: 'range'}, spatial: {point: {lat: 32.19, lng: 48.25}, region: 'Impero persiano dal Mediterraneo all’Iran'}, epistemicStatus: 'attested', biblicalRefs: [], relations: [{targetId: 'yehud-persian-province', kind: 'context', label: 'Yehud come provincia/comunità imperiale'}], sources: [PERSIAN]},
    {id: 'yehud-persian-province', type: 'region', label: 'Yehud · provincia persiana', summary: 'Provincia e comunità giudaica post-esilica centrata su Gerusalemme, inserita nel sistema achemenide e con forti connessioni diasporiche.', temporal: {start: -539, end: -332, precision: 'range'}, spatial: {point: {lat: 31.78, lng: 35.2}, region: 'Giudea persiana'}, epistemicStatus: 'attested', biblicalRefs: [ref('1Cr 1–29', '1-cronache', 1, 29)], relations: [{targetId: 'achaemenid-empire-history', kind: 'context', label: 'Quadro imperiale'}, {targetId: 'chronicles-identity-all-israel', kind: 'composition', label: 'Contesto della costruzione di “tutto Israele”'}], sources: [PERSIAN, CHRON]},
    {id: 'chronicles-genealogies', type: 'text', label: 'Genealogie di 1 Cronache', summary: '1Cr 1–9 ricostruisce una continuità da Adamo alla comunità post-esilica. Le genealogie sono strumenti di memoria, appartenenza e organizzazione sociale, non semplici registri anagrafici.', temporal: {start: -450, end: -300, precision: 'range'}, spatial: {region: 'Yehud / diaspora nella prospettiva del testo'}, epistemicStatus: 'debated', biblicalRefs: [ref('1Cr 1–9', '1-cronache', 1, 9)], relations: [{targetId: 'yehud-persian-province', kind: 'context', label: 'Rispondono a problemi di appartenenza post-esilica'}, {targetId: 'chronicles-identity-all-israel', kind: 'composition', label: 'Costruiscono una geografia genealogica di Israele'}], sources: [CHRON, PERSIAN]},
    {id: 'chronicles-identity-all-israel', type: 'institution', label: '“Tutto Israele” · identità ricostruita', summary: 'Cronache usa genealogie e narrazione per includere nord e sud entro una memoria di Israele centrata però su Gerusalemme, tempio e dinastia davidica.', temporal: {start: -450, end: -300, precision: 'range'}, spatial: {region: 'Yehud e memoria dell’intero Israele'}, epistemicStatus: 'debated', biblicalRefs: [ref('1Cr 1–29', '1-cronache', 1, 29)], relations: [{targetId: 'chronicles-genealogies', kind: 'composition', label: 'Genealogie come strumento identitario'}, {targetId: 'david-chronicles-memory', kind: 'memory', label: 'Davide come figura unificante'}], sources: [CHRON, CHRON_HISTORY]},
    {id: 'david-chronicles-memory', type: 'text', label: 'Davide riscritto da Cronache', summary: '1 Cronache seleziona e riformula la memoria di Davide, accentuandone il ruolo cultuale, liturgico e preparatorio del tempio e attenuando altri aspetti della tradizione di Samuele.', temporal: {start: -450, end: -300, precision: 'range'}, spatial: {region: 'Gerusalemme nella memoria cronistica'}, epistemicStatus: 'memory', biblicalRefs: [ref('1Cr 10–29', '1-cronache', 10, 29)], relations: [{targetId: 'david-samuel', kind: 'memory', label: 'Rielabora la tradizione davidica di Samuele'}, {targetId: 'levites-chronicles', kind: 'composition', label: 'Attribuisce a Davide un ruolo nell’ordinamento levitico'}], sources: [CHRON, CHRON_HISTORY]},
    {id: 'levites-chronicles', type: 'institution', label: 'Leviti nella visione cronistica', summary: 'Cronache attribuisce ai Leviti funzioni cultuali, musicali, amministrative e didattiche di grande rilievo. Questa immagine riflette interessi istituzionali post-esilici.', temporal: {start: -500, end: -300, precision: 'range'}, spatial: {region: 'Gerusalemme / Secondo Tempio'}, epistemicStatus: 'probable', biblicalRefs: [ref('1Cr 15–26', '1-cronache', 15, 26)], relations: [{targetId: 'david-chronicles-memory', kind: 'composition', label: 'Ruoli levitici retroproiettati nell’età davidica'}, {targetId: 'chronicles-temple-order', kind: 'context', label: 'Parte dell’ordinamento del culto'}], sources: [LEVITES, CHRON]},
    {id: 'chronicles-temple-order', type: 'institution', label: 'Ordine cultuale del tempio in 1 Cronache', summary: 'Sacerdoti, Leviti, cantori, portieri e tesorieri vengono organizzati nella memoria davidica. Il testo usa il passato per legittimare e spiegare istituzioni cultuali post-esiliche.', temporal: {start: -500, end: -300, precision: 'range'}, spatial: {point: {lat: 31.778, lng: 35.235}, region: 'Gerusalemme'}, epistemicStatus: 'probable', biblicalRefs: [ref('1Cr 22–29', '1-cronache', 22, 29)], relations: [{targetId: 'levites-chronicles', kind: 'context', label: 'Organizzazione levitica'}, {targetId: 'first-chronicles-formation', kind: 'composition', label: 'Tema centrale della riscrittura cronistica'}], sources: [CHRON, LEVITES]},
    {id: 'first-chronicles-formation', type: 'redaction', label: 'Formazione di 1 Cronache', summary: 'Cronache viene generalmente collocato nel periodo persiano o ellenistico iniziale, ma datazione e stratificazione restano discusse. Non viene più assunto automaticamente come parte di una singola “Storia del Cronista” con Esdra-Neemia.', temporal: {start: -450, end: -250, precision: 'range'}, spatial: {region: 'Gerusalemme / Yehud e ambienti scribali'}, epistemicStatus: 'debated', biblicalRefs: [ref('1Cr 1–29', '1-cronache', 1, 29)], relations: [{targetId: 'chronicles-genealogies', kind: 'composition', label: 'Integra genealogie e memoria storica'}, {targetId: 'david-chronicles-memory', kind: 'composition', label: 'Riscrive la memoria davidica'}], sources: [CHRON, CHRON_HISTORY]},
  ],
  areas: [
    {id: 'yehud-chronicles-area', entityId: 'yehud-persian-province', label: 'Yehud persiana · area didattica', temporal: {start: -500, end: -332}, confidence: 'approximate', note: 'Area di orientamento della provincia persiana di Yehud; limiti amministrativi variabili e discussi.', points: [[34.8,32.0],[35.55,31.95],[35.45,30.9],[34.9,30.9],[34.8,32.0]], sources: [EDITORIAL, PERSIAN]},
  ],
  noteEditoriali: '1 Cronache è visualizzato anzitutto come storiografia post-esilica che usa genealogia, culto e memoria davidica per costruire identità.'
}
