import {runHistoricalSeed} from './lib/run-seed.mjs'
import {secondChroniclesSeed} from './data/2-chronicles.mjs'

await runHistoricalSeed(secondChroniclesSeed, '2 Cronache')
