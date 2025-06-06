import { CollectionConfig } from 'payload'
import { generateSlug } from '@/component/hooks/formatSlug'
import { revalidatePage } from '@/component/hooks/revalidatePage'
import GaleriBlock from '@/block/GaleriBlock'

export const Galeri: CollectionConfig = {
  slug: 'Galeri',
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
    defaultColumns: ['title', 'slug'],
    livePreview: {
      url: ({ data }) => {
        const isHomePage = data.slug === 'home'
        return `${process.env.PAYLOAD_PUBLIC_SITE_URL}${!isHomePage ? `/Galeri/${data.slug}` : ''}`
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
      admin: {
        hidden: true,
      },
    },
    {
      name: 'uploads',
      type: 'array', // Membuat array untuk blok dinamis
      fields: [
        {
          name: 'uploadBlock',
          type: 'group', // Membuat setiap blok sebagai grup
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
            {
              name: 'caption',
              type: 'text', // Menambahkan metadata opsional
              required: false,
            },
          ],
        },
      ],
      required: false, // Tidak wajib ada blok jika tidak dibutuhkan
    },
  ],
}
