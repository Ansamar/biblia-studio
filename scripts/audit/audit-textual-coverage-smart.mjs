import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-08-15'})

const books = await client.fetch(`*[_type == "libro"]{_id,titolo,capitoli}`)
const texts = await client.fetch(`*[_type == "testoBiblicoCapitolo"]{
  _id,numero,lingua,tradizione,edizione,"bookRef":libro._ref,"verseCount":count(versetti)
}`)

const byBook = new Map()
for (const t of texts) {
  if (!t.bookRef) continue
  if (!byBook.has(t.bookRef)) byBook.set(t.bookRef, [])
  byBook.get(t.bookRef).push(t)
}

const keyOf = (t) => `${t.lingua || '∅'}|${t.tradizione || '∅'}|${t.edizione || '∅'}`
const range = (start, end) => Array.from({length: end - start + 1}, (_, i) => start + i)

// Regole esplicite per tradizioni la cui estensione non coincide con il
// numero di capitoli del canone CEI usato dal documento libro.
const expectedCoverage = ({book, lingua, tradizione}) => {
  if (book._id === 'libro-daniele' && lingua === 'Ebraico' && tradizione === 'mt') {
    return {chapters: range(1, 12), reason: 'Il Testo Masoretico di Daniele termina a Dn 12; Dn 13–14 sono aggiunte greche/deuterocanoniche.'}
  }
  if (book._id === 'libro-baruc' && lingua === 'Greco' && tradizione === 'greco') {
    return {chapters: range(1, 5), reason: 'Nel modello editoriale corrente Baruc 6 / Lettera di Geremia è trattato separatamente dalla variante greca Baruc 1–5.'}
  }
  if (book._id === 'libro-giosue' && lingua === 'Greco' && tradizione === 'lxx') {
    return {chapters: null, reason: 'Alias legacy; la variante editoriale attiva e completa è lxx_joshua_a.'}
  }
  return {chapters: range(1, book.capitoli), reason: null}
}

const problems = []
const notes = []

for (const book of books) {
  const docs = byBook.get(book._id) || []
  const variants = new Map()
  for (const t of docs) {
    const k = keyOf(t)
    if (!variants.has(k)) variants.set(k, [])
    variants.get(k).push(t)
  }

  for (const [variant, variantDocs] of variants) {
    const sample = variantDocs[0]
    const expected = expectedCoverage({book, lingua: sample.lingua, tradizione: sample.tradizione})
    const present = new Set(variantDocs.map((t) => t.numero).filter(Number.isFinite))

    const dup = new Map()
    for (const t of variantDocs) {
      if (!dup.has(t.numero)) dup.set(t.numero, [])
      dup.get(t.numero).push(t._id)
    }
    for (const [n, ids] of dup) {
      if (ids.length > 1) problems.push(`${book.titolo}: duplicato reale cap. ${n} [${variant}] → ${ids.join(', ')}`)
    }

    if (expected.chapters === null) {
      notes.push(`${book.titolo}: [${variant}] esclusa dal gate di copertura — ${expected.reason}`)
      continue
    }

    // Una variante/testimone che copre meno di metà dell'estensione attesa è
    // trattata come testimone parziale, non come promessa editoriale di libro completo.
    const threshold = Math.max(2, Math.floor(expected.chapters.length * 0.5))
    if (present.size < threshold) {
      notes.push(`${book.titolo}: [${variant}] testimone parziale ${present.size}/${expected.chapters.length}; non valutato come copertura completa.`)
      continue
    }

    const missing = expected.chapters.filter((n) => !present.has(n))
    const unexpected = [...present].filter((n) => !expected.chapters.includes(n)).sort((a,b) => a-b)
    if (missing.length) {
      problems.push(`${book.titolo}: [${variant}] attesi ${expected.chapters.length}, presenti ${present.size}; mancanti ${missing.join(', ')}`)
    }
    if (unexpected.length) {
      problems.push(`${book.titolo}: [${variant}] capitoli fuori copertura attesa: ${unexpected.join(', ')}`)
    }
    if (!missing.length && expected.reason) {
      notes.push(`${book.titolo}: [${variant}] copertura intenzionale ${expected.chapters[0]}–${expected.chapters.at(-1)} — ${expected.reason}`)
    }
  }
}

console.log('\n=== GATE TESTUALE CONSAPEVOLE DELLE TRADIZIONI ===')
console.log(`Libri: ${books.length}`)
console.log(`Documenti testo: ${texts.length}`)
console.log(`Problemi reali di copertura/duplicazione: ${problems.length}`)

if (problems.length) {
  console.log('\n=== PROBLEMI REALI ===')
  for (const p of problems) console.log(`- ${p}`)
}

if (notes.length) {
  console.log('\n=== ECCEZIONI / NOTE MODELLISTICHE ===')
  for (const n of notes) console.log(`- ${n}`)
}

if (problems.length) {
  console.error(`\n✗ Gate testuale fallito: ${problems.length} problemi reali.`)
  process.exitCode = 1
} else {
  console.log('\n✓ Copertura testuale coerente con le regole delle singole tradizioni.')
}
