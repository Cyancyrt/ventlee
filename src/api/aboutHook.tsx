import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'

export async function GetAllAbout() {
  const payload = await getPayload({ config })

  const pageRes = await payload.find({
    collection: 'about',
    draft: true,
    limit: 1,
  })
  const data = pageRes?.docs?.[0]
  if (data === null) {
    return notFound()
  }
  return data
}
