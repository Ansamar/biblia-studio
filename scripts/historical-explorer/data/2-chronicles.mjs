import {biblicalRef as ref, source} from '../lib/build-dataset.mjs'

const CHRON = source('bibliography', 'First and Second Chronicles · Oxford Bibliographies', {
  citation: '“First and Second Chronicles,” Oxford Bibliographies in Biblical Studies.',
  url: 'https://academic.oup.com/reference/62341/reference-article-abstract/554102424',
})
const CHRON_HISTORY = source('secondary', 'Ralph W. Klein · Chronicles, Ezra, Nehemiah', {
  citation: 'Ralph W. Klein, “The Rise and Fall of the So-Called Chronicler’s History,” Oxford Handbook, 2020.',
  url: 'https://academic.oup.com/edited-volume/34226/chapter-abstract/290219077',
})
const PERSIAN = source('secondary', 'Mary Joan Winn Leith · Persian-period Yehud', {
  citation: 'Mary Joan Winn Leith, “New Perspectives on the Return from Exile and Persian-Period Yehud,” Oxford Handbook, 2020.',
  url: 'https://academic.oup.com/edited-volume/34226/chapter-abstract/290215432',
})
const RELIGION = source('secondary', 'Melody D. Knowles · Yahwistic Religion in the Persian Period', {
  citation: 'Melody D. Knowles, “Yahwistic Religion in the Persian Period,” Oxford Handbook, 2020.',
  url: 'https://academic.oup.com/edited-volume/34226/chapter-abstract/290217304',
})
const EDITORIAL = source('editorial', 'Biblia Fontes · ricostruzione didattica', {note: 'Le aree sono strumenti di orientamento, non confini sincronici certi.'})

export const secondChroniclesSeed = {
  datasetId: '2-cronache-history',
  title: '2 Cronache · storia intorno al testo',
  subtitle: 'Salomone, tempio, re di Giuda, riforme, caduta di Gerusalemme e decreto di Ciro vengono riletti dalla prospettiva cultuale e comunitaria di Cronache.',
  bookRef: 'libro-2-cronache',
  defaultRange: {start: -550, end: -250},
  quickYears: [-539, -500, -450, -400, -350, -300],
  sharedEntities: [
    {id: 'solomon-memory'},
    {id: 'jerusalem-temple-first'},
    {id: 'kingdom-judah'},
    {id: 'achaemenid-empire-history'},
    {id: 'yehud-persian-province'},
    {id: 'levites-chronicles'},
  ],
  scenarios: [
    {id: 'postexilic-temple-memory', start: -539, end: -450, title: 'Secondo Tempio e memoria della monarchia', summary: 'La comunità post-esilica rilegge Salomone, il tempio e i re di Giuda alla luce di una realtà senza re davidico autonomo.'},
    {id: 'chronistic-reforms', start: -450, end: -350, title: 'Riforme e culto come chiave della storia', summary: 'Cronache amplifica o rimodella episodi di riforma per costruire una teologia della fedeltà cultuale, del tempio e della retribuzione.'},
    {id: 'chronicles-cyrus-frame', start: -400, end: -250, title: 'Dalla distruzione al ritorno', summary: 'Il finale con Ciro collega la memoria della monarchia alla possibilità di ricostruzione cultuale e comunitaria nel quadro persiano.'},
  ],
  entities: [
    {id: 'solomon-chronicles-memory', type: 'text', label: 'Salomone nella riscrittura di Cronache', summary: '2Cr 1–9 rielabora la figura di Salomone concentrandosi su sapienza, tempio e culto e riducendo aspetti problematici presenti in Re.', temporal: {start: -450, end: -300, precision: 'range'}, spatial: {region: 'Gerusalemme nella memoria cronistica'}, epistemicStatus: 'memory', biblicalRefs: [ref('2Cr 1–9', '2-cronache', 1, 9)], relations: [{targetId: 'solomon-memory', kind: 'memory', label: 'Rilegge la tradizione salomonica di Re'}, {targetId: 'jerusalem-temple-first', kind: 'memory', label: 'Tempio come centro della figura di Salomone'}, {targetId: 'second-chronicles-formation', kind: 'composition', label: 'Parte della teologia cronistica'}], sources: [CHRON]},
    {id: 'judah-only-history-chronicles', type: 'text', label: 'Giuda come asse della storia monarchica', summary: 'Dopo la divisione del regno, 2 Cronache concentra la narrazione quasi interamente su Giuda e Gerusalemme, offrendo una selezione differente da Re.', temporal: {start: -450, end: -300, precision: 'range'}, spatial: {region: 'Giuda e Gerusalemme nella memoria storica'}, epistemicStatus: 'memory', biblicalRefs: [ref('2Cr 10–36', '2-cronache', 10, 36)], relations: [{targetId: 'kingdom-judah', kind: 'memory', label: 'Rilegge la storia della monarchia di Giuda'}, {targetId: 'reform-memory-chronicles', kind: 'composition', label: 'Organizza la storia attorno a culto e riforma'}], sources: [CHRON, CHRON_HISTORY]},
    {id: 'reform-memory-chronicles', type: 'text', label: 'Riforme cultuali nella storiografia cronistica', summary: 'Asa, Giosafat, Ezechia e Giosia ricevono particolare attenzione come riformatori. La presentazione cronistica rilegge e amplia tradizioni precedenti per una comunità centrata sul tempio.', temporal: {start: -450, end: -300, precision: 'range'}, spatial: {region: 'Gerusalemme e Giuda nella prospettiva del testo'}, epistemicStatus: 'memory', biblicalRefs: [ref('2Cr 14–35', '2-cronache', 14, 35)], relations: [{targetId: 'levites-chronicles', kind: 'composition', label: 'I Leviti assumono ruoli ampliati nelle riforme'}, {targetId: 'second-chronicles-formation', kind: 'composition', label: 'Tema strutturale della rilettura del passato'}], sources: [CHRON, RELIGION]},
    {id: 'temple-retribution-chronicles', type: 'text', label: 'Tempio e retribuzione nella teologia di Cronache', summary: 'Fedeltà, ricerca di YHWH, culto corretto, prosperità e catastrofe sono strettamente collegati nella narrazione. È una costruzione teologica della storia, non una causalità storica descrittiva.', temporal: {start: -450, end: -300, precision: 'range'}, spatial: {region: 'Gerusalemme nella teologia del libro'}, epistemicStatus: 'narrative', biblicalRefs: [ref('2Cr 1–36', '2-cronache', 1, 36)], relations: [{targetId: 'jerusalem-temple-first', kind: 'memory', label: 'Tempio come centro simbolico'}, {targetId: 'reform-memory-chronicles', kind: 'composition', label: 'Le riforme esprimono la teologia della fedeltà'}], sources: [CHRON]},
    {id: 'exile-chronicles-memory', type: 'event', label: 'Esilio e distruzione nella rilettura cronistica', summary: '2Cr 36 riprende la caduta di Gerusalemme e l’esilio come esito della storia monarchica, reinterpretandoli entro il proprio schema teologico.', temporal: {precision: 'unknown'}, spatial: {region: 'Gerusalemme e Babilonia nella memoria del testo'}, epistemicStatus: 'memory', biblicalRefs: [ref('2Cr 36', '2-cronache', 36)], relations: [{targetId: 'second-chronicles-formation', kind: 'composition', label: 'Catastrofe usata come chiusura teologica'}, {targetId: 'cyrus-ending-chronicles', kind: 'memory', label: 'Passaggio narrativo verso il ritorno'}], sources: [CHRON, CHRON_HISTORY]},
    {id: 'cyrus-ending-chronicles', type: 'event', label: 'Ciro e il finale di Cronache', summary: 'Il libro termina con il decreto di Ciro e l’invito a salire a Gerusalemme. L’evento è collocato nel quadro reale dell’impero persiano, ma la formulazione serve anche alla chiusura letteraria del libro.', temporal: {start: -539, end: -538, precision: 'range'}, spatial: {region: 'Babilonia / Yehud'}, epistemicStatus: 'probable', biblicalRefs: [ref('2Cr 36', '2-cronache', 36)], relations: [{targetId: 'achaemenid-empire-history', kind: 'context', label: 'Ciro come sovrano achemenide'}, {targetId: 'yehud-persian-province', kind: 'context', label: 'Apre verso la restaurazione di Gerusalemme'}, {targetId: 'exile-chronicles-memory', kind: 'memory', label: 'Rovescia narrativamente la catastrofe'}], sources: [PERSIAN, CHRON]},
    {id: 'second-chronicles-formation', type: 'redaction', label: 'Formazione di 2 Cronache', summary: 'La composizione viene collocata in età persiana o ellenistica iniziale, con uso di Samuele-Re, genealogie, tradizioni e materiali propri. Il rapporto con Esdra-Neemia è oggi generalmente trattato senza postulare un unico autore.', temporal: {start: -450, end: -250, precision: 'range'}, spatial: {region: 'Gerusalemme / Yehud e ambienti scribali'}, epistemicStatus: 'debated', biblicalRefs: [ref('2Cr 1–36', '2-cronache', 1, 36)], relations: [{targetId: 'judah-only-history-chronicles', kind: 'composition', label: 'Riorganizza la memoria monarchica di Giuda'}, {targetId: 'cyrus-ending-chronicles', kind: 'composition', label: 'Chiusura persiana del libro'}], sources: [CHRON, CHRON_HISTORY]},
  ],
  areas: [
    {id: 'yehud-2chronicles-area', entityId: 'yehud-persian-province', label: 'Yehud · contesto della rilettura cronistica', temporal: {start: -500, end: -332}, confidence: 'approximate', note: 'Area orientativa del contesto post-esilico in cui la memoria monarchica viene rielaborata.', points: [[34.8,32.0],[35.55,31.95],[35.45,30.9],[34.9,30.9],[34.8,32.0]], sources: [EDITORIAL, PERSIAN]},
  ],
  noteEditoriali: '2 Cronache viene trattato come riscrittura post-esilica di una storia già trasmessa, non come duplicato meno affidabile o più affidabile di Re.'
}
