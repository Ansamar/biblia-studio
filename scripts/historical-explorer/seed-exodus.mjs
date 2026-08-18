import {getCliClient} from 'sanity/cli'
import {buildHistoricalExplorerDocuments} from './lib/build-dataset.mjs'
import {exodusSeed} from './data/exodus.mjs'

const client = getCliClient({apiVersion: '2025-08-15'})
const commit = process.argv.includes('--commit')

const {docs, entityDocs, areaDocs, validation} = buildHistoricalExplorerDocuments(exodusSeed)

const existingBook = await client.fetch(`defined(*[_id == $id][0]._id)`, {id: exodusSeed.bookRef})
if (!existingBook) throw new Error(`Riferimento ${exodusSeed.bookRef} non trovato nel dataset configurato.`)

console.log('\n=== HISTORICAL EXPLORER · ESODO ===')
console.log(`Project: ${client.config().projectId}`)
console.log(`Dataset: ${client.config().dataset}`)
console.log(`Entità: ${entityDocs.length}`)
console.log(`Aree: ${areaDocs.length}`)
console.log('Dataset: 1')
console.log(`Documenti totali: ${docs.length}`)
console.log(`Relazioni rotte: ${validation.brokenRelations.length}`)
console.log(`Modalità: ${commit ? 'COMMIT' : 'DRY RUN'}`)

if (!commit) {
  console.log('\nNessuna mutazione eseguita. Per scrivere:')
  console.log('npx sanity exec scripts/historical-explorer/seed-exodus.mjs --with-user-token -- --commit')
  process.exit(0)
}

let tx = client.transaction()
for (const doc of docs) tx = tx.createOrReplace(doc)
const result = await tx.commit({visibility: 'sync'})
console.log(`\n✓ Scritti ${docs.length} documenti Historical Explorer per Esodo.`)
console.log(`Transaction: ${result.transactionId || 'completata'}`)
