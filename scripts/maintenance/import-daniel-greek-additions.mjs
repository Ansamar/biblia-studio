import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-08-15'})
const commit = process.argv.includes('--commit')

const targets = [
  {chapter:13, tradition:'daniele_greco_og', book:'susanna', witness:'Old Greek · Susanna'},
  {chapter:13, tradition:'daniele_teodozione', book:'susanna-theodotion', witness:'Teodozione · Susanna'},
  {chapter:14, tradition:'daniele_greco_og', book:'bel-and-the-dragon', witness:'Old Greek · Bel e il Drago'},
  {chapter:14, tradition:'daniele_teodozione', book:'bel-and-the-dragon-theodotion', witness:'Teodozione · Bel e il Drago'},
]

const templates = await client.fetch(`*[_type == "testoBiblicoCapitolo" && libro._ref == "libro-daniele" && tradizione in ["daniele_greco_og","daniele_teodozione"]]|order(numero asc){
  ...,
  "chapterRef":capitolo._ref,
  "bookRef":libro._ref
}`)

const templateByTradition = new Map()
for (const t of templates) if (!templateByTradition.has(t.tradizione)) templateByTradition.set(t.tradizione, t)
for (const tradition of ['daniele_greco_og','daniele_teodozione']) {
  if (!templateByTradition.has(tradition)) throw new Error(`Template mancante per ${tradition}`)
}

const chapters = await client.fetch(`*[_type == "capitolo" && libro._ref == "libro-daniele" && numero in [13,14]]{_id,numero}`)
const chapterByNumber = new Map(chapters.map((c) => [c.numero, c._id]))
if (!chapterByNumber.has(13) || !chapterByNumber.has(14)) throw new Error('Capitoli Sanity 13–14 di Daniele non risolti correttamente.')

const targetIds = targets.map(({chapter, tradition}) => `testo-daniele-${tradition.replaceAll('_','-')}-dan-${chapter}`)
const existing = await client.fetch(`*[_id in $ids]{_id,numero,tradizione}`, {ids: targetIds})
if (existing.length) throw new Error(`Target già esistenti: ${existing.map((d) => d._id).join(', ')}`)

const stripSystem = (doc) => {
  const out = {...doc}
  for (const k of [
    '_id','_rev','_createdAt','_updatedAt','chapterRef','bookRef','numero','capitolo','versetti',
    // Questi metadati descrivono il vecchio corpus BWGRKL/BIBBIA_GRECA.rtf e
    // non devono essere ereditati da documenti importati da Open Scriptorium.
    'diritti','importazione','siglaSorgente','testimone','provenienzaImportazione',
  ]) delete out[k]
  return out
}

const describeMeta = (t) => ({
  lingua:t.lingua,
  tradizione:t.tradizione,
  edizione:t.edizione,
  direzione:t.direzione,
  diritti:t.diritti,
  siglaSorgente:t.siglaSorgente,
  testimone:t.testimone,
  importazione:t.importazione,
})

console.log('\n=== IMPORT DANIELE GRECO 13–14 ===')
console.log(`Project: ${client.config().projectId}`)
console.log(`Dataset: ${client.config().dataset}`)
console.log(`Modalità: ${commit ? 'COMMIT' : 'DRY RUN'}`)
console.log('\n=== METADATI TEMPLATE (solo confronto; non saranno copiati come provenance) ===')
for (const tradition of ['daniele_greco_og','daniele_teodozione']) {
  console.log(`${tradition}: ${JSON.stringify(describeMeta(templateByTradition.get(tradition)))}`)
}

const docs = []
const verseSets = new Map()
for (const target of targets) {
  const template = templateByTradition.get(target.tradition)
  const url = `https://openscriptorium.org/api/v1/works/swete-lxx/${target.book}/1`
  const res = await fetch(url, {headers:{accept:'application/json'}})
  if (!res.ok) throw new Error(`${target.witness}: HTTP ${res.status}`)
  const data = await res.json()
  const verses = Array.isArray(data.verses) ? data.verses : []
  if (!verses.length) throw new Error(`${target.witness}: nessun versetto ricevuto`)

  const verseType = template.versetti?.[0]?._type || 'object'
  const mappedVerses = verses.map((v, i) => {
    const n = Number(v?.hierarchy?.[1] ?? i + 1)
    if (!Number.isFinite(n) || typeof v?.body !== 'string' || !v.body.trim()) throw new Error(`${target.witness}: versetto non valido in posizione ${i + 1}`)
    return {_key:`dan-${target.chapter}-${target.tradition}-${n}`,_type:verseType,numero:n,testo:v.body.normalize('NFC')}
  })

  const id = `testo-daniele-${target.tradition.replaceAll('_','-')}-dan-${target.chapter}`
  const base = stripSystem(template)
  const license = data.license || null
  const licenseName = typeof license?.name === 'string' ? license.name : 'Public Domain'
  const licenseUrl = typeof license?.url === 'string' ? license.url : 'https://creativecommons.org/publicdomain/mark/1.0/'

  const doc = {
    ...base,
    _id:id,
    _type:'testoBiblicoCapitolo',
    libro:{_type:'reference',_ref:'libro-daniele'},
    capitolo:{_type:'reference',_ref:chapterByNumber.get(target.chapter)},
    numero:target.chapter,
    lingua:'Greco',
    tradizione:target.tradition,
    edizione:template.edizione,
    direzione:template.direzione || 'ltr',
    versetti:mappedVerses,
    siglaSorgente:'Swete LXX',
    testimone:target.witness,
    diritti:{
      nota:`Henry Barclay Swete, The Old Testament in Greek According to the Septuagint; testo sorgente ${licenseName} via Open Scriptorium / Open Greek and Latin. ${licenseUrl}`,
      noteIncluse:false,
      noteProtette:false,
      testoProtetto:false,
    },
    importazione:{
      fonteFile:url,
      parser:'Open Scriptorium REST API JSON → Biblia Fontes',
      validato:true,
    },
  }
  docs.push(doc)
  verseSets.set(`${target.chapter}:${target.tradition}`, mappedVerses)

  console.log(`\n${target.witness} → Dn ${target.chapter}`)
  console.log(`ID: ${id}`)
  console.log(`Versetti: ${mappedVerses.length}`)
  console.log(`Primo: ${mappedVerses[0].numero} · ${mappedVerses[0].testo.slice(0,90)}`)
  console.log(`Ultimo: ${mappedVerses.at(-1).numero} · ${mappedVerses.at(-1).testo.slice(0,90)}`)
  console.log(`Licenza API: ${JSON.stringify(license)}`)
}

function compareWitnesses(chapter) {
  const og = verseSets.get(`${chapter}:daniele_greco_og`) || []
  const th = verseSets.get(`${chapter}:daniele_teodozione`) || []
  const max = Math.max(og.length, th.length)
  let different = 0
  const examples = []
  for (let i=0;i<max;i++) {
    const a = og[i]
    const b = th[i]
    const same = a?.numero === b?.numero && a?.testo === b?.testo
    if (!same) {
      different++
      if (examples.length < 3) examples.push({
        n: a?.numero ?? b?.numero ?? i+1,
        og: a?.testo?.slice(0,100) || '∅',
        theodotion: b?.testo?.slice(0,100) || '∅',
      })
    }
  }
  console.log(`\n=== CONFRONTO TESTIMONI · Dn ${chapter} ===`)
  console.log(`OG: ${og.length} versetti · Teodozione: ${th.length} versetti · differenze rilevate: ${different}`)
  for (const e of examples) {
    console.log(`- v.${e.n}`)
    console.log(`  OG: ${e.og}`)
    console.log(`  TH: ${e.theodotion}`)
  }
  if (different === 0) {
    throw new Error(`Dn ${chapter}: Old Greek e Teodozione risultano identici nell'API. Commit bloccato: verificare la sorgente prima di importare.`)
  }
}

compareWitnesses(13)
compareWitnesses(14)

console.log('\nPiano: 4 documenti nuovi; nessun documento esistente viene modificato.')
console.log('Provenance: i vecchi metadati BIBBIA_GRECA.rtf NON saranno ereditati; i nuovi documenti citeranno Open Scriptorium / Swete LXX.')
if (!commit) {
  console.log('Nessuna mutazione eseguita. Aggiungere -- --commit per scrivere.')
  process.exit(0)
}

let tx = client.transaction()
for (const doc of docs) tx = tx.create(doc)
const result = await tx.commit()
console.log(`\n✓ Scritti ${docs.length} documenti greci per Daniele 13–14.`)
console.log(`Transaction: ${result.transactionId || 'n/d'}`)

const verify = await client.fetch(`*[_id in $ids]{_id,numero,tradizione,"verseCount":count(versetti),siglaSorgente,testimone,diritti,importazione}|order(tradizione asc, numero asc)`, {ids:targetIds})
if (verify.length !== 4) throw new Error(`Verifica fallita: attesi 4 documenti, trovati ${verify.length}`)
console.log('Verifica:')
for (const d of verify) console.log(`- ${d._id} · cap ${d.numero} · ${d.tradizione} · vv=${d.verseCount} · ${d.siglaSorgente}`)
