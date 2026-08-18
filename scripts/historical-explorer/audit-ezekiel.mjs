import {runHistoricalAudit} from './lib/run-audit.mjs'
import {ezekielSeed} from './data/ezekiel.mjs'

await runHistoricalAudit(ezekielSeed, 'Ezechiele')
