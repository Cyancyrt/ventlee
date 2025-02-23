import { CollectionConfig } from 'payload'
export const Footer: CollectionConfig = {
  slug: 'footer',
  access: {
    create: async ({ req: { payload } }) => {
      const existingFooters = await payload.find({
        collection: 'footer',
        limit: 0, // We only need the count
      })

      return existingFooters.totalDocs < 2
    },
    read: () => true,
    // Define update and delete access as needed
  },
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        const payload = req.payload

        // Cek apakah sectionType sudah ada di koleksi
        const existingFooter = await payload.find({
          collection: 'footer',
          where: {
            sectionType: { equals: data.sectionType },
          },
        })

        if (existingFooter.totalDocs > 0) {
          throw new Error(`Section Type "${data.sectionType}" sudah digunakan.`)
        }

        return data
      },
    ],
  },
  fields: [
    {
      name: 'sectionType',
      label: 'Section Type',
      type: 'select',
      required: true,
      options: [
        { label: 'Social Media', value: 'social_media' },
        { label: 'Useful Links', value: 'useful_links' },
      ],
      defaultValue: 'social_media',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'AddLayout',
      type: 'array',
      fields: [
        {
          name: 'footerCategory',
          label: 'category',
          type: 'relationship',
          relationTo: 'FooterCategory',
        },
        {
          name: 'AddItem',
          type: 'array',
          fields: [
            {
              name: 'titleItem',
              label: 'Title Item',
              type: 'text',
              required: true,
            },
            {
              name: 'externalLink',
              type: 'text',

              label: 'URL',
              required: false,
              admin: {
                position: 'sidebar',
                placeholder: 'https://www.youtube.com/watch?v=video_id',
              },
              validate: (value) => {
                if (!value) return value
                const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i
                return urlPattern?.test(value) || 'Invalid URL'
              },
              hooks: {
                beforeChange: [
                  ({ value }) => {
                    if (!value) return value

                    // Update YouTube pattern to handle both regular and shortened URLs with query strings
                    const youtubePattern =
                      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
                    const match = value?.match(youtubePattern)

                    if (match && match[1]) {
                      // Convert URL to embed format
                      return `https://www.youtube.com/embed/${match[1]}`
                    }

                    return value // Return original value if URL does not match
                  },
                ],
              },
            },
          ],
        },
      ],
    },
  ],
}
