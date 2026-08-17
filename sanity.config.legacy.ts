import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

export default defineConfig({
  name: 'default',
  title: 'Biblia Fontes CMS',

  projectId: 'jc1k65lj',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Biblia Fontes')
          .items([
            S.listItem()
              .title('📖 Libri Biblici')
              .child(
                S.documentTypeList('libro')
                  .title('Libri Biblici')
                  .defaultOrdering([
                    {
                      field: 'ordine',
                      direction: 'asc',
                    },
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
                          .child(
                            S.documentTypeList('capitolo')
                              .title('Capitoli')
                              .filter(
                                '_type == "capitolo" && libro._ref == $libroId'
                              )
                              .params({
                                libroId: documentId,
                              })
                              .defaultOrdering([
                                {
                                  field: 'numero',
                                  direction: 'asc',
                                },
                              ])
                          ),

                        S.divider(),

                        S.listItem()
                          .title('📜 Testo Biblico')
                          .child(
                            S.documentTypeList('testoBiblicoCapitolo')
                              .title('Testo Biblico')
                              .filter(
                                '_type == "testoBiblicoCapitolo" && libro._ref == $libroId'
                              )
                              .params({
                                libroId: documentId,
                              })
                              .defaultOrdering([
                                {
                                  field: 'numero',
                                  direction: 'asc',
                                },
                              ])
                          ),
                      ])
                  )
              ),

            S.divider(),

            S.listItem()
              .title('📚 Fonti / Strati Letterari')
              .child(
                S.documentTypeList('fonte')
                  .title('Fonti / Strati Letterari')
                  .defaultOrdering([
                    {
                      field: 'sigla',
                      direction: 'asc',
                    },
                  ])
              ),

            S.listItem()
              .title('📜 Testimonianze Testuali')
              .child(
                S.documentTypeList('testimonianza')
                  .title('Testimonianze Testuali')
                  .defaultOrdering([
                    {
                      field: 'sigla',
                      direction: 'asc',
                    },
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
            description:
              'Nome ebraico, aramaico o greco del libro.',
          },

          {
            name: 'categoriaId',
            type: 'string',
            title: 'Categoria',

            options: {
              list: [
                {
                  title: 'Pentateuco',
                  value: 'pentateuco',
                },
                {
                  title: 'Libri Storici',
                  value: 'storici',
                },
                {
                  title: 'Libri Sapienziali',
                  value: 'sapienziali',
                },
                {
                  title: 'Libri Profetici',
                  value: 'profetici',
                },
                {
                  title: 'Vangeli',
                  value: 'vangeli',
                },
                {
                  title: 'Atti degli Apostoli',
                  value: 'atti',
                },
                {
                  title: 'Lettere Paoline',
                  value: 'paoline',
                },
                {
                  title: 'Lettere Cattoliche',
                  value: 'cattoliche',
                },
                {
                  title: 'Apocalittica',
                  value: 'apocalittica',
                },
              ],
            },
          },

          {
            name: 'ordine',
            type: 'number',
            title: 'Ordine nella Bibbia',
            description:
              'Posizione del libro nella Bibbia CEI 2008. Genesi = 1.',
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

          // ========================================================
          // DATAZIONE DELLA REDAZIONE
          // ========================================================

          {
            name: 'datazione',
            type: 'object',
            title: 'Datazione della Redazione',

            fields: [

              {
                name: 'etichettaInizio',
                type: 'string',
                title: 'Etichetta Inizio',
                description:
                  'Esempio: ca. VIII–VII sec. a.C.',
              },

              {
                name: 'etichettaFine',
                type: 'string',
                title: 'Etichetta Fine',
                description:
                  'Esempio: ca. V sec. a.C.',
              },

              {
                name: 'datazioneIniziale',
                type: 'number',
                title: 'Anno Iniziale',
                description:
                  'Numero negativo per gli anni a.C. Esempio: -750.',
              },

              {
                name: 'datazioneFinale',
                type: 'number',
                title: 'Anno Finale',
                description:
                  'Numero negativo per gli anni a.C. Esempio: -400.',
              },

              {
                name: 'certezza',
                type: 'string',
                title: 'Stato della Datazione',

                options: {
                  list: [
                    {
                      title: '🟢 Consenso ampio',
                      value: 'consenso',
                    },
                    {
                      title: '🟡 Ipotesi accademica',
                      value: 'ipotesi',
                    },
                    {
                      title: '🟠 Ricostruzione discussa',
                      value: 'dibattuta',
                    },
                    {
                      title: '🔴 Ipotesi speculativa',
                      value: 'speculativa',
                    },
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

          // ========================================================
          // DESCRIZIONE GENERALE
          // ========================================================

          {
            name: 'descrizione',
            type: 'text',
            title: 'Descrizione Generale',
          },

          // ========================================================
          // METODI STORICO-CRITICI
          // ========================================================

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
                        {
                          title: 'Critica Testuale',
                          value: 'testuale',
                        },
                        {
                          title: 'Critica delle Fonti',
                          value: 'fonti',
                        },
                        {
                          title: 'Critica delle Forme',
                          value: 'forme',
                        },
                        {
                          title: 'Critica della Tradizione',
                          value: 'tradizione',
                        },
                        {
                          title: 'Critica della Redazione',
                          value: 'redazione',
                        },
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
                    description:
                      'Sintesi breve dell’applicazione del metodo al libro.',
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

          // ========================================================
          // MONDO DIETRO IL TESTO
          // ========================================================

          {
            name: 'mondoDietroIlTesto',
            type: 'text',
            title: 'Il Mondo Dietro il Testo',
            description:
              'Sintesi degli eventi narrati e della loro eventuale collocazione cronologica.',
          },

          {
            name: 'eventiNarrati',
            type: 'array',
            title: 'Eventi Narrati',

            of: [
              {
                type: 'object',

                fields: [

                  {
                    name: 'etichetta',
                    type: 'string',
                    title: 'Evento Narrato',
                  },

                  {
                    name: 'inizio',
                    type: 'number',
                    title: 'Anno Iniziale',
                    description:
                      'Numero negativo per gli anni a.C.',
                  },

                  {
                    name: 'fine',
                    type: 'number',
                    title: 'Anno Finale',
                    description:
                      'Numero negativo per gli anni a.C.',
                  },

                  {
                    name: 'certezza',
                    type: 'string',
                    title: 'Stato',

                    options: {
                      list: [
                        {
                          title: '🟢 Storicamente documentato',
                          value: 'storico',
                        },
                        {
                          title: '🟡 Storicamente plausibile',
                          value: 'plausibile',
                        },
                        {
                          title: '🟠 Tradizionale / narrativo',
                          value: 'tradizionale',
                        },
                        {
                          title: '🔴 Non databile',
                          value: 'non\_databile',
                        },
                      ],
                    },
                  },

                  {
                    name: 'descrizione',
                    type: 'text',
                    title: 'Nota Critica',
                  },

                ],
              },
            ],
          },

          // ========================================================
          // MONDO DEL TESTO
          // ========================================================

          {
            name: 'mondoDelTesto',
            type: 'text',
            title: 'Il Mondo del Testo',
            description:
              'Sintesi delle fasi di formazione, composizione e redazione.',
          },

          // ========================================================
          // FASI GENERALI DI REDAZIONE
          // ========================================================

          {
            name: 'redazione',
            type: 'array',
            title: 'Fasi di Redazione',

            of: [
              {
                type: 'object',

                fields: [

                  {
                    name: 'etichetta',
                    type: 'string',
                    title: 'Fase / Strato',
                  },

                  {
                    name: 'fonte',
                    type: 'reference',
                    title: 'Fonte / Strato Letterario',

                    to: [
                      {
                        type: 'fonte',
                      },
                    ],
                  },

                  {
                    name: 'inizio',
                    type: 'number',
                    title: 'Anno Inizio',
                  },

                  {
                    name: 'fine',
                    type: 'number',
                    title: 'Anno Fine',
                  },

                  {
                    name: 'datazione',
                    type: 'string',
                    title: 'Etichetta della Datazione',
                    description:
                      'Esempio: ca. VI–V sec. a.C.',
                  },

                  {
                    name: 'certezza',
                    type: 'string',
                    title: 'Stato della Ricostruzione',

                    options: {
                      list: [
                        {
                          title: '🟢 Consenso',
                          value: 'consenso',
                        },
                        {
                          title: '🟡 Ipotesi',
                          value: 'ipotesi',
                        },
                        {
                          title: '🟠 Dibattuta',
                          value: 'dibattuta',
                        },
                        {
                          title: '🔴 Speculativa',
                          value: 'speculativa',
                        },
                      ],
                    },
                  },

                  {
                    name: 'descrizione',
                    type: 'text',
                    title: 'Descrizione',
                  },

                  {
                    name: 'motivazione',
                    type: 'text',
                    title: 'Motivazione Critica',
                    description:
                      'Elementi linguistici, stilistici, tematici, strutturali o redazionali alla base della ricostruzione.',
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

          // ========================================================
          // MONDO ATTORNO AL TESTO
          // ========================================================

          {
            name: 'mondoAttornoAlTesto',
            type: 'text',
            title: 'Il Mondo Attorno al Testo',
            description:
              'Contesto storico, archeologico e culturale.',
          },

          {
            name: 'contestoStorico',
            type: 'array',
            title: 'Contesto Storico',

            of: [
              {
                type: 'object',

                fields: [

                  {
                    name: 'etichetta',
                    type: 'string',
                    title: 'Evento / Reperto / Contesto',
                  },

                  {
                    name: 'inizio',
                    type: 'number',
                    title: 'Anno Iniziale',
                  },

                  {
                    name: 'fine',
                    type: 'number',
                    title: 'Anno Finale',
                  },

                  {
                    name: 'certezza',
                    type: 'string',
                    title: 'Tipo di Evidenza',

                    options: {
                      list: [
                        {
                          title: '🟢 Archeologico',
                          value: 'archeologico',
                        },
                        {
                          title: '🟢 Fonte storica',
                          value: 'storico',
                        },
                        {
                          title: '🟡 Ricostruzione storica',
                          value: 'ricostruzione',
                        },
                      ],
                    },
                  },

                  {
                    name: 'descrizione',
                    type: 'text',
                    title: 'Descrizione e Paralleli',
                  },

                ],
              },
            ],
          },

          // ========================================================
          // TESTIMONIANZE TESTUALI
          // ========================================================

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

                    to: [
                      {
                        type: 'testimonianza',
                      },
                    ],
                  },

                  {
                    name: 'descrizione',
                    type: 'text',
                    title: 'Note sulla Trasmissione',
                  },

                ],
              },
            ],
          },

          // ========================================================
          // FONTI EXTRA-BIBLICHE
          // ========================================================

          {
            name: 'fontiExtraBibliche',
            type: 'array',
            title: 'Fonti e Paralleli Extra-Biblici',

            of: [
              {
                type: 'object',

                fields: [

                  {
                    name: 'titolo',
                    type: 'string',
                    title: 'Fonte',
                  },

                  {
                    name: 'datazione',
                    type: 'string',
                    title: 'Datazione',
                  },

                  {
                    name: 'tipo',
                    type: 'string',
                    title: 'Tipo',
                  },

                  {
                    name: 'descrizione',
                    type: 'text',
                    title: 'Relazione con il Libro',
                  },

                ],
              },
            ],
          },

          // ========================================================
          // BIBLIOGRAFIA DEL LIBRO
          // ========================================================

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

                  {
                    name: 'citazione',
                    type: 'text',
                    title: 'Citazione Bibliografica',
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

            to: [
              {
                type: 'libro',
              },
            ],
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

          // ========================================================
          // SINTESI NARRATIVA
          // ========================================================

          {
            name: 'sintesi',
            type: 'text',
            title: 'Sintesi del Capitolo',
            description:
              'Sintesi narrativa e strutturale breve in stile accademico.',
          },

          {
            name: 'struttura',
            type: 'text',
            title: 'Struttura del Capitolo',
            description:
              'Schema sintetico delle principali unità narrative o poetiche.',
          },

          // ========================================================
          // EVENTI NARRATI
          // ========================================================

          {
            name: 'eventiNarrati',
            type: 'text',
            title: 'Eventi Narrati',
          },

          // ========================================================
          // DATAZIONE DEL CAPITOLO
          // ========================================================

          {
            name: 'datazione',
            type: 'object',
            title: 'Datazione / Collocazione',

            fields: [

              {
                name: 'inizio',
                type: 'number',
                title: 'Anno Inizio',
              },

              {
                name: 'fine',
                type: 'number',
                title: 'Anno Fine',
              },

              {
                name: 'etichetta',
                type: 'string',
                title: 'Etichetta della Datazione',
                description:
                  'Esempio: ca. VIII–VII sec. a.C.',
              },

              {
                name: 'certezza',
                type: 'string',
                title: 'Certezza',

                options: {
                  list: [
                    {
                      title: '🟢 Consenso',
                      value: 'consenso',
                    },
                    {
                      title: '🟡 Ipotesi',
                      value: 'ipotesi',
                    },
                    {
                      title: '🟠 Dibattuta',
                      value: 'dibattuta',
                    },
                    {
                      title: '🔴 Non determinabile',
                      value: 'non\_determinabile',
                    },
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
                    to: [{type: 'fonte'}],
                  },
                  {
                    name: 'modelloCritico',
                    type: 'string',
                    title: 'Modello Critico',
                    options: {
                      list: [
                        {title: 'Macro-unità letteraria', value: 'macro_unita_letteraria'},
                        {title: 'Tradizione narrativa', value: 'tradizione_narrativa'},
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
                    title: 'Funzione / Nota Letteraria',
                    description:
                      'Campo aperto per conservare sia categorie sintetiche sia formulazioni critiche già presenti nel corpus.',
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


          // ========================================================
          // FONTI / STRATI LETTERARI DEL CAPITOLO — LEGACY
          // ========================================================

          {
            name: 'fonti',
            type: 'array',
            title: 'Fonti / Strati Letterari',

            of: [
              {
                type: 'object',

                fields: [

                  {
                    name: 'fonte',
                    type: 'reference',
                    title: 'Fonte / Strato',

                    to: [
                      {
                        type: 'fonte',
                      },
                    ],
                  },

                  {
                    name: 'presenza',
                    type: 'string',
                    title: 'Tipo di Presenza',

                    options: {
                      list: [
                        {
                          title: 'Prevalente',
                          value: 'prevalente',
                        },
                        {
                          title: 'Significativa',
                          value: 'significativa',
                        },
                        {
                          title: 'Possibile',
                          value: 'possibile',
                        },
                        {
                          title: 'Marginale',
                          value: 'marginale',
                        },
                        {
                          title: 'Non riconoscibile',
                          value: 'assente',
                        },
                      ],
                    },
                  },

                  {
                    name: 'inizio',
                    type: 'number',
                    title: 'Datazione Iniziale',
                    description:
                      'Anno iniziale della datazione proposta. Negativo per a.C.',
                  },

                  {
                    name: 'fine',
                    type: 'number',
                    title: 'Datazione Finale',
                    description:
                      'Anno finale della datazione proposta. Negativo per a.C.',
                  },

                  {
                    name: 'datazione',
                    type: 'string',
                    title: 'Etichetta della Datazione',
                    description:
                      'Esempio: ca. VI–V sec. a.C.',
                  },

                  {
                    name: 'certezza',
                    type: 'string',
                    title: 'Grado di Certezza',

                    options: {
                      list: [
                        {
                          title: '🟢 Consenso ampio',
                          value: 'consenso',
                        },
                        {
                          title: '🟡 Ipotesi accademica',
                          value: 'ipotesi',
                        },
                        {
                          title: '🟠 Ricostruzione discussa',
                          value: 'dibattuta',
                        },
                        {
                          title: '🔴 Ipotesi speculativa',
                          value: 'speculativa',
                        },
                      ],
                    },
                  },

                  {
                    name: 'motivazione',
                    type: 'text',
                    title: 'Motivazione Critica',
                    description:
                      'Elementi linguistici, stilistici, tematici, strutturali o redazionali che motivano l’attribuzione.',
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

          // ========================================================
          // ANALISI STORICO-CRITICA
          // ========================================================

          {
            name: 'analisiStoricoCritica',
            type: 'text',
            title: 'Analisi Storico-Critica',
          },

          // ========================================================
          // CRITICA DELLA TRADIZIONE
          // ========================================================

          {
            name: 'tradizione',
            type: 'text',
            title: 'Critica della Tradizione',
          },

          // ========================================================
          // CRITICA DELLA REDAZIONE
          // ========================================================

          {
            name: 'redazione',
            type: 'text',
            title: 'Critica della Redazione',
          },

          // ========================================================
          // CONTESTO STORICO-ARCHEOLOGICO
          // ========================================================

          {
            name: 'contestoStorico',
            type: 'text',
            title: 'Contesto Storico-Archeologico',
          },

          // ========================================================
          // CRITICA TESTUALE
          // ========================================================

          {
            name: 'testoCritico',
            type: 'text',
            title: 'Critica Testuale',
            description:
              'Varianti e problemi testuali, con particolare attenzione a MT e LXX.',
          },

          // ========================================================
          // BIBLIOGRAFIA DEL CAPITOLO
          // ========================================================

          {
            name: 'bibliografia',
            type: 'array',
            title: 'Bibliografia',

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

      // ============================================================
      // FONTE / STRATO LETTERARIO
      // ============================================================

      {
        name: 'fonte',
        type: 'document',
        title: 'Fonte / Strato Letterario',

        fields: [

          {
            name: 'sigla',
            type: 'string',
            title: 'Sigla',
          },

          {
            name: 'nome',
            type: 'string',
            title: 'Nome',
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
            description:
              'Numero negativo per gli anni a.C.',
          },

          {
            name: 'datazioneFine',
            type: 'number',
            title: 'Anno Finale',
            description:
              'Numero negativo per gli anni a.C.',
          },

          {
            name: 'statoRicerca',
            type: 'string',
            title: 'Stato della Ricerca',

            options: {
              list: [
                {
                  title: '🟢 Ampiamente accettata',
                  value: 'accettata',
                },
                {
                  title: '🟡 Discussa',
                  value: 'discussa',
                },
                {
                  title: '🟠 Fortemente discussa',
                  value: 'fortemente\_discussa',
                },
                {
                  title: '🔴 Ipotesi minoritaria / speculativa',
                  value: 'speculativa',
                },
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


      // ============================================================
      // TESTO BIBLICO — CAPITOLO
      // ============================================================

      {
        name: 'testoBiblicoCapitolo',
        type: 'document',
        title: 'Testo Biblico — Capitolo',

        fields: [

          {
            name: 'libro',
            type: 'reference',
            title: 'Libro',
            to: [
              {
                type: 'libro',
              },
            ],
            validation: (Rule) => Rule.required(),
          },

          {
            name: 'capitolo',
            type: 'reference',
            title: 'Capitolo Analitico',
            description:
              'Collegamento facoltativo alla scheda critica del capitolo.',
            weak: true,
            to: [
              {
                type: 'capitolo',
              },
            ],
          },

          {
            name: 'numero',
            type: 'number',
            title: 'Numero Capitolo / Salmo',
            validation: (Rule) => Rule.required().integer().min(1),
          },

          {
            name: 'numeroAlternativo',
            type: 'object',
            title: 'Numerazione Alternativa',
            description:
              'Per esempio la numerazione LXX/Vulgata dei Salmi.',

            fields: [

              {
                name: 'sistema',
                type: 'string',
                title: 'Sistema',

                options: {
                  list: [
                    {
                      title: 'LXX / Vulgata',
                      value: 'LXX_VG',
                    },
                    {
                      title: 'Testo Masoretico',
                      value: 'MT',
                    },
                    {
                      title: 'Altro',
                      value: 'ALTRO',
                    },
                  ],
                },
              },

              {
                name: 'numero',
                type: 'number',
                title: 'Numero Alternativo',
              },

            ],
          },

          {
            name: 'edizione',
            type: 'string',
            title: 'Edizione / Fonte del Testo',
            description:
              'Identificazione editoriale del testo importato.',
          },

          {
            name: 'lingua',
            type: 'string',
            title: 'Lingua',

            options: {
              list: [
                {
                  title: 'Italiano',
                  value: 'it',
                },
                {
                  title: 'Ebraico',
                  value: 'he',
                },
                {
                  title: 'Greco',
                  value: 'grc',
                },
                {
                  title: 'Latino',
                  value: 'la',
                },
                {
                  title: 'Aramaico',
                  value: 'arc',
                },
              ],
            },
          },

          {
            name: 'tradizione',
            type: 'string',
            title: 'Tradizione / Testimone',
            description:
              'Per esempio traduzione italiana, MT, LXX, NT greco, Vulgata.',
          },

          {
            name: 'diritti',
            type: 'object',
            title: 'Diritti e Licenza',

            fields: [

              {
                name: 'testoProtetto',
                type: 'boolean',
                title: 'Testo Protetto',
                initialValue: false,
              },

              {
                name: 'noteProtette',
                type: 'boolean',
                title: 'Note Protette',
                initialValue: true,
              },

              {
                name: 'noteIncluse',
                type: 'boolean',
                title: 'Note Incluse',
                initialValue: false,
              },

              {
                name: 'nota',
                type: 'text',
                title: 'Nota sui Diritti',
                rows: 3,
              },

            ],
          },

          {
            name: 'versetti',
            type: 'array',
            title: 'Versetti',

            of: [
              {
                type: 'object',
                name: 'versettoBiblico',
                title: 'Versetto',

                fields: [

                  {
                    name: 'numero',
                    type: 'number',
                    title: 'Numero',
                    validation: (Rule) =>
                      Rule.required().integer().min(1),
                  },

                  {
                    name: 'testo',
                    type: 'text',
                    title: 'Testo',
                    rows: 3,
                  },

                  {
                    name: 'metatesto',
                    type: 'object',
                    title: 'Metatesto / Superscrizione',
                    description:
                      'Per esempio: “Salmo. Di Davide.”. Nel Reader viene distinto graficamente dal testo.',

                    fields: [

                      {
                        name: 'testo',
                        type: 'text',
                        title: 'Testo',
                        rows: 2,
                      },

                      {
                        name: 'stile',
                        type: 'string',
                        title: 'Stile',

                        options: {
                          list: [
                            {
                              title: 'Corsivo',
                              value: 'corsivo',
                            },
                          ],
                        },
                      },

                    ],
                  },

                  {
                    name: 'marcatoreAlfabetico',
                    type: 'string',
                    title: 'Marcatore Alfabetico',
                    description:
                      'Per i salmi alfabetici: Alef, Bet, Ghimel, ecc.',
                  },

                  {
                    name: 'statoTestuale',
                    type: 'string',
                    title: 'Stato Testuale',
                    description:
                      'Usato quando il versetto è segnalato dalla fonte ma il testo non è presente o richiede una qualificazione editoriale.',

                    options: {
                      list: [
                        { title: 'Presente', value: 'presente' },
                        { title: 'Omesso nell’edizione', value: 'omesso_nell_edizione' },
                        { title: 'Lacunoso', value: 'lacunoso' },
                        { title: 'Da verificare', value: 'da_verificare' },
                      ],
                    },
                  },

                  {
                    name: 'notaEditoriale',
                    type: 'text',
                    title: 'Nota Editoriale',
                    description:
                      'Spiega omissioni, lacune o particolarità della numerazione senza alterare il testo biblico.',
                    rows: 2,
                  },

                  {
                    name: 'riferimentoAlternativo',
                    type: 'object',
                    title: 'Riferimento Alternativo',
                    description:
                      'Corrispondenza esplicita con un altro sistema di numerazione.',

                    fields: [

                      {
                        name: 'sistema',
                        type: 'string',
                        title: 'Sistema',

                        options: {
                          list: [
                            {
                              title: 'LXX / Vulgata',
                              value: 'LXX_VG',
                            },
                            {
                              title: 'Testo Masoretico',
                              value: 'MT',
                            },
                            {
                              title: 'Altro',
                              value: 'ALTRO',
                            },
                          ],
                        },
                      },

                      {
                        name: 'salmo',
                        type: 'number',
                        title: 'Salmo',
                      },

                      {
                        name: 'capitolo',
                        type: 'number',
                        title: 'Capitolo',
                      },

                      {
                        name: 'versetto',
                        type: 'number',
                        title: 'Versetto',
                      },

                    ],
                  },

                ],

                preview: {
                  select: {
                    numero: 'numero',
                    testo: 'testo',
                    metatesto: 'metatesto.testo',
                  },

                  prepare({ numero, testo, metatesto }) {
                    return {
                      title: `Versetto ${numero}`,
                      subtitle:
                        testo ||
                        metatesto ||
                        'Versetto senza testo',
                    }
                  },
                },
              },
            ],
          },

          {
            name: 'importazione',
            type: 'object',
            title: 'Importazione',

            fields: [

              {
                name: 'fonteFile',
                type: 'string',
                title: 'File Sorgente',
              },

              {
                name: 'parser',
                type: 'string',
                title: 'Parser / Versione',
              },

              {
                name: 'validato',
                type: 'boolean',
                title: 'Validato',
              },

            ],
          },

        ],

        preview: {
          select: {
            numero: 'numero',
            titoloCapitolo: 'capitolo.titolo',
            titoloLibro: 'libro.titolo',
            edizione: 'edizione',
            alternativo: 'numeroAlternativo.numero',
          },

          prepare({
            numero,
            titoloCapitolo,
            titoloLibro,
            edizione,
            alternativo,
          }) {
            const isSalmi =
              String(titoloLibro || '').toLowerCase() === 'salmi'

            const prefisso = isSalmi
              ? `Salmo ${numero}`
              : `${titoloLibro || 'Capitolo'} ${numero}`

            const titolo = titoloCapitolo
              ? `${prefisso} — ${titoloCapitolo}`
              : prefisso

            const alt =
              alternativo != null
                ? `LXX/Vg ${alternativo}`
                : null

            return {
              title: titolo,
              subtitle: [alt, edizione || 'Testo biblico']
                .filter(Boolean)
                .join(' · '),
            }
          },
        },
      },

      // ============================================================
      // TESTIMONIANZA TESTUALE
      // ============================================================

      {
        name: 'testimonianza',
        type: 'document',
        title: 'Testimonianza Testuale',

        fields: [

          {
            name: 'sigla',
            type: 'string',
            title: 'Sigla',
          },

          {
            name: 'nome',
            type: 'string',
            title: 'Nome',
          },

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

          {
            name: 'datazione',
            type: 'string',
            title: 'Datazione',
          },

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
            name: 'descrizione',
            type: 'text',
            title: 'Descrizione',
          },

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
})
