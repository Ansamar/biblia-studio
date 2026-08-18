import {runHistoricalSeed} from './lib/run-seed.mjs'
import {ecclesiastesSeed} from './data/ecclesiastes.mjs'

await runHistoricalSeed(ecclesiastesSeed, 'Qoèlet')
