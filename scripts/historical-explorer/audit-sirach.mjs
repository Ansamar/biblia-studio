import {runHistoricalAudit} from './lib/run-audit.mjs'
import {sirachSeed} from './data/sirach.mjs'

await runHistoricalAudit(sirachSeed, 'Siracide')
