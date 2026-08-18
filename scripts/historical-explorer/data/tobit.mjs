import {biblicalRef as ref, source} from '../lib/build-dataset.mjs'

const TOBIT = source('secondary', 'Beate Ego · The Book of Tobit', {citation: 'Beate Ego, “The Book of Tobit,” The Oxford Handbook of the Apocrypha, 2021.', url: 'https://academic.oup.com/edited-volume/33426/chapter-abstract/290251498'})
const GOFF = source('secondary', 'Matthew Goff · The Book of Tobit', {citation: 'Matthew Goff, “All’s Well That Ends Well: The Book of Tobit,” The Apocrypha: A Guide, 2024.', url: 'https://academic.oup.com/book/57955/chapter-abstract/475816740'})

export const tobitSeed = {
  datasetId: 'tobia-history', title: 'Tobia · storia intorno al testo',
  subtitle: 'Diaspora assira, memoria dell’esilio, famiglia, viaggio, medicina e pietà giudaica sono distinti dal tempo di composizione del racconto.',
  bookRef: 'libro-tobia', defaultRange: {start: -750, end: -150}, quickYears: [-722,-650,-539,-400,-250,-200],
  scenarios: [
    {id:'assyrian-diaspora',start:-722,end:-600,title:'Deportazioni assire e diaspora israelita',summary:'Il racconto colloca Tobit tra i deportati del regno del Nord e usa Ninive come grande scenario imperiale.'},
    {id:'persian-diaspora-memory',start:-539,end:-330,title:'Diaspora e memoria in età persiana',summary:'Comunità giudaiche fuori dalla terra sviluppano pratiche identitarie, elemosina, endogamia e memoria di Gerusalemme.'},
    {id:'tobit-composition',start:-250,end:-150,title:'Composizione di Tobia',summary:'Le parti principali del libro sono comunemente collocate intorno al 200 a.C.; il mondo assiro narrato è quindi memoria letteraria di un passato più antico.'}
  ],
  entities: [
    {id:'assyrian-exile-tobit',type:'event',label:'Deportazioni assire del regno del Nord',summary:'Le deportazioni dopo la conquista assira costituiscono lo sfondo storico generale che il libro trasforma in storia familiare.',temporal:{start:-732,end:-700,precision:'range'},spatial:{region:'Assiria e Levante'},epistemicStatus:'attested',biblicalRefs:[ref('Tb 1','tobia',1)],relations:[{targetId:'nineveh-tobit',kind:'context',label:'Ninive come scenario della diaspora'}],sources:[TOBIT,GOFF]},
    {id:'nineveh-tobit',type:'city',label:'Ninive nel racconto di Tobia',summary:'Ninive è una città storica assira, ma nel libro funziona come spazio narrativo della diaspora e della memoria dell’esilio.',temporal:{start:-700,end:-612,precision:'range'},spatial:{point:{lat:36.36,lng:43.15},region:'Assiria'},epistemicStatus:'attested',biblicalRefs:[ref('Tb 1–14','tobia',1,14)],relations:[{targetId:'assyrian-exile-tobit',kind:'context',label:'Scenario della famiglia deportata'}],sources:[TOBIT]},
    {id:'diaspora-piety-tobit',type:'practice',label:'Pietà della diaspora',summary:'Elemosina, sepoltura dei morti, endogamia, preghiera e fedeltà alimentare costruiscono l’identità religiosa dei protagonisti.',temporal:{precision:'unknown'},epistemicStatus:'comparandum',biblicalRefs:[ref('Tb 1–12','tobia',1,12)],relations:[{targetId:'tobit-composition',kind:'composition',label:'Pratiche integrate nel programma didattico del libro'}],sources:[TOBIT,GOFF]},
    {id:'healing-raphael-tobit',type:'practice',label:'Guarigione, medicina e Raffaele',summary:'Il racconto integra rimedi, demonologia, preghiera e azione angelica in una teologia della guarigione e della provvidenza.',temporal:{precision:'unknown'},epistemicStatus:'narrative',biblicalRefs:[ref('Tb 3–12','tobia',3,12)],relations:[{targetId:'tobit-composition',kind:'composition',label:'Nucleo teologico e narrativo'}],sources:[TOBIT]},
    {id:'tobit-composition',type:'redaction',label:'Composizione del libro di Tobia',summary:'Il libro, conservato in più forme testuali e con importanti frammenti aramaici ed ebraici da Qumran, riflette il giudaismo del Secondo Tempio più che la cronaca dell’età assira.',temporal:{start:-250,end:-150,precision:'range'},spatial:{region:'Giudaismo orientale / diaspora; provenienza discussa'},epistemicStatus:'probable',biblicalRefs:[ref('Tobia','tobia')],relations:[{targetId:'diaspora-piety-tobit',kind:'composition',label:'Elabora pratiche della diaspora'},{targetId:'healing-raphael-tobit',kind:'composition',label:'Integra guarigione e angelologia'}],sources:[TOBIT,GOFF]}
  ], areas: [], noteEditoriali:'Tobia separa rigorosamente il passato assiro narrato dalla composizione ellenistica del libro.'
}
