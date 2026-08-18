import {runHistoricalAudit} from './lib/run-audit.mjs'
import {proverbsSeed} from './data/proverbs.mjs'

await runHistoricalAudit(proverbsSeed, 'Proverbi')
