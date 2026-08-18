import {runHistoricalAudit} from './lib/run-audit.mjs'
import {tobitSeed} from './data/tobit.mjs'

await runHistoricalAudit(tobitSeed, 'Tobia')
