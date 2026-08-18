import {runHistoricalSeed} from './lib/run-seed.mjs'
import {deuteronomySeed} from './data/deuteronomy.mjs'

await runHistoricalSeed(deuteronomySeed, 'Deuteronomio')
