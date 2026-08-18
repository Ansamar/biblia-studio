import {runHistoricalSeed} from './lib/run-seed.mjs'
import {wisdomSeed} from './data/wisdom.mjs'

await runHistoricalSeed(wisdomSeed, 'Sapienza')
