/**
 * Generates an excerpt from the first paragraph of a given text.
 *
 * @param {string} content - The content to generate an excerpt from.
 * @param {number} wordLimit - The number of words for the excerpt.
 * @returns {string} The generated excerpt.
 */
const generateExcerpt = (content, wordLimit = 25) => {
  if (!content) return ''

  // Split content into paragraphs (assuming paragraphs are separated by \n or double newlines).
  const paragraphs = content.split(/\n\n|\n/).filter((p) => p.trim() !== '')
  if (paragraphs.length === 0) return ''

  // Use the first paragraph.
  const firstParagraph = paragraphs[0]

  // Extract words and limit to the specified word count.
  const words = firstParagraph.split(/\s+/)
  const excerpt = words.slice(0, wordLimit).join(' ')

  // Add ellipsis if content is longer than the word limit.
  return words.length > wordLimit ? `${excerpt}...` : excerpt
}

export default generateExcerpt
