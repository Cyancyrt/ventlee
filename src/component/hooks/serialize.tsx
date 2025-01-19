import React, { Fragment } from 'react'
import escapeHTML from 'escape-html'
import { TextFormatType } from '@payloadcms/richtext-lexical/lexical'

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

// Komponen utama HtmlRenderer
export const HtmlRenderer = ({ htmlString }) => {
  // Cek apakah YouTubeEmbed dapat merender sesuatu
  const youtubeEmbed = YouTubeEmbed(htmlString)

  // Jika ya, render YouTubeEmbed; jika tidak, render dangerouslySetInnerHTML
  return youtubeEmbed || <div dangerouslySetInnerHTML={{ __html: htmlString }} />
}

export function TextSerial({ nodes }: { nodes?: any[] }) {
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
              {node.image && <img src={node.image} alt={node.alt || 'Hero Image'} />}
            </section>
          )

        case 'Super-Hero':
          return (
            <section key={index} className="superhero">
              <HtmlRenderer htmlString={node?.description_html} />
            </section>
          )

        case 'GaleriBlock':
          return (
            <div key={index} className="galeri-blocks">
              {node.uploads?.map((item, idx) => {
                const image = item.uploadBlock?.image // Assign item.uploadBlock.image to a variable
                return (
                  <div key={idx} className="galeri-item">
                    {image && (
                      <img
                        src={image.url}
                        alt={image.alt || `Gallery Item ${idx + 1}`}
                        style={{ width: '100px' }}
                      />
                    )}
                    {image && <p>{image.caption}</p>}
                  </div>
                )
              })}
            </div>
          )

        default:
          return <div key={index}>{`Unknown blocktype: ${node.blocktype}`}</div>
      }
    }

    // Default fallback untuk elemen yang tidak dikenal
    return <span key={index}>{TextSerial(node)}</span>
  })
}
