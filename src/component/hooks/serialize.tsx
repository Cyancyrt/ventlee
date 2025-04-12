import React, { Fragment } from 'react'
import escapeHTML from 'escape-html'
import type { SerializedLexicalNode } from './types'
import Image from 'next/image'


export function getLastUpdated(updatedAt: string | undefined): string {
  if (!updatedAt) return 'Tanggal tidak tersedia'

  const updatedDate = new Date(updatedAt)
  const now = new Date()
  const diff = now.getTime() - updatedDate.getTime() // Selisih dalam milidetik

  if (isNaN(diff)) return 'Tanggal tidak valid'

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) {
    return `${days} hari yang lalu`
  } else if (hours > 0) {
    return `${hours} jam yang lalu`
  } else if (minutes > 0) {
    return `${minutes} menit yang lalu`
  } else {
    return `${seconds} detik yang lalu`
  }
}

// Fungsi untuk memeriksa dan mengembalikan embed YouTube
const YouTubeEmbed = (htmlString) => {
  const hrefMatch = htmlString?.match(/href="([^"]+youtube\.com\/embed\/[^"]+)"/)
  if (hrefMatch) {
    const youtubeUrl = hrefMatch[1] // URL YouTube dari grup regex
    return (
      <div className="youtube-embed">
        <iframe
          src={youtubeUrl}
          title="YouTube Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    )
  }
  return null // Tidak ada embed YouTube
}
export const IS_BOLD = 1
export const IS_ITALIC = 1 << 1
export const IS_STRIKETHROUGH = 1 << 2
export const IS_UNDERLINE = 1 << 3
export const IS_CODE = 1 << 4
export const IS_SUBSCRIPT = 1 << 5
export const IS_SUPERSCRIPT = 1 << 6
export const IS_HIGHLIGHT = 1 << 7

interface Props {
  nodes: SerializedLexicalNode[]
}
export const HeaderImage = (node) => {
  // console.log(node)
  let image =
    node?.Header[0]?.image?.url ||
    node?.description?.root?.children
      ?.filter((res) => res.type === 'upload')
      ?.map((res) => res.value.url)

  return image
}
export const HTMLCONVERT = ({ nodes }: { nodes?: Props }) => {
  if (!nodes || nodes.length === 0) {
    return <br /> // Jika nodes kosong, langsung return <br />
  }
  return nodes?.map((node, index): JSX.Element | null => {
    if (node.type === 'upload') {
      let image = <Image src={node?.value?.url} alt={node?.value?.alt} />
      return image
    }
    if (node.type === 'text') {
      let text = <span key={index} dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} />
      if (node.format & IS_BOLD) {
        text = <strong key={index}>{text}</strong>
      }
      if (node.format & IS_ITALIC) {
        text = <em key={index}>{text}</em>
      }
      if (node.format & IS_STRIKETHROUGH) {
        text = (
          <span key={index} className="line-through">
            {text}
          </span>
        )
      }
      if (node.format & IS_UNDERLINE) {
        text = (
          <span key={index} className="underline">
            {text}
          </span>
        )
      }
      if (node.format & IS_CODE) {
        text = <code key={index}>{text}</code>
      }
      if (node.format & IS_SUBSCRIPT) {
        text = <sub key={index}>{text}</sub>
      }
      if (node.format & IS_SUPERSCRIPT) {
        text = <sup key={index}>{text}</sup>
      }

      return text
    }

    if (node == null) {
      return null
    }

    // NOTE: Hacky fix for
    // https://github.com/facebook/lexical/blob/d10c4e6e55261b2fdd7d1845aed46151d0f06a8c/packages/lexical-list/src/LexicalListItemNode.ts#L133
    // which does not return checked: false (only true - i.e. there is no prop for false)
    const serializedChildrenFn = (node: SerializedLexicalNode): JSX.Element | null => {
      if (node.children == null) {
        return null
      } else {
        if (node?.type === 'list' && node?.listType === 'check') {
          for (const item of node.children) {
            if (!item?.checked) {
              item.checked = false
            }
          }
          return HTMLCONVERT({ nodes: node.children })
        } else {
          return HTMLCONVERT({ nodes: node.children })
        }
      }
    }

    const serializedChildren = serializedChildrenFn(node)
    const headingClasses = {
      h1: 'text-3xl font-bold mb-4',
      h2: 'text-2xl font-semibold mb-3',
      h3: 'text-xl font-medium mb-2',
      h4: 'text-lg font-medium mb-2',
      h5: 'text-base font-medium mb-1',
      h6: 'text-sm font-medium mb-1',
    }
    switch (node.type) {
      case 'linebreak': {
        return <br key={index} />
      }
      case 'paragraph': {
        return <p key={index}>{serializedChildren}</p>
      }
      case 'heading': {
        const Tag = node?.tag as keyof typeof headingClasses // Pastikan tag sesuai dengan headingClasses
        const className = headingClasses[Tag] || '' // Ambil className yang sesuai, default ke string kosong jika tidak ditemukan
        return (
          <Tag key={index} className={className}>
            {serializedChildren}
          </Tag>
        )
      }
      case 'list': {
        type List = Extract<keyof JSX.IntrinsicElements, 'ul' | 'ol'>
        const Tag = node?.tag as List
        return (
          <Tag key={index} className={node?.listType}>
            {serializedChildren}
          </Tag>
        )
      }
      case 'listitem': {
        if (node?.checked != null) {
          return (
            <li
              key={index}
              className={`component--list-item-checkbox ${
                node.checked
                  ? 'component--list-item-checkbox-checked'
                  : 'component--list-item-checked-unchecked'
              }`}
              value={node?.value}
              role="checkbox"
              aria-checked={node.checked ? 'true' : 'false'}
              tabIndex={-1}
            >
              {serializedChildren}
            </li>
          )
        } else {
          return (
            <li key={index} value={node?.value}>
              {serializedChildren}
            </li>
          )
        }
      }
      case 'quote': {
        return <blockquote key={index}>{serializedChildren}</blockquote>
      }
      case 'link': {
        const attributes: {
          doc?: any
          linkType?: 'custom' | 'internal'
          newTab?: boolean
          nofollow?: boolean
          rel?: string
          sponsored?: boolean
          url?: string
        } = node.attributes

        const youtubeEmbed = YouTubeEmbed(attributes.url)
        if (youtubeEmbed) {
          return youtubeEmbed
        }

        if (attributes.linkType === 'custom') {
          const rel = `${attributes?.rel ?? ''} ${attributes?.nofollow ? ' nofollow' : ''}`
          return (
            <a
              key={index}
              href={attributes.url}
              target={attributes.newTab ? 'target="_blank"' : undefined}
              rel={rel}
            >
              {serializedChildren}
            </a>
          )
        } else {
          return <span key={index}>Internal link coming soon</span>
        }

        // TODO: internal links
        // return `<a href="${getLinkForPage(attributes.doc)}"${
        //   attributes.newTab ? ' target=_"blank"' : ''
        // } rel="${attributes?.rel ?? ''}${
        //   attributes?.sponsored ? ' sponsored' : ''
        // }${attributes?.nofollow ? ' nofollow' : ''}">${serializedChildren}</a>` // TODO: Check doc link handling
      }
      case 'inline-image': {
        // TODO: inline-images based on InlineImagePlugin
        return (
          <span key={index} style={{ fontStyle: 'italic' }}>
            {' '}
            (An inline image will appear here! Honest!){' '}
          </span>
        )
      }
      default:
        return null
    }
  })
}

// Komponen utama HtmlRenderer

export function BlockSerializer({ nodes }: { nodes?: any[] }) {
  // Safety check: Ensure nodes is always defined as an empty array if undefined
  if (!nodes || !Array.isArray(nodes)) return null // Ensure nodes is an array and not undefined

  return nodes.map((node, index) => {
    if (!node) return null
    // Penanganan untuk blocktype spesifik
    if (node?.blockType) {
      switch (node.blockType) {
        case 'hero':
          return (
            <section key={index} className="hero">
              <h1>{node.title}</h1>
              <p>{node.subtitle}</p>
              {node.image && <Image src={node.image} alt={node.alt || 'Hero Image'} />}
            </section>
          )

        case 'Super-Hero':
          return (
            <section key={index} className="superhero">
              <HTMLCONVERT nodes={node?.description?.root?.children} />
            </section>
          )

        case 'GaleriBlock':
          return (
            <div key={index} className="galeri-blocks">
              <section className="max-w-7xl ml-14 mr-14 px-4 py-8 mb-14 mt-14">
                <div className="grid grid-cols-2 grid-rows-1 gap-14">
                  {node.uploads?.map((item, idx) => {
                    const image = item.uploadBlock?.image // Assign item.uploadBlock.image to a variable
                    return (
                      <div key={idx} className="galeri-item">
                        {image && (
                          <Image
                            src={image.url}
                            alt={image.alt || `Gallery Item ${idx + 1}`}
                            className="rounded"
                          />
                        )}
                        {image && <p>{image.caption}</p>}
                      </div>
                    )
                  })}
                </div>
              </section>
            </div>
          )

        default:
          return <div key={index}>{`Unknown blocktype: ${node.blocktype}`}</div>
      }
    }

    // Default fallback untuk elemen yang tidak dikenal
    return <span key={index}>{BlockSerializer(node)}</span>
  })
}
