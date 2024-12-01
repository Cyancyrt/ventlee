import { createServerFeature, createNode } from '@payloadcms/richtext-lexical'
import { MyNode } from './EditorCustom'

export const MyFeature = createServerFeature({
  key: 'myFeature',
  feature: {
    ClientFeature: {
      path: './component/Button/componentClient#default',
    },
    clientFeatureProps: {
      featureKey: 'myfeature',
      order: 1,
    }, //
    nodes: [{ node: MyNode }],
  },
})
