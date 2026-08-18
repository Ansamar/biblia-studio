import {runHistoricalAudit} from './lib/run-audit.mjs'
import {numbersSeed} from './data/numbers.mjs'

await runHistoricalAudit(numbersSeed, 'Numeri')
