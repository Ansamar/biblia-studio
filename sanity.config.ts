import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import legacyConfig from './sanity.config.legacy'
import {historicalExplorerSchemas} from './schemas/historicalExplorer'

const base = legacyConfig as any

export default defineConfig({
  ...base,

  plugins: [
    ...(base.plugins || []),
    structureTool({
      name: 'historicalExplorer',
      title: 'Historical Explorer',
      structure: (S) =>
        S.list()
          .title('Historical Explorer')
          .items([
            S.listItem()
              .title('🧭 Dataset')
              .child(
                S.documentTypeList('historicalExplorerDataset')
                  .title('Dataset Historical Explorer')
              ),

            S.divider(),

            S.listItem()
              .title('◆ Entità storiche')
              .child(
                S.documentTypeList('historicalEntity')
                  .title('Entità storiche')
                  .defaultOrdering([{field: 'label', direction: 'asc'}])
              ),

            S.listItem()
              .title('🗺️ Aree storiche')
              .child(
                S.documentTypeList('historicalArea')
                  .title('Aree storiche')
                  .defaultOrdering([{field: 'label', direction: 'asc'}])
              ),
          ]),
    }),
  ],

  schema: {
    ...(base.schema || {}),
    types: [
      ...(base.schema?.types || []),
      ...historicalExplorerSchemas,
    ],
  },
})
