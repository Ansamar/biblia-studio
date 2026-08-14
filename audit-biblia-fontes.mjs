import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'jc1k65lj',
  dataset: 'production',
  apiVersion: '2026-08-14',
  useCdn: false,
})

const query = `{
  "libri": count(*[_type == "libro"]),
  "capitoliAnalitici": count(*[_type == "capitolo"]),
  "documentiTesto": count(*[_type == "testoBiblicoCapitolo"]),
  "capitoliConTesto": count(array::unique(*[_type == "testoBiblicoCapitolo" && defined(capitolo._ref)].capitolo._ref)),
  "versetti": count(*[_type == "testoBiblicoCapitolo"].versetti[]),
  "testiSenzaLibro": *[_type == "testoBiblicoCapitolo" && !defined(libro->._id)]{_id, numero, tradizione, "ref": libro._ref},
  "testiSenzaCapitoloAnalitico": *[_type == "testoBiblicoCapitolo" && defined(capitolo) && !defined(capitolo->._id)]{_id, numero, tradizione, "ref": capitolo._ref},
  "capitoliSenzaTesto": *[_type == "capitolo" && !(_id in *[_type == "testoBiblicoCapitolo"].capitolo._ref)]{_id, numero, titolo, "libro": libro->titolo},
  "libriConTesto": array::unique(*[_type == "testoBiblicoCapitolo"].libro._ref),
  "tradizioniMultiple": *[_type == "libro" && count(*[_type == "testoBiblicoCapitolo" && libro._ref == ^._id].tradizione) > 1]{
    _id,
    titolo,
    "tradizioni": array::unique(*[_type == "testoBiblicoCapitolo" && libro._ref == ^._id && defined(tradizione)].tradizione)
  },
  "versettiVuotiAmmessi": *[_type == "testoBiblicoCapitolo" && count(versetti[testo == "" && statoTestuale in ["metatesto_solo", "omesso_nell_edizione"]]) > 0]{
    _id,
    tradizione,
    "vuoti": versetti[testo == "" && statoTestuale in ["metatesto_solo", "omesso_nell_edizione"]]{numero, statoTestuale, notaEditoriale, metatesto}
  },
  "anomalieTestoVuoto": *[_type == "testoBiblicoCapitolo" && count(versetti[testo == "" && !(statoTestuale in ["metatesto_solo", "omesso_nell_edizione"])]) > 0]{
    _id,
    tradizione,
    "anomalie": versetti[testo == "" && !(statoTestuale in ["metatesto_solo", "omesso_nell_edizione"]) ]{numero, statoTestuale, notaEditoriale, metatesto}
  }
}`

try {
  const result = await client.fetch(query)
  const summary = {
    libri: result.libri,
    capitoliAnalitici: result.capitoliAnalitici,
    documentiTesto: result.documentiTesto,
    capitoliConTesto: result.capitoliConTesto,
    versetti: result.versetti,
    testiSenzaLibro: result.testiSenzaLibro.length,
    testiSenzaCapitoloAnalitico: result.testiSenzaCapitoloAnalitico.length,
    capitoliSenzaTesto: result.capitoliSenzaTesto.length,
    libriConTradizioniMultiple: result.tradizioniMultiple.length,
    documentiConVuotiAmmessi: result.versettiVuotiAmmessi.length,
    documentiConAnomalieTestoVuoto: result.anomalieTestoVuoto.length,
  }

  console.log('\n====================================')
  console.log('  BIBLIA FONTES — AUDIT DEL CORPUS')
  console.log('====================================\n')
  console.log('RIEPILOGO')
  console.log(JSON.stringify(summary, null, 2))

  if (result.tradizioniMultiple.length) {
    console.log('\nLIBRI CON PIÙ TRADIZIONI / TESTIMONI')
    console.log(JSON.stringify(result.tradizioniMultiple, null, 2))
  }

  if (result.anomalieTestoVuoto.length) {
    console.log('\nANOMALIE: TESTO VUOTO NON GIUSTIFICATO')
    console.log(JSON.stringify(result.anomalieTestoVuoto, null, 2))
  } else {
    console.log('\n✓ Nessun testo vuoto anomalo.')
  }

  if (result.testiSenzaLibro.length || result.testiSenzaCapitoloAnalitico.length) {
    console.log('\nANOMALIE DI RIFERIMENTO')
    console.log(JSON.stringify({testiSenzaLibro: result.testiSenzaLibro, testiSenzaCapitoloAnalitico: result.testiSenzaCapitoloAnalitico}, null, 2))
  } else {
    console.log('✓ Nessun riferimento spezzato.')
  }

  console.log('\nDETTAGLIO COMPLETO')
  console.log(JSON.stringify(result, null, 2))

  console.log('\n====================================')
  console.log('  AUDIT COMPLETATO')
  console.log('====================================\n')
} catch (error) {
  console.error('\nERRORE DURANTE L’AUDIT:\n')
  console.error(error)
  process.exit(1)
}
