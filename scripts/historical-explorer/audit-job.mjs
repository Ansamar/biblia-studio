import {runHistoricalAudit} from './lib/run-audit.mjs'
import {jobSeed} from './data/job.mjs'

await runHistoricalAudit(jobSeed, 'Giobbe')
