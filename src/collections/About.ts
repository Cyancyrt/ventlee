import { slateEditor } from '@payloadcms/richtext-slate'
import { CollectionConfig } from 'payload'
import { generateSlug } from '@/component/hooks/formatSlug'
import { revalidatePage } from '@/component/hooks/revalidatePage'
import { Hero } from '@/block/Hero'

export const About: CollectionConfig = {
  slug: 'about',
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
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      defaultValue: 'home',
      required: true,
      index: true,
      label: 'Slug',
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
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'layout',
      label: 'Layout',
      type: 'blocks',
      blocks: [Hero],
    },
  ],
}
