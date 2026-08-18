import {runHistoricalAudit} from './lib/run-audit.mjs'
import {danielSeed} from './data/daniel.mjs'

await runHistoricalAudit(danielSeed, 'Daniele')
