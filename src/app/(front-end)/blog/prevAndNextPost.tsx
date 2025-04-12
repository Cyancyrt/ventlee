import { GetAllBlog } from '@/api/blogHook'
import { CATEGORY,ROUTES } from '../config'

async function PostNextPrev({ slug }) {
  const pageRes = await GetAllBlog()

  // Filter documents where contentType is 'post'
  const posts = pageRes?.docs?.filter((doc) => doc?.contentType?.description === CATEGORY.BLOG)

  // Find the current post
  const currentPostIndex = posts?.findIndex((post) => post.slug === slug)
  const currentPost = posts?.[currentPostIndex]

  // Find previous and next posts based on the current post's index
  const prevPost = posts?.[currentPostIndex + 1]
  const nextPost = posts?.[currentPostIndex - 1]

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mt-3">
        <div className="d-flex justify-content-start">
          {prevPost && (
            <a href={`${ROUTES.BLOG}/${prevPost.slug}`} className="btn btn-secondary me-3">
              Previous Post: {prevPost?.title}
            </a>
          )}
        </div>
        <div className="d-flex justify-content-end">
          {nextPost && (
            <a href={`${ROUTES.BLOG}/${nextPost.slug}`} className="btn btn-secondary ms-3">
              Next Post: {nextPost?.title}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
export async function getServerSideProps({ params }) {
  return {
    props: { slug: params.slug },
  }
}

export default PostNextPrev
