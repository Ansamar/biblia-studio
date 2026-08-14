import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'jc1k65lj',
  dataset: 'production',
  apiVersion: '2026-08-14',
  useCdn: false,
})

const query = `{
  "libri": *[_type == "libro"]{_id, titolo, categoriaId, capitoli},
  "capitoli": *[_type == "capitolo"]{_id, numero, titolo, "libroRef": libro._ref, "libroTitolo": libro->titolo},
  "testi": *[_type == "testoBiblicoCapitolo"]{
    _id,
    numero,
    tradizione,
    "libroRef": libro._ref,
    "capitoloRef": capitolo._ref,
    "libroEsiste": defined(libro->._id),
    "capitoloEsiste": !defined(capitolo._ref) || defined(capitolo->._id),
    "versettiTotali": count(versetti),
    "vuotiAmmessi": versetti[testo == "" && statoTestuale in ["metatesto_solo", "omesso_nell_edizione"]]{numero, statoTestuale, notaEditoriale, metatesto},
    "vuotiAnomali": versetti[testo == "" && !(statoTestuale in ["metatesto_solo", "omesso_nell_edizione"])]{numero, statoTestuale, notaEditoriale, metatesto}
  }
}`

try {
  const result = await client.fetch(query)

  const libri = result.libri ?? []
  const capitoli = result.capitoli ?? []
  const testi = result.testi ?? []

  const capitoloIds = new Set(capitoli.map(c => c._id))
  const libroIds = new Set(libri.map(l => l._id))
  const capitoliConTestoSet = new Set(
    testi.map(t => t.capitoloRef).filter(ref => ref && capitoloIds.has(ref)),
  )
  const libriConTestoSet = new Set(
    testi.map(t => t.libroRef).filter(ref => ref && libroIds.has(ref)),
  )

  const capitoliSenzaTesto = capitoli.filter(c => !capitoliConTestoSet.has(c._id))
  const libriSenzaTesto = libri.filter(l => !libriConTestoSet.has(l._id))
  const testiSenzaLibro = testi.filter(t => !t.libroEsiste)
  const testiSenzaCapitoloAnalitico = testi.filter(t => t.capitoloRef && !t.capitoloEsiste)
  const testiConVuotiAmmessi = testi.filter(t => (t.vuotiAmmessi?.length ?? 0) > 0)
  const testiConVuotiAnomali = testi.filter(t => (t.vuotiAnomali?.length ?? 0) > 0)

  const tradizioniPerLibro = new Map()
  for (const t of testi) {
    if (!t.libroRef || !t.tradizione) continue
    if (!tradizioniPerLibro.has(t.libroRef)) tradizioniPerLibro.set(t.libroRef, new Set())
    tradizioniPerLibro.get(t.libroRef).add(t.tradizione)
  }
  const libriConTradizioniMultiple = [...tradizioniPerLibro.entries()]
    .filter(([, tradizioni]) => tradizioni.size > 1)
    .map(([libroRef, tradizioni]) => ({
      libroRef,
      titolo: libri.find(l => l._id === libroRef)?.titolo ?? libroRef,
      tradizioni: [...tradizioni],
    }))

  const versetti = testi.reduce((sum, t) => sum + (t.versettiTotali ?? 0), 0)
  const coperturaLibriPercento = libri.length
    ? Number(((libriConTestoSet.size / libri.length) * 100).toFixed(1))
    : 0
  const coperturaCapitoliPercento = capitoli.length
    ? Number(((capitoliConTestoSet.size / capitoli.length) * 100).toFixed(1))
    : 0

  const identitaCapitoliValida =
    capitoli.length === capitoliConTestoSet.size + capitoliSenzaTesto.length

  const summary = {
    libri: libri.length,
    libriConTesto: libriConTestoSet.size,
    libriSenzaTesto: libriSenzaTesto.length,
    coperturaLibriPercento,
    capitoliAnalitici: capitoli.length,
    documentiTesto: testi.length,
    capitoliConTesto: capitoliConTestoSet.size,
    capitoliSenzaTesto: capitoliSenzaTesto.length,
    coperturaCapitoliPercento,
    versetti,
    testiSenzaLibro: testiSenzaLibro.length,
    testiSenzaCapitoloAnalitico: testiSenzaCapitoloAnalitico.length,
    libriConTradizioniMultiple: libriConTradizioniMultiple.length,
    documentiConVuotiAmmessi: testiConVuotiAmmessi.length,
    documentiConAnomalieTestoVuoto: testiConVuotiAnomali.length,
    identitaCapitoliValida,
  }

  console.log('\n====================================')
  console.log('  BIBLIA FONTES — AUDIT DEL CORPUS')
  console.log('====================================\n')
  console.log('RIEPILOGO')
  console.log(JSON.stringify(summary, null, 2))

  if (!identitaCapitoliValida) {
    console.error('\n✗ ERRORE INTERNO: capitoliAnalitici != capitoliConTesto + capitoliSenzaTesto')
  } else {
    console.log('\n✓ Identità di copertura verificata: capitoliAnalitici = capitoliConTesto + capitoliSenzaTesto.')
  }

  if (libriSenzaTesto.length) {
    console.log('\nLIBRI SENZA TESTO')
    console.log(JSON.stringify(libriSenzaTesto, null, 2))
  } else {
    console.log('✓ Tutti i 73 libri hanno testo biblico collegato.')
  }

  if (capitoliSenzaTesto.length) {
    console.log('\nCAPITOLI SENZA TESTO')
    console.log(JSON.stringify(capitoliSenzaTesto, null, 2))
  } else {
    console.log('✓ Tutti i capitoli analitici hanno almeno un testo collegato.')
  }

  if (libriConTradizioniMultiple.length) {
    console.log('\nLIBRI CON PIÙ TRADIZIONI / TESTIMONI')
    console.log(JSON.stringify(libriConTradizioniMultiple, null, 2))
  }

  if (testiConVuotiAnomali.length) {
    console.log('\nANOMALIE: TESTO VUOTO NON GIUSTIFICATO')
    console.log(JSON.stringify(testiConVuotiAnomali.map(t => ({_id: t._id, tradizione: t.tradizione, anomalie: t.vuotiAnomali})), null, 2))
  } else {
    console.log('\n✓ Nessun testo vuoto anomalo.')
  }

  if (testiSenzaLibro.length || testiSenzaCapitoloAnalitico.length) {
    console.log('\nANOMALIE DI RIFERIMENTO')
    console.log(JSON.stringify({testiSenzaLibro, testiSenzaCapitoloAnalitico}, null, 2))
  } else {
    console.log('✓ Nessun riferimento spezzato.')
  }

  console.log('\n====================================')
  console.log('  AUDIT COMPLETATO')
  console.log('====================================\n')
} catch (error) {
  console.error('\nERRORE DURANTE L’AUDIT:\n')
  console.error(error)
  process.exit(1)
}
