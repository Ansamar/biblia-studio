import {runHistoricalAudit} from './lib/run-audit.mjs'
import {joshuaSeed} from './data/joshua.mjs'

await runHistoricalAudit(joshuaSeed, 'Giosuè')
