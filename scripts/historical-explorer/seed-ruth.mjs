import {runHistoricalSeed} from './lib/run-seed.mjs'
import {ruthSeed} from './data/ruth.mjs'

await runHistoricalSeed(ruthSeed, 'Rut')
