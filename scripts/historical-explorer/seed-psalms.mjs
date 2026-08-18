import {runHistoricalSeed} from './lib/run-seed.mjs'
import {psalmsSeed} from './data/psalms.mjs'

await runHistoricalSeed(psalmsSeed, 'Salmi')
