import React, { useMemo } from 'react'
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { CustomButton, CustomLeaf } from './button'
const RichTextEditor = () => {
  const initialEditorValue = [
    {
      type: 'paragraph',
      children: [{ text: 'Try highlighting this text!' }],
    },
  ]

  const editor = useMemo(() => withReact(createEditor()), [])

  return (
    <Slate editor={editor} value={initialEditorValue}>
      <CustomButton />
      <Editable renderLeaf={(props) => <CustomLeaf {...props} />} />
    </Slate>
  )
}

export default RichTextEditor
