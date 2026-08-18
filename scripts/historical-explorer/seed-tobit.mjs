import {runHistoricalSeed} from './lib/run-seed.mjs'
import {tobitSeed} from './data/tobit.mjs'

await runHistoricalSeed(tobitSeed, 'Tobia')
