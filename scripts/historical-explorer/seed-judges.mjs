import {runHistoricalSeed} from './lib/run-seed.mjs'
import {judgesSeed} from './data/judges.mjs'

await runHistoricalSeed(judgesSeed, 'Giudici')
