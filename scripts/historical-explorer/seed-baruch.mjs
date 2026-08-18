import {runHistoricalSeed} from './lib/run-seed.mjs'
import {baruchSeed} from './data/baruch.mjs'

await runHistoricalSeed(baruchSeed, 'Baruc')
