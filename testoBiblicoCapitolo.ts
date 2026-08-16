
import {defineArrayMember, defineField, defineType} from 'sanity'

export const testoBiblicoCapitolo = defineType({
  name: 'testoBiblicoCapitolo',
  title: 'Testo biblico — Capitolo',
  type: 'document',

  fields: [
    defineField({
      name: 'libro',
      title: 'Libro',
      type: 'reference',
      to: [{type: 'libro'}],
      validation: R => R.required(),
    }),

    defineField({
      name: 'capitolo',
      title: 'Capitolo analitico',
      type: 'reference',
      to: [{type: 'capitolo'}],
    }),

    defineField({
      name: 'numero',
      title: 'Numero',
      type: 'number',
      validation: R => R.required().integer().min(1),
    }),

    defineField({
      name: 'numeroAlternativo',
      title: 'Numerazione alternativa',
      type: 'object',
      fields: [
        defineField({
          name: 'sistema',
          title: 'Sistema',
          type: 'string',
          options: {
            list: [
              {title: 'LXX / Vulgata', value: 'LXX_VG'},
              {title: 'MT', value: 'MT'},
              {title: 'Altro', value: 'ALTRO'},
            ],
          },
        }),
        defineField({
          name: 'numero',
          title: 'Numero',
          type: 'number',
        }),
      ],
    }),

    defineField({
      name: 'edizione',
      title: 'Edizione',
      type: 'string',
    }),

    defineField({
      name: 'lingua',
      title: 'Lingua',
      type: 'string',
      description: 'Esempi: Italiano, Greco, Ebraico, Latino.',
    }),

    defineField({
      name: 'tradizione',
      title: 'Tradizione',
      type: 'string',
      description:
        'Identificatore stabile: cei2008, lxx, mt, vulgata, ester_greco, ester_ebraico, daniele_teodozione...',
    }),

    defineField({
      name: 'testimone',
      title: 'Testimone / recensione',
      type: 'string',
      description:
        'Opzionale. Esempi: Westminster Leningrad Codex (WLC), Old Greek, Theodotion, Tobit S, Judges A.',
    }),

    defineField({
      name: 'siglaSorgente',
      title: 'Sigla nel corpus sorgente',
      type: 'string',
      description: 'Esempi: Gen, Jda, Tbs, Dat, Sut, Bet.',
    }),

    defineField({
      name: 'direzione',
      title: 'Direzione del testo',
      type: 'string',
      options: {
        list: [
          {title: 'Sinistra → destra', value: 'ltr'},
          {title: 'Destra → sinistra', value: 'rtl'},
        ],
      },
    }),

    defineField({
      name: 'diritti',
      title: 'Diritti e licenza',
      type: 'object',
      fields: [
        defineField({
          name: 'testoProtetto',
          title: 'Testo protetto',
          type: 'boolean',
        }),
        defineField({
          name: 'noteProtette',
          title: 'Note protette',
          type: 'boolean',
        }),
        defineField({
          name: 'noteIncluse',
          title: 'Note incluse',
          type: 'boolean',
        }),
        defineField({
          name: 'nota',
          title: 'Nota',
          type: 'text',
          rows: 3,
        }),
      ],
    }),

    defineField({
      name: 'versetti',
      title: 'Versetti',
      type: 'array',

      of: [
        defineArrayMember({
          name: 'versettoBiblico',
          title: 'Versetto',
          type: 'object',

          fields: [
            defineField({
              name: 'numero',
              title: 'Numero',
              type: 'number',
              validation: R => R.required().integer().min(1),
            }),

            defineField({
              name: 'testo',
              title: 'Testo',
              type: 'text',
              rows: 3,
              description:
                'Testo diplomatico della fonte. Per MT/WLC conservare vocali, accenti e segni esattamente come nel corpus sorgente.',
            }),

            defineField({
              name: 'apparatoMasoretico',
              title: 'Apparato masoretico',
              type: 'object',
              description:
                'Informazioni masoretiche separate dal testo diplomatico. Usato soprattutto per MT/WLC.',

              fields: [
                defineField({
                  name: 'divisione',
                  title: 'Divisione parashah',
                  type: 'string',
                  options: {
                    list: [
                      {title: 'Petuchah — פ', value: 'pe'},
                      {title: 'Setumah — ס', value: 'samekh'},
                    ],
                    layout: 'radio',
                  },
                  description:
                    'Valorizzare solo quando il versetto termina con il relativo marcatore nel corpus sorgente.',
                }),

                defineField({
                  name: 'varianti',
                  title: 'Varianti / forme parentetiche',
                  type: 'array',
                  description:
                    'Conserva separatamente le forme indicate tra parentesi quadre nella fonte. Non inferire automaticamente Ketiv/Qere se la fonte non lo specifica.',

                  of: [
                    defineArrayMember({
                      name: 'varianteMasoretica',
                      title: 'Variante masoretica',
                      type: 'object',

                      fields: [
                        defineField({
                          name: 'forma',
                          title: 'Forma',
                          type: 'string',
                          validation: R => R.required(),
                        }),

                        defineField({
                          name: 'tipo',
                          title: 'Tipo',
                          type: 'string',
                          initialValue: 'non_identificata',
                          options: {
                            list: [
                              {title: 'Non identificata nella fonte', value: 'non_identificata'},
                              {title: 'Ketiv', value: 'ketiv'},
                              {title: 'Qere', value: 'qere'},
                              {title: 'Altra variante', value: 'altra'},
                            ],
                          },
                        }),

                        defineField({
                          name: 'ordine',
                          title: 'Ordine nel versetto',
                          type: 'number',
                          validation: R => R.integer().min(1),
                          description:
                            'Posizione progressiva della variante quando il versetto contiene più gruppi parentetici.',
                        }),

                        defineField({
                          name: 'nota',
                          title: 'Nota',
                          type: 'string',
                        }),
                      ],

                      preview: {
                        select: {
                          title: 'forma',
                          subtitle: 'tipo',
                        },
                      },
                    }),
                  ],
                }),

                defineField({
                  name: 'nota',
                  title: 'Nota masoretica',
                  type: 'text',
                  rows: 2,
                  description:
                    'Campo editoriale opzionale per casi particolari che richiedono verifica.',
                }),
              ],
            }),

            defineField({
              name: 'metatesto',
              title: 'Metatesto / superscrizione',
              type: 'object',
              fields: [
                defineField({
                  name: 'testo',
                  title: 'Testo',
                  type: 'text',
                  rows: 2,
                }),
                defineField({
                  name: 'stile',
                  title: 'Stile',
                  type: 'string',
                  options: {
                    list: [
                      {title: 'Corsivo', value: 'corsivo'},
                    ],
                  },
                }),
              ],
            }),

            defineField({
              name: 'marcatoreAlfabetico',
              title: 'Marcatore alfabetico',
              type: 'string',
            }),

            defineField({
              name: 'riferimentoAlternativo',
              title: 'Riferimento alternativo',
              type: 'object',
              fields: [
                defineField({
                  name: 'sistema',
                  title: 'Sistema',
                  type: 'string',
                  options: {
                    list: [
                      {title: 'LXX / Vulgata', value: 'LXX_VG'},
                      {title: 'MT', value: 'MT'},
                      {title: 'Altro', value: 'ALTRO'},
                    ],
                  },
                }),
                defineField({
                  name: 'salmo',
                  title: 'Salmo',
                  type: 'number',
                }),
                defineField({
                  name: 'capitolo',
                  title: 'Capitolo',
                  type: 'number',
                }),
                defineField({
                  name: 'versetto',
                  title: 'Versetto',
                  type: 'number',
                }),
              ],
            }),

            defineField({
              name: 'statoTestuale',
              title: 'Stato testuale',
              type: 'string',
              options: {
                list: [
                  {title: 'Solo metatesto', value: 'metatesto_solo'},
                  {title: 'Omesso nell’edizione', value: 'omesso_nell_edizione'},
                  {title: 'Lacunoso', value: 'lacunoso'},
                  {title: 'Da verificare', value: 'da_verificare'},
                ],
              },
            }),

            defineField({
              name: 'notaEditoriale',
              title: 'Nota editoriale',
              type: 'text',
              rows: 2,
            }),
          ],

          preview: {
            select: {
              title: 'numero',
              subtitle: 'testo',
              status: 'statoTestuale',
              division: 'apparatoMasoretico.divisione',
            },
            prepare({title, subtitle, status, division}) {
              const marker =
                division === 'pe'
                  ? 'פ'
                  : division === 'samekh'
                    ? 'ס'
                    : ''

              return {
                title: `Versetto ${title}${marker ? ` · ${marker}` : ''}`,
                subtitle: subtitle || status || 'Senza testo',
              }
            },
          },
        }),
      ],
    }),

    defineField({
      name: 'importazione',
      title: 'Importazione',
      type: 'object',
      fields: [
        defineField({
          name: 'fonteFile',
          title: 'File sorgente',
          type: 'string',
        }),
        defineField({
          name: 'parser',
          title: 'Parser',
          type: 'string',
        }),
        defineField({
          name: 'validato',
          title: 'Validato',
          type: 'boolean',
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'numero',
      book: 'libro.titolo',
      edition: 'edizione',
      tradition: 'tradizione',
      witness: 'testimone',
    },

    prepare({title, book, edition, tradition, witness}) {
      const details = [edition || tradition, witness].filter(Boolean).join(' · ')

      return {
        title: `${book || 'Libro'} ${title}`,
        subtitle: details || 'Testo biblico',
      }
    },
  },
})