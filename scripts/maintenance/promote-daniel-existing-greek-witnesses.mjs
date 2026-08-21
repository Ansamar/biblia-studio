import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion:'2025-08-15'})
const commit = process.argv.includes('--commit')

const plans = [
  {sourceId:'testo-daniele-susanna-teodozione-sut-1', chapter:13, tradition:'daniele_teodozione', targetId:'testo-daniele-daniele-teodozione-dan-13'},
  {sourceId:'testo-daniele-bel-teodozione-bet-1', chapter:14, tradition:'daniele_teodozione', targetId:'testo-daniele-daniele-teodozione-dan-14'},
]

const sources = await client.fetch(`*[_id in $ids]{...}`, {ids: plans.map(p => p.sourceId)})
const sourceById = new Map(sources.map(d => [d._id,d]))
if (sourceById.size !== plans.length) throw new Error(`Sorgenti mancanti: attese ${plans.length}, trovate ${sourceById.size}`)

const chapters = await client.fetch(`*[_type == "capitolo" && libro._ref == "libro-daniele" && numero in [13,14]]{_id,numero}`)
const chapterByNumber = new Map(chapters.map(c => [c.numero,c._id]))
if (!chapterByNumber.has(13) || !chapterByNumber.has(14)) throw new Error('Capitoli Daniele 13–14 non risolti.')

const existing = await client.fetch(`*[_id in $ids]{_id}`, {ids: plans.map(p => p.targetId)})
if (existing.length) throw new Error(`Target già esistenti: ${existing.map(d => d._id).join(', ')}`)

const stripSystem = (doc) => {
  const out = {...doc}
  for (const k of ['_id','_rev','_createdAt','_updatedAt','numero','capitolo','tradizione','edizione','testimone','siglaSorgente']) delete out[k]
  return out
}

const targetMeta = {
  daniele_teodozione: {edizione:'Testo greco — daniele teodozione', testimone:'Theodotion', siglaSorgente:'Dat'},
}

const docs = []
console.log('\n=== PROMOZIONE TESTIMONI GRECI COMPLETI · DANIELE ===')
console.log(`Project: ${client.config().projectId}`)
console.log(`Dataset: ${client.config().dataset}`)
console.log(`Modalità: ${commit ? 'COMMIT' : 'DRY RUN'}`)

for (const plan of plans) {
  const src = sourceById.get(plan.sourceId)
  if (!Array.isArray(src.versetti) || !src.versetti.length) throw new Error(`${plan.sourceId}: versetti mancanti`)
  const empty = src.versetti.filter(v => typeof v?.testo !== 'string' || !v.testo.trim())
  if (empty.length) throw new Error(`${plan.sourceId}: ${empty.length} versetti vuoti; promozione bloccata`)
  const meta = targetMeta[plan.tradition]
  const base = stripSystem(src)
  const doc = {
    ...base,
    _id:plan.targetId,
    _type:'testoBiblicoCapitolo',
    libro:{_type:'reference',_ref:'libro-daniele'},
    capitolo:{_type:'reference',_ref:chapterByNumber.get(plan.chapter)},
    numero:plan.chapter,
    lingua:'Greco',
    tradizione:plan.tradition,
    edizione:meta.edizione,
    testimone:meta.testimone,
    siglaSorgente:meta.siglaSorgente,
    provenienzaPromozione:{
      sorgenteDocumento:plan.sourceId,
      metodo:'Promozione interna di testimone greco completo già presente in production; testo dei versetti invariato.',
    },
  }
  docs.push(doc)
  console.log(`- ${plan.sourceId} → ${plan.targetId} · Dn ${plan.chapter} · ${plan.tradition} · vv=${src.versetti.length}`)
}

console.log('\nPiano: 2 nuovi documenti Teodozione; nessun documento sorgente viene modificato o cancellato.')
if (!commit) {
  console.log('Nessuna mutazione eseguita. Aggiungere -- --commit per scrivere.')
  process.exit(0)
}

let tx = client.transaction()
for (const doc of docs) tx = tx.create(doc)
const res = await tx.commit()
console.log(`\n✓ Scritti ${docs.length} documenti promossi.`)
console.log(`Transaction: ${res.transactionId || 'n/d'}`)

const verify = await client.fetch(`*[_id in $ids]{_id,numero,tradizione,"verseCount":count(versetti)}|order(numero asc, tradizione asc)`, {ids:plans.map(p=>p.targetId)})
if (verify.length !== 2) throw new Error(`Verifica fallita: attesi 2 target, trovati ${verify.length}`)
for (const d of verify) console.log(`- ${d._id} · cap ${d.numero} · ${d.tradizione} · vv=${d.verseCount}`)
