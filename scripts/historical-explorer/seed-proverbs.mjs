import {runHistoricalSeed} from './lib/run-seed.mjs'
import {proverbsSeed} from './data/proverbs.mjs'

await runHistoricalSeed(proverbsSeed, 'Proverbi')
