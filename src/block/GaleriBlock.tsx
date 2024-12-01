const GaleriBlock: CollectionConfig = {
  slug: 'GaleriBlock',
  access: {
    read: () => true,
  },

  fields: [
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
export default GaleriBlock
