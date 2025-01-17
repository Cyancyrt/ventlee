import React, { Fragment } from 'react'
import escapeHTML from 'escape-html'
import { TextFormatType } from '@payloadcms/richtext-lexical/lexical'

const cekFormat = (format: TextFormatType): string[] => {
  const formatMapping: Record<string, number> = {
    bold: 1 << 0,
    italic: 1 << 1,
    strikethrough: 1 << 2,
    underline: 1 << 3,
    subscript: 1 << 4,
    superscript: 1 << 5,
    code: 1 << 6,
  }

  const activeFormats: string[] = []

  for (const [key, value] of Object.entries(formatMapping)) {
    if ((format & value) === value) {
      activeFormats.push(key)
    }
  }

  return activeFormats
}
function TextSerial(nodes) {
  if (!Array.isArray(nodes)) return null // Pastikan nodes adalah array

  return nodes.map((node, index) => {
    if (!node) return null

    // Jika node adalah teks (tidak memiliki `type`, hanya teks langsung)

    if (!node.children) {
      let content = (
        <span
          dangerouslySetInnerHTML={{
            __html: escapeHTML(node.text),
          }}
        />
      )
      cekFormat(node.format).map((res) => {
        if (res === 'bold') {
          content = (
            <strong className="text-red-500" key={index}>
              {content}
            </strong>
          )
        }
        if (res === 'italic') content = <em key={index}>{content}</em>
        if (res === 'code') content = <code key={index}>{content}</code>
        if (res === 'underline') content = <u key={index}>{content}</u>
        if (res === 'strikethrough') content = <del key={index}>{content}</del>
        if (res === 'subscript') content = <sub key={index}>{content}</sub>
      })
      return <Fragment key={index}>{content}</Fragment>
    }

    // Jika node adalah elemen dengan `type`
    switch (node.type) {
      case 'paragraph':
        return <p key={index}>{TextSerial(node.children)}</p>
      case 'h1':
        return <h1 key={index}>{TextSerial(node.children)}</h1>
      case 'h2':
        return <h2 key={index}>{TextSerial(node.children)}</h2>
      case 'h3':
        return <h3 key={index}>{TextSerial(node.children)}</h3>
      case 'h4':
        return <h4 key={index}>{TextSerial(node.children)}</h4>
      case 'h5':
        return <h5 key={index}>{TextSerial(node.children)}</h5>
      case 'h6':
        return <h6 key={index}>{TextSerial(node.children)}</h6>
      case 'blockquote':
        return <blockquote key={index}>{TextSerial(node.children)}</blockquote>
      case 'ul':
        return <ul key={index}>{TextSerial(node.children)}</ul>
      case 'ol':
        return <ol key={index}>{TextSerial(node.children)}</ol>
      case 'li':
        return <li key={index}>{TextSerial(node.children)}</li>
      case 'link':
        return (
          <a href={escapeHTML(node.fields.url)} key={index}>
            {TextSerial(node.children)}
          </a>
        )
      default:
        return <span key={index}>{TextSerial(node.children)}</span>
    }
  })
}

export const HtmlRenderer = ({ htmlString }) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />
}
