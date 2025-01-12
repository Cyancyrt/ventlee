import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'

export async function GetAllGaleri() {
  const payload = await getPayload({ config })

  const pageRes = await payload.find({
    collection: 'Galeri',
    draft: true,
    limit: 1,
  })
  if (pageRes === null) {
    return notFound()
  }
  return pageRes
}

export async function GetOneGaleri({ params }) {
  const payload = await getPayload({ config })
  const { slug } = await params

  const pageRes = await payload.find({
    collection: 'Galeri',
    draft: true,
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })
  return pageRes
}
