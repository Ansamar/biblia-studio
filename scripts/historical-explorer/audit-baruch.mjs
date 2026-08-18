import {runHistoricalAudit} from './lib/run-audit.mjs'
import {baruchSeed} from './data/baruch.mjs'

await runHistoricalAudit(baruchSeed, 'Baruc')
