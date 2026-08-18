import {runHistoricalSeed} from './lib/run-seed.mjs'
import {ezraSeed} from './data/ezra.mjs'

await runHistoricalSeed(ezraSeed, 'Esdra')
