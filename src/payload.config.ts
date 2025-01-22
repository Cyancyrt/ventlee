// storage-adapter-import-placeholder
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
// import image from '../public/assets/LOGO.png'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Galeri } from './collections/Galeri'
import { Post } from './collections/Post'
import { Category } from './collections/Category'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      graphics: {
        Icon: '/graphic/Icon/page.tsx#Icon',
        Logo: '/graphic/Logo/page.tsx#Logo',
      },
    },
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Category, Galeri, Post],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
})
