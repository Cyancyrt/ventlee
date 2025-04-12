/**
 * Generates an excerpt from the first paragraph of a given text.
 *
 * @param {string} content - The content to generate an excerpt from.
 * @param {number} wordLimit - The number of words for the excerpt.
 * @returns {string} The generated excerpt.
 */
export const GetHeaderText = (content) => {

  return content?.map((node, index): JSX.Element | null => {
    const serializedChildrenFn = (node: SerializedLexicalNode): string | null => {
      if (!node.children || node.children.length === 0) {
        return null
      }

      // Gabungkan semua teks dalam children
      return node.children.map((child) => child.text).join(' ')
    }
    const serializedChildren = serializedChildrenFn(node)
    return serializedChildren
  })
}
const generateExcerpt = (content, wordLimit = 35) => {
  if (!content || content.length === 0) return ''

  // Gabungkan semua teks dalam array menjadi satu string
  const contentString = content.join(' ')

  // Pisahkan string berdasarkan spasi untuk mendapatkan kata-kata
  const words = contentString.split(/\s+/)

  // Ambil sejumlah kata berdasarkan wordLimit
  const excerpt = words.slice(0, wordLimit).join(' ')

  // Tambahkan "..." di akhir jika jumlah kata lebih dari wordLimit
  return words.length > wordLimit ? `${excerpt}...` : excerpt
}
export default generateExcerpt
