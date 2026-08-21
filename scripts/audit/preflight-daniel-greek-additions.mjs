import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-08-15'})

const sample = await client.fetch(`*[_type == "testoBiblicoCapitolo" && libro._ref == "libro-daniele" && tradizione == "daniele_greco_og"]|order(numero asc)[0]`)
if (!sample) throw new Error('Nessun documento campione daniele_greco_og trovato in production.')

console.log('\n=== CAMPIONE SANITY · DANIELE GRECO OG ===')
console.log(`ID: ${sample._id}`)
console.log(`Campi documento: ${Object.keys(sample).sort().join(', ')}`)
console.log(`Numero: ${sample.numero}`)
console.log(`Lingua: ${sample.lingua}`)
console.log(`Tradizione: ${sample.tradizione}`)
console.log(`Edizione: ${sample.edizione}`)
console.log(`Versetti: ${Array.isArray(sample.versetti) ? sample.versetti.length : 'non-array'}`)
if (Array.isArray(sample.versetti) && sample.versetti.length) {
  console.log(`Campi versetto: ${Object.keys(sample.versetti[0]).sort().join(', ')}`)
  console.log(`Primo versetto numero: ${sample.versetti[0].numero ?? sample.versetti[0].verse ?? '?'}`)
}

const endpoints = [
  ['OG · Susanna → Dn 13', 'susanna'],
  ['Teodozione · Susanna → Dn 13', 'susanna-theodotion'],
  ['OG · Bel e il Drago → Dn 14', 'bel-and-the-dragon'],
  ['Teodozione · Bel e il Drago → Dn 14', 'bel-and-the-dragon-theodotion'],
]

for (const [label, book] of endpoints) {
  const url = `https://openscriptorium.org/api/v1/works/swete-lxx/${book}/1`
  const res = await fetch(url, {headers: {'accept': 'application/json'}})
  console.log(`\n=== ${label} ===`)
  console.log(`URL: ${url}`)
  console.log(`HTTP: ${res.status}`)
  if (!res.ok) {
    console.log(`Errore: ${await res.text()}`)
    continue
  }
  const data = await res.json()
  console.log(`Chiavi root: ${Object.keys(data).sort().join(', ')}`)
  const candidates = [data.verses, data.verse, data.items, data.data, data.results].filter(Array.isArray)
  const verses = candidates[0] || (Array.isArray(data) ? data : [])
  console.log(`Versetti rilevati: ${verses.length}`)
  if (verses.length) {
    console.log(`Campi primo item: ${Object.keys(verses[0]).sort().join(', ')}`)
    console.log(`Primo item: ${JSON.stringify(verses[0]).slice(0, 500)}`)
    console.log(`Ultimo item: ${JSON.stringify(verses.at(-1)).slice(0, 500)}`)
  } else {
    console.log(`Anteprima JSON: ${JSON.stringify(data).slice(0, 1000)}`)
  }
}

console.log('\nPRE-FLIGHT COMPLETATO: nessuna mutazione Sanity eseguita.')
