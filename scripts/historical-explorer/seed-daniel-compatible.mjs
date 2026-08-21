import {runHistoricalSeed} from './lib/run-seed.mjs'
import {danielSeed} from './data/daniel.mjs'

const legacyToCanonical = new Map([
  ['seleucid-empire-maccabees', 'seleucid-empire-macc'],
  ['antiochus-iv-maccabees', 'antiochus-iv-macc'],
])

const remapId = (id) => legacyToCanonical.get(id) || id

const compatibleSeed = {
  ...danielSeed,
  sharedEntities: (danielSeed.sharedEntities || []).map((item) => ({
    ...item,
    id: remapId(item.id),
  })),
  entities: (danielSeed.entities || []).map((entity) => ({
    ...entity,
    relations: (entity.relations || []).map((relation) => ({
      ...relation,
      targetId: remapId(relation.targetId),
    })),
  })),
}

await runHistoricalSeed(compatibleSeed, 'Daniele')
