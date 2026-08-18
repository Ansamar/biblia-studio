import {runHistoricalAudit} from './lib/run-audit.mjs'
import {nehemiahSeed} from './data/nehemiah.mjs'

await runHistoricalAudit(nehemiahSeed, 'Neemia')
