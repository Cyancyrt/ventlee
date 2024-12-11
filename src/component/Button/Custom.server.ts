import { createServerFeature, createNode } from '@payloadcms/richtext-lexical'
import { MyNode } from './EditorCustom'
import MyNodeComponent from './component'

// export const MyFeature = createServerFeature({
//   key: 'myFeature',

//   feature: {
//     componentImports: {
//       MyNodeComponent,
//     },
//     ClientFeature: {
//       path: './component/Button/componentClient#default',
//     },
//     clientFeatureProps: {
//       featureKey: 'myFeature',
//       order: 1,
//     },
//     nodes: [{ node: MyNode }],
//   },
// })
type UnSanitizedClientProps = {
  test: string
}

type SanitizedProps = {
  featureKey: string
  order: number
}

type UnSanitizedProps = {
  featureKey: string
  order: number
}

export const MyFeature = createServerFeature<
  UnSanitizedProps,
  SanitizedProps,
  UnSanitizedClientProps
>({
  key: 'myFeature',

  feature: async ({
    config,
    isRoot,
    props,
    resolvedFeatures,
    unSanitizedEditorConfig,
    featureProviderMap,
  }) => {
    await console.log('Received props:', props)
    return {
      componentImports: MyNodeComponent,
      ClientFeature: './component/Button/componentClient#default',
      clientFeatureProps: {
        featureKey: 'myFeature',
        order: 1,
        highlightStyle: 'background-color: yellow;',
      },
      nodes: [
        // Use the createNode helper function to more easily create nodes with proper typing
        createNode({
          node: MyNode,
        }),
      ],
    }
  },
})
