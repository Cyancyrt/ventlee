import { CollectionConfig } from 'payload'
import { generateSlug } from '@/component/hooks/formatSlug'

export const FooterCategory: CollectionConfig = {
  slug: 'FooterCategory',
  admin: {
    hidden: true,
    defaultColumns: ['title', 'slug'],
    useAsTitle: 'title',
  },
  hooks: {
    beforeChange: [
      ({ data, originalDoc }) => {
        if (data) {
          if (!data.name) {
            data.name = ''
          }
        }
        // Jika title berubah, update slug
        if (data?.name && data?.name !== originalDoc?.name) {
          data.slug = generateSlug(data.name) // Buat slug otomatis dari title yang baru
        }
        return data
      },
    ],
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        hidden: true,
      },
    },
  ],
}
