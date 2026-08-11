import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

export default defineConfig({
  name: 'default',
  title: 'Biblia Fontes CMS',
  projectId: 'jc1k65lj',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title('Biblia Fontes')
          .items([
            S.listItem()
              .title('📖 Libri Biblici')
              .child(
                S.documentTypeList('libro')
                  .title('Libri Biblici')
                  .defaultOrdering([
                    {field: 'ordine', direction: 'asc'},
                  ])
                  .child((documentId) =>
                    S.list()
                      .title('Libro Biblico')
                      .items([
                        S.listItem()
                          .title('📖 Scheda del Libro')
                          .child(
                            S.document()
                              .schemaType('libro')
                              .documentId(documentId)
                          ),

                        S.divider(),

                        S.listItem()
                          .title('📚 Capitoli')
                          .child(async () => {
                            const client = context.getClient({
                              apiVersion: '2025-08-15',
                            })

                            const capitoli = await client.fetch(
                              `*[
                                _type == "capitolo" &&
                                libro._ref == $libroId
                              ] | order(numero asc) {
                                _id,
                                numero,
                                titolo
                              }`,
                              {libroId: documentId}
                            )

                            return S.list()
                              .id(`capitoli-${documentId}`)
                              .title('Capitoli')
                              .items(
                                capitoli.map(
                                  (capitolo: {
                                    _id: string
                                    numero?: number
                                    titolo?: string
                                  }) => {
                                    const numero =
                                      typeof capitolo.numero === 'number'
                                        ? String(capitolo.numero).padStart(2, '0')
                                        : '--'

                                    const titolo =
                                      capitolo.titolo || 'Senza titolo'

                                    return S.listItem()
                                      .id(capitolo._id)
                                      .title(
                                        `Capitolo ${numero} — ${titolo}`
                                      )
                                      .child(
                                        S.document()
                                          .schemaType('capitolo')
                                          .documentId(capitolo._id)
                                      )
                                  }
                                )
                              )
                          }),
                      ])
                  )
              ),

            S.divider(),

            S.listItem()
              .title('📚 Tradizioni / Strati Letterari')
              .child(
                S.documentTypeList('fonteBiblica')
                  .title('Tradizioni / Strati Letterari')
                  .defaultOrdering([
                    {field: 'sigla', direction: 'asc'},
                  ])
              ),

            S.listItem()
              .title('📚 Fonti / Strati Letterari — archivio')
              .child(
                S.documentTypeList('fonte')
                  .title('Fonti / Strati Letterari')
                  .defaultOrdering([
                    {field: 'sigla', direction: 'asc'},
                  ])
              ),

            S.listItem()
              .title('📜 Testimonianze Testuali')
              .child(
                S.documentTypeList('testimonianza')
                  .title('Testimonianze Testuali')
                  .defaultOrdering([
                    {field: 'sigla', direction: 'asc'},
                  ])
              ),
          ]),
    }),
  ],

  schema: {
    types: [
      // ============================================================
      // LIBRO BIBLICO
      // ============================================================

      {
        name: 'libro',
        type: 'document',
        title: 'Libro Biblico',

        fields: [
          {
            name: 'titolo',
            type: 'string',
            title: 'Titolo del Libro',
          },
          {
            name: 'titoloEbraico',
            type: 'string',
            title: 'Nome Originale',
            description: 'Nome ebraico, aramaico o greco del libro.',
          },
          {
            name: 'categoriaId',
            type: 'string',
            title: 'Categoria',
            options: {
              list: [
                {title: 'Pentateuco', value: 'pentateuco'},
                {title: 'Libri Storici', value: 'storici'},
                {title: 'Libri Sapienziali', value: 'sapienziali'},
                {title: 'Libri Profetici', value: 'profetici'},
                {title: 'Vangeli', value: 'vangeli'},
                {title: 'Atti degli Apostoli', value: 'atti'},
                {title: 'Lettere Paoline', value: 'paoline'},
                {title: 'Lettere Cattoliche', value: 'cattoliche'},
                {title: 'Apocalittica', value: 'apocalittica'},
              ],
            },
          },
          {
            name: 'ordine',
            type: 'number',
            title: 'Ordine nella Bibbia',
            description: 'Posizione del libro nella Bibbia CEI 2008. Genesi = 1.',
          },
          {
            name: 'capitoli',
            type: 'number',
            title: 'Numero Capitoli',
          },
          {
            name: 'lingua',
            type: 'string',
            title: 'Lingua Principale',
          },

          // ============================================================
          // PROFILO LETTERARIO / POETICO DEL LIBRO
          // Utile soprattutto per Giobbe, Salmi, Proverbi, Qoèlet,
          // Cantico dei Cantici, Sapienza e Siracide.
          // ============================================================

          {
            name: 'profiloLetterario',
            type: 'object',
            title: 'Profilo Letterario / Poetico',
            fields: [
              {
                name: 'generePrincipale',
                type: 'string',
                title: 'Genere Principale',
                description:
                  'Esempi: dialogo sapienziale, salterio, raccolta proverbiale, riflessione sapienziale, poesia amorosa, protrettica sapienziale.',
              },
              {
                name: 'generiSecondari',
                type: 'array',
                title: 'Generi Secondari',
                of: [{type: 'string'}],
                options: {layout: 'tags'},
              },
              {
                name: 'strutturaGenerale',
                type: 'text',
                title: 'Struttura Letteraria Generale',
                description:
                  'Macrostruttura del libro e principali blocchi o raccolte.',
              },
              {
                name: 'criteriCompositivi',
                type: 'text',
                title: 'Criteri Compositivi',
                description:
                  'Criteri linguistici, poetici, tematici e redazionali usati per distinguere blocchi, raccolte o voci.',
              },
              {
                name: 'notaMetodologica',
                type: 'text',
                title: 'Nota Metodologica',
                description:
                  'Precisa quali categorie sono dati testuali e quali sono ricostruzioni critiche.',
              },
            ],
          },

          {
            name: 'macroSezioni',
            type: 'array',
            title: 'Macro-sezioni / Raccolte del Libro',
            description:
              'Permette di descrivere collezioni e grandi blocchi senza trasformarli automaticamente in fonti documentarie.',
            of: [
              {
                type: 'object',
                fields: [
                  {name: 'etichetta', type: 'string', title: 'Nome della Sezione / Raccolta'},
                  {name: 'sigla', type: 'string', title: 'Sigla'},
                  {name: 'capitoloInizio', type: 'number', title: 'Capitolo Inizio'},
                  {name: 'versettoInizio', type: 'number', title: 'Versetto Inizio'},
                  {name: 'capitoloFine', type: 'number', title: 'Capitolo Fine'},
                  {name: 'versettoFine', type: 'number', title: 'Versetto Fine'},
                  {
                    name: 'tipo',
                    type: 'string',
                    title: 'Tipo',
                    options: {
                      list: [
                        {title: 'Raccolta', value: 'raccolta'},
                        {title: 'Macro-sezione', value: 'macro_sezione'},
                        {title: 'Cornice narrativa', value: 'cornice'},
                        {title: 'Dialogo / discorsi', value: 'dialoghi'},
                        {title: 'Poema / unità poetica', value: 'poema'},
                        {title: 'Epilogo / redazione', value: 'epilogo'},
                        {title: 'Altro', value: 'altro'},
                      ],
                    },
                  },
                  {
                    name: 'certezza',
                    type: 'string',
                    title: 'Certezza della Delimitazione',
                    options: {
                      list: [
                        {title: '🟢 Dato testuale / delimitazione chiara', value: 'consenso'},
                        {title: '🟡 Ipotesi accademica', value: 'ipotesi'},
                        {title: '🟠 Discussa', value: 'dibattuta'},
                      ],
                    },
                  },
                  {name: 'descrizione', type: 'text', title: 'Descrizione'},
                  {name: 'notaCritica', type: 'text', title: 'Nota Critica'},
                ],
              },
            ],
          },

          {
            name: 'datazione',
            type: 'object',
            title: 'Datazione della Redazione',
            fields: [
              {
                name: 'etichettaInizio',
                type: 'string',
                title: 'Etichetta Inizio',
              },
              {
                name: 'etichettaFine',
                type: 'string',
                title: 'Etichetta Fine',
              },
              {
                name: 'datazioneIniziale',
                type: 'number',
                title: 'Anno Iniziale',
                description: 'Numero negativo per gli anni a.C.',
              },
              {
                name: 'datazioneFinale',
                type: 'number',
                title: 'Anno Finale',
                description: 'Numero negativo per gli anni a.C.',
              },
              {
                name: 'certezza',
                type: 'string',
                title: 'Stato della Datazione',
                options: {
                  list: [
                    {title: '🟢 Consenso ampio', value: 'consenso'},
                    {title: '🟡 Ipotesi accademica', value: 'ipotesi'},
                    {title: '🟠 Ricostruzione discussa', value: 'dibattuta'},
                    {title: '🔴 Ipotesi speculativa', value: 'speculativa'},
                  ],
                },
              },
              {
                name: 'nota',
                type: 'text',
                title: 'Nota sulla Datazione',
              },
            ],
          },

          {
            name: 'descrizione',
            type: 'text',
            title: 'Descrizione Generale',
          },

          {
            name: 'metodiAnalisi',
            type: 'array',
            title: 'Metodi Storico-Critici',
            of: [
              {
                type: 'object',
                fields: [
                  {
                    name: 'metodo',
                    type: 'string',
                    title: 'Metodo',
                    options: {
                      list: [
                        {title: 'Critica Testuale', value: 'testuale'},
                        {title: 'Critica delle Fonti', value: 'fonti'},
                        {title: 'Critica delle Forme', value: 'forme'},
                        {title: 'Critica della Tradizione', value: 'tradizione'},
                        {title: 'Critica della Redazione', value: 'redazione'},
                      ],
                    },
                  },
                  {
                    name: 'domanda',
                    type: 'string',
                    title: 'Domanda del Metodo',
                  },
                  {
                    name: 'sintesi',
                    type: 'text',
                    title: 'Sintesi',
                  },
                  {
                    name: 'analisi',
                    type: 'text',
                    title: 'Analisi Approfondita',
                  },
                ],
              },
            ],
          },

          {
            name: 'mondoDietroIlTesto',
            type: 'text',
            title: 'Il Mondo Dietro il Testo',
          },

          {
            name: 'eventiNarrati',
            type: 'array',
            title: 'Eventi Narrati',
            of: [
              {
                type: 'object',
                fields: [
                  {name: 'etichetta', type: 'string', title: 'Evento Narrato'},
                  {name: 'inizio', type: 'number', title: 'Anno Iniziale'},
                  {name: 'fine', type: 'number', title: 'Anno Finale'},
                  {
                    name: 'certezza',
                    type: 'string',
                    title: 'Stato',
                    options: {
                      list: [
                        {title: '🟢 Storicamente documentato', value: 'storico'},
                        {title: '🟡 Storicamente plausibile', value: 'plausibile'},
                        {title: '🟠 Tradizionale / narrativo', value: 'tradizionale'},
                        {title: '🔴 Non databile', value: 'non_databile'},
                      ],
                    },
                  },
                  {name: 'descrizione', type: 'text', title: 'Nota Critica'},
                ],
              },
            ],
          },

          {
            name: 'mondoDelTesto',
            type: 'text',
            title: 'Il Mondo del Testo',
          },

          {
            name: 'redazione',
            type: 'array',
            title: 'Fasi di Redazione',
            of: [
              {
                type: 'object',
                fields: [
                  {name: 'etichetta', type: 'string', title: 'Fase / Strato'},
                  {
                    name: 'fonte',
                    type: 'reference',
                    title: 'Fonte / Strato Letterario',
                    to: [{type: 'fonte'}, {type: 'fonteBiblica'}],
                  },
                  {name: 'inizio', type: 'number', title: 'Anno Inizio'},
                  {name: 'fine', type: 'number', title: 'Anno Fine'},
                  {name: 'datazione', type: 'string', title: 'Etichetta della Datazione'},
                  {
                    name: 'certezza',
                    type: 'string',
                    title: 'Stato della Ricostruzione',
                    options: {
                      list: [
                        {title: '🟢 Consenso', value: 'consenso'},
                        {title: '🟡 Ipotesi', value: 'ipotesi'},
                        {title: '🟠 Dibattuta', value: 'dibattuta'},
                        {title: '🔴 Speculativa', value: 'speculativa'},
                      ],
                    },
                  },
                  {name: 'descrizione', type: 'text', title: 'Descrizione'},
                  {name: 'motivazione', type: 'text', title: 'Motivazione Critica'},
                ],
              },
            ],
          },

          {
            name: 'mondoAttornoAlTesto',
            type: 'text',
            title: 'Il Mondo Attorno al Testo',
          },

          {
            name: 'contestoStorico',
            type: 'array',
            title: 'Contesto Storico',
            of: [
              {
                type: 'object',
                fields: [
                  {name: 'etichetta', type: 'string', title: 'Evento / Reperto / Contesto'},
                  {name: 'inizio', type: 'number', title: 'Anno Iniziale'},
                  {name: 'fine', type: 'number', title: 'Anno Finale'},
                  {
                    name: 'certezza',
                    type: 'string',
                    title: 'Tipo di Evidenza',
                    options: {
                      list: [
                        {title: '🟢 Archeologico', value: 'archeologico'},
                        {title: '🟢 Fonte storica', value: 'storico'},
                        {title: '🟡 Ricostruzione storica', value: 'ricostruzione'},
                      ],
                    },
                  },
                  {name: 'descrizione', type: 'text', title: 'Descrizione e Paralleli'},
                ],
              },
            ],
          },

          {
            name: 'testimonianze',
            type: 'array',
            title: 'Testimonianze Testuali',
            of: [
              {
                type: 'object',
                fields: [
                  {
                    name: 'testimonianza',
                    type: 'reference',
                    title: 'Testimonianza',
                    to: [{type: 'testimonianza'}],
                  },
                  {name: 'descrizione', type: 'text', title: 'Note sulla Trasmissione'},
                ],
              },
            ],
          },

          {
            name: 'fontiExtraBibliche',
            type: 'array',
            title: 'Fonti e Paralleli Extra-Biblici',
            of: [
              {
                type: 'object',
                fields: [
                  {name: 'titolo', type: 'string', title: 'Fonte'},
                  {name: 'datazione', type: 'string', title: 'Datazione'},
                  {name: 'tipo', type: 'string', title: 'Tipo'},
                  {name: 'descrizione', type: 'text', title: 'Relazione con il Libro'},
                ],
              },
            ],
          },

          {
            name: 'bibliografia',
            type: 'array',
            title: 'Bibliografia',
            of: [
              {
                type: 'object',
                fields: [
                  {
                    name: 'tipo',
                    type: 'string',
                    title: 'Tipo',
                    options: {
                      list: [
                        'Commentario',
                        'Introduzione',
                        'Monografia',
                        'Articolo',
                        'Edizione critica',
                        'Fonte primaria',
                        'Risorsa online',
                      ],
                    },
                  },
                  {name: 'citazione', type: 'text', title: 'Citazione Bibliografica'},
                  {name: 'url', type: 'url', title: 'URL'},
                ],
              },
            ],
          },
        ],
      },

      // ============================================================
      // CAPITOLO BIBLICO
      // ============================================================

      {
        name: 'capitolo',
        type: 'document',
        title: 'Capitolo Biblico',

        fields: [
          {
            name: 'libro',
            type: 'reference',
            title: 'Libro',
            to: [{type: 'libro'}],
          },
          {
            name: 'numero',
            type: 'number',
            title: 'Numero Capitolo',
          },
          {
            name: 'titolo',
            type: 'string',
            title: 'Titolo / Tema del Capitolo',
          },
          {
            name: 'sintesi',
            type: 'text',
            title: 'Sintesi del Capitolo',
          },
          {
            name: 'struttura',
            type: 'text',
            title: 'Struttura del Capitolo',
          },
          {
            name: 'eventiNarrati',
            type: 'text',
            title: 'Eventi Narrati',
          },

          {
            name: 'datazione',
            type: 'object',
            title: 'Datazione / Collocazione',
            fields: [
              {name: 'inizio', type: 'number', title: 'Anno Inizio'},
              {name: 'fine', type: 'number', title: 'Anno Fine'},
              {name: 'etichetta', type: 'string', title: 'Etichetta della Datazione'},
              {
                name: 'certezza',
                type: 'string',
                title: 'Certezza',
                options: {
                  list: [
                    {title: '🟢 Consenso', value: 'consenso'},
                    {title: '🟡 Ipotesi', value: 'ipotesi'},
                    {title: '🟠 Dibattuta', value: 'dibattuta'},
                    {title: '🔴 Non determinabile', value: 'non_determinabile'},
                  ],
                },
              },
              {name: 'nota', type: 'text', title: 'Nota sulla Datazione'},
            ],
          },

          // ==========================================================
          // ANALISI LETTERARIA / POETICA
          // Campi trasversali per Sapienziali e Poetici.
          // Sono opzionali: non alterano i documenti già caricati.
          // ==========================================================

          {
            name: 'analisiLetteraria',
            type: 'object',
            title: 'Analisi Letteraria / Poetica',
            fields: [
              {
                name: 'macroSezione',
                type: 'string',
                title: 'Macro-sezione',
                description:
                  'Esempi: Libro I del Salterio, Dialoghi di Giobbe, Pr 1–9, Discorsi di Eliu.',
              },
              {
                name: 'raccolta',
                type: 'string',
                title: 'Raccolta / Collezione',
                description:
                  'Esempi: Salmi di Asaf, Figli di Core, Proverbi di Salomone, Parole dei Sapienti.',
              },
              {
                name: 'genereLetterario',
                type: 'string',
                title: 'Genere Letterario',
                options: {
                  list: [
                    'Inno',
                    'Lamentazione individuale',
                    'Lamentazione comunitaria',
                    'Rendimento di grazie',
                    'Salmo regale',
                    'Salmo sapienziale',
                    'Salmo di fiducia',
                    'Salmo storico',
                    'Liturgia',
                    'Proverbio',
                    'Istruzione',
                    'Dialogo sapienziale',
                    'Discorso',
                    'Poema sapienziale',
                    'Riflessione sapienziale',
                    'Poesia amorosa',
                    'Elegia',
                    'Preghiera',
                    'Protrettica',
                    'Narrazione in prosa',
                    'Altro',
                  ],
                },
              },
              {
                name: 'sottogenere',
                type: 'string',
                title: 'Sottogenere / Forma',
              },
              {
                name: 'formaLetteraria',
                type: 'text',
                title: 'Forma Letteraria',
                description:
                  'Descrizione sintetica della forma, del movimento retorico e dell’organizzazione dell’unità.',
              },
              {
                name: 'voceParlante',
                type: 'array',
                title: 'Voce / Voci Parlanti',
                of: [{type: 'string'}],
                options: {layout: 'tags'},
                description:
                  'Esempi: Giobbe, Elifaz, Qoèlet, donna, uomo, coro, Sapienza personificata.',
              },
              {
                name: 'interlocutore',
                type: 'array',
                title: 'Interlocutore / Destinatario',
                of: [{type: 'string'}],
                options: {layout: 'tags'},
              },
              {
                name: 'soprascritta',
                type: 'text',
                title: 'Soprascritta / Titolo Testuale',
                description:
                  'Particolarmente importante per i Salmi. Registrare il dato testuale senza trasformarlo automaticamente in attribuzione storica.',
              },
              {
                name: 'attribuzioneTradizionale',
                type: 'string',
                title: 'Attribuzione Tradizionale',
                description:
                  'Esempio: “di Davide”, “di Asaf”, “di Salomone”.',
              },
              {
                name: 'attribuzioneCritica',
                type: 'text',
                title: 'Valutazione Critica dell’Attribuzione',
                description:
                  'Valuta storicamente la soprascritta o l’attribuzione tradizionale e ne indica il grado di certezza.',
              },
              {
                name: 'numerazione',
                type: 'object',
                title: 'Numerazione Testuale',
                fields: [
                  {name: 'cei', type: 'number', title: 'Numerazione CEI'},
                  {name: 'mt', type: 'number', title: 'Numerazione MT'},
                  {name: 'lxx', type: 'number', title: 'Numerazione LXX'},
                  {name: 'vulgata', type: 'number', title: 'Numerazione Vulgata'},
                  {
                    name: 'nota',
                    type: 'text',
                    title: 'Nota sulla Numerazione',
                    description:
                      'Indicare fusioni, divisioni o scarti di numerazione fra le tradizioni.',
                  },
                ],
              },
              {
                name: 'strutturaPoetica',
                type: 'text',
                title: 'Struttura Poetica / Retorica',
                description:
                  'Strofe, parallelismi, inclusioni, acrostici, progressione argomentativa o altre strutture osservabili.',
              },
              {
                name: 'notePoetiche',
                type: 'text',
                title: 'Note Poetiche / Stilistiche',
                description:
                  'Parallelismo, metafore, immagini, giochi fonici, acrostico, ritmo o particolarità stilistiche.',
              },
              {
                name: 'motiviTeologici',
                type: 'array',
                title: 'Motivi Teologici / Sapienziali',
                of: [{type: 'string'}],
                options: {layout: 'tags'},
              },
              {
                name: 'paralleliSapienziali',
                type: 'array',
                title: 'Paralleli Biblici e del Vicino Oriente',
                of: [
                  {
                    type: 'object',
                    fields: [
                      {name: 'riferimento', type: 'string', title: 'Riferimento / Testo'},
                      {
                        name: 'tipo',
                        type: 'string',
                        title: 'Tipo di Parallelo',
                        options: {
                          list: [
                            'Biblico',
                            'Egiziano',
                            'Mesopotamico',
                            'Ugaritico',
                            'Ellenistico',
                            'Qumran',
                            'Altro',
                          ],
                        },
                      },
                      {name: 'descrizione', type: 'text', title: 'Descrizione del Parallelo'},
                      {
                        name: 'rapporto',
                        type: 'string',
                        title: 'Valutazione del Rapporto',
                        options: {
                          list: [
                            'Parallelo tematico',
                            'Parallelo formale',
                            'Possibile contatto culturale',
                            'Possibile dipendenza',
                            'Dipendenza discussa',
                            'Nessuna dipendenza dimostrabile',
                          ],
                        },
                      },
                    ],
                  },
                ],
              },
              {
                name: 'storiaCompositiva',
                type: 'text',
                title: 'Storia Compositiva dell’Unità',
                description:
                  'Distingue dati osservabili e ipotesi su raccolta, inserzione, espansione o redazione.',
              },
            ],
          },

          // ==========================================================
          // NUOVA STRUTTURA: ATTRIBUZIONI A LIVELLO DI PERICOPE
          // ==========================================================

          {
            name: 'attribuzioniFonti',
            type: 'array',
            title: 'Attribuzioni Fonti / Strati per Versetti',
            description:
              'Attribuzione critica di una specifica unità testuale. Non implica che l’intero capitolo appartenga a una sola fonte.',
            of: [
              {
                type: 'object',
                fields: [
                  {
                    name: 'fonte',
                    type: 'reference',
                    title: 'Tradizione / Strato Letterario',
                    to: [{type: 'fonteBiblica'}],
                  },
                  {
                    name: 'modelloCritico',
                    type: 'string',
                    title: 'Modello Critico',
                    options: {
                      list: [
                        {title: 'Modello documentario classico', value: 'documentario_classico'},
                        {title: 'Modello P / H', value: 'p_h'},
                        {title: 'Modello redazionale', value: 'redazionale'},
                        {title: 'Modello compositivo', value: 'compositivo'},
                        {title: 'Raccolta / collezione', value: 'raccolta'},
                        {title: 'Forma testuale / recensione', value: 'forma_testuale'},
                        {title: 'Modello memorialistico', value: 'memorialistico'},
                        {title: 'Modello storiografico', value: 'storiografico'},
                        {title: 'Fonte dichiarata / ricostruita', value: 'fonte'},
                        {title: 'Modello poetico / sapienziale', value: 'poetico'},
                        {title: 'Altro / non specificato', value: 'altro'},
                      ],
                    },
                  },
                  {
                    name: 'versettoInizio',
                    type: 'number',
                    title: 'Versetto Inizio',
                    validation: (Rule: any) => Rule.integer().min(1),
                  },
                  {
                    name: 'versettoFine',
                    type: 'number',
                    title: 'Versetto Fine',
                    validation: (Rule: any) => Rule.integer().min(1),
                  },
                  {
                    name: 'presenza',
                    type: 'string',
                    title: 'Tipo di Presenza',
                    options: {
                      list: [
                        {title: 'Prevalente', value: 'prevalente'},
                        {title: 'Significativa', value: 'significativa'},
                        {title: 'Possibile', value: 'possibile'},
                        {title: 'Marginale', value: 'marginale'},
                      ],
                    },
                  },
                  {
                    name: 'certezza',
                    type: 'string',
                    title: 'Grado di Certezza',
                    options: {
                      list: [
                        {title: '🟢 Consenso ampio', value: 'consenso'},
                        {title: '🟡 Ipotesi accademica', value: 'ipotesi'},
                        {title: '🟠 Ricostruzione discussa', value: 'dibattuta'},
                        {title: '🔴 Ipotesi speculativa', value: 'speculativa'},
                      ],
                    },
                  },
                  {
                    name: 'funzione',
                    type: 'string',
                    title: 'Funzione Letteraria',
                    options: {
                      list: [
                        {title: 'Narrativa', value: 'narrativa'},
                        {title: 'Legislativa', value: 'legislativa'},
                        {title: 'Rituale / cultuale', value: 'rituale'},
                        {title: 'Genealogica', value: 'genealogica'},
                        {title: 'Poetica', value: 'poetica'},
                        {title: 'Sapienziale', value: 'sapienziale'},
                        {title: 'Dialogica', value: 'dialogica'},
                        {title: 'Monologo', value: 'monologo'},
                        {title: 'Teofania', value: 'teofania'},
                        {title: 'Teofania + epilogo', value: 'teofania-epilogo'},
                        {title: 'Discorsi di Eliu', value: 'eliu'},
                        {title: 'Memorialistica', value: 'memorialistico'},
                        {title: 'Documentaria', value: 'documentario'},
                        {title: 'Storiografica', value: 'storiografica'},
                        {title: 'Testuale', value: 'testuale'},
                        {title: 'Testuale-redazionale', value: 'testuale-redazionale'},
                        {title: 'Compositiva', value: 'compositiva'},
                        {title: 'Fonte', value: 'fonte'},
                        {title: 'Redazionale', value: 'redazionale'},
                        {title: 'Altra', value: 'altra'},
                      ],
                    },
                  },
                  {
                    name: 'descrizione',
                    type: 'text',
                    title: 'Descrizione dell’Attribuzione',
                  },
                  {
                    name: 'motivazione',
                    type: 'text',
                    title: 'Motivazione Critica',
                    description:
                      'Elementi linguistici, stilistici, tematici, teologici o redazionali che sostengono l’attribuzione.',
                  },
                  {
                    name: 'paralleli',
                    type: 'text',
                    title: 'Paralleli Rilevanti',
                    description:
                      'Passi biblici o testi antichi utilizzati nel confronto.',
                  },
                  {
                    name: 'bibliografia',
                    type: 'array',
                    title: 'Bibliografia Specifica',
                    of: [
                      {
                        type: 'object',
                        fields: [
                          {
                            name: 'citazione',
                            type: 'text',
                            title: 'Citazione',
                          },
                          {
                            name: 'url',
                            type: 'url',
                            title: 'URL',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },

          // ==========================================================
          // VECCHIA STRUTTURA: MANTENUTA PER COMPATIBILITÀ
          // ==========================================================

          {
            name: 'fonti',
            type: 'array',
            title: 'Fonti / Strati Letterari — Sintesi del Capitolo',
            description:
              'Campo legacy. Per nuove attribuzioni utilizzare Attribuzioni Fonti / Strati per Versetti.',
            of: [
              {
                type: 'object',
                fields: [
                  {
                    name: 'fonte',
                    type: 'reference',
                    title: 'Fonte / Strato',
                    to: [{type: 'fonte'}],
                  },
                  {
                    name: 'presenza',
                    type: 'string',
                    title: 'Tipo di Presenza',
                    options: {
                      list: [
                        {title: 'Prevalente', value: 'prevalente'},
                        {title: 'Significativa', value: 'significativa'},
                        {title: 'Possibile', value: 'possibile'},
                        {title: 'Marginale', value: 'marginale'},
                        {title: 'Non riconoscibile', value: 'assente'},
                      ],
                    },
                  },
                  {
                    name: 'inizio',
                    type: 'number',
                    title: 'Datazione Iniziale',
                  },
                  {
                    name: 'fine',
                    type: 'number',
                    title: 'Datazione Finale',
                  },
                  {
                    name: 'datazione',
                    type: 'string',
                    title: 'Etichetta della Datazione',
                  },
                  {
                    name: 'certezza',
                    type: 'string',
                    title: 'Grado di Certezza',
                    options: {
                      list: [
                        {title: '🟢 Consenso ampio', value: 'consenso'},
                        {title: '🟡 Ipotesi accademica', value: 'ipotesi'},
                        {title: '🟠 Ricostruzione discussa', value: 'dibattuta'},
                        {title: '🔴 Ipotesi speculativa', value: 'speculativa'},
                      ],
                    },
                  },
                  {
                    name: 'motivazione',
                    type: 'text',
                    title: 'Motivazione Critica',
                  },
                  {
                    name: 'bibliografia',
                    type: 'array',
                    title: 'Bibliografia Specifica',
                    of: [
                      {
                        type: 'object',
                        fields: [
                          {name: 'citazione', type: 'text', title: 'Citazione'},
                          {name: 'url', type: 'url', title: 'URL'},
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },

          {
            name: 'analisiStoricoCritica',
            type: 'text',
            title: 'Analisi Storico-Critica',
          },
          {
            name: 'tradizione',
            type: 'text',
            title: 'Critica della Tradizione',
          },
          {
            name: 'redazione',
            type: 'text',
            title: 'Critica della Redazione',
          },
          {
            name: 'contestoStorico',
            type: 'text',
            title: 'Contesto Storico-Archeologico',
          },
          {
            name: 'testoCritico',
            type: 'text',
            title: 'Critica Testuale',
            description:
              'Varianti e storia della trasmissione secondo i testimoni pertinenti al libro: MT, LXX, Qumran, recensioni greche, versioni antiche o altre tradizioni. Non usare automaticamente MT/LXX quando non applicabile.',
          },
          {
            name: 'bibliografia',
            type: 'array',
            title: 'Bibliografia',
            of: [
              {
                type: 'object',
                fields: [
                  {name: 'citazione', type: 'text', title: 'Citazione'},
                  {name: 'url', type: 'url', title: 'URL'},
                ],
              },
            ],
          },
        ],
      },

      // ============================================================
      // NUOVA ANAGRAFICA: TRADIZIONE / STRATO LETTERARIO
      // ============================================================

      {
        name: 'fonteBiblica',
        type: 'document',
        title: 'Tradizione / Strato Letterario',

        fields: [
          {
            name: 'sigla',
            type: 'string',
            title: 'Sigla',
            description: 'Esempi: P, H, Dtr, Chr, Job-D, Est-LXX.',
          },
          {
            name: 'nome',
            type: 'string',
            title: 'Nome',
          },
          {
            name: 'titolo',
            type: 'string',
            title: 'Titolo Esteso',
          },
          {
            name: 'categoria',
            type: 'string',
            title: 'Categoria',
            options: {
              list: [
                {title: 'Fonte / Tradizione', value: 'fonte'},
                {title: 'Scuola / Strato', value: 'scuola'},
                {title: 'Redazione', value: 'redazione'},
                {title: 'Modello critico', value: 'modello'},
                {title: 'Composizione', value: 'composizione'},
                {title: 'Raccolta / Collezione', value: 'raccolta'},
                {title: 'Forma testuale / Recensione', value: 'forma_testuale'},
                {title: 'Memorie / Tradizione memorialistica', value: 'memorie'},
                {title: 'Dossier / Documentazione', value: 'documentario'},
                {title: 'Composizione storiografica', value: 'storiografia'},
                {title: 'Epitome / Compendio', value: 'epitome'},
                {title: 'Blocco poetico / sapienziale', value: 'poetico'},
              ],
            },
          },
          {
            name: 'periodo',
            type: 'string',
            title: 'Periodo / Datazione Sintetica',
            description:
              'Campo compatibile con i documenti critici già importati.',
          },
          {
            name: 'inizio',
            type: 'number',
            title: 'Anno Inizio — compatibilità',
            description: 'Campo numerico usato da alcuni documenti già importati.',
          },
          {
            name: 'fine',
            type: 'number',
            title: 'Anno Fine — compatibilità',
            description: 'Campo numerico usato da alcuni documenti già importati.',
          },
          {
            name: 'certezza',
            type: 'string',
            title: 'Certezza — compatibilità',
            options: {
              list: [
                {title: '🟢 Consenso', value: 'consenso'},
                {title: '🟡 Ipotesi', value: 'ipotesi'},
                {title: '🟠 Dibattuta', value: 'dibattuta'},
                {title: '🔴 Speculativa', value: 'speculativa'},
              ],
            },
          },
          {
            name: 'nota',
            type: 'text',
            title: 'Nota — compatibilità',
          },
          {
            name: 'descrizione',
            type: 'text',
            title: 'Descrizione',
          },
          {
            name: 'datazione',
            type: 'string',
            title: 'Datazione Proposta',
          },
          {
            name: 'datazioneInizio',
            type: 'number',
            title: 'Anno Iniziale',
            description: 'Numero negativo per gli anni a.C.',
          },
          {
            name: 'datazioneFine',
            type: 'number',
            title: 'Anno Finale',
            description: 'Numero negativo per gli anni a.C.',
          },
          {
            name: 'statoRicerca',
            type: 'string',
            title: 'Stato della Ricerca',
            options: {
              list: [
                {title: '🟢 Ampiamente accettata', value: 'accettata'},
                {title: '🟡 Discussa', value: 'discussa'},
                {title: '🟠 Fortemente discussa', value: 'fortemente_discussa'},
                {title: '🔴 Ipotesi minoritaria / speculativa', value: 'speculativa'},
              ],
            },
          },
          {
            name: 'criteri',
            type: 'text',
            title: 'Criteri di Identificazione',
            description:
              'Elementi linguistici, stilistici, teologici, strutturali o storici utilizzati per identificare lo strato.',
          },
          {
            name: 'relazioneConAltreTradizioni',
            type: 'text',
            title: 'Relazione con altre Tradizioni',
            description:
              'Rapporto con altre fonti, raccolte, recensioni, voci o redazioni. Utilizzabile anche per corpora sapienziali e poetici.',
          },
          {
            name: 'notaCritica',
            type: 'text',
            title: 'Nota Critica',
          },
          {
            name: 'bibliografia',
            type: 'array',
            title: 'Bibliografia',
            of: [
              {
                type: 'object',
                fields: [
                  {name: 'citazione', type: 'text', title: 'Citazione'},
                  {name: 'url', type: 'url', title: 'URL'},
                ],
              },
            ],
          },
        ],
      },

      // ============================================================
      // VECCHIO TIPO FONTE — MANTENUTO PER COMPATIBILITÀ
      // ============================================================

      {
        name: 'fonte',
        type: 'document',
        title: 'Fonte / Strato Letterario — Legacy',

        fields: [
          {name: 'sigla', type: 'string', title: 'Sigla'},
          {name: 'nome', type: 'string', title: 'Nome'},
          {name: 'descrizione', type: 'text', title: 'Descrizione'},
          {name: 'datazione', type: 'string', title: 'Datazione Proposta'},
          {
            name: 'datazioneInizio',
            type: 'number',
            title: 'Anno Iniziale',
          },
          {
            name: 'datazioneFine',
            type: 'number',
            title: 'Anno Finale',
          },
          {
            name: 'statoRicerca',
            type: 'string',
            title: 'Stato della Ricerca',
            options: {
              list: [
                {title: '🟢 Ampiamente accettata', value: 'accettata'},
                {title: '🟡 Discussa', value: 'discussa'},
                {title: '🟠 Fortemente discussa', value: 'fortemente_discussa'},
                {title: '🔴 Ipotesi minoritaria / speculativa', value: 'speculativa'},
              ],
            },
          },
          {name: 'criteri', type: 'text', title: 'Criteri di Identificazione'},
          {name: 'notaCritica', type: 'text', title: 'Nota Critica'},
          {
            name: 'bibliografia',
            type: 'array',
            title: 'Bibliografia',
            of: [
              {
                type: 'object',
                fields: [
                  {name: 'citazione', type: 'text', title: 'Citazione'},
                  {name: 'url', type: 'url', title: 'URL'},
                ],
              },
            ],
          },
        ],
      },

      // ============================================================
      // TESTIMONIANZA TESTUALE
      // ============================================================

      {
        name: 'testimonianza',
        type: 'document',
        title: 'Testimonianza Testuale',

        fields: [
          {name: 'sigla', type: 'string', title: 'Sigla'},
          {name: 'nome', type: 'string', title: 'Nome'},
          {
            name: 'tipo',
            type: 'string',
            title: 'Tipo',
            options: {
              list: [
                'Manoscritto',
                'Tradizione testuale',
                'Traduzione antica',
                'Edizione critica',
              ],
            },
          },
          {name: 'datazione', type: 'string', title: 'Datazione'},
          {name: 'datazioneInizio', type: 'number', title: 'Anno Iniziale'},
          {name: 'datazioneFine', type: 'number', title: 'Anno Finale'},
          {name: 'descrizione', type: 'text', title: 'Descrizione'},
          {
            name: 'rilevanza',
            type: 'text',
            title: 'Rilevanza per la Critica Testuale',
          },
          {
            name: 'bibliografia',
            type: 'array',
            title: 'Bibliografia',
            of: [
              {
                type: 'object',
                fields: [
                  {name: 'citazione', type: 'text', title: 'Citazione'},
                  {name: 'url', type: 'url', title: 'URL'},
                ],
              },
            ],
          },
        ],
      },
    ],
  },
})