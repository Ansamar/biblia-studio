import {defineArrayMember, defineField, defineType} from 'sanity'

const nodeFamilyOptions = [
  {title: 'Testo', value: 'TEXT'},
  {title: 'Mondo', value: 'WORLD'},
  {title: 'Cultura', value: 'CULTURE'},
  {title: 'Umanità', value: 'HUMANITY'},
  {title: 'Tradizione', value: 'TRADITION'},
  {title: 'Ricezione', value: 'RECEPTION'},
]

const perspectiveOptions = [
  {title: 'Testuale', value: 'textual'},
  {title: 'Letteraria', value: 'literary'},
  {title: 'Storica', value: 'historical'},
  {title: 'Sociale', value: 'social'},
  {title: 'Culturale', value: 'cultural'},
  {title: 'Antropologica', value: 'anthropological'},
  {title: 'Canonica', value: 'canonical'},
  {title: 'Ricezione', value: 'reception'},
  {title: 'Confessionale / cattolica', value: 'confessional'},
]

const epistemicOptions = [
  {title: 'Esplicita', value: 'explicit'},
  {title: 'Fortemente sostenuta', value: 'strongly_supported'},
  {title: 'Plausibile', value: 'plausible'},
  {title: 'Dibattuta', value: 'debated'},
  {title: 'Comparativa', value: 'comparative'},
  {title: 'Ricezione attestata', value: 'reception_attested'},
]

const evidenceKindOptions = [
  {title: 'Testo primario', value: 'primary_text'},
  {title: 'Variante testuale', value: 'textual_variant'},
  {title: 'Evidenza lessicale', value: 'lexical'},
  {title: 'Struttura letteraria', value: 'literary_structure'},
  {title: 'Fonte storica', value: 'historical_source'},
  {title: 'Archeologia / epigrafia', value: 'archaeological'},
  {title: 'Corpus comparativo', value: 'comparative_corpus'},
  {title: 'Letteratura secondaria', value: 'secondary_literature'},
  {title: 'Fonte liturgica', value: 'liturgical_source'},
  {title: 'Fonte magisteriale', value: 'magisterial_source'},
]

const predicateOptions = [
  {title: 'Cita', value: 'CITES'},
  {title: 'Allude a', value: 'ALLUDES_TO'},
  {title: 'Riusa', value: 'REUSES'},
  {title: 'Interpreta un testo', value: 'INTERPRETS_TEXT'},
  {title: 'Contrasta con', value: 'CONTRASTS_WITH'},
  {title: 'Parallelo testuale con', value: 'PARALLELS_TEXT'},
  {title: 'Emerge in', value: 'EMERGES_IN'},
  {title: 'Localizzato in', value: 'LOCATED_IN'},
  {title: 'Partecipa a', value: 'PARTICIPATES_IN'},
  {title: 'Interagisce con', value: 'INTERACTS_WITH'},
  {title: 'Parallelo culturale con', value: 'CULTURAL_PARALLEL_WITH'},
  {title: 'Possibile influenza da', value: 'POSSIBLE_INFLUENCE_FROM'},
  {title: 'Probabile dipendenza da', value: 'PROBABLE_DEPENDENCE_ON'},
  {title: 'Tematizza', value: 'THEMATIZES'},
  {title: 'Problematizza', value: 'PROBLEMATIZES'},
  {title: 'Sviluppa', value: 'DEVELOPS'},
  {title: 'Trasforma', value: 'TRANSFORMS'},
  {title: 'Esemplifica', value: 'EXEMPLIFIES'},
  {title: 'Appartiene a', value: 'BELONGS_TO'},
  {title: 'Traduce', value: 'TRANSLATES'},
  {title: 'Espande', value: 'EXPANDS'},
  {title: 'Abbrevia', value: 'ABBREVIATES'},
  {title: 'Conserva variante di', value: 'PRESERVES_VARIANT_OF'},
  {title: 'Redaziona', value: 'REDACTS'},
  {title: 'Riceve', value: 'RECEIVES'},
  {title: 'Reinterpreta', value: 'REINTERPRETS'},
  {title: 'Usa liturgicamente', value: 'LITURGICALLY_USES'},
  {title: 'Sviluppa teologicamente', value: 'THEOLOGICALLY_DEVELOPS'},
]

const editorialStatusOptions = [
  {title: 'Bozza', value: 'draft'},
  {title: 'In revisione', value: 'review'},
  {title: 'Approvata', value: 'approved'},
  {title: 'Deprecata', value: 'deprecated'},
]

export const relationalGraphSchemas = [
  defineType({
    name: 'bfrgBiblicalLocator',
    title: 'BFRG · Localizzatore biblico',
    type: 'object',
    fields: [
      defineField({name: 'display', title: 'Forma visualizzata', type: 'string', validation: R => R.required()}),
      defineField({name: 'bookSlug', title: 'Slug libro', type: 'string', validation: R => R.required()}),
      defineField({name: 'chapterStart', title: 'Capitolo iniziale', type: 'number', validation: R => R.integer().min(1)}),
      defineField({name: 'chapterEnd', title: 'Capitolo finale', type: 'number', validation: R => R.integer().min(1)}),
      defineField({name: 'verseStart', title: 'Versetto iniziale', type: 'number', validation: R => R.integer().min(1)}),
      defineField({name: 'verseEnd', title: 'Versetto finale', type: 'number', validation: R => R.integer().min(1)}),
    ],
  }),

  defineType({
    name: 'bfrgCitation',
    title: 'BFRG · Citazione',
    type: 'object',
    fields: [
      defineField({name: 'citation', title: 'Citazione bibliografica', type: 'text', rows: 2, validation: R => R.required()}),
      defineField({name: 'locator', title: 'Localizzatore', type: 'string', description: 'Pagina, sezione, iscrizione, tavoletta, paragrafo o altro riferimento puntuale.'}),
      defineField({name: 'url', title: 'URL', type: 'url'}),
      defineField({name: 'note', title: 'Nota', type: 'text', rows: 2}),
    ],
  }),

  defineType({
    name: 'bfrgEvidence',
    title: 'BFRG · Evidenza',
    type: 'object',
    fields: [
      defineField({name: 'kind', title: 'Tipo di evidenza', type: 'string', options: {list: evidenceKindOptions}, validation: R => R.required()}),
      defineField({name: 'claim', title: 'Che cosa sostiene questa evidenza', type: 'text', rows: 3, validation: R => R.required()}),
      defineField({name: 'biblicalLocator', title: 'Riferimento biblico', type: 'bfrgBiblicalLocator'}),
      defineField({name: 'citation', title: 'Fonte / bibliografia', type: 'bfrgCitation'}),
      defineField({name: 'note', title: 'Nota metodologica', type: 'text', rows: 2}),
    ],
  }),

  defineType({
    name: 'bfrgNode',
    title: 'BFRG · Nodo',
    type: 'document',
    fields: [
      defineField({name: 'label', title: 'Etichetta', type: 'string', validation: R => R.required()}),
      defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'label'}, validation: R => R.required()}),
      defineField({name: 'family', title: 'Famiglia ontologica', type: 'string', options: {list: nodeFamilyOptions}, validation: R => R.required()}),
      defineField({name: 'subtype', title: 'Sottotipo', type: 'string', description: 'Vocabolario aperto in v0.1; sarà controllato dopo il corpus pilota.'}),
      defineField({name: 'description', title: 'Definizione editoriale', type: 'text', rows: 4, validation: R => R.required()}),
      defineField({name: 'guidingQuestion', title: 'Domanda guida', type: 'string', description: 'Particolarmente importante per i nodi UMANITÀ.'}),
      defineField({name: 'aliases', title: 'Alias', type: 'array', of: [defineArrayMember({type: 'string'})]}),
      defineField({
        name: 'canonicalRef',
        title: 'Documento canonico già esistente',
        type: 'reference',
        description: 'Semantic wrapper: evita di duplicare dati già presenti nel corpus.',
        to: [
          {type: 'libro'},
          {type: 'capitolo'},
          {type: 'fonteBiblica'},
          {type: 'historicalEntity'},
          {type: 'historicalArea'},
        ],
      }),
      defineField({name: 'biblicalLocator', title: 'Localizzatore biblico', type: 'bfrgBiblicalLocator'}),
      defineField({name: 'bibliography', title: 'Bibliografia', type: 'array', of: [defineArrayMember({type: 'bfrgCitation'})]}),
      defineField({name: 'ontologyVersion', title: 'Versione ontologia', type: 'string', initialValue: '0.1', readOnly: true}),
      defineField({name: 'editorialStatus', title: 'Stato editoriale', type: 'string', options: {list: editorialStatusOptions}, initialValue: 'draft', validation: R => R.required()}),
    ],
    preview: {
      select: {title: 'label', family: 'family', subtype: 'subtype'},
      prepare({title, family, subtype}) {
        return {title, subtitle: [family, subtype].filter(Boolean).join(' · ')}
      },
    },
  }),

  defineType({
    name: 'bfrgEdge',
    title: 'BFRG · Relazione',
    type: 'document',
    fields: [
      defineField({name: 'source', title: 'Sorgente', type: 'reference', to: [{type: 'bfrgNode'}], validation: R => R.required()}),
      defineField({name: 'predicate', title: 'Predicato', type: 'string', options: {list: predicateOptions}, validation: R => R.required()}),
      defineField({name: 'target', title: 'Destinazione', type: 'reference', to: [{type: 'bfrgNode'}], validation: R => R.required()}),
      defineField({name: 'thesis', title: 'Micro-tesi', type: 'text', rows: 2, validation: R => R.required().min(20)}),
      defineField({name: 'rationale', title: 'Motivazione', type: 'text', rows: 5, validation: R => R.required().min(40)}),
      defineField({name: 'perspective', title: 'Prospettiva primaria', type: 'string', options: {list: perspectiveOptions}, validation: R => R.required()}),
      defineField({name: 'secondaryPerspectives', title: 'Prospettive secondarie', type: 'array', of: [defineArrayMember({type: 'string', options: {list: perspectiveOptions}})]}),
      defineField({name: 'epistemicStatus', title: 'Statuto epistemico', type: 'string', options: {list: epistemicOptions}, validation: R => R.required()}),
      defineField({name: 'methods', title: 'Metodi', type: 'array', of: [defineArrayMember({type: 'string'})], validation: R => R.required().min(1)}),
      defineField({name: 'evidence', title: 'Evidenze', type: 'array', of: [defineArrayMember({type: 'bfrgEvidence'})], validation: R => R.required().min(1)}),
      defineField({name: 'bibliography', title: 'Bibliografia', type: 'array', of: [defineArrayMember({type: 'bfrgCitation'})]}),
      defineField({name: 'ontologyVersion', title: 'Versione ontologia', type: 'string', initialValue: '0.1', readOnly: true}),
      defineField({name: 'editorialStatus', title: 'Stato editoriale', type: 'string', options: {list: editorialStatusOptions}, initialValue: 'draft', validation: R => R.required()}),
      defineField({name: 'reviewedAt', title: 'Data ultima revisione', type: 'date'}),
      defineField({name: 'reviewedBy', title: 'Revisore / responsabile', type: 'string'}),
      defineField({name: 'editorialNote', title: 'Nota editoriale interna', type: 'text', rows: 3}),
    ],
    validation: Rule => Rule.custom((value: any) => {
      const source = value?.source?._ref
      const target = value?.target?._ref
      if (source && target && source === target) return 'Una relazione BFRG non può avere lo stesso nodo come sorgente e destinazione.'
      return true
    }),
    preview: {
      select: {predicate: 'predicate', thesis: 'thesis', status: 'epistemicStatus'},
      prepare({predicate, thesis, status}) {
        return {title: predicate || 'Relazione BFRG', subtitle: [status, thesis].filter(Boolean).join(' · ')}
      },
    },
  }),
]

// IMPORTANTE: questo schema è intenzionalmente isolato in v0.1.
// Non aggiungere `relationalGraphSchemas` a sanity.config.ts finché il corpus pilota
// Genesi 1–11 e l'audit ontologico non avranno validato il modello.
