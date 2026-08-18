import {runHistoricalAudit} from './lib/run-audit.mjs'
import {wisdomSeed} from './data/wisdom.mjs'

await runHistoricalAudit(wisdomSeed, 'Sapienza')
