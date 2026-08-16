import {getCliClient} from 'sanity/cli'

const client = getCliClient({
  apiVersion: '2025-08-15',
  dataset: 'production',
})

const query = `
*[
  _type == "testoBiblicoCapitolo" &&
  importazione.parser match "Biblia Fontes Latin*" &&
  (
    libro._weak == true ||
    capitolo._weak == true
  )
]{
  _id,
  libro,
  capitolo
}
`

const docs = await client.fetch(query)

console.log(`Documenti da controllare: ${docs.length}`)

let aggiornati = 0
let errori = 0

for (const doc of docs) {
  const set = {}

  if (doc.libro?._ref && doc.libro?._weak === true) {
    const libroExists = await client.fetch(
      `defined(*[_id == $id][0]._id)`,
      {id: doc.libro._ref},
    )

    if (!libroExists) {
      console.error(
        `ERRORE ${doc._id}: libro inesistente ${doc.libro._ref}`,
      )
      errori++
      continue
    }

    set.libro = {
      _type: 'reference',
      _ref: doc.libro._ref,
    }
  }

  if (doc.capitolo?._ref && doc.capitolo?._weak === true) {
    const capitoloExists = await client.fetch(
      `defined(*[_id == $id][0]._id)`,
      {id: doc.capitolo._ref},
    )

    if (!capitoloExists) {
      console.error(
        `ERRORE ${doc._id}: capitolo inesistente ${doc.capitolo._ref}`,
      )
      errori++
      continue
    }

    set.capitolo = {
      _type: 'reference',
      _ref: doc.capitolo._ref,
    }
  }

  if (Object.keys(set).length === 0) {
    continue
  }

  await client
    .patch(doc._id)
    .set(set)
    .commit()

  aggiornati++

  console.log(`✓ ${doc._id}`)
}

console.log('')
console.log('--------------------------------')
console.log(`Documenti aggiornati: ${aggiornati}`)
console.log(`Errori: ${errori}`)
console.log('--------------------------------')

if (errori > 0) {
  process.exitCode = 1
}