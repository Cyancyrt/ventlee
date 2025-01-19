import {
  FixedToolbarFeature,
  HTMLConverterFeature,
  lexicalEditor,
  lexicalHTML,
  LinkFeature,
} from '@payloadcms/richtext-lexical'
import { CollectionConfig } from 'payload'

export const Super_Hero: CollectionConfig = {
  slug: 'Super-Hero',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'IsSideBar',
      label: 'Side Content',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },

    {
      name: 'description',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures, rootFeatures }) => [
          ...defaultFeatures,
          FixedToolbarFeature(),
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
    },
  ],
}
