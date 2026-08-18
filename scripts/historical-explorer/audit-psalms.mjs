import {runHistoricalAudit} from './lib/run-audit.mjs'
import {psalmsSeed} from './data/psalms.mjs'

await runHistoricalAudit(psalmsSeed, 'Salmi')
