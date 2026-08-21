import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-08-15'})

const targets = [
  {bookRef:'libro-baruc', label:'BARUC', lingua:'Greco', tradizione:'greco'},
  {bookRef:'libro-daniele', label:'DANIELE', lingua:'Greco', tradizione:'daniele_greco_og'},
  {bookRef:'libro-daniele', label:'DANIELE', lingua:'Greco', tradizione:'daniele_teodozione'},
  {bookRef:'libro-daniele', label:'DANIELE', lingua:'Ebraico', tradizione:'mt'},
  {bookRef:'libro-genesi', label:'GENESI', lingua:'Greco', tradizione:'greco'},
  {bookRef:'libro-giosue', label:'GIOSUÈ', lingua:'Greco', tradizione:'lxx_joshua_a'},
  {bookRef:'libro-salmi', label:'SALMI', lingua:'it', tradizione:'traduzione_italiana'},
]

const bookRefs = [...new Set(targets.map(t => t.bookRef))]
const result = await client.fetch(`{
  "books": *[_id in $bookRefs]{_id,titolo,capitoli},
  "texts": *[_type == "testoBiblicoCapitolo" && libro._ref in $bookRefs]{
    _id, numero, lingua, tradizione, edizione,
    "verseCount": count(versetti)
  }
}`, {bookRefs})

const books = new Map(result.books.map(b => [b._id,b]))
const byBook = new Map()
for (const t of result.texts) {
  const bookRef = bookRefs.find(ref => t._id.startsWith('testo-') ? false : false)
}

// Re-fetch grouped by book because _id naming is not reliable enough to infer the reference.
for (const target of targets) {
  const book = books.get(target.bookRef)
  const docs = await client.fetch(`*[_type == "testoBiblicoCapitolo" && libro._ref == $bookRef]{_id,numero,lingua,tradizione,edizione,"verseCount":count(versetti)}|order(numero asc)`, {bookRef: target.bookRef})
  const selected = docs.filter(d => d.lingua === target.lingua && d.tradizione === target.tradizione)
  const present = [...new Set(selected.map(d => d.numero).filter(Number.isFinite))].sort((a,b)=>a-b)
  const canonicalMax = book?.capitoli || 0
  const missingCanonical = []
  for (let n=1;n<=canonicalMax;n++) if (!present.includes(n)) missingCanonical.push(n)

  console.log(`\n=== ${target.label} · ${target.lingua} · ${target.tradizione} ===`)
  console.log(`Capitoli canonici del libro: ${canonicalMax}`)
  console.log(`Documenti variante: ${selected.length}`)
  console.log(`Capitoli presenti: ${present.join(', ') || 'nessuno'}`)
  console.log(`Mancanti rispetto al numero canonico: ${missingCanonical.join(', ') || 'nessuno'}`)
  console.log('Edizioni presenti:')
  const editions = new Map()
  for (const d of selected) {
    const key = d.edizione || '(senza edizione)'
    if (!editions.has(key)) editions.set(key, [])
    editions.get(key).push(d.numero)
  }
  for (const [edition, nums] of editions) console.log(`- ${edition}: ${[...new Set(nums)].sort((a,b)=>a-b).join(', ')}`)

  if (missingCanonical.length) {
    console.log('Varianti alternative disponibili per i capitoli mancanti:')
    for (const n of missingCanonical) {
      const alts = docs.filter(d => d.numero === n).map(d => `${d.lingua || '?'} | ${d.tradizione || '?'} | ${d.edizione || '?'} | ${d._id} | vv=${d.verseCount}`)
      console.log(`  cap. ${n}:`)
      if (!alts.length) console.log('    - nessun testo alternativo nel dataset')
      else for (const alt of alts) console.log(`    - ${alt}`)
    }
  }
}

console.log('\nNOTE METODOLOGICHE')
console.log('- Questo audit non decide automaticamente che ogni capitolo canonico debba esistere in ogni tradizione.')
console.log('- Daniele MT normalmente copre 1–12; i capitoli/addizioni greche richiedono una regola di copertura distinta.')
console.log('- Baruc 6 / Lettera di Geremia può essere separato nella tradizione greca; va verificato il modello editoriale adottato.')
console.log('- Gli altri buchi vanno classificati come reali o intenzionali solo dopo aver visto quali documenti paralleli sono già presenti in production.')
