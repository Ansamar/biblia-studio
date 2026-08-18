import {runHistoricalAudit} from './lib/run-audit.mjs'
import {generalSeeds} from './data/general-seeds-ready.mjs'
const arg=process.argv.find((item)=>item.startsWith('--book='))
const slug=arg?.split('=')[1]
if(!slug||!generalSeeds[slug]) throw new Error(`Specificare --book=<${Object.keys(generalSeeds).join('|')}>`)
const [seed,label]=generalSeeds[slug]
await runHistoricalAudit(seed,label)
