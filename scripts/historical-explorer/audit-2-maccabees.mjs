import {runHistoricalAudit} from './lib/run-audit.mjs'
import {secondMaccabeesSeed} from './data/2-maccabees.mjs'

await runHistoricalAudit(secondMaccabeesSeed, '2 Maccabei')
