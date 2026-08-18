import {runHistoricalAudit} from './lib/run-audit.mjs'
import {ecclesiastesSeed} from './data/ecclesiastes.mjs'

await runHistoricalAudit(ecclesiastesSeed, 'Qoèlet')
