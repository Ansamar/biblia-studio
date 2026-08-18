import {defineArrayMember, defineField, defineType} from 'sanity'

const sourceKindOptions = [
  {title: 'Fonte primaria', value: 'primary'},
  {title: 'Studio secondario', value: 'secondary'},
  {title: 'Dataset / corpus', value: 'dataset'},
  {title: 'Bibliografia tematica', value: 'bibliography'},
  {title: 'Elaborazione editoriale Biblia Fontes', value: 'editorial'},
]

const epistemicOptions = [
  {title: 'Attestato', value: 'attested'},
  {title: 'Probabile', value: 'probable'},
  {title: 'Discusso', value: 'debated'},
  {title: 'Memoria', value: 'memory'},
  {title: 'Comparandum', value: 'comparandum'},
  {title: 'Narrativo', value: 'narrative'},
  {title: 'Non databile', value: 'undatable'},
]

export const historicalExplorerSchemas = [
  defineType({
    name: 'historicalSource',
    title: 'Fonte / provenance storica',
    type: 'object',
    fields: [
      defineField({name: 'label', title: 'Etichetta', type: 'string', validation: R => R.required()}),
      defineField({name: 'kind', title: 'Tipo', type: 'string', options: {list: sourceKindOptions}, validation: R => R.required()}),
      defineField({name: 'citation', title: 'Citazione bibliografica', type: 'text', rows: 2}),
      defineField({name: 'locator', title: 'Localizzatore', type: 'string', description: 'Pagina, numero di iscrizione, tavoletta, sezione o altro localizzatore puntuale.'}),
      defineField({name: 'url', title: 'URL', type: 'url'}),
      defineField({name: 'note', title: 'Nota metodologica', type: 'text', rows: 2}),
    ],
    preview: {
      select: {title: 'label', subtitle: 'kind'},
    },
  }),

  defineType({
    name: 'historicalBiblicalReference',
    title: 'Riferimento biblico strutturato',
    type: 'object',
    fields: [
      defineField({name: 'display', title: 'Forma visualizzata', type: 'string', validation: R => R.required()}),
      defineField({name: 'bookSlug', title: 'Slug canonico del libro', type: 'string', validation: R => R.required(), description: 'Esempi: genesi, 2-re, esdra.'}),
      defineField({name: 'chapterStart', title: 'Capitolo iniziale', type: 'number', validation: R => R.integer().min(1)}),
      defineField({name: 'chapterEnd', title: 'Capitolo finale', type: 'number', validation: R => R.integer().min(1)}),
      defineField({name: 'verseStart', title: 'Versetto iniziale', type: 'number', validation: R => R.integer().min(1)}),
      defineField({name: 'verseEnd', title: 'Versetto finale', type: 'number', validation: R => R.integer().min(1)}),
    ],
    validation: Rule => Rule.custom((value: any) => {
      if (!value) return true
      if (value.chapterStart && value.chapterEnd && value.chapterStart > value.chapterEnd) return 'Il capitolo iniziale non può essere successivo al capitolo finale.'
      if (value.verseStart && value.verseEnd && value.verseStart > value.verseEnd) return 'Il versetto iniziale non può essere successivo al versetto finale.'
      return true
    }),
    preview: {
      select: {title: 'display', subtitle: 'bookSlug'},
    },
  }),

  defineType({
    name: 'historicalRelation',
    title: 'Relazione storica',
    type: 'object',
    fields: [
      defineField({name: 'target', title: 'Entità collegata', type: 'reference', to: [{type: 'historicalEntity'}], validation: R => R.required()}),
      defineField({
        name: 'kind',
        title: 'Tipo di relazione',
        type: 'string',
        validation: R => R.required(),
        options: {list: [
          {title: 'Contesto', value: 'context'},
          {title: 'Interazione', value: 'interaction'},
          {title: 'Memoria / comparazione', value: 'memory'},
          {title: 'Composizione / redazione', value: 'composition'},
          {title: 'Trasmissione', value: 'transmission'},
          {title: 'Riferimento biblico', value: 'biblical-reference'},
        ]},
      }),
      defineField({name: 'label', title: 'Descrizione della relazione', type: 'string', validation: R => R.required()}),
    ],
    preview: {select: {title: 'label', subtitle: 'kind'}},
  }),

  defineType({
    name: 'historicalScenario',
    title: 'Scenario storico',
    type: 'object',
    fields: [
      defineField({name: 'id', title: 'ID stabile', type: 'string', validation: R => R.required()}),
      defineField({name: 'start', title: 'Anno iniziale', type: 'number', validation: R => R.required()}),
      defineField({name: 'end', title: 'Anno finale', type: 'number', validation: R => R.required()}),
      defineField({name: 'title', title: 'Titolo', type: 'string', validation: R => R.required()}),
      defineField({name: 'summary', title: 'Sintesi', type: 'text', rows: 3, validation: R => R.required()}),
    ],
    validation: Rule => Rule.custom((value: any) => value?.start != null && value?.end != null && value.start > value.end ? 'L’anno iniziale non può essere successivo all’anno finale.' : true),
    preview: {select: {title: 'title', start: 'start', end: 'end'}, prepare({title, start, end}) { return {title, subtitle: `${start} → ${end}`} }},
  }),

  defineType({
    name: 'historicalEntity',
    title: 'Entità Historical Explorer',
    type: 'document',
    fields: [
      defineField({name: 'id', title: 'ID stabile', type: 'string', validation: R => R.required()}),
      defineField({
        name: 'type', title: 'Tipo di entità', type: 'string', validation: R => R.required(),
        options: {list: [
          {title: 'Evento', value: 'event'}, {title: 'Popolo', value: 'people'}, {title: 'Impero / potere', value: 'empire'},
          {title: 'Città', value: 'city'}, {title: 'Regione', value: 'region'}, {title: 'Persona', value: 'person'},
          {title: 'Istituzione', value: 'institution'}, {title: 'Pratica', value: 'practice'},
          {title: 'Testo', value: 'text'}, {title: 'Redazione', value: 'redaction'}, {title: 'Testimone', value: 'witness'},
        ]},
      }),
      defineField({name: 'label', title: 'Nome', type: 'string', validation: R => R.required()}),
      defineField({name: 'summary', title: 'Sintesi', type: 'text', rows: 4, validation: R => R.required()}),
      defineField({
        name: 'temporal', title: 'Collocazione temporale', type: 'object', validation: R => R.required(), fields: [
          defineField({name: 'start', title: 'Anno iniziale', type: 'number'}),
          defineField({name: 'end', title: 'Anno finale', type: 'number'}),
          defineField({name: 'precision', title: 'Precisione', type: 'string', validation: R => R.required(), options: {list: [
            {title: 'Anno', value: 'year'}, {title: 'Intervallo', value: 'range'}, {title: 'Secolo', value: 'century'}, {title: 'Non determinata', value: 'unknown'},
          ]}}),
        ],
      }),
      defineField({
        name: 'spatial', title: 'Collocazione spaziale', type: 'object', fields: [
          defineField({name: 'point', title: 'Punto geografico', type: 'geopoint'}),
          defineField({name: 'region', title: 'Regione / area descrittiva', type: 'string'}),
        ],
      }),
      defineField({name: 'epistemicStatus', title: 'Stato epistemico', type: 'string', options: {list: epistemicOptions}, validation: R => R.required()}),
      defineField({name: 'biblicalRefs', title: 'Riferimenti biblici', type: 'array', of: [defineArrayMember({type: 'historicalBiblicalReference'})]}),
      defineField({name: 'relations', title: 'Relazioni', type: 'array', of: [defineArrayMember({type: 'historicalRelation'})]}),
      defineField({name: 'sources', title: 'Fonti / provenance', type: 'array', of: [defineArrayMember({type: 'historicalSource'})], validation: R => R.min(1).warning('Ogni entità dovrebbe avere almeno una fonte o una provenance editoriale.')}),
    ],
    preview: {
      select: {title: 'label', type: 'type', status: 'epistemicStatus'},
      prepare({title, type, status}) { return {title, subtitle: [type, status].filter(Boolean).join(' · ')} },
    },
  }),

  defineType({
    name: 'historicalArea',
    title: 'Area storica Historical Explorer',
    type: 'document',
    fields: [
      defineField({name: 'id', title: 'ID stabile', type: 'string', validation: R => R.required()}),
      defineField({name: 'entity', title: 'Entità rappresentata', type: 'reference', to: [{type: 'historicalEntity'}], validation: R => R.required()}),
      defineField({name: 'label', title: 'Etichetta', type: 'string', validation: R => R.required()}),
      defineField({name: 'temporal', title: 'Intervallo temporale', type: 'object', fields: [
        defineField({name: 'start', title: 'Anno iniziale', type: 'number', validation: R => R.required()}),
        defineField({name: 'end', title: 'Anno finale', type: 'number', validation: R => R.required()}),
      ], validation: R => R.required()}),
      defineField({name: 'confidence', title: 'Affidabilità della geometria', type: 'string', validation: R => R.required(), options: {list: [
        {title: 'Illustrativa', value: 'illustrative'}, {title: 'Approssimata', value: 'approximate'}, {title: 'Ricostruita da dati/fonti', value: 'reconstructed'},
      ]}}),
      defineField({name: 'note', title: 'Nota metodologica', type: 'text', rows: 3, validation: R => R.required()}),
      defineField({
        name: 'geometry', title: 'Geometria poligonale', type: 'object', validation: R => R.required(), fields: [
          defineField({name: 'type', title: 'Tipo', type: 'string', initialValue: 'Polygon', readOnly: true, options: {list: [{title: 'Polygon', value: 'Polygon'}]}}),
          defineField({
            name: 'rings', title: 'Anelli del poligono', type: 'array', validation: R => R.min(1).required(), of: [
              defineArrayMember({
                type: 'object', name: 'historicalPolygonRing', title: 'Anello', fields: [
                  defineField({name: 'points', title: 'Vertici', type: 'array', validation: R => R.min(4).required(), of: [defineArrayMember({type: 'geopoint'})]}),
                ],
                preview: {prepare() { return {title: 'Anello geografico'} }},
              }),
            ],
          }),
        ],
      }),
      defineField({name: 'sources', title: 'Provenance della geometria', type: 'array', of: [defineArrayMember({type: 'historicalSource'})], validation: R => R.min(1).warning('Registrare la provenance della geometria, anche quando è un’elaborazione editoriale.')}),
    ],
    preview: {select: {title: 'label', subtitle: 'confidence'}},
  }),

  defineType({
    name: 'historicalExplorerDataset',
    title: 'Dataset Historical Explorer',
    type: 'document',
    fields: [
      defineField({name: 'id', title: 'ID / slug stabile', type: 'string', validation: R => R.required()}),
      defineField({name: 'title', title: 'Titolo', type: 'string', validation: R => R.required()}),
      defineField({name: 'subtitle', title: 'Sottotitolo', type: 'text', rows: 3, validation: R => R.required()}),
      defineField({name: 'book', title: 'Libro biblico di riferimento', type: 'reference', to: [{type: 'libro'}], validation: R => R.required()}),
      defineField({name: 'defaultRange', title: 'Intervallo temporale predefinito', type: 'object', fields: [
        defineField({name: 'start', title: 'Anno iniziale', type: 'number', validation: R => R.required()}),
        defineField({name: 'end', title: 'Anno finale', type: 'number', validation: R => R.required()}),
      ], validation: R => R.required()}),
      defineField({name: 'quickYears', title: 'Anni di accesso rapido', type: 'array', of: [defineArrayMember({type: 'number'})]}),
      defineField({name: 'scenarios', title: 'Scenari storici', type: 'array', of: [defineArrayMember({type: 'historicalScenario'})]}),
      defineField({name: 'entities', title: 'Entità incluse', type: 'array', of: [defineArrayMember({type: 'reference', to: [{type: 'historicalEntity'}]})], validation: R => R.min(1).required()}),
      defineField({name: 'areas', title: 'Aree storiche', type: 'array', of: [defineArrayMember({type: 'reference', to: [{type: 'historicalArea'}]})]}),
      defineField({name: 'noteEditoriali', title: 'Note editoriali del dataset', type: 'text', rows: 4}),
    ],
    preview: {
      select: {title: 'title', book: 'book.titolo', id: 'id'},
      prepare({title, book, id}) { return {title, subtitle: [book, id].filter(Boolean).join(' · ')} },
    },
  }),
]
