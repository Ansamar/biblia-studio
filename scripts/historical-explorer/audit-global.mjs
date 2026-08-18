import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-08-15'})

const result = await client.fetch(`{
  "books": *[_type == "libro"]{_id, titolo},
  "datasets": *[_type == "historicalExplorerDataset"]{
    _id, id, title,
    "bookRef": book._ref,
    "bookExists": defined(book->._id),
    "entityRefs": entities[]._ref,
    "brokenEntityRefs": count(entities[!defined(@->._id)]),
    "areaRefs": areas[]._ref,
    "brokenAreaRefs": count(areas[!defined(@->._id)]),
    "scenarioCount": count(scenarios)
  },
  "entities": *[_type == "historicalEntity"]{
    _id, id, label, type, epistemicStatus,
    "relations": relations[]{"targetRef": target._ref, "targetExists": defined(target->._id)},
    "sources": count(sources),
    "biblicalRefs": biblicalRefs[]{bookSlug, chapterStart, chapterEnd, verseStart, verseEnd}
  },
  "areas": *[_type == "historicalArea"]{
    _id, id, label,
    "entityRef": entity._ref,
    "entityExists": defined(entity->._id),
    "sources": count(sources),
    "rings": count(geometry.rings),
    "points": count(geometry.rings[].points[])
  }
}`)

const issues = []
const warnings = []

const booksById = new Map(result.books.map((book) => [book._id, book]))
const datasetsByBook = new Map()
for (const dataset of result.datasets) {
  if (!dataset.bookExists) issues.push(`Dataset ${dataset.id}: reference libro rotta (${dataset.bookRef || 'mancante'})`)
  if (dataset.brokenEntityRefs) issues.push(`Dataset ${dataset.id}: ${dataset.brokenEntityRefs} reference entità rotte`)
  if (dataset.brokenAreaRefs) issues.push(`Dataset ${dataset.id}: ${dataset.brokenAreaRefs} reference area rotte`)
  if (dataset.bookRef) {
    if (!datasetsByBook.has(dataset.bookRef)) datasetsByBook.set(dataset.bookRef, [])
    datasetsByBook.get(dataset.bookRef).push(dataset.id)
  }
}

for (const [bookRef, ids] of datasetsByBook) {
  if (ids.length > 1) issues.push(`Libro ${booksById.get(bookRef)?.titolo || bookRef}: dataset multipli (${ids.join(', ')})`)
}

const entitiesByStableId = new Map()
for (const entity of result.entities) {
  if (!entity.id) issues.push(`Entità ${entity._id}: id stabile mancante`)
  else {
    if (!entitiesByStableId.has(entity.id)) entitiesByStableId.set(entity.id, [])
    entitiesByStableId.get(entity.id).push(entity._id)
  }
  if (!entity.sources) warnings.push(`Entità ${entity.id || entity._id}: nessuna fonte/provenance`)
  const brokenRelations = (entity.relations || []).filter((relation) => !relation.targetExists)
  if (brokenRelations.length) issues.push(`Entità ${entity.id || entity._id}: ${brokenRelations.length} relazioni rotte`)

  for (const ref of entity.biblicalRefs || []) {
    if (!ref?.bookSlug) issues.push(`Entità ${entity.id || entity._id}: riferimento biblico senza bookSlug`)
    if (ref?.chapterStart != null && ref?.chapterEnd != null && ref.chapterStart > ref.chapterEnd) {
      issues.push(`Entità ${entity.id || entity._id}: intervallo capitoli invertito`)
    }
    if (ref?.verseStart != null && ref?.verseEnd != null && ref.verseStart > ref.verseEnd) {
      issues.push(`Entità ${entity.id || entity._id}: intervallo versetti invertito`)
    }
  }
}

for (const [stableId, docs] of entitiesByStableId) {
  if (docs.length > 1) issues.push(`ID entità duplicato ${stableId}: ${docs.join(', ')}`)
}

const referencedEntities = new Set(result.datasets.flatMap((dataset) => dataset.entityRefs || []))
for (const entity of result.entities) {
  if (!referencedEntities.has(entity._id)) warnings.push(`Entità isolata da dataset: ${entity.id || entity._id}`)
}

const areasByStableId = new Map()
for (const area of result.areas) {
  if (!area.id) issues.push(`Area ${area._id}: id stabile mancante`)
  else {
    if (!areasByStableId.has(area.id)) areasByStableId.set(area.id, [])
    areasByStableId.get(area.id).push(area._id)
  }
  if (!area.entityExists) issues.push(`Area ${area.id || area._id}: target entità rotto (${area.entityRef || 'mancante'})`)
  if (!area.sources) warnings.push(`Area ${area.id || area._id}: nessuna provenance`)
  if (!area.rings || area.points < 4) issues.push(`Area ${area.id || area._id}: geometria insufficiente (${area.rings} rings, ${area.points} punti)`)
}
for (const [stableId, docs] of areasByStableId) {
  if (docs.length > 1) issues.push(`ID area duplicato ${stableId}: ${docs.join(', ')}`)
}

const referencedAreas = new Set(result.datasets.flatMap((dataset) => dataset.areaRefs || []))
for (const area of result.areas) {
  if (!referencedAreas.has(area._id)) warnings.push(`Area isolata da dataset: ${area.id || area._id}`)
}

const booksWithDataset = new Set(result.datasets.map((dataset) => dataset.bookRef).filter(Boolean))
const booksWithoutDataset = result.books.filter((book) => !booksWithDataset.has(book._id))

console.log('\n=== AUDIT GLOBALE · HISTORICAL EXPLORER ===')
console.log(`Libri canonici: ${result.books.length}`)
console.log(`Dataset Historical Explorer: ${result.datasets.length}`)
console.log(`Libri coperti: ${booksWithDataset.size}/${result.books.length}`)
console.log(`Entità: ${result.entities.length}`)
console.log(`Aree: ${result.areas.length}`)
console.log(`Problemi bloccanti: ${issues.length}`)
console.log(`Avvisi editoriali: ${warnings.length}`)

if (booksWithoutDataset.length) {
  console.log('\n=== LIBRI SENZA DATASET ===')
  for (const book of booksWithoutDataset) console.log(`- ${book.titolo} (${book._id})`)
}

if (issues.length) {
  console.log('\n=== PROBLEMI BLOCCANTI ===')
  for (const issue of issues) console.log(`- ${issue}`)
}

if (warnings.length) {
  console.log('\n=== AVVISI EDITORIALI ===')
  for (const warning of warnings) console.log(`- ${warning}`)
}

if (issues.length) {
  throw new Error(`Audit globale fallito: ${issues.length} problemi bloccanti.`)
}

console.log('\n✓ Knowledge graph Historical Explorer strutturalmente coerente.')
