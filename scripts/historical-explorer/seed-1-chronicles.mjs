import {runHistoricalSeed} from './lib/run-seed.mjs'
import {firstChroniclesSeed} from './data/1-chronicles.mjs'

await runHistoricalSeed(firstChroniclesSeed, '1 Cronache')
