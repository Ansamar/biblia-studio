import {runHistoricalSeed} from './lib/run-seed.mjs'
import {hoseaSeed,joelSeed,amosSeed,obadiahSeed,jonahSeed,micahSeed,nahumSeed,habakkukSeed,zephaniahSeed,haggaiSeed,zechariahSeed,malachiSeed} from './data/minor-prophets.mjs'

const seeds={osea:[hoseaSeed,'Osea'],gioele:[joelSeed,'Gioele'],amos:[amosSeed,'Amos'],abdia:[obadiahSeed,'Abdia'],giona:[jonahSeed,'Giona'],michea:[micahSeed,'Michea'],naum:[nahumSeed,'Naum'],abacuc:[habakkukSeed,'Abacuc'],sofonia:[zephaniahSeed,'Sofonia'],aggeo:[haggaiSeed,'Aggeo'],zaccaria:[zechariahSeed,'Zaccaria'],malachia:[malachiSeed,'Malachia']}
const arg=process.argv.find((item)=>item.startsWith('--book='))
const slug=arg?.split('=')[1]
if(!slug||!seeds[slug]) throw new Error(`Specificare --book=<${Object.keys(seeds).join('|')}>`)
const [seed,label]=seeds[slug]
await runHistoricalSeed(seed,label)
