import GaleriBlock from '@/block/GaleriBlock'
import { Hero } from '@/block/Hero'
import { Super_Hero } from '@/block/SuperHero'
import generateExcerpt from '@/component/hooks/formatExcerpt'
import { generateSlug } from '@/component/hooks/formatSlug'
import { revalidatePage } from '@/component/hooks/revalidatePage'

import {
  FixedToolbarFeature,
  HTMLConverterFeature,
  lexicalEditor,
  lexicalHTML,
  LinkFeature,
  UploadFeature,
} from '@payloadcms/richtext-lexical'
import { CollectionConfig } from 'payload'

export const Post: CollectionConfig = {
  slug: 'posts',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [
      async ({ data, originalDoc, req }) => {
        const payload = req.payload
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
    defaultColumns: ['title', 'slug', 'image', 'contentType'],
    livePreview: {
      url: ({ data }) => {
        const isHomePage = data.slug === 'home'
        if (data.contentType === 'post')
          return `${process.env.PAYLOAD_PUBLIC_SITE_URL}${!isHomePage ? `/Blog/${data.slug}` : ''}`
        return `${process.env.PAYLOAD_PUBLIC_SITE_URL}${!isHomePage ? `/Testimoni` : ''}`

        //ini kalo butuh yang detail testimoni
        // return `${process.env.PAYLOAD_PUBLIC_SITE_URL}${!isHomePage ? `/Testimoni/${data.slug}` : ''}`
      },
    },

    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'Header',
      label: 'Image Header',
      type: 'array',
      maxRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          upload: {
            imageSizes: [
              {
                name: 'small',
                fit: 'cover',
                height: 300,
                width: 900,
              },
              {
                name: 'large',
                fit: 'cover',
                height: 600,
                width: 1800,
              },
            ],
            limits: {
              fileSize: 5000000,
            },
          },
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Ketik disini ya',
      required: true,
    },
    {
      name: 'contentType',
      label: 'Content Type',
      type: 'relationship',
      relationTo: 'category',
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
          UploadFeature(),
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
      name: 'layout',
      label: 'Layout',
      type: 'blocks',
      admin: {
        position: 'sidebar',
      },
      blocks: [Hero, Super_Hero, GaleriBlock],
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
