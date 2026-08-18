import {runHistoricalAudit} from './lib/run-audit.mjs'
import {judgesSeed} from './data/judges.mjs'

await runHistoricalAudit(judgesSeed, 'Giudici')
