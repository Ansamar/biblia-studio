import {getCliClient} from 'sanity/cli'
import {buildHistoricalExplorerDocuments} from './build-dataset.mjs'

export async function runHistoricalSeed(seed, label) {
  const client = getCliClient({apiVersion: '2025-08-15'})
  const commit = process.argv.includes('--commit')
  const {docs, entityDocs, areaDocs, sharedEntityRefs, validation} = buildHistoricalExplorerDocuments(seed)

  const existingBook = await client.fetch(`defined(*[_id == $id][0]._id)`, {id: seed.bookRef})
  if (!existingBook) throw new Error(`Riferimento ${seed.bookRef} non trovato nel dataset configurato.`)

  if (sharedEntityRefs.length) {
    const found = await client.fetch(`*[_id in $ids]._id`, {ids: sharedEntityRefs})
    const foundSet = new Set(found)
    const missing = sharedEntityRefs.filter((id) => !foundSet.has(id))
    if (missing.length) throw new Error(`Entità condivise mancanti in Sanity: ${missing.join(', ')}`)
  }

  console.log(`\n=== HISTORICAL EXPLORER · ${label.toUpperCase()} ===`)
  console.log(`Project: ${client.config().projectId}`)
  console.log(`Dataset: ${client.config().dataset}`)
  console.log(`Entità locali: ${entityDocs.length}`)
  console.log(`Entità condivise: ${sharedEntityRefs.length}`)
  console.log(`Entità dataset: ${entityDocs.length + sharedEntityRefs.length}`)
  console.log(`Aree: ${areaDocs.length}`)
  console.log('Dataset: 1')
  console.log(`Documenti scrivibili: ${docs.length}`)
  console.log(`Relazioni rotte: ${validation.brokenRelations.length}`)
  console.log(`Modalità: ${commit ? 'COMMIT' : 'DRY RUN'}`)

  if (!commit) {
    console.log('\nNessuna mutazione eseguita. Aggiungere -- --commit per scrivere.')
    return
  }

  let tx = client.transaction()
  for (const doc of docs) tx = tx.createOrReplace(doc)
  const result = await tx.commit({visibility: 'sync'})
  console.log(`\n✓ Scritti ${docs.length} documenti Historical Explorer per ${label}.`)
  console.log(`Transaction: ${result.transactionId || 'completata'}`)
}
