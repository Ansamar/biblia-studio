import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-08-15'})
const commit = process.argv.slice(2).includes('--commit')
const id = 'testo-salmi-116'

const expectedPrefix = [
  'Amo il Signore, perché ascolta il grido della mia preghiera.',
  'Verso di me ha teso l’orecchio nel giorno in cui lo invocavo.',
  'Mi stringevano funi di morte, ero preso nei lacci degli inferi, ero preso da tristezza e angoscia.',
]

const repairedTexts = [
  'Amo il Signore, perché ascolta il grido della mia preghiera.',
  'Verso di me ha teso l’orecchio nel giorno in cui lo invocavo.',
  'Mi stringevano funi di morte, ero preso nei lacci degli inferi, ero preso da tristezza e angoscia.',
  'Allora ho invocato il nome del Signore: «Ti prego, liberami, Signore».',
  'Pietoso e giusto è il Signore, il nostro Dio è misericordioso.',
  'Il Signore protegge i piccoli: ero misero ed egli mi ha salvato.',
  'Ritorna, anima mia, al tuo riposo, perché il Signore ti ha beneficato.',
  'Sì, hai liberato la mia vita dalla morte, i miei occhi dalle lacrime, i miei piedi dalla caduta.',
  'Io camminerò alla presenza del Signore nella terra dei viventi.',
  'Ho creduto anche quando dicevo: «Sono troppo infelice».',
  'Ho detto con sgomento: «Ogni uomo è bugiardo».',
  'Che cosa renderò al Signore per tutti i benefici che mi ha fatto?',
  'Alzerò il calice della salvezza e invocherò il nome del Signore.',
  'Adempirò i miei voti al Signore, davanti a tutto il suo popolo.',
  'Agli occhi del Signore è preziosa la morte dei suoi fedeli.',
  'Ti prego, Signore, perché sono tuo servo; io sono tuo servo, figlio della tua schiava: tu hai spezzato le mie catene.',
  'A te offrirò un sacrificio di ringraziamento e invocherò il nome del Signore.',
  'Adempirò i miei voti al Signore davanti a tutto il suo popolo,',
  'negli atri della casa del Signore, in mezzo a te, Gerusalemme. Alleluia.',
]

function makeKey(n) {
  return `v${String(n).padStart(3, '0')}`
}

const doc = await client.fetch(`*[_id == $id][0]{_id,_rev,edizione,lingua,tradizione,numero,versetti[]{_key,numero,testo,riferimentoAlternativo,statoTestuale}}`, {id})
if (!doc) throw new Error(`Documento ${id} non trovato.`)

if (doc.numero !== 116 || doc.lingua !== 'it' || doc.tradizione !== 'traduzione_italiana') {
  throw new Error(`Guardia fallita: ${id} non corrisponde al Salmo 116 italiano atteso.`)
}

const current = doc.versetti || []
const alreadyRepaired = current.length === 19 && current.every((v, i) => v.numero === i + 1 && v.testo === repairedTexts[i])

console.log('\n=== REPAIR SALMO 116 ITALIANO ===')
console.log(`Documento: ${id}`)
console.log(`Edizione: ${doc.edizione}`)
console.log(`Versetti attuali: ${current.length}`)
console.log(`Modalità: ${commit ? 'COMMIT' : 'DRY RUN'}`)

if (alreadyRepaired) {
  console.log('\n✓ Documento già riparato: 19 versetti corretti. Nessuna mutazione necessaria.')
  process.exit(0)
}

if (current.length !== 4) throw new Error(`Guardia fallita: attesi 4 versetti nel documento corrotto, trovati ${current.length}.`)
for (let i = 0; i < 3; i++) {
  if (current[i]?.numero !== i + 1 || current[i]?.testo !== expectedPrefix[i]) {
    throw new Error(`Guardia fallita: il versetto ${i + 1} non coincide con lo stato corrotto verificato.`)
  }
}
if (current[3]?.numero !== 4 || !current[3]?.testo?.startsWith(repairedTexts[3]) || !current[3]?.testo?.includes(repairedTexts[18])) {
  throw new Error('Guardia fallita: il versetto 4 non contiene il blocco accorpato atteso. Nessuna modifica eseguita.')
}

const repairedVerses = repairedTexts.map((testo, index) => {
  const numero = index + 1
  const old = current[index]
  return {
    _type: 'object',
    _key: old?._key || makeKey(numero),
    numero,
    testo,
    ...(old?.riferimentoAlternativo ? {riferimentoAlternativo: old.riferimentoAlternativo} : {}),
    ...(old?.statoTestuale ? {statoTestuale: old.statoTestuale} : {}),
  }
})

console.log('\nPiano di riparazione:')
console.log('  4 versetti corrotti/accorpati → 19 versetti separati')
console.log('  vv. 1–3 preservati')
console.log('  v. 4 ridotto al solo testo del v. 4')
console.log('  vv. 5–19 ricostruiti dal testo italiano già presente nel documento')
console.log('  nessun altro documento sarà modificato')

if (!commit) {
  console.log('\nNessuna mutazione eseguita. Per applicare:')
  console.log('npx sanity exec scripts/maintenance/repair-psalm-116.mjs --with-user-token -- --commit')
  process.exit(0)
}

await client.patch(id).ifRevisionId(doc._rev).set({versetti: repairedVerses}).commit()

const verify = await client.fetch(`*[_id == $id][0]{_rev,versetti[]{numero,testo}}`, {id})
const ok = verify?.versetti?.length === 19 && verify.versetti.every((v, i) => v.numero === i + 1 && v.testo === repairedTexts[i])
if (!ok) throw new Error('Verifica post-commit fallita: il documento non corrisponde alla struttura attesa.')

console.log('\n✓ Riparazione completata e verificata.')
console.log(`Nuova revisione: ${verify._rev}`)
console.log('Versetti: 19/19')
console.log('\nOra rieseguire:')
console.log('npx sanity exec scripts/maintenance/audit-repair-psalm-numbering.mjs --with-user-token')
