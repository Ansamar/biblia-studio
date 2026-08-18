const entityDocId = (id) => `historical-entity-${id}`
const areaDocId = (id) => `historical-area-${id}`
const key = (prefix, index) => `${prefix}-${index + 1}`

export function source(kind, label, options = {}) {
  return {
    _type: 'historicalSource',
    kind,
    label,
    ...(options.citation ? {citation: options.citation} : {}),
    ...(options.locator ? {locator: options.locator} : {}),
    ...(options.url ? {url: options.url} : {}),
    ...(options.note ? {note: options.note} : {}),
  }
}

export function biblicalRef(display, bookSlug, chapterStart, chapterEnd, verseStart, verseEnd) {
  return {
    _type: 'historicalBiblicalReference',
    display,
    bookSlug,
    ...(chapterStart != null ? {chapterStart} : {}),
    ...(chapterEnd != null ? {chapterEnd} : {}),
    ...(verseStart != null ? {verseStart} : {}),
    ...(verseEnd != null ? {verseEnd} : {}),
  }
}

function keyed(items, prefix) {
  return (items || []).map((item, index) => ({...item, _key: key(prefix, index)}))
}

function sharedEntityMap(sharedEntities = []) {
  return new Map(sharedEntities.map((item) => [item.id, item.docId || entityDocId(item.id)]))
}

function validateSeed({entities, sharedEntities = [], areas = [], scenarios = []}) {
  const issues = []
  const ids = entities.map((entity) => entity.id)
  const sharedIds = sharedEntities.map((entity) => entity.id)
  const localUnique = new Set(ids)
  const allIds = new Set([...ids, ...sharedIds])

  if (localUnique.size !== ids.length) issues.push('ID entità locali duplicati')
  if (new Set(sharedIds).size !== sharedIds.length) issues.push('ID entità condivise duplicati')
  if (ids.some((id) => sharedIds.includes(id))) issues.push('Una stessa entità non può essere sia locale sia condivisa nello stesso seed')

  const brokenRelations = entities.flatMap((entity) =>
    (entity.relations || [])
      .filter((relation) => !allIds.has(relation.targetId))
      .map((relation) => `${entity.id} -> ${relation.targetId}`),
  )
  if (brokenRelations.length) issues.push(`Relazioni rotte: ${brokenRelations.join(', ')}`)

  const brokenAreas = areas.filter((area) => !allIds.has(area.entityId)).map((area) => `${area.id} -> ${area.entityId}`)
  if (brokenAreas.length) issues.push(`Aree con target inesistente: ${brokenAreas.join(', ')}`)

  for (const entity of entities) {
    if (!entity.sources?.length) issues.push(`${entity.id}: nessuna fonte/provenance`)
    const {start, end} = entity.temporal || {}
    if (start != null && end != null && start > end) issues.push(`${entity.id}: intervallo temporale invertito`)
  }

  for (const shared of sharedEntities) {
    if (!shared.id) issues.push('Entità condivisa senza id')
  }

  for (const area of areas) {
    if (!area.sources?.length) issues.push(`${area.id}: nessuna provenance geometrica`)
    if (area.temporal?.start > area.temporal?.end) issues.push(`${area.id}: intervallo area invertito`)
    if (!Array.isArray(area.points) || area.points.length < 4) issues.push(`${area.id}: geometria con meno di 4 punti`)
  }

  for (const scenario of scenarios) {
    if (scenario.start > scenario.end) issues.push(`${scenario.id}: intervallo scenario invertito`)
  }

  return {issues, brokenRelations}
}

export function buildHistoricalExplorerDocuments(seed) {
  const {
    datasetId,
    title,
    subtitle,
    bookRef,
    defaultRange,
    quickYears = [],
    scenarios = [],
    entities,
    sharedEntities = [],
    areas = [],
    noteEditoriali,
  } = seed

  if (!datasetId || !title || !subtitle || !bookRef || !defaultRange || !(entities?.length || sharedEntities?.length)) {
    throw new Error('Seed Historical Explorer incompleto: datasetId, title, subtitle, bookRef, defaultRange e almeno una entità locale/condivisa sono obbligatori.')
  }

  const validation = validateSeed({entities: entities || [], sharedEntities, areas, scenarios})
  if (validation.issues.length) throw new Error(`Dataset non valido:\n- ${validation.issues.join('\n- ')}`)

  const sharedMap = sharedEntityMap(sharedEntities)
  const refForEntityId = (id) => sharedMap.get(id) || entityDocId(id)

  const entityDocs = (entities || []).map((entity) => ({
    _id: entityDocId(entity.id),
    _type: 'historicalEntity',
    id: entity.id,
    type: entity.type,
    label: entity.label,
    summary: entity.summary,
    temporal: {_type: 'object', ...entity.temporal},
    spatial: entity.spatial
      ? {
          _type: 'object',
          ...(entity.spatial.region ? {region: entity.spatial.region} : {}),
          ...(entity.spatial.point ? {point: {_type: 'geopoint', ...entity.spatial.point}} : {}),
        }
      : undefined,
    epistemicStatus: entity.epistemicStatus,
    biblicalRefs: keyed(entity.biblicalRefs, `${entity.id}-bib`).map((item) => ({...item, _type: 'historicalBiblicalReference'})),
    relations: keyed(entity.relations, `${entity.id}-rel`).map((relation) => ({
      _type: 'historicalRelation',
      _key: relation._key,
      kind: relation.kind,
      label: relation.label,
      target: {_type: 'reference', _ref: refForEntityId(relation.targetId)},
    })),
    sources: keyed(entity.sources, `${entity.id}-src`).map((item) => ({...item, _type: 'historicalSource'})),
  }))

  const areaDocs = areas.map((area) => ({
    _id: areaDocId(area.id),
    _type: 'historicalArea',
    id: area.id,
    entity: {_type: 'reference', _ref: refForEntityId(area.entityId)},
    label: area.label,
    temporal: {_type: 'object', ...area.temporal},
    confidence: area.confidence,
    note: area.note,
    geometry: {
      _type: 'object',
      type: 'Polygon',
      rings: [{
        _key: `${area.id}-ring-1`,
        _type: 'historicalPolygonRing',
        points: area.points.map(([lng, lat], index) => ({
          _key: `${area.id}-p-${index + 1}`,
          _type: 'geopoint',
          lat,
          lng,
        })),
      }],
    },
    sources: keyed(area.sources, `${area.id}-src`).map((item) => ({...item, _type: 'historicalSource'})),
  }))

  const datasetEntityRefs = [
    ...entityDocs.map((doc) => doc._id),
    ...sharedEntities.map((entity) => entity.docId || entityDocId(entity.id)),
  ]

  const datasetDoc = {
    _id: `historical-dataset-${datasetId}`,
    _type: 'historicalExplorerDataset',
    id: datasetId,
    title,
    subtitle,
    book: {_type: 'reference', _ref: bookRef},
    defaultRange: {_type: 'object', ...defaultRange},
    quickYears,
    scenarios: scenarios.map((scenario, index) => ({
      _key: key(`${datasetId}-scenario`, index),
      _type: 'historicalScenario',
      ...scenario,
    })),
    entities: datasetEntityRefs.map((docId, index) => ({
      _key: key(`${datasetId}-entity-ref`, index),
      _type: 'reference',
      _ref: docId,
    })),
    areas: areaDocs.map((doc, index) => ({
      _key: key(`${datasetId}-area-ref`, index),
      _type: 'reference',
      _ref: doc._id,
    })),
    ...(noteEditoriali ? {noteEditoriali} : {}),
  }

  return {
    docs: [...entityDocs, ...areaDocs, datasetDoc],
    entityDocs,
    areaDocs,
    datasetDoc,
    sharedEntityRefs: sharedEntities.map((entity) => entity.docId || entityDocId(entity.id)),
    validation,
  }
}
