import {execFileSync} from 'node:child_process'

const query = `*[
  _type == "testoBiblicoCapitolo" &&
  tradizione == "vulgata"
]{
  _id,
  numero,
  edizione,
  libro->{_id,titolo},
  capitolo->{_id,numero},
  versetti[]{
    _key,
    numero,
    suffisso,
    numeroVisuale,
    testo,
    riferimentoAlternativo,
    riferimentiAlternativi,
    aggiuntaGreca
  },
  importazione
}
| order(libro->titolo asc, numero asc)`

const raw = execFileSync(
  'npx',
  [
    'sanity',
    'documents',
    'query',
    query,
    '--dataset',
    'production',
    '--api-version',
    '2025-08-15'
  ],
  {
    encoding: 'utf8',
    maxBuffer: 100 * 1024 * 1024
  }
)

const docs = JSON.parse(raw)

const problemi = []
const dichiarate = []
let totaleVersetti = 0

for (const d of docs) {
  const vv = d.versetti ?? []
  totaleVersetti += vv.length

  const nome = `${d.libro?.titolo ?? d.libro?._id ?? '?'} ${d.numero}`

  // 1. chiavi duplicate
  const keys = vv.map(v => v._key).filter(Boolean)
  const dupKeys = [...new Set(keys.filter((k,i) => keys.indexOf(k) !== i))]

  if (dupKeys.length) {
    problemi.push({
      tipo: 'KEY_DUPLICATE',
      capitolo: nome,
      id: d._id,
      dettaglio: dupKeys.join(', ')
    })
  }

  // 2. etichette versetto duplicate.
  // Ester può avere 1, 1a, 1b...: numeroVisuale/suffisso le distingue.
  const labels = vv.map(v =>
    v.numeroVisuale ??
    `${v.numero}${v.suffisso ?? ''}`
  )

  const dupLabels = [
    ...new Set(
      labels.filter((x,i) => labels.indexOf(x) !== i)
    )
  ]

  if (dupLabels.length) {
    problemi.push({
      tipo: 'VERSO_DUPLICATO',
      capitolo: nome,
      id: d._id,
      dettaglio: dupLabels.join(', ')
    })
  }

  // 3. testi realmente vuoti
  const vuoti = vv
    .filter(v => !v.testo || !v.testo.trim())
    .map(v => v.numeroVisuale ?? `${v.numero}${v.suffisso ?? ''}`)

  if (vuoti.length) {
    problemi.push({
      tipo: 'TESTO_VUOTO',
      capitolo: nome,
      id: d._id,
      dettaglio: vuoti.join(', ')
    })
  }

  // 4. controllo sequenza dei soli versetti numerici principali.
  // Esclude aggiunte alfabetiche come Ester 1a, 13a ecc.
  const base = vv
    .filter(v => !v.suffisso && !v.numeroVisuale && !v.aggiuntaGreca)
    .map(v => v.numero)
    .filter(Number.isFinite)

  const fuoriOrdine = base.some(
    (n,i) => i > 0 && n <= base[i-1]
  )

  if (fuoriOrdine) {
    problemi.push({
      tipo: 'ORDINE_NUMERICO',
      capitolo: nome,
      id: d._id,
      dettaglio: base.join(', ')
    })
  }

  if (base.length) {
    const min = Math.min(...base)
    const max = Math.max(...base)
    const presenti = new Set(base)

    const mancanti = []
    for (let n = 1; n <= max; n++) {
      if (!presenti.has(n)) mancanti.push(n)
    }

    if (min !== 1) {
      problemi.push({
        tipo: 'INIZIO_DIVERSO_DA_1',
        capitolo: nome,
        id: d._id,
        dettaglio: `primo versetto ${min}`
      })
    }

    if (mancanti.length) {
      const dichiarati =
        d.importazione?.versettiAssentiNelSorgente ?? []

      const mancantiNonDichiarati =
        mancanti.filter(n => !dichiarati.includes(n))

      const mancantiDichiarati =
        mancanti.filter(n => dichiarati.includes(n))

      if (mancantiDichiarati.length) {
        dichiarate.push({
          capitolo: nome,
          id: d._id,
          versetti: mancantiDichiarati
        })
      }

      if (mancantiNonDichiarati.length) {
        problemi.push({
          tipo: 'SALTO_NUMERAZIONE',
          capitolo: nome,
          id: d._id,
          dettaglio: mancantiNonDichiarati.join(', ')
        })
      }
    }
  }
}

console.log('\n=== AUDIT VULGATA ===')
console.log('Documenti:', docs.length)
console.log('Versetti/segmenti:', totaleVersetti)
console.log('Anomalie non dichiarate:', problemi.length)
console.log('Lacune sorgente dichiarate:', dichiarate.length)

if (problemi.length) {
  console.log('\n=== ANOMALIE DA VERIFICARE ===')
  for (const p of problemi) {
    console.log(
      `\n[${p.tipo}] ${p.capitolo}\n` +
      `  ${p.id}\n` +
      `  ${p.dettaglio}`
    )
  }
} else {
  console.log('\n✓ Nessuna anomalia strutturale non dichiarata.')
}

if (dichiarate.length) {
  console.log('\n=== LACUNE DEL SORGENTE GIÀ DOCUMENTATE ===')
  for (const x of dichiarate) {
    console.log(
      `${x.capitolo}: ${x.versetti.join(', ')}`
    )
  }
}
