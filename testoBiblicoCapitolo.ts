import {defineArrayMember, defineField, defineType} from 'sanity'

export const testoBiblicoCapitolo = defineType({
  name: 'testoBiblicoCapitolo',
  title: 'Testo biblico — Capitolo',
  type: 'document',
  fields: [
    defineField({name: 'libro', title: 'Libro', type: 'reference', to: [{type: 'libro'}], validation: R => R.required()}),
    defineField({name: 'capitolo', title: 'Capitolo analitico', type: 'reference', to: [{type: 'capitolo'}]}),
    defineField({name: 'numero', title: 'Numero', type: 'number', validation: R => R.required().integer().min(1)}),
    defineField({
      name: 'numeroAlternativo', title: 'Numerazione alternativa', type: 'object',
      fields: [
        defineField({name: 'sistema', title: 'Sistema', type: 'string', options: {list: [{title: 'LXX / Vulgata', value: 'LXX_VG'}, {title: 'MT', value: 'MT'}, {title: 'Altro', value: 'ALTRO'}]}}),
        defineField({name: 'numero', title: 'Numero', type: 'number'})
      ]
    }),
    defineField({name: 'edizione', title: 'Edizione', type: 'string'}),
    defineField({name: 'lingua', title: 'Lingua', type: 'string'}),
    defineField({name: 'tradizione', title: 'Tradizione / testimone', type: 'string'}),
    defineField({
      name: 'diritti', title: 'Diritti e licenza', type: 'object',
      fields: [
        defineField({name: 'testoProtetto', title: 'Testo protetto', type: 'boolean'}),
        defineField({name: 'noteProtette', title: 'Note protette', type: 'boolean'}),
        defineField({name: 'noteIncluse', title: 'Note incluse', type: 'boolean'}),
        defineField({name: 'nota', title: 'Nota', type: 'text', rows: 3}),
      ]
    }),
    defineField({
      name: 'versetti', title: 'Versetti', type: 'array',
      of: [defineArrayMember({
        name: 'versettoBiblico', title: 'Versetto', type: 'object',
        fields: [
          defineField({name: 'numero', title: 'Numero', type: 'number', validation: R => R.required().integer().min(1)}),
          defineField({name: 'testo', title: 'Testo', type: 'text', rows: 3}),
          defineField({
            name: 'metatesto', title: 'Metatesto / superscrizione', type: 'object',
            fields: [
              defineField({name: 'testo', title: 'Testo', type: 'text', rows: 2}),
              defineField({name: 'stile', title: 'Stile', type: 'string', options: {list: [{title: 'Corsivo', value: 'corsivo'}]}})
            ]
          }),
          defineField({name: 'marcatoreAlfabetico', title: 'Marcatore alfabetico', type: 'string'}),
          defineField({
            name: 'riferimentoAlternativo', title: 'Riferimento alternativo', type: 'object',
            fields: [
              defineField({name: 'sistema', title: 'Sistema', type: 'string', options: {list: [{title: 'LXX / Vulgata', value: 'LXX_VG'}, {title: 'MT', value: 'MT'}, {title: 'Altro', value: 'ALTRO'}]}}),
              defineField({name: 'salmo', title: 'Salmo', type: 'number'}),
              defineField({name: 'capitolo', title: 'Capitolo', type: 'number'}),
              defineField({name: 'versetto', title: 'Versetto', type: 'number'})
            ]
          })
        ],
        preview: {
          select: {title: 'numero', subtitle: 'testo'},
          prepare({title, subtitle}) { return {title: `Versetto ${title}`, subtitle} }
        }
      })]
    }),
    defineField({
      name: 'importazione', title: 'Importazione', type: 'object',
      fields: [
        defineField({name: 'fonteFile', title: 'File sorgente', type: 'string'}),
        defineField({name: 'parser', title: 'Parser', type: 'string'}),
        defineField({name: 'validato', title: 'Validato', type: 'boolean'})
      ]
    })
  ],
  preview: {
    select: {title: 'numero', book: 'libro.titolo', edition: 'edizione'},
    prepare({title, book, edition}) {
      return {title: `${book || 'Libro'} ${title}`, subtitle: edition || 'Testo biblico'}
    }
  }
})
