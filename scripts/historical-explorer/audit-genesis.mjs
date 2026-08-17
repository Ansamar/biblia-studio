import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-08-15'})

const result = await client.fetch(`{
  "dataset": *[_type == "historicalExplorerDataset" && id == "genesis-history"][0]{
    _id,
    id,
    title,
    "bookRef": book._ref,
    defaultRange,
    quickYears,
    "entityRefs": entities[]._ref,
    "areaRefs": areas[]._ref,
    "scenarios": scenarios[]{id,start,end,title}
  },
  "entities": *[_type == "historicalEntity"]{
    _id,
    id,
    label,
    type,
    epistemicStatus,
    temporal,
    spatial,
    "relationRefs": relations[].target._ref,
    "biblicalRefs": biblicalRefs[]{display,bookSlug,chapterStart,chapterEnd,verseStart,verseEnd},
    "sourceKinds": sources[].kind
  },
  "areas": *[_type == "historicalArea"]{
    _id,
    id,
    label,
    "entityRef": entity._ref,
    temporal,
    confidence,
    "ringPointCounts": geometry.rings[]{"count": count(points)},
    "sourceKinds": sources[].kind
  }
}`)

const dataset = result.dataset
if (!dataset) throw new Error('Dataset genesis-history non trovato.')

const selectedEntityIds = new Set(dataset.entityRefs || [])
const selectedAreaIds = new Set(dataset.areaRefs || [])
const entities = (result.entities || []).filter((doc) => selectedEntityIds.has(doc._id))
const areas = (result.areas || []).filter((doc) => selectedAreaIds.has(doc._id))
const allDocIds = new Set([...(result.entities || []).map((doc) => doc._id), ...(result.areas || []).map((doc) => doc._id)])

const errors = []
const warnings = []

if (dataset.bookRef !== 'libro-genesi') errors.push(`bookRef inatteso: ${dataset.bookRef}`)
if (entities.length !== selectedEntityIds.size) errors.push(`Entità risolte ${entities.length}/${selectedEntityIds.size}`)
if (areas.length !== selectedAreaIds.size) errors.push(`Aree risolte ${areas.length}/${selectedAreaIds.size}`)

const stableIds = new Set()
for (const entity of entities) {
  if (!entity.id) errors.push(`${entity._id}: id stabile mancante`)
  if (stableIds.has(entity.id)) errors.push(`ID stabile duplicato: ${entity.id}`)
  stableIds.add(entity.id)

  if (!entity.sourceKinds?.length) warnings.push(`${entity.id}: nessuna provenance`)
  if (entity.sourceKinds?.some((kind) => !kind)) warnings.push(`${entity.id}: provenance non classificata`)

  for (const target of entity.relationRefs || []) {
    if (!allDocIds.has(target)) errors.push(`${entity.id}: relazione rotta verso ${target}`)
  }

  for (const ref of entity.biblicalRefs || []) {
    if (!ref.display || !ref.bookSlug) errors.push(`${entity.id}: riferimento biblico incompleto`)
    if (ref.chapterStart && ref.chapterEnd && ref.chapterStart > ref.chapterEnd) errors.push(`${entity.id}: intervallo capitoli invertito ${ref.display}`)
    if (ref.verseStart && ref.verseEnd && ref.verseStart > ref.verseEnd) errors.push(`${entity.id}: intervallo versetti invertito ${ref.display}`)
  }

  if (entity.temporal?.start != null && entity.temporal?.end != null && entity.temporal.start > entity.temporal.end) {
    errors.push(`${entity.id}: intervallo temporale invertito`)
  }
}

for (const area of areas) {
  if (!area.entityRef || !allDocIds.has(area.entityRef)) errors.push(`${area.id}: entityRef rotto`)
  if (!area.sourceKinds?.length) warnings.push(`${area.id}: provenance geometrica mancante`)
  if (area.sourceKinds?.some((kind) => !kind)) warnings.push(`${area.id}: provenance geometrica non classificata`)
  if (!area.ringPointCounts?.length) errors.push(`${area.id}: nessun ring geografico`)
  if (area.ringPointCounts?.some((ring) => ring.count < 4)) errors.push(`${area.id}: ring con meno di 4 punti`)
  if (area.temporal?.start > area.temporal?.end) errors.push(`${area.id}: intervallo temporale invertito`)
}

console.log('\n=== AUDIT HISTORICAL EXPLORER · GENESI ===')
console.log(`Project: ${client.config().projectId}`)
console.log(`Dataset Sanity: ${client.config().dataset}`)
console.log(`Documento dataset: ${dataset._id}`)
console.log(`Entità: ${entities.length}`)
console.log(`Aree: ${areas.length}`)
console.log(`Scenari: ${dataset.scenarios?.length || 0}`)
console.log(`Quick years: ${dataset.quickYears?.length || 0}`)
console.log(`Errori: ${errors.length}`)
console.log(`Avvisi: ${warnings.length}`)

if (warnings.length) {
  console.log('\n--- AVVISI ---')
  warnings.forEach((warning) => console.log(`• ${warning}`))
}

if (errors.length) {
  console.log('\n--- ERRORI ---')
  errors.forEach((error) => console.log(`✗ ${error}`))
  process.exitCode = 1
} else {
  console.log('\n✓ Dataset Historical Explorer di Genesi strutturalmente coerente.')
}
