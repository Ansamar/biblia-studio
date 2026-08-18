import {getCliClient} from 'sanity/cli'

export async function runHistoricalAudit(seed, label) {
  const client = getCliClient({apiVersion: '2025-08-15'})
  const result = await client.fetch(`{
    "dataset": *[_type == "historicalExplorerDataset" && id == $datasetId][0]{
      _id, id, title,
      "bookRef": book._ref,
      "bookTitle": book->titolo,
      "entities": count(entities),
      "areas": count(areas),
      "scenarios": count(scenarios),
      quickYears,
      "brokenEntityRefs": count(entities[!defined(@->._id)]),
      "brokenAreaRefs": count(areas[!defined(@->._id)])
    },
    "entities": *[_type == "historicalEntity" && _id in *[_type == "historicalExplorerDataset" && id == $datasetId][0].entities[]._ref]{
      _id, id, label, type, epistemicStatus,
      "relations": count(relations),
      "brokenRelations": count(relations[!defined(target->._id)]),
      "biblicalRefs": count(biblicalRefs),
      "sources": count(sources),
      "unclassifiedSources": count(sources[!defined(kind)])
    } | order(label asc),
    "areas": *[_type == "historicalArea" && _id in *[_type == "historicalExplorerDataset" && id == $datasetId][0].areas[]._ref]{
      _id, id, label, confidence,
      "entityRef": entity._ref,
      "entityId": entity->id,
      "rings": count(geometry.rings),
      "sources": count(sources),
      "unclassifiedSources": count(sources[!defined(kind)])
    } | order(label asc)
  }`, {datasetId: seed.datasetId})

  console.log(`\n=== AUDIT HISTORICAL EXPLORER · ${label.toUpperCase()} ===`)
  console.dir(result, {depth: null, colors: true})
  if (!result.dataset) throw new Error(`Dataset ${seed.datasetId} non trovato.`)

  const errors = []
  const expectedEntities = (seed.entities?.length || 0) + (seed.sharedEntities?.length || 0)
  const expectedAreas = seed.areas?.length || 0
  const expectedScenarios = seed.scenarios?.length || 0

  if (result.dataset.bookRef !== seed.bookRef) errors.push(`bookRef inatteso: ${result.dataset.bookRef}`)
  if (result.dataset.entities !== expectedEntities) errors.push(`entità attese ${expectedEntities}, trovate ${result.dataset.entities}`)
  if (result.dataset.areas !== expectedAreas) errors.push(`aree attese ${expectedAreas}, trovate ${result.dataset.areas}`)
  if (result.dataset.scenarios !== expectedScenarios) errors.push(`scenari attesi ${expectedScenarios}, trovati ${result.dataset.scenarios}`)
  if (result.dataset.brokenEntityRefs) errors.push(`reference entità rotte: ${result.dataset.brokenEntityRefs}`)
  if (result.dataset.brokenAreaRefs) errors.push(`reference aree rotte: ${result.dataset.brokenAreaRefs}`)

  for (const entity of result.entities || []) {
    if (entity.brokenRelations) errors.push(`${entity.id}: ${entity.brokenRelations} relazioni rotte`)
    if (!entity.sources) errors.push(`${entity.id}: nessuna fonte/provenance`)
    if (entity.unclassifiedSources) errors.push(`${entity.id}: ${entity.unclassifiedSources} fonti non classificate`)
  }
  for (const area of result.areas || []) {
    if (!area.entityId) errors.push(`${area.id}: target entità non risolto`)
    if (!area.rings) errors.push(`${area.id}: geometria senza rings`)
    if (!area.sources) errors.push(`${area.id}: geometria senza provenance`)
    if (area.unclassifiedSources) errors.push(`${area.id}: ${area.unclassifiedSources} fonti non classificate`)
  }

  if (errors.length) {
    console.error('\n✖ Audit non superato:')
    for (const error of errors) console.error(`- ${error}`)
    process.exitCode = 1
  } else {
    console.log(`\n✓ Audit ${label} superato: dataset, reference, relazioni e provenance coerenti.`)
  }
}
