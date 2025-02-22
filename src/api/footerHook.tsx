import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'

export async function GetAllFooter() {
  const payload = await getPayload({ config })
  const pageRes = await payload.find({
    collection: 'footer',
    draft: true,
  })
  if (pageRes === null) {
    return notFound()
  }
  return pageRes.docs[0]
}
