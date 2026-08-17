import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-08-15'})
const commit = process.argv.includes('--commit')

const ids = ['libro-esodo', 'libro-levitico', 'libro-numeri']
const docs = await client.fetch(`*[_id in $ids]{_id,titolo,contestoStorico}`, {ids})

console.log('\n=== MIGRAZIONE contestoStorico LEGACY ===')
console.log(`Project: ${client.config().projectId}`)
console.log(`Dataset: ${client.config().dataset}`)
console.log(`Documenti trovati: ${docs.length}`)
console.log(`Modalità: ${commit ? 'COMMIT' : 'DRY RUN'}`)

let transaction = client.transaction()
let candidates = 0
let skipped = 0

for (const doc of docs) {
  const value = doc.contestoStorico

  if (typeof value !== 'string') {
    console.log(`SKIP ${doc._id}: contestoStorico è già ${Array.isArray(value) ? 'Array' : typeof value}`)
    skipped += 1
    continue
  }

  candidates += 1
  const migrated = [
    {
      _key: 'contesto-storico-legacy',
      _type: 'object',
      etichetta: 'Contesto storico',
      descrizione: value,
    },
  ]

  console.log(`MIGRA ${doc._id} · ${doc.titolo || ''}`)
  console.log(`  Testo preservato: ${value.length} caratteri`)

  transaction = transaction.patch(doc._id, patch => patch.set({contestoStorico: migrated}))
}

console.log(`\nDa migrare: ${candidates}`)
console.log(`Saltati: ${skipped}`)

if (!commit) {
  console.log('\nNessuna mutazione eseguita. Per scrivere:')
  console.log('npx sanity exec scripts/maintenance/migrate-libro-contesto-storico.mjs --with-user-token -- --commit')
  process.exit(0)
}

if (!candidates) {
  console.log('\nNessuna mutazione necessaria.')
  process.exit(0)
}

await transaction.commit()
console.log(`\n✓ Migrati ${candidates} documenti senza alterare il testo legacy.`)
