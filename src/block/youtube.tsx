import { CollectionConfig } from 'payload'

export const Youtube: CollectionConfig = {
  slug: 'URLSection',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'externalLink',
      type: 'richText',

      label: 'YouTube Video URL',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
