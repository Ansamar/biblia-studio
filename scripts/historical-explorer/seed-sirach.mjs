import {runHistoricalSeed} from './lib/run-seed.mjs'
import {sirachSeed} from './data/sirach.mjs'

await runHistoricalSeed(sirachSeed, 'Siracide')
