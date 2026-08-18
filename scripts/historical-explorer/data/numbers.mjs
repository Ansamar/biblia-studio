import {biblicalRef as ref, source} from '../lib/build-dataset.mjs'

const NUMBERS = source('bibliography', 'Book of Numbers · Oxford Bibliographies', {
  citation: '“Book of Numbers,” Oxford Bibliographies in Biblical Studies.',
  url: 'https://academic.oup.com/reference/62341/reference-article-abstract/554108251',
  note: 'Quadro su struttura, tradizioni del deserto, materiali sacerdotali, Moab e formazione post-esilica.',
})
const BALAAM = source('secondary', 'Ronald Hendel · Balaam e Deir ʿAlla', {
  citation: 'Ronald Hendel, “Israel Among the Nations,” in Remembering Abraham, Oxford University Press.',
  url: 'https://academic.oup.com/book/10720/chapter/158788296',
  note: 'Usato per il confronto fra Balaam biblico e l’iscrizione di Deir ʿAlla senza identificarli automaticamente.',
})
const BALAAM_OBO = source('bibliography', 'Balaam · Oxford Bibliographies', {
  citation: 'Won Lee, “Balaam,” Oxford Bibliographies in Biblical Studies, 2025.',
  url: 'https://academic.oup.com/reference/62341/reference-article-abstract/554094542',
})
const MESHA = source('primary', 'Stele di Mesha · Louvre AO 5066', {
  citation: 'Stèle de Mesha, Musée du Louvre, AO 5066, IX secolo a.C.',
  url: 'https://collections.louvre.fr/ark:/53355/cl010120339',
  locator: '34 linee in lingua moabita; Dibon/Diban; conflitto fra Moab e Israele.',
  note: 'Attesta il regno di Moab e il suo rapporto conflittuale con Israele nel IX secolo a.C.; non descrive gli eventi di Numeri.',
})
const PENTATEUCH = source('secondary', 'Thomas B. Dozeman · Formazione del Pentateuco', {
  citation: 'Thomas B. Dozeman, “The Pentateuch,” Oxford Research Encyclopedia of Religion, 2018.',
  url: 'https://academic.oup.com/edited-volume/62249/chapter-abstract/551402384',
})
const EDITORIAL_AREA = source('editorial', 'Biblia Fontes · area didattica Moab/Transgiordania', {
  note: 'Poligono di orientamento, non confine politico ricostruito con precisione.',
})

export const numbersSeed = {
  datasetId: 'numeri-history',
  title: 'Numeri · storia intorno al testo',
  subtitle: 'Deserto, Transgiordania, Moab, Balaam, memoria dell’itinerario e rielaborazione sacerdotale mantenuti distinti fra geografia narrativa, attestazioni extrabibliche e formazione letteraria.',
  bookRef: 'libro-numeri',
  defaultRange: {start: -1200, end: -350},
  quickYears: [-1200, -900, -830, -800, -586, -500, -400],
  scenarios: [
    {id: 'wilderness-memory', start: -1200, end: -900, title: 'Memorie di deserto e Transgiordania', summary: 'Il libro ambienta gran parte della narrazione nel deserto e termina nelle pianure di Moab. Historical Explorer tratta l’itinerario come geografia narrativa, non come percorso archeologicamente ricostruito.'},
    {id: 'moab-iron-age', start: -900, end: -750, title: 'Moab e Israele nell’età del Ferro', summary: 'Moab emerge come realtà politica attestata. La stele di Mesha documenta nel IX secolo conflitti e territori, offrendo un contesto reale distinto dalle scene narrative di Numeri.'},
    {id: 'deir-alla-balaam', start: -850, end: -750, title: 'Balaam nel mondo nord-occidentale semitico', summary: 'L’iscrizione di Deir ʿAlla attesta un veggente chiamato Balaam figlio di Beor, importante comparandum culturale per Nm 22–24 senza provare l’identità storica del personaggio biblico.'},
    {id: 'priestly-redaction', start: -550, end: -350, title: 'Rielaborazione sacerdotale e forma del libro', summary: 'Materiali narrativi, norme sacerdotali e cicli più antichi vengono integrati e rielaborati nel processo di formazione di Numeri e del Pentateuco.'},
  ],
  entities: [
    {id: 'moab-kingdom', type: 'people', label: 'Moab · regno e popolazione', summary: 'Moab è attestato come realtà politica e culturale della Transgiordania. La documentazione del IX secolo permette di distinguere il Moab storico dal ruolo narrativo che assume in Numeri.', temporal: {start: -950, end: -582, precision: 'range'}, spatial: {point: {lat: 31.5, lng: 35.75}, region: 'Altopiano a est del Mar Morto'}, epistemicStatus: 'attested', biblicalRefs: [ref('Nm 21–25', 'numeri', 21, 25)], relations: [{targetId: 'dibon', kind: 'context', label: 'Dibon come centro moabita attestato'}, {targetId: 'mesha-stele', kind: 'context', label: 'Stele di Mesha come testimonianza moabita'}], sources: [MESHA, NUMBERS]},
    {id: 'dibon', type: 'city', label: 'Dibon / Dhiban', summary: 'Centro moabita associato a Mesha e luogo di rinvenimento della sua stele. È un ancoraggio storico per il paesaggio della Transgiordania.', temporal: {start: -900, end: -700, precision: 'range'}, spatial: {point: {lat: 31.5, lng: 35.74}, region: 'Moab'}, epistemicStatus: 'attested', biblicalRefs: [ref('Nm 21,30', 'numeri', 21, 21, 30, 30)], relations: [{targetId: 'moab-kingdom', kind: 'context', label: 'Centro del regno di Moab'}, {targetId: 'mesha-stele', kind: 'context', label: 'Luogo di scoperta della stele'}], sources: [MESHA]},
    {id: 'mesha-stele', type: 'witness', label: 'Stele di Mesha', summary: 'Iscrizione reale moabita del IX secolo a.C. che racconta la ripresa di territori da Israele. È una fonte primaria per Moab, non una testimonianza diretta delle vicende di Numeri.', temporal: {start: -830, end: -805, precision: 'range'}, spatial: {point: {lat: 31.5, lng: 35.74}, region: 'Dibon / Dhiban'}, epistemicStatus: 'attested', biblicalRefs: [], relations: [{targetId: 'moab-kingdom', kind: 'context', label: 'Fonte primaria per il regno di Moab'}, {targetId: 'dibon', kind: 'context', label: 'Rinvenuta a Diban'}], sources: [MESHA]},
    {id: 'plains-moab', type: 'region', label: 'Pianure di Moab', summary: 'Spazio narrativo finale di Numeri, a est del Giordano di fronte a Gerico. L’area geografica generale è identificabile; la localizzazione puntuale delle scene resta dipendente dal testo.', temporal: {precision: 'unknown'}, spatial: {point: {lat: 31.85, lng: 35.65}, region: 'Bassa valle del Giordano orientale'}, epistemicStatus: 'narrative', biblicalRefs: [ref('Nm 22–36', 'numeri', 22, 36)], relations: [{targetId: 'moab-kingdom', kind: 'context', label: 'Ambientazione in relazione al territorio moabita'}, {targetId: 'balaam-tradition', kind: 'memory', label: 'Scenario del ciclo di Balaam'}], sources: [NUMBERS]},
    {id: 'deir-alla-inscription', type: 'witness', label: 'Iscrizione di Deir ʿAlla · Balaam', summary: 'Iscrizione dell’VIII secolo a.C. che menziona “Balaam figlio di Beor”, veggente degli dèi. È un comparandum eccezionale per la circolazione della figura di Balaam nel Levante.', temporal: {start: -800, end: -750, precision: 'range'}, spatial: {point: {lat: 32.19, lng: 35.62}, region: 'Deir ʿAlla · valle del Giordano orientale'}, epistemicStatus: 'attested', biblicalRefs: [ref('Nm 22–24', 'numeri', 22, 24)], relations: [{targetId: 'balaam-tradition', kind: 'memory', label: 'Comparandum extrabiblico per Balaam'}], sources: [BALAAM, BALAAM_OBO]},
    {id: 'balaam-tradition', type: 'person', label: 'Balaam figlio di Beor · tradizione', summary: 'Il Balaam di Nm 22–24 è una figura letteraria complessa. L’iscrizione di Deir ʿAlla mostra che un veggente con lo stesso nome circolava in tradizioni regionali; la relazione storica precisa resta discussa.', temporal: {precision: 'unknown'}, spatial: {region: 'Moab / Transgiordania nella narrazione; tradizione regionale più ampia'}, epistemicStatus: 'comparandum', biblicalRefs: [ref('Nm 22–24', 'numeri', 22, 24)], relations: [{targetId: 'deir-alla-inscription', kind: 'memory', label: 'Parallelo epigrafico'}, {targetId: 'plains-moab', kind: 'context', label: 'Ambientazione narrativa'}], sources: [BALAAM, BALAAM_OBO, NUMBERS]},
    {id: 'wilderness-itinerary-numbers', type: 'region', label: 'Itinerario del deserto in Numeri', summary: 'Liste di tappe e racconti di viaggio organizzano la memoria narrativa fra Sinai e Moab. Il dataset non trasforma la sequenza in una rotta archeologica certa.', temporal: {precision: 'unknown'}, spatial: {region: 'Sinai, Arabah, Transgiordania · identificazioni variabili'}, epistemicStatus: 'narrative', biblicalRefs: [ref('Nm 10–21', 'numeri', 10, 21), ref('Nm 33', 'numeri', 33)], relations: [{targetId: 'plains-moab', kind: 'memory', label: 'Termine narrativo dell’itinerario'}], sources: [NUMBERS]},
    {id: 'priestly-numbers', type: 'redaction', label: 'Materiali sacerdotali in Numeri', summary: 'Numeri integra norme su santuario, sacerdoti, Leviti, purità, offerte e istituzioni. Molte di queste unità sono attribuite a tradizioni sacerdotali e a rielaborazioni post-esiliche.', temporal: {start: -550, end: -350, precision: 'range'}, spatial: {region: 'Yehud / ambienti scribali sacerdotali; localizzazione discussa'}, epistemicStatus: 'debated', biblicalRefs: [ref('Numeri', 'numeri')], relations: [{targetId: 'numbers-formation', kind: 'composition', label: 'Componente della formazione del libro'}], sources: [NUMBERS, PENTATEUCH]},
    {id: 'numbers-formation', type: 'redaction', label: 'Formazione di Numeri', summary: 'Il libro combina cicli narrativi, tradizioni del deserto e di Moab, legislazione sacerdotale e interventi redazionali. La forma finale è generalmente studiata nel quadro della formazione tarda del Pentateuco.', temporal: {start: -600, end: -350, precision: 'range'}, spatial: {region: 'Giuda / Yehud e tradizioni transregionali'}, epistemicStatus: 'debated', biblicalRefs: [ref('Numeri', 'numeri')], relations: [{targetId: 'priestly-numbers', kind: 'composition', label: 'Rielaborazioni sacerdotali'}, {targetId: 'balaam-tradition', kind: 'composition', label: 'Integrazione del ciclo di Balaam'}, {targetId: 'wilderness-itinerary-numbers', kind: 'composition', label: 'Integrazione delle tradizioni di itinerario'}], sources: [NUMBERS, PENTATEUCH]},
  ],
  areas: [
    {id: 'moab-numbers', entityId: 'moab-kingdom', label: 'Moab · area didattica', temporal: {start: -900, end: -700}, confidence: 'approximate', note: 'Inquadramento visuale del cuore moabita dell’età del Ferro; non delimita confini politici stabili.', points: [[35.55,30.95],[36.05,31.05],[36.05,31.75],[35.55,31.8],[35.55,30.95]], sources: [EDITORIAL_AREA, MESHA]},
  ],
  noteEditoriali: 'Numeri separa geografia narrativa e attestazioni extrabibliche. Deir ʿAlla è un comparandum per Balaam, non una prova che il racconto biblico descriva un episodio storico identificabile. Moab è rappresentato con un inviluppo approssimato.',
}
