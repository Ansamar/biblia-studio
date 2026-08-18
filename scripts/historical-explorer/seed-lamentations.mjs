import {runHistoricalSeed} from './lib/run-seed.mjs'
import {lamentationsSeed} from './data/lamentations.mjs'

await runHistoricalSeed(lamentationsSeed, 'Lamentazioni')
