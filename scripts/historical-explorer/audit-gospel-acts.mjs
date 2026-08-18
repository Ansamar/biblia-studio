import {runHistoricalAudit} from './lib/run-audit.mjs'
import {markSeed,matthewSeed,lukeSeed,johnSeed,actsSeed} from './data/gospels-acts.mjs'

const seeds={marco:[markSeed,'Marco'],matteo:[matthewSeed,'Matteo'],luca:[lukeSeed,'Luca'],giovanni:[johnSeed,'Giovanni'],atti:[actsSeed,'Atti degli Apostoli']}
const arg=process.argv.find((item)=>item.startsWith('--book='))
const slug=arg?.split('=')[1]
if(!slug||!seeds[slug]) throw new Error(`Specificare --book=<${Object.keys(seeds).join('|')}>`)
const [seed,label]=seeds[slug]
await runHistoricalAudit(seed,label)
