import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion:'2025-08-15'})

const traditions = ['susanna_og','susanna_teodozione','bel_og','bel_teodozione']
const docs = await client.fetch(`*[_type == "testoBiblicoCapitolo" && libro._ref == "libro-daniele" && tradizione in $traditions]|order(tradizione asc, numero asc){...}`, {traditions})

console.log('\n=== AUDIT TESTIMONI GRECI ESISTENTI · DANIELE ===')
console.log(`Documenti trovati: ${docs.length}`)
for (const d of docs) {
  console.log(`\n${d.tradizione} · ID=${d._id} · numero=${d.numero} · vv=${Array.isArray(d.versetti)?d.versetti.length:0}`)
  console.log(`edizione=${d.edizione || '∅'} · testimone=${d.testimone || '∅'} · sigla=${d.siglaSorgente || '∅'}`)
  console.log(`diritti=${JSON.stringify(d.diritti || null)}`)
  console.log(`importazione=${JSON.stringify(d.importazione || null)}`)
  if (Array.isArray(d.versetti) && d.versetti.length) {
    console.log(`primo=${d.versetti[0].numero} · ${String(d.versetti[0].testo).slice(0,120)}`)
    console.log(`ultimo=${d.versetti.at(-1).numero} · ${String(d.versetti.at(-1).testo).slice(0,120)}`)
  }
}

const byTrad = new Map(docs.map(d => [d.tradizione,d]))
function compare(aName,bName,label){
  const a=byTrad.get(aName), b=byTrad.get(bName)
  if(!a||!b){console.log(`\n${label}: confronto impossibile (documento mancante)`); return}
  const av=a.versetti||[], bv=b.versetti||[]
  const max=Math.max(av.length,bv.length)
  const diffs=[]
  for(let i=0;i<max;i++){
    const at=String(av[i]?.testo||'').normalize('NFC')
    const bt=String(bv[i]?.testo||'').normalize('NFC')
    if(at!==bt) diffs.push({n:i+1,a:at,b:bt})
  }
  console.log(`\n=== ${label} ===`)
  console.log(`A=${aName} vv=${av.length} · B=${bName} vv=${bv.length} · differenze=${diffs.length}`)
  for(const d of diffs.slice(0,5)){
    console.log(`v${d.n} A: ${d.a.slice(0,160)}`)
    console.log(`v${d.n} B: ${d.b.slice(0,160)}`)
  }
}

compare('susanna_og','susanna_teodozione','SUSANNA · OG vs TEODOZIONE')
compare('bel_og','bel_teodozione','BEL E IL DRAGO · OG vs TEODOZIONE')

console.log('\nAUDIT COMPLETATO: nessuna mutazione Sanity eseguita.')
