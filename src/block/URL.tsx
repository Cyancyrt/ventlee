import { CollectionConfig } from 'payload'

export const URLSection: CollectionConfig = {
  slug: 'URLSection',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'externalLink',
      type: 'text',

      label: 'YouTube Video URL',
      admin: {
        position: 'sidebar',
        placeholder: 'https://www.youtube.com/watch?v=video_id',
      },
      validate: (value) => {
        const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i
        return urlPattern.test(value) || 'Invalid URL'
      },
      hooks: {
        beforeChange: [
          ({ value }) => {
            if (!value) return value

            // Update YouTube pattern to handle both regular and shortened URLs with query strings
            const youtubePattern =
              /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
            const match = value.match(youtubePattern)

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
}
