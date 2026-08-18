import {runHistoricalAudit} from './lib/run-audit.mjs'
import {leviticusSeed} from './data/leviticus.mjs'

await runHistoricalAudit(leviticusSeed, 'Levitico')
