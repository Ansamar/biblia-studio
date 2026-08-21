import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion:'2025-08-15'})

const targets = [
  {id:'testo-daniele-daniele-greco-og-dan-13', chapter:13, sourceId:'testo-daniele-susanna-og-sus-1'},
  {id:'testo-daniele-daniele-greco-og-dan-14', chapter:14, sourceId:'testo-daniele-bel-og-bel-1'},
]

const docs = await client.fetch(`*[_id in $ids]{...}`, {ids:targets.map(t=>t.id)})
const byId = new Map(docs.map(d=>[d._id,d]))

console.log('\n=== AUDIT FINALE TARGET OLD GREEK · DANIELE 13–14 ===')
console.log(`Project: ${client.config().projectId}`)
console.log(`Dataset: ${client.config().dataset}`)
console.log(`Target trovati: ${docs.length}/2`)

let problems = 0

for (const target of targets) {
  const doc = byId.get(target.id)
  console.log(`\n=== ${target.id} ===`)
  if (!doc) {
    console.log('MANCANTE')
    problems++
    continue
  }

  const verses = Array.isArray(doc.versetti) ? doc.versetti : []
  const empty = verses.filter(v => typeof v?.testo !== 'string' || !v.testo.trim())
  const intentional = empty.filter(v => v?.statoTestuale === 'omesso_nell_edizione' && v?.notaEditoriale === 'nessun_testo_autonomo_nella_versificazione_sorgente')
  const unexplained = empty.filter(v => !(v?.statoTestuale === 'omesso_nell_edizione' && v?.notaEditoriale === 'nessun_testo_autonomo_nella_versificazione_sorgente'))

  const nums = verses.map(v=>v?.numero).filter(Number.isFinite)
  const dupNums = [...new Set(nums.filter((n,i)=>nums.indexOf(n)!==i))]
  const min = nums.length ? Math.min(...nums) : null
  const max = nums.length ? Math.max(...nums) : null
  const gaps = []
  if (min !== null && max !== null) {
    const set = new Set(nums)
    for (let n=min;n<=max;n++) if (!set.has(n)) gaps.push(n)
  }

  const provenance = doc.provenienzaPromozione || null
  const provenanceMatches = provenance?.sorgenteDocumento === target.sourceId
  const chapterOk = doc.numero === target.chapter
  const traditionOk = doc.tradizione === 'daniele_greco_og'
  const sourceRefOk = doc.libro?._ref === 'libro-daniele'

  console.log(`capitolo=${doc.numero} · tradizione=${doc.tradizione} · edizione=${doc.edizione}`)
  console.log(`versetti=${verses.length} · range=${min}–${max} · vuoti=${empty.length} · omissioniIntenzionali=${intentional.length} · vuotiNonGiustificati=${unexplained.length}`)
  console.log(`duplicatiNumero=${dupNums.length ? dupNums.join(', ') : 'nessuno'} · gap=${gaps.length ? gaps.join(', ') : 'nessuno'}`)
  console.log(`provenienza=${JSON.stringify(provenance)}`)
  console.log(`diritti=${JSON.stringify(doc.diritti || null)}`)
  console.log(`importazione=${JSON.stringify(doc.importazione || null)}`)

  if (!chapterOk) { console.log(`ERRORE: numero capitolo atteso ${target.chapter}`); problems++ }
  if (!traditionOk) { console.log('ERRORE: tradizione diversa da daniele_greco_og'); problems++ }
  if (!sourceRefOk) { console.log('ERRORE: riferimento libro non è libro-daniele'); problems++ }
  if (!provenanceMatches) { console.log(`ERRORE: provenance non punta a ${target.sourceId}`); problems++ }
  if (unexplained.length) { console.log(`ERRORE: vuoti non giustificati: ${unexplained.map(v=>v.numero).join(', ')}`); problems++ }
  if (dupNums.length) { console.log(`ERRORE: numeri duplicati: ${dupNums.join(', ')}`); problems++ }
  if (gaps.length) { console.log(`ERRORE: gap numerazione: ${gaps.join(', ')}`); problems++ }

  const declared = Array.isArray(provenance?.omissioniIntenzionali) ? provenance.omissioniIntenzionali : []
  const actual = intentional.map(v=>v.numero)
  if (JSON.stringify(declared) !== JSON.stringify(actual)) {
    console.log(`ERRORE: omissioni dichiarate in provenance (${declared.join(', ')}) != omissioni effettive (${actual.join(', ')})`)
    problems++
  }
}

console.log(`\nProblemi audit target OG: ${problems}`)
if (problems) {
  console.error('✗ Audit target Old Greek fallito.')
  process.exitCode = 1
} else {
  console.log('✓ Target Old Greek coerenti: provenance e omissioni editoriali preservate.')
}
