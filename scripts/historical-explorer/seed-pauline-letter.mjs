import {runHistoricalSeed} from './lib/run-seed.mjs'
import {paulineSeeds} from './data/pauline-letters.mjs'
const arg=process.argv.find((item)=>item.startsWith('--book='))
const slug=arg?.split('=')[1]
if(!slug||!paulineSeeds[slug]) throw new Error(`Specificare --book=<${Object.keys(paulineSeeds).join('|')}>`)
const [seed,label]=paulineSeeds[slug]
await runHistoricalSeed(seed,label)
