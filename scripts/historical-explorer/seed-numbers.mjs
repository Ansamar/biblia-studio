import {runHistoricalSeed} from './lib/run-seed.mjs'
import {numbersSeed} from './data/numbers.mjs'

await runHistoricalSeed(numbersSeed, 'Numeri')
