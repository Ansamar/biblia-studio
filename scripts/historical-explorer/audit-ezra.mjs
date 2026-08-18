import {runHistoricalAudit} from './lib/run-audit.mjs'
import {ezraSeed} from './data/ezra.mjs'

await runHistoricalAudit(ezraSeed, 'Esdra')
