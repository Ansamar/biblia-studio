import {getCliClient} from 'sanity/cli'
import {ntCoreEntities} from './data/nt-core.mjs'

const client=getCliClient({apiVersion:'2025-08-15'})
const commit=process.argv.includes('--commit')
const docId=(id)=>`historical-entity-${id}`
const key=(prefix,index)=>`${prefix}-${index+1}`
const ids=new Set(ntCoreEntities.map((e)=>e.id))
const broken=ntCoreEntities.flatMap((e)=>(e.relations||[]).filter((r)=>!ids.has(r.targetId)).map((r)=>`${e.id} -> ${r.targetId}`))
if(broken.length) throw new Error(`Relazioni core NT rotte: ${broken.join(', ')}`)
const docs=ntCoreEntities.map((entity)=>({
  _id:docId(entity.id),_type:'historicalEntity',id:entity.id,type:entity.type,label:entity.label,summary:entity.summary,
  temporal:{_type:'object',...entity.temporal},
  spatial:entity.spatial?{_type:'object',...(entity.spatial.region?{region:entity.spatial.region}:{}),...(entity.spatial.point?{point:{_type:'geopoint',...entity.spatial.point}}:{})}:undefined,
  epistemicStatus:entity.epistemicStatus,
  biblicalRefs:[],
  relations:(entity.relations||[]).map((r,i)=>({_key:key(`${entity.id}-rel`,i),_type:'historicalRelation',kind:r.kind,label:r.label,target:{_type:'reference',_ref:docId(r.targetId)}})),
  sources:(entity.sources||[]).map((s,i)=>({_key:key(`${entity.id}-src`,i),...s,_type:'historicalSource'}))
}))
console.log('\n=== HISTORICAL EXPLORER · NT CORE ===')
console.log(`Project: ${client.config().projectId}`)
console.log(`Dataset: ${client.config().dataset}`)
console.log(`Entità condivise: ${docs.length}`)
console.log(`Relazioni rotte: ${broken.length}`)
console.log(`Modalità: ${commit?'COMMIT':'DRY RUN'}`)
if(!commit){console.log('\nNessuna mutazione eseguita. Aggiungere -- --commit per scrivere.');process.exit(0)}
let tx=client.transaction()
for(const doc of docs) tx=tx.createOrReplace(doc)
const result=await tx.commit({visibility:'sync'})
console.log(`\n✓ Scritti ${docs.length} documenti core NT.`)
console.log(`Transaction: ${result.transactionId||'completata'}`)
