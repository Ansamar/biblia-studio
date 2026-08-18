import {runHistoricalSeed} from './lib/run-seed.mjs'
import {estherSeed} from './data/esther.mjs'

await runHistoricalSeed(estherSeed, 'Ester')
