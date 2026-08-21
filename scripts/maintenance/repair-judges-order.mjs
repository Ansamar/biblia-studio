import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-08-15'})
const commit = process.argv.slice(2).includes('--commit')

const ids = {
  giosue: 'libro-giosue',
  giudici: 'libro-giudici',
  rut: 'libro-rut',
}

const docs = await client.fetch(`*[_id in $ids]{_id,_rev,titolo,ordine,capitoli}`, {ids: Object.values(ids)})
const byId = new Map(docs.map((doc) => [doc._id, doc]))

const giosue = byId.get(ids.giosue)
const giudici = byId.get(ids.giudici)
const rut = byId.get(ids.rut)

if (!giosue || !giudici || !rut) {
  throw new Error(`Guardia fallita: servono Giosuè, Giudici e Rut. Trovati: ${docs.map((d) => d._id).join(', ')}`)
}

if (!Number.isFinite(giosue.ordine) || !Number.isFinite(rut.ordine)) {
  throw new Error(`Guardia fallita: ordine dei libri adiacenti non valido (Giosuè=${giosue.ordine}, Rut=${rut.ordine}).`)
}

const expected = giosue.ordine + 1
if (rut.ordine !== expected + 1) {
  throw new Error(`Guardia fallita: sequenza canonica non contigua (Giosuè=${giosue.ordine}, atteso Giudici=${expected}, Rut=${rut.ordine}).`)
}

console.log('\n=== REPAIR ORDINE CANONICO · GIUDICI ===')
console.log(`Giosuè:  ordine=${giosue.ordine}`)
console.log(`Giudici: ordine=${giudici.ordine ?? 'MANCANTE'}`)
console.log(`Rut:     ordine=${rut.ordine}`)
console.log(`Ordine atteso per Giudici: ${expected}`)
console.log(`Modalità: ${commit ? 'COMMIT' : 'DRY RUN'}`)

if (giudici.ordine === expected) {
  console.log('\n✓ Giudici è già correttamente ordinato. Nessuna modifica necessaria.')
  process.exit(0)
}

if (giudici.ordine != null && !Number.isFinite(giudici.ordine)) {
  throw new Error(`Guardia fallita: Giudici contiene un valore ordine non numerico (${String(giudici.ordine)}).`)
}

if (!commit) {
  console.log(`\nPiano: impostare solo ${giudici._id}.ordine = ${expected}`)
  console.log('Nessuna mutazione eseguita.')
  console.log('\nPer applicare:')
  console.log('npx sanity exec scripts/maintenance/repair-judges-order.mjs --with-user-token -- --commit')
  process.exit(0)
}

await client.patch(giudici._id).ifRevisionId(giudici._rev).set({ordine: expected}).commit()

const verify = await client.fetch(`*[_id == $id][0]{_id,_rev,titolo,ordine}`, {id: giudici._id})
if (!verify || verify.ordine !== expected) {
  throw new Error(`Verifica post-commit fallita: ordine atteso ${expected}, trovato ${verify?.ordine}.`)
}

console.log(`\n✓ Riparazione completata e verificata: ${verify.titolo}.ordine = ${verify.ordine}`)
console.log(`Nuova revisione: ${verify._rev}`)
console.log('\nOra rieseguire:')
console.log('npx sanity exec scripts/audit/audit-sanity-production.mjs --with-user-token')
