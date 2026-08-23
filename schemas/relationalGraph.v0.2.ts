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

const claimModeOptions = [
  {title: 'Dato testuale diretto', value: 'direct_textual'},
  {title: 'Inferenza critica', value: 'critical_inference'},
  {title: 'Attestazione storica', value: 'historical_attestation'},
  {title: 'Comparazione', value: 'comparative'},
  {title: 'Lettura canonica', value: 'canonical_reading'},
  {title: 'Ricezione attestata', value: 'reception_attestation'},
  {title: 'Lettura confessionale', value: 'confessional_reading'},
]

const confidenceOptions = [
  {title: 'Stabilita', value: 'established'},
  {title: 'Fortemente sostenuta', value: 'strongly_supported'},
  {title: 'Plausibile', value: 'plausible'},
  {title: 'Dibattuta', value: 'debated'},
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
  {title: 'Sviluppa concetto', value: 'DEVELOPS_CONCEPT'},
  {title: 'Trasforma concetto', value: 'TRANSFORMS_CONCEPT'},
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

export const relationalGraphSchemasV02 = [
  defineType({
    name: 'bfrgV02BiblicalLocator',
    title: 'BFRG v0.2 · Localizzatore biblico',
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
    name: 'bfrgV02Citation',
    title: 'BFRG v0.2 · Citazione',
    type: 'object',
    fields: [
      defineField({name: 'citation', title: 'Citazione', type: 'text', rows: 2, validation: R => R.required()}),
      defineField({name: 'locator', title: 'Localizzatore', type: 'string'}),
      defineField({name: 'url', title: 'URL', type: 'url'}),
      defineField({name: 'note', title: 'Nota', type: 'text', rows: 2}),
    ],
  }),
  defineType({
    name: 'bfrgV02Evidence',
    title: 'BFRG v0.2 · Evidenza',
    type: 'object',
    fields: [
      defineField({name: 'kind', title: 'Tipo', type: 'string', options: {list: evidenceKindOptions}, validation: R => R.required()}),
      defineField({name: 'claim', title: 'Che cosa sostiene', type: 'text', rows: 3, validation: R => R.required()}),
      defineField({name: 'biblicalLocator', title: 'Riferimento biblico', type: 'bfrgV02BiblicalLocator'}),
      defineField({name: 'citation', title: 'Fonte', type: 'bfrgV02Citation'}),
      defineField({name: 'note', title: 'Nota metodologica', type: 'text', rows: 2}),
    ],
  }),
  defineType({
    name: 'bfrgV02Node',
    title: 'BFRG v0.2 · Nodo',
    type: 'document',
    fields: [
      defineField({name: 'label', title: 'Etichetta', type: 'string', validation: R => R.required()}),
      defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'label'}, validation: R => R.required()}),
      defineField({name: 'family', title: 'Famiglia', type: 'string', options: {list: nodeFamilyOptions}, validation: R => R.required()}),
      defineField({name: 'subtype', title: 'Sottotipo', type: 'string'}),
      defineField({name: 'description', title: 'Definizione editoriale', type: 'text', rows: 4, validation: R => R.required()}),
      defineField({name: 'guidingQuestion', title: 'Domanda guida', type: 'string'}),
      defineField({name: 'negativeScope', title: 'Che cosa non significa', type: 'text', rows: 3, description: 'Richiesto editorialmente soprattutto per HUMANITY.'}),
      defineField({name: 'aliases', title: 'Alias', type: 'array', of: [defineArrayMember({type: 'string'})]}),
      defineField({
        name: 'canonicalRef', title: 'Documento esistente', type: 'reference',
        to: [{type: 'libro'}, {type: 'capitolo'}, {type: 'fonteBiblica'}, {type: 'historicalEntity'}, {type: 'historicalArea'}],
      }),
      defineField({name: 'biblicalLocator', title: 'Localizzatore biblico', type: 'bfrgV02BiblicalLocator'}),
      defineField({name: 'bibliography', title: 'Bibliografia', type: 'array', of: [defineArrayMember({type: 'bfrgV02Citation'})]}),
      defineField({name: 'ontologyVersion', title: 'Versione', type: 'string', initialValue: '0.2', readOnly: true}),
      defineField({name: 'editorialStatus', title: 'Stato editoriale', type: 'string', options: {list: editorialStatusOptions}, initialValue: 'draft', validation: R => R.required()}),
    ],
  }),
  defineType({
    name: 'bfrgV02Edge',
    title: 'BFRG v0.2 · Relazione',
    type: 'document',
    fields: [
      defineField({name: 'source', title: 'Sorgente', type: 'reference', to: [{type: 'bfrgV02Node'}], validation: R => R.required()}),
      defineField({name: 'predicate', title: 'Predicato', type: 'string', options: {list: predicateOptions}, validation: R => R.required()}),
      defineField({name: 'target', title: 'Destinazione', type: 'reference', to: [{type: 'bfrgV02Node'}], validation: R => R.required()}),
      defineField({name: 'thesis', title: 'Micro-tesi', type: 'text', rows: 2, validation: R => R.required().min(20)}),
      defineField({name: 'rationale', title: 'Motivazione', type: 'text', rows: 5, validation: R => R.required().min(40)}),
      defineField({name: 'perspective', title: 'Prospettiva primaria', type: 'string', options: {list: perspectiveOptions}, validation: R => R.required()}),
      defineField({name: 'secondaryPerspectives', title: 'Prospettive secondarie', type: 'array', of: [defineArrayMember({type: 'string', options: {list: perspectiveOptions}})]}),
      defineField({name: 'claimMode', title: 'Natura della tesi', type: 'string', options: {list: claimModeOptions}, validation: R => R.required()}),
      defineField({name: 'confidence', title: 'Forza della tesi', type: 'string', options: {list: confidenceOptions}, validation: R => R.required()}),
      defineField({name: 'methods', title: 'Metodi', type: 'array', of: [defineArrayMember({type: 'string'})], validation: R => R.required().min(1)}),
      defineField({name: 'evidence', title: 'Evidenze', type: 'array', of: [defineArrayMember({type: 'bfrgV02Evidence'})], validation: R => R.required().min(1)}),
      defineField({name: 'bibliography', title: 'Bibliografia', type: 'array', of: [defineArrayMember({type: 'bfrgV02Citation'})]}),
      defineField({name: 'ontologyVersion', title: 'Versione', type: 'string', initialValue: '0.2', readOnly: true}),
      defineField({name: 'editorialStatus', title: 'Stato editoriale', type: 'string', options: {list: editorialStatusOptions}, initialValue: 'draft', validation: R => R.required()}),
      defineField({name: 'reviewedAt', title: 'Data revisione', type: 'date'}),
      defineField({name: 'reviewedBy', title: 'Revisore / responsabile', type: 'string'}),
      defineField({name: 'editorialNote', title: 'Nota editoriale', type: 'text', rows: 3}),
    ],
    validation: Rule => Rule.custom((value: any) => {
      const source = value?.source?._ref
      const target = value?.target?._ref
      if (source && target && source === target) return 'Sorgente e destinazione non possono coincidere.'
      if (value?.editorialStatus === 'approved' && (!value?.reviewedAt || !value?.reviewedBy)) return 'Una relazione approvata richiede data e responsabile della revisione.'
      return true
    }),
  }),
]

// Schema sperimentale: NON registrare in sanity.config.ts e NON usare in production
// finché ontologia e corpus pilota v0.2 non superano l'audit finale.