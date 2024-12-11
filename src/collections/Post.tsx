<<<<<<< HEAD
import { MyFeature } from '@/component/Button/Custom.server'
import generateExcerpt from '@/component/hooks/formatExcerpt'
import { generateSlug } from '@/component/hooks/formatSlug'
import { revalidatePage } from '@/component/hooks/revalidatePage'
import {
  BoldFeature,
  EXPERIMENTAL_TableFeature,
  FixedToolbarFeature,
  HTMLConverterFeature,
  lexicalEditor,
  lexicalHTML,
  LinkFeature,
} from '@payloadcms/richtext-lexical'
=======
import generateExcerpt from '@/component/hooks/formatExcerpt'
import { generateSlug } from '@/component/hooks/formatSlug'
import { revalidatePage } from '@/component/hooks/revalidatePage'
import { slateEditor } from '@payloadcms/richtext-slate'
>>>>>>> daf8797404ba121d23117f869d8d4f414cf92e72
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
      admin: {
        hidden: true,
      },
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
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures, rootFeatures }) => [
          ...defaultFeatures,
          FixedToolbarFeature(),
          MyFeature(),
          LinkFeature({
            // Example showing how to customize the built-in fields
            // of the Link feature
            fields: ({ defaultFields }) => [
              ...defaultFields.filter((field) => field.name !== 'url'),
              {
                name: 'rel',
                label: 'Rel Attribute',
                type: 'select',
                hasMany: true,
                options: ['noopener', 'noreferrer', 'nofollow'],
                defaultValue: ['noopener'],
                admin: {
                  description:
                    'The rel attribute defines the relationship between a linked resource and the current document.',
                },
              },
              {
                // Menyalin field `url` dari `defaultFields` dan menambahkan logika kustom
                ...defaultFields.find((field) => field.name === 'url'), // Menemukan field `url` dari defaultFields
                hooks: {
                  beforeChange: [
                    ({ data, value }) => {
                      if (!data?.url) return data?.url

                      // Update YouTube pattern untuk menangani URL biasa dan yang disingkat
                      const youtubePattern =
                        /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
                      const match = data?.url.match(youtubePattern)

                      if (match && match[1]) {
                        // Mengubah URL menjadi format embed
                        return `https://www.youtube.com/embed/${match[1]}`
                      }

                      return data?.url // Mengembalikan URL asli jika tidak cocok dengan pola
                    },
                  ],
                },
              },
            ],
          }),
          HTMLConverterFeature({}),
        ],
      }),
    },
    lexicalHTML('description', { name: 'description_html' }),
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Kosongkan untuk tidak menampilkan gambar',
      },
    },
    {
      name: 'externalLinks',
      type: 'array', // Menggunakan array untuk memungkinkan banyak entri
      label: 'External Links',
      labels: {
        singular: 'External Link', // Label untuk satu entri
        plural: 'External Links', // Label untuk banyak entri
      },
      fields: [
        {
          name: 'url',
          type: 'text', // Tipe field untuk menyimpan URL
          label: 'URL',
        },
      ],
      admin: {
        position: 'sidebar', // Menempatkan seluruh array di sidebar
        description: 'Tambahkan satu atau lebih tautan eksternal.',
      },
    },
    {
      name: 'createdAt',
      label: 'Created At',
      type: 'date',
      admin: {
        hidden: true, // Buat read-only untuk mencegah pengeditan
      },
    },
    {
      name: 'updatedAt',
      label: 'Updated At',
      type: 'date',
      admin: {
        hidden: true, // Buat read-only untuk mencegah pengeditan
      },
    },
  ],
}
