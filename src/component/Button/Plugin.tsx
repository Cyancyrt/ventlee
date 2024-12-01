'use client'
import type { LexicalCommand } from '@payloadcms/richtext-lexical/lexical'

import {
  createCommand,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_EDITOR,
} from '@payloadcms/richtext-lexical/lexical'

import { $insertNodeToNearestRoot } from '@payloadcms/richtext-lexical/lexical/utils'
import { useEffect } from 'react'

import type { PluginComponent } from '@payloadcms/richtext-lexical' // type imports can be imported from @payloadcms/richtext-lexical - even on the client

import { $createMyNode } from './EditorCustom'
import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext'

export const INSERT_MYNODE_COMMAND: LexicalCommand<void> = createCommand('HIGHLIGHT_COMMAND')

/**
 * Plugin which registers a lexical command to insert a new MyNode into the editor
 */
export const MyNodePlugin: PluginComponent = () => {
  // The useLexicalComposerContext hook can be used to access the lexical editor instance
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return editor.registerCommand(
      INSERT_MYNODE_COMMAND,
      (type) => {
        const selection = $getSelection()

        if (!$isRangeSelection(selection)) {
          return false
        }

        const focusNode = selection.focus.getNode()

        if (focusNode !== null) {
          const newMyNode = $createMyNode()
          $insertNodeToNearestRoot(newMyNode)
        }

        return true
      },
      COMMAND_PRIORITY_EDITOR,
    )
  }, [editor])

  return null
}
