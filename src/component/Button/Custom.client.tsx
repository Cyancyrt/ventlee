'use client'

import {
  createClientFeature,
  toolbarFeatureButtonsGroupWithItems,
} from '@payloadcms/richtext-lexical/client'
import { MyNode } from './EditorCustom'
import { HighlightButton } from './iconCiomponent'
import MyNodeComponent from './component'

export const MyClientFeature = createClientFeature({
  nodes: [MyNode],
  toolbarFixed: {
    groups: [
      toolbarFeatureButtonsGroupWithItems([
        {
          ChildComponent: HighlightButton,
          label: 'Highlight',
          key: 'myFeature',
          Component: MyNodeComponent,
          order: 1,
        },
      ]),
    ],
  },
  toolbarInline: {
    groups: [
      toolbarFeatureButtonsGroupWithItems([
        {
          ChildComponent: HighlightButton,
          label: 'Highlight',
          key: 'myFeature',
          Component: MyNodeComponent,
          order: 1,
        },
      ]),
    ],
  },
})
