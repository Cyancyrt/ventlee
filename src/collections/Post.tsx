import generateExcerpt from '@/component/hooks/formatExcerpt'
import { generateSlug } from '@/component/hooks/formatSlug'
import { revalidatePage } from '@/component/hooks/revalidatePage'
import { slateEditor } from '@payloadcms/richtext-slate'
import { CollectionConfig } from 'payload'

export const Post: CollectionConfig = {
  slug: 'posts',
  access: {
    read: () => true,
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
        if (data?.description && data?.description !== originalDoc?.description) {
          let excerpt = data?.description[0]?.children[0].text
          data.excerpt = generateExcerpt(excerpt) // Buat slug otomatis dari title yang baru
        }
        return data
      },
    ],
  },
  admin: {
    defaultColumns: ['title', 'slug', 'image'],
    livePreview: {
      url: ({ data }) => {
        const isHomePage = data.slug === 'home'
        return `${process.env.PAYLOAD_PUBLIC_SITE_URL}${!isHomePage ? `/About/${data.slug}` : ''}`
      },
    },

    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Ketik disini ya',
      required: true,
    },
    {
      name: 'excerpt',
      type: 'text',
    },
    {
      name: 'slug',
      type: 'text',
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      defaultValue: [
        {
          children: [{ text: 'Ketik disini ya' }],
        },
      ],
      editor: slateEditor({
        admin: {
          toolbar: true,
        },
      }),
    },
  ],
}
