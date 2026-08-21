import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-08-15'})
const commit = process.argv.includes('--commit')

const plans = [
  {
    label: 'Genesi LXX 1–3: lxx → greco',
    query: `*[_type == "testoBiblicoCapitolo" && libro._ref == "libro-genesi" && numero in [1,2,3] && lingua == "Greco" && tradizione == "lxx"]{_id,_rev,numero,lingua,tradizione,edizione}`,
    expectedCount: 3,
    expectedNumbers: [1,2,3],
    set: {tradizione: 'greco'},
  },
  {
    label: 'Giosuè LXX 20–24: lxx → lxx_joshua_a',
    query: `*[_type == "testoBiblicoCapitolo" && libro._ref == "libro-giosue" && numero in [20,21,22,23,24] && lingua == "Greco" && tradizione == "lxx"]{_id,_rev,numero,lingua,tradizione,edizione}`,
    expectedCount: 5,
    expectedNumbers: [20,21,22,23,24],
    set: {tradizione: 'lxx_joshua_a'},
  },
  {
    label: 'Salmi 108–150: uniforma edizione italiana',
    query: `*[_type == "testoBiblicoCapitolo" && libro._ref == "libro-salmi" && numero >= 108 && numero <= 150 && lingua == "it" && tradizione == "traduzione_italiana" && edizione == "SALMI — testo italiano di lavoro"]{_id,_rev,numero,lingua,tradizione,edizione}`,
    expectedCount: 43,
    expectedNumbers: Array.from({length:43}, (_,i) => i + 108),
    set: {edizione: 'Testo italiano — edizione di lavoro'},
  },
]

console.log('\n=== NORMALIZZAZIONE METADATI TESTUALI ===')
console.log(`Modalità: ${commit ? 'COMMIT' : 'DRY RUN'}`)

const resolved = []
for (const plan of plans) {
  const docs = await client.fetch(`${plan.query} | order(numero asc)`)
  const nums = docs.map(d => d.numero)
  const sameNumbers = nums.length === plan.expectedNumbers.length && nums.every((n,i) => n === plan.expectedNumbers[i])
  console.log(`\n${plan.label}`)
  console.log(`Documenti trovati: ${docs.length}/${plan.expectedCount}`)
  console.log(`Capitoli: ${nums.join(', ') || 'nessuno'}`)
  if (docs.length !== plan.expectedCount || !sameNumbers) {
    throw new Error(`Guardia fallita per “${plan.label}”: insieme documenti inatteso. Nessuna modifica eseguita.`)
  }
  resolved.push({plan, docs})
}

console.log('\nPiano: solo metadati; nessun versetto/testo viene modificato.')
if (!commit) {
  console.log('Nessuna mutazione eseguita. Aggiungere -- --commit per applicare.')
  process.exit(0)
}

for (const {plan, docs} of resolved) {
  for (const doc of docs) {
    await client.patch(doc._id).ifRevisionId(doc._rev).set(plan.set).commit({visibility:'sync'})
  }
  console.log(`✓ ${plan.label}: ${docs.length} documenti aggiornati`)
}

const verify = await client.fetch(`{
  "gen": count(*[_type == "testoBiblicoCapitolo" && libro._ref == "libro-genesi" && numero in [1,2,3] && lingua == "Greco" && tradizione == "greco"]),
  "jos": count(*[_type == "testoBiblicoCapitolo" && libro._ref == "libro-giosue" && numero in [20,21,22,23,24] && lingua == "Greco" && tradizione == "lxx_joshua_a"]),
  "ps": count(*[_type == "testoBiblicoCapitolo" && libro._ref == "libro-salmi" && numero >= 108 && numero <= 150 && lingua == "it" && tradizione == "traduzione_italiana" && edizione == "Testo italiano — edizione di lavoro"])
}`)
if (verify.gen !== 3 || verify.jos !== 5 || verify.ps !== 43) throw new Error(`Verifica post-commit fallita: ${JSON.stringify(verify)}`)
console.log(`\n✓ Verifica completata: Genesi=${verify.gen}, Giosuè=${verify.jos}, Salmi=${verify.ps}`)
