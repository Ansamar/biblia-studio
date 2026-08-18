import {runHistoricalAudit} from './lib/run-audit.mjs'
import {firstMaccabeesSeed} from './data/1-maccabees.mjs'

await runHistoricalAudit(firstMaccabeesSeed, '1 Maccabei')
