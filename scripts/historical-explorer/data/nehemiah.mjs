import {biblicalRef as ref, source} from '../lib/build-dataset.mjs'

const PERSIAN = source('secondary', 'Mary Joan Winn Leith · Persian-period Yehud', {
  citation: 'Mary Joan Winn Leith, “New Perspectives on the Return from Exile and Persian-Period Yehud,” Oxford Handbook, 2020.',
  url: 'https://academic.oup.com/edited-volume/34226/chapter-abstract/290215432',
})
const EZRA_NEH = source('secondary', 'Melody D. Knowles · Reimagining Community in Ezra and Nehemiah', {
  citation: 'Melody D. Knowles, “Reimagining Community Past and Present in Ezra and Nehemiah,” Oxford Handbook of the Writings, 2018.',
  url: 'https://academic.oup.com/edited-volume/28060/chapter/212046798',
})
const CHRON_HISTORY = source('secondary', 'Ralph W. Klein · Chronicles, Ezra, Nehemiah', {
  citation: 'Ralph W. Klein, “The Rise and Fall of the So-Called Chronicler’s History,” Oxford Handbook, 2020.',
  url: 'https://academic.oup.com/edited-volume/34226/chapter-abstract/290219077',
})
const EDITORIAL = source('editorial', 'Biblia Fontes · ricostruzione didattica', {note: 'Area urbana e provinciale semplificata per orientamento.'})

export const nehemiahSeed = {
  datasetId: 'neemia-history',
  title: 'Neemia · storia intorno al testo',
  subtitle: 'Gerusalemme persiana, mura, amministrazione, debito, sabato, tempio e confini comunitari vengono letti nel quadro di Yehud e delle reti diasporiche dell’impero achemenide.',
  bookRef: 'libro-neemia',
  defaultRange: {start: -500, end: -350},
  quickYears: [-465, -458, -445, -440, -430, -400],
  sharedEntities: [
    {id: 'achaemenid-empire-history'},
    {id: 'yehud-persian-province'},
    {id: 'second-temple-jerusalem'},
    {id: 'torah-authority-ezra'},
  ],
  scenarios: [
    {id: 'artaxerxes-yehud', start: -465, end: -445, title: 'Yehud sotto Artaserse I', summary: 'La provincia di Yehud è inserita in un sistema imperiale che collega corte persiana, governatori locali, Samaria, diaspora e Gerusalemme.'},
    {id: 'nehemiah-wall', start: -445, end: -430, title: 'Neemia, mura e governo locale', summary: 'Il racconto lega ricostruzione urbana, opposizione regionale, fiscalità e amministrazione alla figura di Neemia.'},
    {id: 'community-torah', start: -440, end: -380, title: 'Torah e comunità', summary: 'Lettura pubblica, sabato, tempio, debito e matrimoni vengono organizzati come pratiche che definiscono il corpo comunitario.'},
  ],
  entities: [
    {id: 'artaxerxes-i-nehemiah', type: 'person', label: 'Artaserse I', summary: 'Sovrano achemenide nel cui regno viene tradizionalmente collocata la missione di Neemia. Il quadro imperiale è storicamente attestato; i dettagli dell’autorizzazione derivano dal racconto.', temporal: {start: -465, end: -424, precision: 'range'}, spatial: {region: 'Impero achemenide'}, epistemicStatus: 'attested', biblicalRefs: [ref('Ne 1–2', 'neemia', 1, 2)], relations: [{targetId: 'achaemenid-empire-history', kind: 'context', label: 'Sovrano achemenide'}, {targetId: 'nehemiah-governor', kind: 'memory', label: 'Autorità imperiale nel racconto della missione'}], sources: [PERSIAN, EZRA_NEH]},
    {id: 'nehemiah-governor', type: 'person', label: 'Neemia · governatore e memorialista', summary: 'Neemia è presentato come funzionario di corte e governatore di Yehud. Le sezioni in prima persona possono conservare materiale memorialistico, ma sono inserite in una composizione letteraria più ampia.', temporal: {start: -445, end: -430, precision: 'range'}, spatial: {point: {lat: 31.778, lng: 35.235}, region: 'Gerusalemme / Yehud'}, epistemicStatus: 'probable', biblicalRefs: [ref('Ne 1–13', 'neemia', 1, 13)], relations: [{targetId: 'jerusalem-walls-nehemiah', kind: 'memory', label: 'Guida la ricostruzione delle mura'}, {targetId: 'yehud-persian-province', kind: 'context', label: 'Governatore della provincia nella tradizione'}, {targetId: 'nehemiah-memoir', kind: 'composition', label: 'Voce principale delle sezioni memorialistiche'}], sources: [EZRA_NEH, PERSIAN]},
    {id: 'jerusalem-walls-nehemiah', type: 'institution', label: 'Mura di Gerusalemme in età persiana', summary: 'Ne 2–6 presenta una ricostruzione rapida delle mura. La fortificazione di Gerusalemme nel periodo persiano va studiata insieme all’archeologia urbana, senza assumere automaticamente ogni dettaglio topografico del racconto.', temporal: {start: -445, end: -430, precision: 'range'}, spatial: {point: {lat: 31.778, lng: 35.235}, region: 'Gerusalemme'}, epistemicStatus: 'probable', biblicalRefs: [ref('Ne 2–6', 'neemia', 2, 6)], relations: [{targetId: 'nehemiah-governor', kind: 'memory', label: 'Opera centrale della missione di Neemia'}, {targetId: 'jerusalem-persian-city', kind: 'context', label: 'Ridefinisce la città post-esilica'}], sources: [EZRA_NEH, PERSIAN]},
    {id: 'jerusalem-persian-city', type: 'city', label: 'Gerusalemme nel periodo persiano', summary: 'Centro di Yehud e del Secondo Tempio, ma città di scala più contenuta rispetto alle fasi monarchiche successive immaginate dalla memoria biblica.', temporal: {start: -539, end: -332, precision: 'range'}, spatial: {point: {lat: 31.778, lng: 35.235}, region: 'Yehud'}, epistemicStatus: 'attested', biblicalRefs: [ref('Ne 1–13', 'neemia', 1, 13)], relations: [{targetId: 'second-temple-jerusalem', kind: 'context', label: 'Tempio come centro cultuale'}, {targetId: 'jerusalem-walls-nehemiah', kind: 'context', label: 'Ricostruzione urbana narrata'}], sources: [PERSIAN, EZRA_NEH]},
    {id: 'debt-social-crisis-nehemiah', type: 'practice', label: 'Debito, proprietà e dipendenza', summary: 'Ne 5 descrive una crisi sociale con debiti, pegni, perdita di terre e servitù. Il testo testimonia tensioni economiche reali possibili, ma le organizza anche come scena normativa della leadership di Neemia.', temporal: {start: -450, end: -400, precision: 'range'}, spatial: {region: 'Yehud'}, epistemicStatus: 'probable', biblicalRefs: [ref('Ne 5', 'neemia', 5)], relations: [{targetId: 'nehemiah-governor', kind: 'memory', label: 'Neemia interviene come governatore'}, {targetId: 'yehud-persian-province', kind: 'context', label: 'Economia provinciale e comunitaria'}], sources: [EZRA_NEH, PERSIAN]},
    {id: 'public-torah-nehemiah', type: 'practice', label: 'Lettura pubblica della Torah', summary: 'Ne 8 rappresenta la Torah letta e interpretata davanti all’assemblea. La scena è fondamentale per la memoria della comunità testuale post-esilica e per il ruolo di scribi e Leviti.', temporal: {precision: 'unknown'}, spatial: {point: {lat: 31.778, lng: 35.235}, region: 'Gerusalemme nella narrazione'}, epistemicStatus: 'memory', biblicalRefs: [ref('Ne 8', 'neemia', 8)], relations: [{targetId: 'torah-authority-ezra', kind: 'memory', label: 'Espressione pubblica dell’autorità della Torah'}, {targetId: 'nehemiah-formation', kind: 'composition', label: 'Scena identitaria centrale'}], sources: [EZRA_NEH]},
    {id: 'sabbath-nehemiah', type: 'practice', label: 'Sabato e controllo degli scambi', summary: 'Ne 13 collega osservanza del sabato, porte della città e commercio. Il passo mostra come pratiche religiose e gestione urbana vengano intrecciate nella definizione comunitaria.', temporal: {precision: 'unknown'}, spatial: {region: 'Gerusalemme nella narrazione'}, epistemicStatus: 'narrative', biblicalRefs: [ref('Ne 13', 'neemia', 13)], relations: [{targetId: 'jerusalem-persian-city', kind: 'context', label: 'Regolazione dello spazio urbano'}, {targetId: 'nehemiah-formation', kind: 'composition', label: 'Parte del programma comunitario finale'}], sources: [EZRA_NEH]},
    {id: 'nehemiah-memoir', type: 'text', label: 'Memoriale di Neemia', summary: 'Le sezioni in prima persona sono spesso studiate come un nucleo memorialistico riutilizzato nella composizione del libro. Estensione e storia redazionale restano discusse.', temporal: {start: -445, end: -400, precision: 'range'}, spatial: {region: 'Yehud / ambiente amministrativo e scribale'}, epistemicStatus: 'debated', biblicalRefs: [ref('Ne 1–7', 'neemia', 1, 7), ref('Ne 11–13', 'neemia', 11, 13)], relations: [{targetId: 'nehemiah-governor', kind: 'memory', label: 'Voce autobiografica attribuita a Neemia'}, {targetId: 'nehemiah-formation', kind: 'composition', label: 'Nucleo incorporato nella forma finale'}], sources: [EZRA_NEH, CHRON_HISTORY]},
    {id: 'nehemiah-formation', type: 'redaction', label: 'Formazione del libro di Neemia', summary: 'Memorie in prima persona, liste, preghiere, racconti comunitari e materiali condivisi con Esdra vengono combinati in una composizione post-persiana o tardo-persiana discussa.', temporal: {start: -430, end: -300, precision: 'range'}, spatial: {region: 'Yehud / ambienti scribali'}, epistemicStatus: 'debated', biblicalRefs: [ref('Ne 1–13', 'neemia', 1, 13)], relations: [{targetId: 'nehemiah-memoir', kind: 'composition', label: 'Incorpora materiale memorialistico'}, {targetId: 'public-torah-nehemiah', kind: 'composition', label: 'Integra la scena della Torah pubblica'}], sources: [EZRA_NEH, CHRON_HISTORY]},
  ],
  areas: [
    {id: 'jerusalem-nehemiah-area', entityId: 'jerusalem-persian-city', label: 'Gerusalemme persiana · area urbana orientativa', temporal: {start: -450, end: -400}, confidence: 'illustrative', note: 'Piccolo inviluppo per orientare la città persiana; non ricostruzione puntuale della cinta muraria.', points: [[35.20,31.80],[35.25,31.80],[35.25,31.75],[35.20,31.75],[35.20,31.80]], sources: [EDITORIAL, PERSIAN]},
  ],
  noteEditoriali: 'Neemia mette in relazione amministrazione persiana, città, tempio, debito, Torah e disciplina comunitaria; le memorie in prima persona non sono assunte come trascrizione non mediata degli eventi.'
}
