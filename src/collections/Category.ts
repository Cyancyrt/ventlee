import { CollectionConfig } from 'payload'
import { generateSlug, generateValue } from '@/component/hooks/formatSlug'
import { revalidatePage } from '@/component/hooks/revalidatePage'

export const Category: CollectionConfig = {
  slug: 'category',
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [
      ({ data, originalDoc }) => {
        if (data) {
          if (!data.title) {
            data.title = ''
          }
        }
        // Jika title berubah, update slug
        if (data?.title && data?.title !== originalDoc?.title) {
          data.slug = generateSlug(data.title) // Buat slug otomatis dari title yang baru
        }
        if (data?.title && data?.title !== originalDoc?.title) {
          data.description = generateValue(data.title) // Buat slug otomatis dari title yang baru
        }
        return data
      },
    ],
  },
  admin: {
    hidden: true,
    defaultColumns: ['title', 'slug'],
    useAsTitle: 'title',
    livePreview: {
      url: ({ data }) => {
        const isHomePage = data.slug === 'home'
        return `${process.env.PAYLOAD_PUBLIC_SITE_URL}${!isHomePage ? `/About/${data.slug}` : ''}`
      },
    },
  },

  fields: [
    {
      name: 'title',
      label: 'category name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'description',
      type: 'text',
      admin: {
        hidden: true,
      },
    },
  ],
}
