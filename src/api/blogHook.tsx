import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'

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

export async function GetOneBlog({ params }) {
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
  const post = pageRes.docs.find((doc) => doc?.contentType?.description === 'blog')

  if (post) {
    return post // Return the post if contentype is 'post'
  } else {
    return notFound() // Return 404 if not found or invalid content type
  }
}
export async function GetOneTestimoni({ params }) {
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
  const post = pageRes.docs.find((doc) => doc?.contentType?.description === 'testimoni')

  if (post) {
    return post // Return the post if contentype is 'post'
  } else {
    return notFound() // Return 404 if not found or invalid content type
  }
}
export async function GetOneAbout({ params }) {
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
  const post = pageRes.docs.find((doc) => doc?.contentType?.description === 'about')

  if (post) {
    return post // Return the post if contentype is 'post'
  } else {
    return notFound() // Return 404 if not found or invalid content type
  }
}
export async function GetOneEvent({ params }) {
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
  const post = pageRes.docs.find((doc) => doc?.contentType?.description === 'event')

  if (post) {
    return post // Return the post if contentype is 'post'
  } else {
    return notFound() // Return 404 if not found or invalid content type
  }
}
