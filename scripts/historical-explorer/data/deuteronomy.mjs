import {biblicalRef as ref, source} from '../lib/build-dataset.mjs'

const JOSIAH = source('secondary', 'Marvin A. Sweeney · Deuteronomy and Josiah', {
  citation: 'Marvin A. Sweeney, “Deuteronomy and the Reigns of Kings Hezekiah and Josiah of Judah,” The Oxford Handbook of Deuteronomy, 2020.',
  url: 'https://academic.oup.com/edited-volume/34717/chapter-abstract/296454024',
  note: 'Rappresenta il modello che colloca un nucleo deuteronomico nel contesto della riforma di Giosia.',
})
const DIASPORA = source('secondary', 'Ernest Nicholson · Deuteronomy and the Judaean Diaspora', {
  citation: 'Ernest Nicholson, Deuteronomy and the Judaean Diaspora, Oxford University Press.',
  url: 'https://academic.oup.com/book/9405',
  note: 'Rappresenta un modello alternativo che valorizza una formazione largamente esilica del Deuteronomio.',
})
const DTR = source('secondary', 'Thomas Römer · Deuteronomistic library', {
  citation: 'Thomas Römer, “The So-called Deuteronomistic History and Its Theories of Composition,” The Oxford Handbook of the Historical Books of the Hebrew Bible, 2020.',
  url: 'https://academic.oup.com/edited-volume/34226/chapter-abstract/290218228',
  note: 'Sintetizza modelli plurifase: VII secolo, esilio e primo periodo persiano.',
})
const TREATY = source('secondary', 'Anne K. Knafl · Deuteronomy—Code or Covenant?', {
  citation: 'Anne K. Knafl, “Deuteronomy—Code or Covenant?,” The Oxford Handbook of Deuteronomy, 2021.',
  url: 'https://academic.oup.com/edited-volume/34717/chapter-abstract/296450761',
  note: 'Per i paralleli con trattati ittiti e neo-assiri e la natura composita del genere deuteronomico.',
})
const CURSES = source('secondary', 'Laura Quick · Deuteronomy 28 and Ancient Near Eastern Curses', {
  citation: 'Laura Quick, Deuteronomy 28 and the Aramaic Curse Tradition, Oxford University Press, 2017.',
  url: 'https://academic.oup.com/book/25417/chapter-abstract/192550022',
  note: 'La relazione con i trattati di successione di Esarhaddon è importante ma discussa; il dataset la tratta come comparandum, non dipendenza certa.',
})
const PENTATEUCH = source('secondary', 'Thomas Kazen · Law and Formation of the Pentateuch', {
  citation: 'Thomas Kazen, “The Role of Law in the Formation of the Pentateuch and the Canon,” The Oxford Handbook of Biblical Law, 2019.',
  url: 'https://academic.oup.com/edited-volume/34224/chapter-abstract/290208241',
})

export const deuteronomySeed = {
  datasetId: 'deuteronomio-history',
  title: 'Deuteronomio · storia intorno al testo',
  subtitle: 'Assiria, Giuda, Giosia, esilio e formazione deuteronomica/deuteronomistica rappresentati come modelli e contesti concorrenti, non come una cronologia unica imposta.',
  bookRef: 'libro-deuteronomio',
  defaultRange: {start: -750, end: -400},
  quickYears: [-701, -672, -640, -622, -609, -586, -539, -450, -400],
  sharedEntities: [
    {id: 'neo-assyria'},
    {id: 'neo-babylon'},
    {id: 'achaemenid-persia'},
    {id: 'jerusalem'},
    {id: 'jerusalem-586'},
  ],
  scenarios: [
    {id: 'assyrian-judah', start: -735, end: -640, title: 'Giuda nell’ombra assira', summary: 'La cultura politica e giuridica neo-assira costituisce un contesto essenziale per comprendere linguaggi di lealtà, trattato e maledizione confrontati con Deuteronomio.'},
    {id: 'josianic-horizon', start: -640, end: -609, title: 'Orizzonte giosiano', summary: 'Un importante filone di ricerca collega un nucleo deuteronomico al regno di Giosia e alla centralizzazione cultuale; il nesso fra “libro della Torah” di 2Re 22–23 e Deuteronomio resta ricostruzione critica.'},
    {id: 'babylonian-exile', start: -609, end: -539, title: 'Crisi, caduta di Giuda ed esilio', summary: 'La fine del regno, il 586 a.C. e la diaspora babilonese forniscono un secondo grande orizzonte interpretativo per ampliamenti e riformulazioni del Deuteronomio.'},
    {id: 'persian-redaction', start: -539, end: -400, title: 'Rielaborazioni persiane e Torah', summary: 'Nel primo periodo persiano Deuteronomio viene integrato nel Pentateuco e dialoga con una più ampia biblioteca deuteronomistica secondo modelli compositivi plurali.'},
  ],
  entities: [
    {id: 'judah-late-monarchy', type: 'region', label: 'Regno di Giuda · tarda monarchia', summary: 'Giuda fra VIII e VII secolo a.C. vive sotto forte pressione assira e sviluppa forme politiche, cultuali e scribali che costituiscono il principale contesto pre-esilico proposto per Deuteronomio.', temporal: {start: -735, end: -586, precision: 'range'}, spatial: {point: {lat: 31.78, lng: 35.22}, region: 'Giuda'}, epistemicStatus: 'attested', biblicalRefs: [], relations: [{targetId: 'neo-assyria', kind: 'context', label: 'Egemonia assira sul Levante'}, {targetId: 'jerusalem', kind: 'context', label: 'Capitale del regno'}], sources: [JOSIAH, TREATY]},
    {id: 'josiah', type: 'person', label: 'Giosia di Giuda', summary: 'Re di Giuda (VII secolo a.C.) associato da 2Re 22–23 al ritrovamento di un libro della Torah e a una riforma cultuale. L’identificazione del libro con una forma di Deuteronomio è influente ma non unanimemente accettata.', temporal: {start: -640, end: -609, precision: 'range'}, spatial: {point: {lat: 31.78, lng: 35.22}, region: 'Gerusalemme / Giuda'}, epistemicStatus: 'attested', biblicalRefs: [ref('2Re 22–23', '2-re', 22, 23)], relations: [{targetId: 'lawbook-josiah', kind: 'interaction', label: 'Racconto del ritrovamento del libro'}, {targetId: 'deuteronomic-core', kind: 'composition', label: 'Contesto proposto per un nucleo deuteronomico'}], sources: [JOSIAH, DIASPORA]},
    {id: 'lawbook-josiah', type: 'text', label: '“Libro della Torah” di 2Re 22–23', summary: 'Oggetto testuale del racconto di Giosia. Molti studiosi lo collegano a una forma di Deuteronomio, mentre altri contestano la ricostruzione o ne collocano più tardi il rapporto con il libro.', temporal: {start: -622, end: -622, precision: 'year'}, spatial: {point: {lat: 31.78, lng: 35.23}, region: 'Tempio di Gerusalemme nella narrazione di 2Re'}, epistemicStatus: 'memory', biblicalRefs: [ref('2Re 22–23', '2-re', 22, 23)], relations: [{targetId: 'josiah', kind: 'interaction', label: 'Ritrovamento nel racconto regale'}, {targetId: 'deuteronomic-core', kind: 'composition', label: 'Possibile relazione con una forma di Deuteronomio'}], sources: [JOSIAH, DIASPORA]},
    {id: 'assyrian-treaty-comparandum', type: 'text', label: 'Trattati neo-assiri · comparandum', summary: 'Formule di lealtà, trattato e maledizione neo-assire offrono paralleli importanti per la retorica di Deuteronomio. La modalità esatta di dipendenza o mediazione resta discussa.', temporal: {start: -700, end: -650, precision: 'range'}, spatial: {region: 'Impero neo-assiro'}, epistemicStatus: 'comparandum', biblicalRefs: [ref('Dt 13', 'deuteronomio', 13), ref('Dt 28', 'deuteronomio', 28)], relations: [{targetId: 'neo-assyria', kind: 'context', label: 'Cultura politica neo-assira'}, {targetId: 'deuteronomic-core', kind: 'composition', label: 'Paralleli retorici e giuridici'}], sources: [TREATY, CURSES]},
    {id: 'centralization-cult', type: 'practice', label: 'Centralizzazione del culto', summary: 'Dt 12 richiede il culto nel luogo scelto da YHWH. Il rapporto fra questa norma, Gerusalemme e le riforme monarchiche è uno dei nodi centrali e più discussi della ricerca.', temporal: {start: -700, end: -550, precision: 'range'}, spatial: {region: 'Giuda / Gerusalemme nel modello giosiano'}, epistemicStatus: 'debated', biblicalRefs: [ref('Dt 12', 'deuteronomio', 12)], relations: [{targetId: 'jerusalem', kind: 'context', label: 'Gerusalemme come centro cultuale nella ricezione storica'}, {targetId: 'deuteronomic-core', kind: 'composition', label: 'Norma centrale del codice'}], sources: [JOSIAH, DIASPORA]},
    {id: 'deuteronomic-core', type: 'redaction', label: 'Nucleo deuteronomico / codice', summary: 'Una forma relativamente antica del codice di Dt 12–26 è spesso collocata nel VII secolo, ma estensione, datazione e rapporto con Giosia sono discussi. Il dataset visualizza il modello senza elevarlo a dato certo.', temporal: {start: -700, end: -580, precision: 'range'}, spatial: {region: 'Giuda; alternative esiliche proposte'}, epistemicStatus: 'debated', biblicalRefs: [ref('Dt 12–26', 'deuteronomio', 12, 26)], relations: [{targetId: 'josiah', kind: 'context', label: 'Modello giosiano'}, {targetId: 'assyrian-treaty-comparandum', kind: 'composition', label: 'Paralleli con retoriche di trattato'}, {targetId: 'deuteronomy-exilic-layer', kind: 'composition', label: 'Rielaborazioni successive'}], sources: [JOSIAH, DIASPORA, TREATY]},
    {id: 'deuteronomy-exilic-layer', type: 'redaction', label: 'Rielaborazioni esiliche', summary: 'Diversi modelli attribuiscono all’esilio babilonese ampliamenti decisivi di Deuteronomio, legati alla perdita della terra, alla diaspora, al patto e alla sopravvivenza identitaria.', temporal: {start: -586, end: -539, precision: 'range'}, spatial: {region: 'Giuda e diaspora babilonese'}, epistemicStatus: 'debated', biblicalRefs: [ref('Deuteronomio', 'deuteronomio')], relations: [{targetId: 'neo-babylon', kind: 'context', label: 'Orizzonte imperiale babilonese'}, {targetId: 'jerusalem-586', kind: 'context', label: 'Crisi della monarchia e del tempio'}, {targetId: 'deuteronomic-core', kind: 'composition', label: 'Rilettura di tradizioni anteriori'}], sources: [DIASPORA, DTR]},
    {id: 'deuteronomistic-library', type: 'redaction', label: 'Biblioteca deuteronomistica', summary: 'Modello che descrive un insieme di testi deuteronomistici sviluppati in più fasi dal VII secolo all’esilio e al primo periodo persiano, anziché una singola “storia” composta in un solo momento.', temporal: {start: -650, end: -500, precision: 'range'}, spatial: {region: 'Giuda / Babilonia / Yehud secondo i modelli'}, epistemicStatus: 'debated', biblicalRefs: [ref('Dt 1–34', 'deuteronomio', 1, 34)], relations: [{targetId: 'deuteronomic-core', kind: 'composition', label: 'Tradizione deuteronomica'}, {targetId: 'deuteronomy-exilic-layer', kind: 'composition', label: 'Fasi esiliche'}, {targetId: 'achaemenid-persia', kind: 'context', label: 'Primo periodo persiano'}], sources: [DTR]},
    {id: 'deuteronomy-formation', type: 'redaction', label: 'Formazione di Deuteronomio', summary: 'La forma finale del libro deriva da più fasi di legislazione, esortazione, cornice narrativa e rielaborazione. I modelli giosiano, esilico e persiano non sono riducibili a una sola cronologia.', temporal: {start: -700, end: -400, precision: 'range'}, spatial: {region: 'Giuda / diaspora / Yehud'}, epistemicStatus: 'debated', biblicalRefs: [ref('Deuteronomio', 'deuteronomio')], relations: [{targetId: 'deuteronomic-core', kind: 'composition', label: 'Possibile nucleo antico'}, {targetId: 'deuteronomy-exilic-layer', kind: 'composition', label: 'Rielaborazioni esiliche'}, {targetId: 'deuteronomistic-library', kind: 'composition', label: 'Relazioni con corpus deuteronomistico'}], sources: [JOSIAH, DIASPORA, DTR, PENTATEUCH]},
  ],
  areas: [],
  noteEditoriali: 'Deuteronomio è volutamente costruito come Explorer di modelli concorrenti. Giosia, esilio e periodo persiano sono scenari interpretativi con diverso peso negli studi; il comparandum assiro non viene presentato come dipendenza letteraria certa.',
}
