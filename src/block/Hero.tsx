import { slateEditor } from '@payloadcms/richtext-slate'
import { CollectionConfig } from 'payload'

export const Hero: CollectionConfig = {
  slug: 'Hero',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'richText',
      required: true,
      editor: slateEditor({
        admin: {
          elements: [
            'blockquote',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
            'link',
            'ol',
            'ul',
            'indent',
            'relationship',
            'textAlign',
            'upload',
          ],
          leaves: ['bold', 'italic', 'underline', 'code', 'strikethrough'],
        },
      }),
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
