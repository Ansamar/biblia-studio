import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-08-15'})

const result = await client.fetch(`{
  "allIds": *[]{_id,_type},
  "books": *[_type == "libro"]{_id,titolo,ordine,capitoli},
  "chapters": *[_type == "capitolo"]{_id,numero,titolo,"bookRef":libro._ref,"bookExists":defined(libro->._id)},
  "biblicalText": *[_type == "testoBiblicoCapitolo"]{
    _id,numero,edizione,lingua,tradizione,
    "bookRef":libro._ref,"bookExists":defined(libro->._id),"verseCount":count(versetti)
  },
  "datasets": *[_type == "historicalExplorerDataset"]{
    _id,id,title,"bookRef":book._ref,"bookExists":defined(book->._id),
    "entityRefs":entities[]._ref,"brokenEntityRefs":count(entities[!defined(@->._id)]),
    "areaRefs":areas[]._ref,"brokenAreaRefs":count(areas[!defined(@->._id)]),
    defaultRange,quickYears,scenarios
  },
  "entities": *[_type == "historicalEntity"]{
    _id,id,label,type,epistemicStatus,temporal,spatial,
    "relations":relations[]{kind,label,"targetRef":target._ref,"targetExists":defined(target->._id)},
    "sources":count(sources),
    "biblicalRefs":biblicalRefs[]{display,bookSlug,chapterStart,chapterEnd,verseStart,verseEnd}
  },
  "areas": *[_type == "historicalArea"]{
    _id,id,label,temporal,confidence,note,
    "entityRef":entity._ref,"entityExists":defined(entity->._id),
    "sources":count(sources),geometry
  }
}`)

const issues = []
const warnings = []
const notes = []
const addIssue = (msg) => issues.push(msg)
const addWarning = (msg) => warnings.push(msg)
const isNum = (v) => typeof v === 'number' && Number.isFinite(v)
const clean = (v) => typeof v === 'string' && v.trim() ? v.trim() : '∅'

if (result.books.length !== 73) addIssue(`Libri canonici: attesi 73, trovati ${result.books.length}`)

const booksById = new Map(result.books.map((b) => [b._id,b]))
const orderMap = new Map()
for (const b of result.books) {
  if (!b.titolo) addIssue(`Libro ${b._id}: titolo mancante`)
  if (!isNum(b.ordine)) addIssue(`Libro ${b.titolo || b._id}: ordine mancante/non numerico`)
  else {
    if (!orderMap.has(b.ordine)) orderMap.set(b.ordine,[])
    orderMap.get(b.ordine).push(b._id)
  }
  if (!isNum(b.capitoli) || b.capitoli < 1) addIssue(`Libro ${b.titolo || b._id}: numero capitoli non valido (${b.capitoli})`)
}
for (const [ordine,ids] of orderMap) if (ids.length > 1) addIssue(`Ordine canonico duplicato ${ordine}: ${ids.join(', ')}`)

const chaptersByBook = new Map()
for (const c of result.chapters) {
  if (!c.bookExists) addIssue(`Capitolo ${c._id}: reference libro rotta (${c.bookRef || 'mancante'})`)
  if (!isNum(c.numero) || c.numero < 1) addIssue(`Capitolo ${c._id}: numero non valido (${c.numero})`)
  if (c.bookRef) {
    if (!chaptersByBook.has(c.bookRef)) chaptersByBook.set(c.bookRef,[])
    chaptersByBook.get(c.bookRef).push(c)
  }
}
for (const b of result.books) {
  const chapters = (chaptersByBook.get(b._id) || []).sort((a,b) => a.numero-b.numero)
  if (isNum(b.capitoli) && chapters.length !== b.capitoli) addIssue(`Libro ${b.titolo}: capitoli dichiarati ${b.capitoli}, documenti capitolo ${chapters.length}`)
  const seen = new Set()
  for (const c of chapters) {
    if (seen.has(c.numero)) addIssue(`Libro ${b.titolo}: capitolo duplicato n. ${c.numero}`)
    seen.add(c.numero)
  }
  if (isNum(b.capitoli)) for (let n=1;n<=b.capitoli;n++) if (!seen.has(n)) addIssue(`Libro ${b.titolo}: capitolo ${n} mancante`)
}

// Testi biblici: più documenti per capitolo sono attesi quando rappresentano
// edizioni/lingue/tradizioni differenti. Un duplicato reale coincide su tutte
// le dimensioni identificative sotto.
const textByBook = new Map()
for (const t of result.biblicalText) {
  if (!t.bookExists) addIssue(`Testo biblico ${t._id}: reference libro rotta (${t.bookRef || 'mancante'})`)
  if (!isNum(t.numero) || t.numero < 1) addIssue(`Testo biblico ${t._id}: numero capitolo non valido (${t.numero})`)
  if (!isNum(t.verseCount) || t.verseCount < 1) addWarning(`Testo biblico ${t._id}: nessun versetto`)
  if (!t.bookRef) continue
  if (!textByBook.has(t.bookRef)) textByBook.set(t.bookRef,[])
  textByBook.get(t.bookRef).push(t)
}

for (const b of result.books) {
  const docs = textByBook.get(b._id) || []
  const variants = new Map()
  for (const t of docs) {
    const variant = `${clean(t.lingua)}|${clean(t.tradizione)}|${clean(t.edizione)}`
    if (!variants.has(variant)) variants.set(variant, [])
    variants.get(variant).push(t)
  }

  for (const [variant, variantDocs] of variants) {
    const byChapter = new Map()
    for (const t of variantDocs) {
      if (!byChapter.has(t.numero)) byChapter.set(t.numero, [])
      byChapter.get(t.numero).push(t._id)
    }
    for (const [n, ids] of byChapter) {
      if (ids.length > 1) addIssue(`Libro ${b.titolo}: duplicato reale testo cap. ${n} [${variant}] → ${ids.join(', ')}`)
    }

    if (isNum(b.capitoli)) {
      const covered = new Set(variantDocs.map((t) => t.numero).filter(isNum))
      const missing = []
      for (let n=1;n<=b.capitoli;n++) if (!covered.has(n)) missing.push(n)
      if (missing.length && covered.size >= Math.max(2, Math.floor(b.capitoli * 0.5))) {
        addWarning(`Libro ${b.titolo}: variante [${variant}] copertura ${covered.size}/${b.capitoli}; mancanti ${missing.slice(0,12).join(', ')}${missing.length > 12 ? '…' : ''}`)
      }
    }
  }
}

const datasetsByBook = new Map()
for (const d of result.datasets) {
  if (!d.id) addIssue(`Dataset ${d._id}: id stabile mancante`)
  if (!d.bookExists) addIssue(`Dataset ${d.id || d._id}: reference libro rotta (${d.bookRef || 'mancante'})`)
  if (d.brokenEntityRefs) addIssue(`Dataset ${d.id || d._id}: ${d.brokenEntityRefs} reference entità rotte`)
  if (d.brokenAreaRefs) addIssue(`Dataset ${d.id || d._id}: ${d.brokenAreaRefs} reference area rotte`)
  if (d.bookRef) {
    if (!datasetsByBook.has(d.bookRef)) datasetsByBook.set(d.bookRef,[])
    datasetsByBook.get(d.bookRef).push(d.id || d._id)
  }
  const r = d.defaultRange
  if (!r || !isNum(r.start) || !isNum(r.end)) addIssue(`Dataset ${d.id || d._id}: defaultRange incompleto`)
  else if (r.start > r.end) addIssue(`Dataset ${d.id || d._id}: defaultRange invertito (${r.start} > ${r.end})`)
  for (const y of d.quickYears || []) if (!isNum(y)) addIssue(`Dataset ${d.id || d._id}: quickYear non numerico`)
  for (const s of d.scenarios || []) {
    if (!s?.id || !s?.title) addIssue(`Dataset ${d.id || d._id}: scenario senza id/titolo`)
    if (!isNum(s?.start) || !isNum(s?.end) || s.start > s.end) addIssue(`Dataset ${d.id || d._id}: scenario ${s?.id || '?'} con intervallo non valido`)
  }
}
for (const [bookRef,ids] of datasetsByBook) if (ids.length > 1) addIssue(`Libro ${booksById.get(bookRef)?.titolo || bookRef}: dataset Historical Explorer multipli (${ids.join(', ')})`)

const entityStable = new Map()
for (const e of result.entities) {
  if (!e.id) addIssue(`Entità ${e._id}: id stabile mancante`)
  else {
    if (!entityStable.has(e.id)) entityStable.set(e.id,[])
    entityStable.get(e.id).push(e._id)
  }
  if (!e.label) addIssue(`Entità ${e.id || e._id}: label mancante`)
  if (!e.type) addIssue(`Entità ${e.id || e._id}: type mancante`)
  if (!e.epistemicStatus) addIssue(`Entità ${e.id || e._id}: epistemicStatus mancante`)
  if (!e.sources) addWarning(`Entità ${e.id || e._id}: nessuna fonte/provenance`)
  const t = e.temporal
  if (!t?.precision) addIssue(`Entità ${e.id || e._id}: temporal.precision mancante`)
  if (isNum(t?.start) && isNum(t?.end) && t.start > t.end) addIssue(`Entità ${e.id || e._id}: intervallo temporale invertito`)
  if (t?.precision === 'unknown' && (isNum(t?.start) || isNum(t?.end))) addWarning(`Entità ${e.id || e._id}: precision=unknown ma contiene date`)
  const p = e.spatial?.point
  if (p) {
    if (!isNum(p.lat) || !isNum(p.lng)) addIssue(`Entità ${e.id || e._id}: geopoint incompleto`)
    else if (p.lat < -90 || p.lat > 90 || p.lng < -180 || p.lng > 180) addIssue(`Entità ${e.id || e._id}: coordinate fuori range (${p.lat}, ${p.lng})`)
  }
  for (const rel of e.relations || []) if (!rel.targetExists) addIssue(`Entità ${e.id || e._id}: relazione rotta → ${rel.targetRef || 'mancante'}`)
  for (const ref of e.biblicalRefs || []) {
    if (!ref?.bookSlug) addIssue(`Entità ${e.id || e._id}: riferimento biblico senza bookSlug`)
    if (isNum(ref?.chapterStart) && isNum(ref?.chapterEnd) && ref.chapterStart > ref.chapterEnd) addIssue(`Entità ${e.id || e._id}: intervallo capitoli invertito (${ref.display || ref.bookSlug})`)
    if (isNum(ref?.verseStart) && isNum(ref?.verseEnd) && ref.verseStart > ref.verseEnd) addIssue(`Entità ${e.id || e._id}: intervallo versetti invertito (${ref.display || ref.bookSlug})`)
  }
}
for (const [id,docs] of entityStable) if (docs.length > 1) addIssue(`ID entità duplicato ${id}: ${docs.join(', ')}`)

const referencedEntities = new Set(result.datasets.flatMap(d => d.entityRefs || []))
for (const e of result.entities) if (!referencedEntities.has(e._id)) addWarning(`Entità isolata da dataset: ${e.id || e._id}`)

const areaStable = new Map()
for (const a of result.areas) {
  if (!a.id) addIssue(`Area ${a._id}: id stabile mancante`)
  else {
    if (!areaStable.has(a.id)) areaStable.set(a.id,[])
    areaStable.get(a.id).push(a._id)
  }
  if (!a.entityExists) addIssue(`Area ${a.id || a._id}: entità target rotta (${a.entityRef || 'mancante'})`)
  if (!a.sources) addWarning(`Area ${a.id || a._id}: nessuna provenance`)
  if (!a.note) addWarning(`Area ${a.id || a._id}: nota metodologica mancante`)
  if (!a.confidence) addIssue(`Area ${a.id || a._id}: confidence mancante`)
  if (!a.temporal || !isNum(a.temporal.start) || !isNum(a.temporal.end) || a.temporal.start > a.temporal.end) addIssue(`Area ${a.id || a._id}: intervallo temporale non valido`)
  const rings = a.geometry?.rings || []
  if (!rings.length) addIssue(`Area ${a.id || a._id}: geometria senza rings`)
  rings.forEach((ring,idx) => {
    const pts = ring?.points || []
    if (pts.length < 4) addIssue(`Area ${a.id || a._id}: ring ${idx+1} con ${pts.length} punti (<4)`)
    for (const p of pts) if (!isNum(p?.lat) || !isNum(p?.lng) || p.lat < -90 || p.lat > 90 || p.lng < -180 || p.lng > 180) addIssue(`Area ${a.id || a._id}: coordinata non valida nel ring ${idx+1}`)
  })
}
for (const [id,docs] of areaStable) if (docs.length > 1) addIssue(`ID area duplicato ${id}: ${docs.join(', ')}`)
const referencedAreas = new Set(result.datasets.flatMap(d => d.areaRefs || []))
for (const a of result.areas) if (!referencedAreas.has(a._id)) addWarning(`Area isolata da dataset: ${a.id || a._id}`)

const booksWithDataset = new Set(result.datasets.map(d => d.bookRef).filter(Boolean))
const booksWithoutDataset = result.books.filter(b => !booksWithDataset.has(b._id))
if (booksWithoutDataset.length) notes.push(`Libri senza dataset Historical Explorer: ${booksWithoutDataset.length}`)

console.log('\n=== AUDIT SANITY PRODUCTION · BIBLIA FONTES ===')
console.log(`Documenti totali: ${result.allIds.length}`)
console.log(`Libri canonici: ${result.books.length}`)
console.log(`Capitoli: ${result.chapters.length}`)
console.log(`Testi biblici per capitolo: ${result.biblicalText.length}`)
console.log(`Dataset Historical Explorer: ${result.datasets.length}`)
console.log(`Libri coperti Historical Explorer: ${booksWithDataset.size}/${result.books.length}`)
console.log(`Entità storiche: ${result.entities.length}`)
console.log(`Aree storiche: ${result.areas.length}`)
console.log(`PROBLEMI BLOCCANTI: ${issues.length}`)
console.log(`AVVISI EDITORIALI: ${warnings.length}`)

if (booksWithoutDataset.length) {
  console.log('\n=== LIBRI SENZA HISTORICAL EXPLORER ===')
  for (const b of booksWithoutDataset) console.log(`- ${b.titolo} (${b._id})`)
}
if (issues.length) {
  console.log('\n=== PROBLEMI BLOCCANTI ===')
  for (const x of issues) console.log(`- ${x}`)
}
if (warnings.length) {
  console.log('\n=== AVVISI EDITORIALI ===')
  for (const x of warnings) console.log(`- ${x}`)
}
if (notes.length) {
  console.log('\n=== NOTE ===')
  for (const x of notes) console.log(`- ${x}`)
}

if (issues.length) {
  console.error(`\n✗ Audit fallito: ${issues.length} problemi bloccanti.`)
  process.exitCode = 1
} else {
  console.log('\n✓ Dataset production strutturalmente coerente secondo il gate corrente.')
}
