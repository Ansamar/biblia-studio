import {runHistoricalAudit} from './lib/run-audit.mjs'
import {deuteronomySeed} from './data/deuteronomy.mjs'

await runHistoricalAudit(deuteronomySeed, 'Deuteronomio')
