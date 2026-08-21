import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-08-15'})

const doc = await client.fetch(`*[_id == "testo-daniele-susanna-og-sus-1"][0]{
  _id,numero,lingua,tradizione,edizione,diritti,importazione,siglaSorgente,testimone,
  versetti[]{_key,_type,numero,testo}
}`)

if (!doc) throw new Error('Documento susanna_og non trovato.')

const verses = Array.isArray(doc.versetti) ? doc.versetti : []
const normalized = verses.map((v, index) => ({
  index,
  numero: Number(v.numero),
  testo: typeof v.testo === 'string' ? v.testo.normalize('NFC') : '',
}))

const blank = normalized.filter((v) => !v.testo.trim())
const nonBlank = normalized.filter((v) => v.testo.trim())
const invalidNumbers = normalized.filter((v) => !Number.isFinite(v.numero))
const numbers = normalized.map((v) => v.numero).filter(Number.isFinite)
const duplicates = [...new Set(numbers.filter((n, i) => numbers.indexOf(n) !== i))].sort((a,b)=>a-b)
const gaps = []
if (numbers.length) {
  const min = Math.min(...numbers)
  const max = Math.max(...numbers)
  const set = new Set(numbers)
  for (let n=min;n<=max;n++) if (!set.has(n)) gaps.push(n)
}

console.log('\n=== AUDIT QUALITÀ · SUSANNA OLD GREEK ===')
console.log(`ID: ${doc._id}`)
console.log(`Versetti array: ${verses.length}`)
console.log(`Numeri validi: ${numbers.length}`)
console.log(`Versetti non vuoti: ${nonBlank.length}`)
console.log(`Versetti vuoti: ${blank.length}`)
console.log(`Numeri non validi: ${invalidNumbers.length}`)
console.log(`Duplicati numero: ${duplicates.length ? duplicates.join(', ') : 'nessuno'}`)
console.log(`Gap numerazione: ${gaps.length ? gaps.join(', ') : 'nessuno'}`)

if (blank.length) {
  console.log('\n=== VERSETTI VUOTI ===')
  for (const v of blank) console.log(`- index=${v.index} numero=${v.numero}`)
}

console.log('\n=== PRIMI 15 ELEMENTI RAW ===')
for (const v of normalized.slice(0,15)) {
  console.log(`- index=${v.index} numero=${v.numero} testo=${JSON.stringify(v.testo.slice(0,160))}`)
}

console.log('\n=== PRIMI 10 NON VUOTI ===')
for (const v of nonBlank.slice(0,10)) {
  console.log(`- index=${v.index} numero=${v.numero} testo=${v.testo.slice(0,220)}`)
}

console.log('\n=== ULTIMI 10 NON VUOTI ===')
for (const v of nonBlank.slice(-10)) {
  console.log(`- index=${v.index} numero=${v.numero} testo=${v.testo.slice(0,220)}`)
}

console.log('\n=== METADATI ===')
console.log(`sigla=${doc.siglaSorgente || '∅'}`)
console.log(`testimone=${doc.testimone || '∅'}`)
console.log(`diritti=${JSON.stringify(doc.diritti || null)}`)
console.log(`importazione=${JSON.stringify(doc.importazione || null)}`)

console.log('\nAUDIT COMPLETATO: nessuna mutazione Sanity eseguita.')
