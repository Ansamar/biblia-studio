import {getCliClient} from 'sanity/cli'

const client = getCliClient({
  apiVersion: '2025-08-15',
  dataset: 'production',
})

const commit = process.argv.includes('--commit')

const query = `
*[
  _type == "testoBiblicoCapitolo" &&
  libro._ref == "libro-salmi"
]{
  _id,
  numero,
  numeroAlternativo,
  edizione,
  lingua,
  tradizione,
  testimone,
  versetti[]{
    _key,
    numero,
    testo,
    riferimentoAlternativo
  }
} | order(numero asc)
`

const docs = await client.fetch(query)

const token = String.raw`\d{1,3}(?:\s*\(\d{1,3},\d{1,3}\))?`
const leakedRun = new RegExp(String.raw`(^|\s)${token}(?:\s+${token}){2,}(?=\s|$)`, 'g')
const leakedRunTest = new RegExp(String.raw`(^|\s)${token}(?:\s+${token}){2,}(?=\s|$)`)

function cleanLeakedParallelNumbering(value = '') {
  return value.replace(leakedRun, '$1').replace(/\s{2,}/g, ' ').trim()
}

const anomalies = []
let safeRepairs = 0
let suspiciousMerges = 0

for (const doc of docs) {
  const verses = Array.isArray(doc.versetti) ? doc.versetti : []
  let changed = false
  const nextVerses = verses.map((verse) => {
    const raw = verse?.testo || ''
    const hasLeak = leakedRunTest.test(raw)
    const unusuallyLong = raw.length > 850
    const altRefsInText = (raw.match(/\(\d{1,3},\d{1,3}\)/g) || []).length
    const probableMerge = unusuallyLong || altRefsInText >= 4

    if (hasLeak || probableMerge) {
      anomalies.push({
        document: doc._id,
        psalm: doc.numero,
        verse: verse.numero,
        edition: doc.edizione || doc.tradizione || doc.testimone || 'n/d',
        length: raw.length,
        leakedParallelRun: hasLeak,
        alternateRefsInsideText: altRefsInText,
        probableMergedVerses: probableMerge,
        preview: raw.slice(0, 240),
      })
    }

    if (probableMerge) suspiciousMerges++

    if (!hasLeak) return verse

    const cleaned = cleanLeakedParallelNumbering(raw)
    if (!cleaned || cleaned === raw) return verse

    changed = true
    safeRepairs++
    return {...verse, testo: cleaned}
  })

  if (commit && changed) {
    await client.patch(doc._id).set({versetti: nextVerses}).commit()
    console.log(`✓ Ripulito ${doc._id}`)
  }
}

console.log('')
console.log('=== AUDIT NUMERAZIONE SALMI ===')
console.log(`Documenti controllati: ${docs.length}`)
console.log(`Anomalie rilevate: ${anomalies.length}`)
console.log(`Riparazioni sicure disponibili: ${safeRepairs}`)
console.log(`Versetti da verificare manualmente per possibile accorpamento: ${suspiciousMerges}`)
console.log(`Modalità: ${commit ? 'COMMIT' : 'DRY RUN'}`)
console.log('')

for (const item of anomalies) {
  console.log(`Sal ${item.psalm},${item.verse} · ${item.edition}`)
  console.log(`  lunghezza=${item.length} · sequenzaNumerica=${item.leakedParallelRun ? 'sì' : 'no'} · riferimentiNelTesto=${item.alternateRefsInsideText} · possibileAccorpamento=${item.probableMergedVerses ? 'sì' : 'no'}`)
  console.log(`  ${item.preview.replace(/\s+/g, ' ')}`)
  console.log('')
}

if (!commit) {
  console.log('Nessuna mutazione eseguita.')
  console.log('Per applicare SOLO la rimozione delle sequenze numeriche chiaramente estranee al testo:')
  console.log('npx sanity exec scripts/maintenance/audit-repair-psalm-numbering.mjs --with-user-token -- --commit')
  console.log('')
  console.log('I versetti segnalati come possibile accorpamento NON vengono separati automaticamente.')
}
