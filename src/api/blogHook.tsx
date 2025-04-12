import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { CATEGORY } from '@/app/(front-end)/config'

export async function GetAllBlog() {
  const payload = await getPayload({ config })

  const pageRes = await payload.find({
    collection: 'posts',
    draft: true,
    limit: 10,
  })
  if (pageRes === null) {
    return notFound()
  }
  return pageRes
}
export async function GetOneBlog({ params }: { params: { slug: string } }) {
  const payload = await getPayload({ config })
  const { slug } = await params

  const pageRes = await payload.find({
    collection: 'posts',
    draft: true,
    limit: 15,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  // Check if the document exists and has the correct content type
  const post = pageRes.docs.find(
    (doc) =>
      typeof doc?.contentType === 'object' &&
      doc.contentType?.description === CATEGORY.BLOG
  )
  

  if (post) {
    return post // Return the post if contentype is 'post'
  } else {
    return notFound() // Return 404 if not found or invalid content type
  }
}
export async function GetOneTestimoni({ params } : { params: { slug: string } }) {
  const payload = await getPayload({ config })
  const { slug } = await params

  const pageRes = await payload.find({
    collection: 'posts',
    draft: true,
    limit: 15,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  // Check if the document exists and has the correct content type
  const post = pageRes.docs.find(
    (doc) =>
      typeof doc?.contentType === 'object' &&
      doc.contentType?.description === CATEGORY.TESTIMONI
  )

  if (post) {
    return post // Return the post if contentype is 'post'
  } else {
    return notFound() // Return 404 if not found or invalid content type
  }
}
export async function GetOneAbout({ params } : { params: { slug: string } }) {
  const payload = await getPayload({ config })
  const { slug } = await params

  const pageRes = await payload.find({
    collection: 'posts',
    draft: true,
    limit: 15,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  // Check if the document exists and has the correct content type
  const post = pageRes.docs.find(
    (doc) =>
      typeof doc?.contentType === 'object' &&
      doc.contentType?.description === CATEGORY.ABOUT
  )

  if (post) {
    return post // Return the post if contentype is 'post'
  } else {
    return notFound() // Return 404 if not found or invalid content type
  }
}
export async function GetOneEvent({ params }: { params: { slug: string } }) {
  const payload = await getPayload({ config })
  const { slug } = await params

  const pageRes = await payload.find({
    collection: 'posts',
    draft: true,
    limit: 15,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  // Check if the document exists and has the correct content type
  const post = pageRes.docs.find(
    (doc) =>
      typeof doc?.contentType === 'object' &&
      doc.contentType?.description === CATEGORY.EVENT
  )

  if (post) {
    return post // Return the post if contentype is 'post'
  } else {
    return notFound() // Return 404 if not found or invalid content type
  }
}
