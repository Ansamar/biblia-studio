import {runHistoricalSeed} from './lib/run-seed.mjs'
import {jobSeed} from './data/job.mjs'

await runHistoricalSeed(jobSeed, 'Giobbe')
