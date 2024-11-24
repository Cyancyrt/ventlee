import { BeforeChangeHook } from 'node_modules/payload/dist/globals/config/types'

const generateTitleFromFileName: BeforeChangeHook = async ({ data, originalDoc }) => {
  if (data.image && (!originalDoc || !data.title)) {
    const uploadedFile = data.image
    const fileName = uploadedFile.split('/').pop()
    const fileNameWithoutExtension = fileName.replace(/\.[^/.]+$/, '')
    data.title = fileNameWithoutExtension
  }
  return data
}

export default generateTitleFromFileName
