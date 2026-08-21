import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-08-15'})

const ids = [
  'testo-daniele-bel-og-bel-1',
  'testo-daniele-bel-teodozione-bet-1',
  'testo-daniele-susanna-teodozione-sut-1',
]

const docs = await client.fetch(`*[_id in $ids]{
  _id, numero, lingua, tradizione, edizione, siglaSorgente, testimone, diritti, importazione,
  versetti[]{_key,_type,numero,testo}
}|order(_id asc)`, {ids})

console.log('\n=== AUDIT QUALITÀ · CANDIDATI PROMOZIONE DANIELE ===')
console.log(`Documenti trovati: ${docs.length}/3`)

for (const d of docs) {
  const verses = Array.isArray(d.versetti) ? d.versetti : []
  const validNums = verses.filter(v => Number.isFinite(v?.numero)).map(v => v.numero)
  const empty = verses.filter(v => typeof v?.testo !== 'string' || !v.testo.trim())
  const nonEmpty = verses.filter(v => typeof v?.testo === 'string' && v.testo.trim())
  const dup = [...new Set(validNums.filter((n,i,a) => a.indexOf(n) !== i))].sort((a,b)=>a-b)
  const min = validNums.length ? Math.min(...validNums) : null
  const max = validNums.length ? Math.max(...validNums) : null
  const gaps = []
  if (min !== null && max !== null) {
    const set = new Set(validNums)
    for (let n=min;n<=max;n++) if (!set.has(n)) gaps.push(n)
  }

  console.log(`\n=== ${d._id} ===`)
  console.log(`tradizione=${d.tradizione} · edizione=${d.edizione}`)
  console.log(`versetti=${verses.length} · nonVuoti=${nonEmpty.length} · vuoti=${empty.length}`)
  console.log(`rangeNumerazione=${min ?? '?'}–${max ?? '?'} · duplicati=${dup.length ? dup.join(', ') : 'nessuno'} · gap=${gaps.length ? gaps.join(', ') : 'nessuno'}`)
  console.log(`vuoti=${empty.length ? empty.map(v => v.numero).join(', ') : 'nessuno'}`)
  console.log(`primoNonVuoto=${nonEmpty.length ? `${nonEmpty[0].numero} · ${nonEmpty[0].testo.slice(0,180)}` : 'nessuno'}`)
  console.log(`ultimoNonVuoto=${nonEmpty.length ? `${nonEmpty.at(-1).numero} · ${nonEmpty.at(-1).testo.slice(0,180)}` : 'nessuno'}`)
  console.log(`sigla=${d.siglaSorgente || '∅'} · testimone=${d.testimone || '∅'}`)
  console.log(`diritti=${JSON.stringify(d.diritti || null)}`)
  console.log(`importazione=${JSON.stringify(d.importazione || null)}`)
}

console.log('\nAUDIT COMPLETATO: nessuna mutazione Sanity eseguita.')
