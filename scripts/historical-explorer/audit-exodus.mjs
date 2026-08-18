import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-08-15'})

const result = await client.fetch(`{
  "dataset": *[_type == "historicalExplorerDataset" && id == "exodus-history"][0]{
    _id,
    id,
    title,
    "bookRef": book._ref,
    "bookTitle": book->titolo,
    "entities": count(entities),
    "areas": count(areas),
    "scenarios": count(scenarios),
    quickYears,
    "brokenEntityRefs": count(entities[!defined(@->._id)]),
    "brokenAreaRefs": count(areas[!defined(@->._id)])
  },
  "entities": *[_type == "historicalEntity" && _id in *[_type == "historicalExplorerDataset" && id == "exodus-history"][0].entities[]._ref]{
    _id,
    id,
    label,
    epistemicStatus,
    "relations": count(relations),
    "brokenRelations": count(relations[!defined(target->._id)]),
    "biblicalRefs": count(biblicalRefs),
    "sources": count(sources)
  } | order(label asc),
  "areas": *[_type == "historicalArea" && _id in *[_type == "historicalExplorerDataset" && id == "exodus-history"][0].areas[]._ref]{
    _id,
    id,
    label,
    confidence,
    "entityRef": entity._ref,
    "entityId": entity->id,
    "rings": count(geometry.rings),
    "sources": count(sources)
  } | order(label asc)
}`)

console.log('\n=== AUDIT HISTORICAL EXPLORER · ESODO ===')
console.dir(result, {depth: null, colors: true})

if (!result.dataset) throw new Error('Dataset exodus-history non trovato.')

const errors = []
if (result.dataset.bookRef !== 'libro-esodo') errors.push(`bookRef inatteso: ${result.dataset.bookRef}`)
if (result.dataset.entities !== 11) errors.push(`entità attese 11, trovate ${result.dataset.entities}`)
if (result.dataset.areas !== 1) errors.push(`aree attese 1, trovate ${result.dataset.areas}`)
if (result.dataset.scenarios !== 4) errors.push(`scenari attesi 4, trovati ${result.dataset.scenarios}`)
if (result.dataset.brokenEntityRefs) errors.push(`reference entità rotte: ${result.dataset.brokenEntityRefs}`)
if (result.dataset.brokenAreaRefs) errors.push(`reference aree rotte: ${result.dataset.brokenAreaRefs}`)

for (const entity of result.entities || []) {
  if (entity.brokenRelations) errors.push(`${entity.id}: ${entity.brokenRelations} relazioni rotte`)
  if (!entity.sources) errors.push(`${entity.id}: nessuna fonte/provenance`)
}
for (const area of result.areas || []) {
  if (!area.entityId) errors.push(`${area.id}: target entità non risolto`)
  if (!area.rings) errors.push(`${area.id}: geometria senza rings`)
  if (!area.sources) errors.push(`${area.id}: geometria senza provenance`)
}

if (errors.length) {
  console.error('\n✖ Audit non superato:')
  for (const error of errors) console.error(`- ${error}`)
  process.exitCode = 1
} else {
  console.log('\n✓ Audit Esodo superato: dataset, reference, relazioni e provenance coerenti.')
}
