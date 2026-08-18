import {runHistoricalAudit} from './lib/run-audit.mjs'
import {lamentationsSeed} from './data/lamentations.mjs'

await runHistoricalAudit(lamentationsSeed, 'Lamentazioni')
