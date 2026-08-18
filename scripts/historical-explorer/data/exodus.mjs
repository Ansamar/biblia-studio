import {biblicalRef as ref, source} from '../lib/build-dataset.mjs'

const OXFORD_EXODUS = source('bibliography', 'Thomas B. Dozeman · Book of Exodus · Oxford Bibliographies', {
  citation: 'Thomas B. Dozeman, “Book of Exodus,” Oxford Bibliographies in Biblical Studies, 2010.',
  url: 'https://academic.oup.com/reference/62341/reference-article-abstract/554110416',
  note: 'Quadro bibliografico generale su struttura, storicità e complessa storia compositiva del libro.',
})

const HENDEL_MEMORY = source('secondary', 'Ronald Hendel · The Exodus in Biblical Memory', {
  citation: 'Ronald Hendel, “The Exodus in Biblical Memory,” in Remembering Abraham: Culture, Memory, and History in the Hebrew Bible, Oxford University Press, 2005, pp. 57–74.',
  url: 'https://academic.oup.com/book/10720/chapter/158790933',
  note: 'Usato per distinguere memoria culturale, narrazione biblica e ricostruzione storica.',
})

const OeAI_AVARIS = source('secondary', 'Austrian Archaeological Institute · Tell el-Dabʿa / Avaris', {
  citation: 'Austrian Archaeological Institute (OeAI), Tell el-Dabʿa / Avaris, progetto di scavo.',
  url: 'https://www.oeaw.ac.at/en/oeai/institute/branches/cairo/excavations-projects/tell-el-dab%CA%BFa',
  note: 'Documentazione archeologica per Avaris, Qantir/Pi-Ramesse, Delta orientale e collegamenti verso il Sinai e il Levante.',
})

const MERNEPTAH = source('primary', 'Stele di Merenptah · ca. 1208 a.C.', {
  citation: 'Stela of Merneptah, ca. 1208 BCE, Posen Library of Jewish Culture and Civilization.',
  url: 'https://www.posenlibrary.com/entry/stela-merneptah',
  locator: 'Riferimento a “Israel” nelle linee finali dell’iscrizione.',
  note: 'Prima attestazione extrabiblica nota del nome Israel; il determinativo indica un gruppo umano e non una città o regione.',
})

const PENTATEUCH_FORMATION = source('bibliography', 'Thomas B. Dozeman · The Pentateuch', {
  citation: 'Thomas B. Dozeman, “The Pentateuch,” Oxford Research Encyclopedia of Religion, 2018.',
  url: 'https://academic.oup.com/edited-volume/62249/chapter-abstract/551402384',
  note: 'Riferimento generale per la pluralità dei modelli critici sulla formazione del Pentateuco.',
})

export const exodusSeed = {
  datasetId: 'exodus-history',
  title: 'Esodo · storia intorno al testo',
  subtitle: 'Egitto ramesside, Delta orientale, attestazioni di Israel, memoria dell’uscita e formazione letteraria di Esodo tenuti distinti per statuto epistemico.',
  bookRef: 'libro-esodo',
  defaultRange: {start: -1300, end: -400},
  quickYears: [-1279, -1250, -1208, -1000, -722, -586, -539, -450],
  scenarios: [
    {
      id: 'ramesside-horizon',
      start: -1292,
      end: -1208,
      title: 'Orizzonte ramesside',
      summary: 'Il Delta orientale ospita Pi-Ramesse e una fitta rete di vie, cantieri e collegamenti verso il Sinai e il Levante. È un contesto storico pertinente ai toponimi e ad alcuni motivi egiziani di Esodo, ma non costituisce una datazione automatica dell’evento narrato.',
    },
    {
      id: 'merneptah-transition',
      start: -1208,
      end: -1100,
      title: 'Fine del Tardo Bronzo ed emergere di Israel in Canaan',
      summary: 'La stele di Merenptah attesta un gruppo chiamato Israel in Canaan intorno al 1208 a.C. Il dato è importante per il quadro storico delle origini di Israele, ma non descrive né conferma direttamente la narrazione dell’Esodo.',
    },
    {
      id: 'monarchic-memory',
      start: -900,
      end: -587,
      title: 'Memoria dell’Esodo in Israele e Giuda',
      summary: 'Nel periodo monarchico la memoria dell’uscita dall’Egitto diventa un linguaggio identitario e teologico fondamentale. La ricostruzione delle fasi letterarie precise resta discussa.',
    },
    {
      id: 'exilic-persian-formation',
      start: -586,
      end: -400,
      title: 'Rielaborazione esilica e persiana',
      summary: 'Esilio e periodo persiano costituiscono un orizzonte importante per modelli che collocano qui fasi decisive della composizione e redazione pentateucale, senza implicare un’unica cronologia condivisa dagli studiosi.',
    },
  ],
  entities: [
    {
      id: 'ramesside-egypt',
      type: 'empire',
      label: 'Egitto ramesside · XIX dinastia',
      summary: 'La XIX dinastia e il regno di Ramses II offrono il principale quadro storico nel quale viene spesso discusso il toponimo biblico “Ramesse”. La relazione è contestuale e non identifica di per sé il faraone dell’Esodo.',
      temporal: {start: -1292, end: -1189, precision: 'range'},
      spatial: {point: {lat: 30.8, lng: 31.8}, region: 'Egitto · Delta del Nilo e Levante meridionale'},
      epistemicStatus: 'attested',
      biblicalRefs: [ref('Es 1–15', 'esodo', 1, 15)],
      relations: [
        {targetId: 'pi-ramesse', kind: 'context', label: 'Pi-Ramesse come residenza reale del Delta orientale'},
        {targetId: 'eastern-delta', kind: 'context', label: 'Delta orientale come spazio storico pertinente'},
        {targetId: 'exodus-memory', kind: 'memory', label: 'Quadro egiziano con cui la memoria dell’Esodo viene messa in relazione'},
      ],
      sources: [OeAI_AVARIS, OXFORD_EXODUS],
    },
    {
      id: 'pi-ramesse',
      type: 'city',
      label: 'Pi-Ramesse / Qantir',
      summary: 'Residenza del Delta associata a Ramses II e ai suoi successori. La menzione di “Ramesse” in Es 1,11 è storicamente significativa come toponimo, ma non basta da sola a datare la forma finale del racconto.',
      temporal: {start: -1279, end: -1070, precision: 'range'},
      spatial: {point: {lat: 30.81, lng: 31.83}, region: 'Delta orientale del Nilo'},
      epistemicStatus: 'attested',
      biblicalRefs: [ref('Es 1,11', 'esodo', 1, 1, 11, 11)],
      relations: [
        {targetId: 'ramesside-egypt', kind: 'context', label: 'Residenza reale dell’età ramesside'},
        {targetId: 'eastern-delta', kind: 'context', label: 'Parte del sistema insediativo del Delta orientale'},
      ],
      sources: [OeAI_AVARIS],
    },
    {
      id: 'eastern-delta',
      type: 'region',
      label: 'Delta orientale · Tell el-Dabʿa / Qantir',
      summary: 'Regione strategica fra il Nilo, il Mediterraneo, il Sinai e le vie verso il Levante. Le sequenze archeologiche di Tell el-Dabʿa e Qantir documentano una lunga storia di popolazioni, traffici e presenza reale egiziana.',
      temporal: {precision: 'unknown'},
      spatial: {point: {lat: 30.79, lng: 31.83}, region: 'Delta orientale del Nilo'},
      epistemicStatus: 'attested',
      biblicalRefs: [ref('Es 1–2', 'esodo', 1, 2)],
      relations: [
        {targetId: 'pi-ramesse', kind: 'context', label: 'Pi-Ramesse/Qantir nel paesaggio del Delta orientale'},
        {targetId: 'north-sinai-corridor', kind: 'context', label: 'Collegamento verso il Sinai settentrionale e il Levante'},
      ],
      sources: [OeAI_AVARIS],
    },
    {
      id: 'north-sinai-corridor',
      type: 'region',
      label: 'Corridoio egiziano verso il Sinai settentrionale',
      summary: 'Il Delta orientale era collegato al Levante attraverso vie terrestri che attraversavano il Sinai settentrionale. Questo costituisce un quadro geografico reale, distinto dall’itinerario biblico la cui ricostruzione rimane discussa.',
      temporal: {start: -1300, end: -1150, precision: 'range'},
      spatial: {point: {lat: 30.2, lng: 33.0}, region: 'Sinai settentrionale'},
      epistemicStatus: 'attested',
      biblicalRefs: [ref('Es 13,17–22', 'esodo', 13, 13, 17, 22)],
      relations: [
        {targetId: 'eastern-delta', kind: 'context', label: 'Via di uscita dal Delta verso il Levante'},
        {targetId: 'wilderness-route', kind: 'context', label: 'Quadro geografico distinto dall’itinerario narrativo'},
      ],
      sources: [OeAI_AVARIS],
    },
    {
      id: 'merneptah-stele',
      type: 'witness',
      label: 'Stele di Merenptah · “Israel”',
      summary: 'Iscrizione del quinto anno di Merenptah, circa 1208 a.C., che menziona “Israel” fra le realtà del Levante. È il primo riferimento extrabiblico noto al nome Israel.',
      temporal: {start: -1208, end: -1208, precision: 'year'},
      spatial: {point: {lat: 25.72, lng: 32.65}, region: 'Tebe; testo riferito a campagne nel Levante'},
      epistemicStatus: 'attested',
      relations: [
        {targetId: 'israel-merneptah', kind: 'biblical-reference', label: 'Attesta un gruppo denominato Israel in Canaan'},
      ],
      sources: [MERNEPTAH],
    },
    {
      id: 'israel-merneptah',
      type: 'people',
      label: 'Israel nella stele di Merenptah',
      summary: 'La grafia egiziana della stele tratta Israel come gruppo umano e non come città o territorio. Il dato colloca una realtà denominata Israel in Canaan alla fine del XIII secolo a.C., senza descriverne le origini.',
      temporal: {start: -1208, end: -1208, precision: 'year'},
      spatial: {point: {lat: 31.7, lng: 35.0}, region: 'Canaan · localizzazione interna non precisata dalla stele'},
      epistemicStatus: 'attested',
      relations: [
        {targetId: 'merneptah-stele', kind: 'context', label: 'Attestazione epigrafica'},
        {targetId: 'exodus-memory', kind: 'memory', label: 'Dato storico distinto dalla memoria narrativa dell’uscita dall’Egitto'},
      ],
      sources: [MERNEPTAH],
    },
    {
      id: 'exodus-memory',
      type: 'event',
      label: 'Uscita dall’Egitto · narrazione e memoria',
      summary: 'Il racconto di Es 1–15 costituisce la memoria fondativa della liberazione dall’Egitto. Historical Explorer non gli assegna una data archeologica univoca: lo tratta come memoria/narrazione da mettere in relazione con contesti storici senza identificarli automaticamente con l’evento raccontato.',
      temporal: {precision: 'unknown'},
      spatial: {region: 'Egitto – deserto – mare/laghi; geografia narrativa discussa'},
      epistemicStatus: 'memory',
      biblicalRefs: [ref('Es 1–15', 'esodo', 1, 15)],
      relations: [
        {targetId: 'ramesside-egypt', kind: 'memory', label: 'Possibile orizzonte culturale di alcuni motivi egiziani'},
        {targetId: 'moses', kind: 'memory', label: 'Mosè come mediatore della memoria dell’Esodo'},
        {targetId: 'wilderness-route', kind: 'memory', label: 'Passaggio narrativo dall’Egitto al deserto'},
      ],
      sources: [HENDEL_MEMORY, OXFORD_EXODUS],
    },
    {
      id: 'moses',
      type: 'person',
      label: 'Mosè',
      summary: 'Figura centrale della narrazione dell’Esodo e dell’intero Pentateuco. La ricostruzione di un eventuale nucleo storico personale resta discussa; il dataset distingue il personaggio testuale dalla possibilità di una memoria storica sottostante.',
      temporal: {precision: 'unknown'},
      spatial: {region: 'Egitto, deserto, Sinai/Horeb nella narrazione'},
      epistemicStatus: 'narrative',
      biblicalRefs: [ref('Es 2–40', 'esodo', 2, 40)],
      relations: [
        {targetId: 'exodus-memory', kind: 'memory', label: 'Protagonista umano della memoria dell’uscita'},
        {targetId: 'sinai-horeb', kind: 'memory', label: 'Mediazione dell’alleanza al monte divino'},
      ],
      sources: [HENDEL_MEMORY, OXFORD_EXODUS],
    },
    {
      id: 'wilderness-route',
      type: 'region',
      label: 'Itinerario del deserto',
      summary: 'La sequenza dei luoghi di Es 13–18 appartiene alla geografia narrativa del libro. L’identificazione moderna delle tappe e del percorso complessivo non raggiunge un consenso sufficiente per essere rappresentata come rotta storica certa.',
      temporal: {precision: 'unknown'},
      spatial: {region: 'Sinai / deserti fra Egitto e Levante · itinerario discusso'},
      epistemicStatus: 'narrative',
      biblicalRefs: [ref('Es 13–18', 'esodo', 13, 18)],
      relations: [
        {targetId: 'north-sinai-corridor', kind: 'context', label: 'Confronto con la geografia reale delle vie egiziane'},
        {targetId: 'sinai-horeb', kind: 'memory', label: 'Conduce narrativamente al monte divino'},
      ],
      sources: [OXFORD_EXODUS],
    },
    {
      id: 'sinai-horeb',
      type: 'region',
      label: 'Sinai / Horeb · localizzazione discussa',
      summary: 'Il monte della rivelazione è centrale in Es 19–24 e nelle tradizioni pentateucali. Le proposte di localizzazione sono molteplici e il dataset non privilegia una coordinata geografica come storicamente certa.',
      temporal: {precision: 'unknown'},
      spatial: {region: 'Localizzazione discussa'},
      epistemicStatus: 'debated',
      biblicalRefs: [ref('Es 19–24', 'esodo', 19, 24)],
      relations: [
        {targetId: 'moses', kind: 'memory', label: 'Luogo narrativo della mediazione mosaica'},
        {targetId: 'exodus-formation', kind: 'composition', label: 'Tradizioni del Sinai integrate nella composizione di Esodo'},
      ],
      sources: [OXFORD_EXODUS],
    },
    {
      id: 'exodus-formation',
      type: 'redaction',
      label: 'Formazione del libro dell’Esodo',
      summary: 'Esodo presenta una storia compositiva complessa, con narrazioni, legislazione, tradizioni cultuali e materiali sacerdotali combinati in più fasi. Il range è volutamente ampio e rappresenta una finestra di lavoro critica, non una datazione univoca condivisa.',
      temporal: {start: -800, end: -400, precision: 'range'},
      spatial: {region: 'Israele / Giuda / diaspora babilonese e Yehud · secondo i diversi modelli'},
      epistemicStatus: 'debated',
      biblicalRefs: [ref('Esodo', 'esodo')],
      relations: [
        {targetId: 'exodus-memory', kind: 'composition', label: 'Rielaborazione letteraria della memoria dell’uscita'},
        {targetId: 'sinai-horeb', kind: 'composition', label: 'Integrazione delle tradizioni del monte e dell’alleanza'},
      ],
      sources: [OXFORD_EXODUS, PENTATEUCH_FORMATION],
    },
  ],
  areas: [
    {
      id: 'eastern-delta-context-area',
      entityId: 'eastern-delta',
      label: 'Delta orientale · area di contesto archeologico',
      temporal: {start: -1300, end: -1150},
      confidence: 'approximate',
      note: 'Area didattica approssimata attorno al sistema Tell el-Dabʿa–Qantir/Pi-Ramesse. Non rappresenta confini amministrativi antichi né l’area biblica di Gosen.',
      points: [
        [31.0, 31.2],
        [31.0, 30.3],
        [32.2, 30.2],
        [32.5, 30.8],
        [31.9, 31.4],
        [31.0, 31.2],
      ],
      sources: [
        OeAI_AVARIS,
        source('editorial', 'Biblia Fontes · delimitazione didattica del Delta orientale', {
          note: 'Poligono editoriale costruito per la navigazione del prototipo; non derivato da una ricostruzione GIS pubblicata.',
        }),
      ],
    },
  ],
  noteEditoriali: 'Primo seed di Esodo. Il dataset evita di trasformare il racconto dell’Esodo in cronaca datata: distingue contesti egiziani attestati, memoria biblica, geografie discusse e formazione letteraria. Le geometrie sono approssimate e devono essere sostituite o rafforzate da dataset cartografici pubblicati quando disponibili.',
}
