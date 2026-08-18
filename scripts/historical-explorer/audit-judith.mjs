import {runHistoricalAudit} from './lib/run-audit.mjs'
import {judithSeed} from './data/judith.mjs'

await runHistoricalAudit(judithSeed, 'Giuditta')
