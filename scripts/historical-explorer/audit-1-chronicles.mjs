import {runHistoricalAudit} from './lib/run-audit.mjs'
import {firstChroniclesSeed} from './data/1-chronicles.mjs'

await runHistoricalAudit(firstChroniclesSeed, '1 Cronache')
