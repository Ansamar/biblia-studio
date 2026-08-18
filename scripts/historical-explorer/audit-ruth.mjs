import {runHistoricalAudit} from './lib/run-audit.mjs'
import {ruthSeed} from './data/ruth.mjs'

await runHistoricalAudit(ruthSeed, 'Rut')
