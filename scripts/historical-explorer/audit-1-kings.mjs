import {runHistoricalAudit} from './lib/run-audit.mjs'
import {firstKingsSeed} from './data/1-kings.mjs'

await runHistoricalAudit(firstKingsSeed, '1 Re')
