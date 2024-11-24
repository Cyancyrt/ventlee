import { useSlate } from 'slate-react'
import React from 'react'
import { Editor } from 'slate'

export const CustomButton = () => {
  const editor = useSlate()

  const toggleHighlight = (editor: Editor) => {
    const currentMarks = Editor.marks(editor)
    const highlightActive = currentMarks && currentMarks.highlight ? true : false

    if (highlightActive) {
      Editor.removeMark(editor, 'highlight')
    } else {
      Editor.addMark(editor, 'highlight', true)
    }
  }

  return (
    <button
      type="button"
      onMouseDown={(event) => {
        event.preventDefault() // Mencegah kehilangan fokus
        toggleHighlight(editor) // Toggle highlight
      }}
    >
      ✨ Highlight
    </button>
  )
}

export const CustomLeaf = ({ attributes, children, leaf }) => {
  return (
    <span {...attributes} style={leaf.highlight ? { color: 'yellow' } : {}}>
      {children}
    </span>
  )
}
