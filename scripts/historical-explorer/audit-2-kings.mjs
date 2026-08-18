import {runHistoricalAudit} from './lib/run-audit.mjs'
import {secondKingsSeed} from './data/2-kings.mjs'

await runHistoricalAudit(secondKingsSeed, '2 Re')
