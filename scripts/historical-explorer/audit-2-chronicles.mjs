import {runHistoricalAudit} from './lib/run-audit.mjs'
import {secondChroniclesSeed} from './data/2-chronicles.mjs'

await runHistoricalAudit(secondChroniclesSeed, '2 Cronache')
