import { GetAllBlog } from '@/api/blogHook'
import React from 'react'

async function BlogPage() {
  const pageRes = await GetAllBlog()

  // Filter documents where contentType is 'post'
  const posts = pageRes?.docs?.filter((doc) => doc.contentType === 'post')

  return (
    <div className="container mt-5">
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {posts?.map((res, index) => {
          const imageHeader = res?.Header[0]?.image
          return (
            <div className="col" key={index}>
              <div className="card h-100 justify-content-center">
                <img src={imageHeader?.url} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{res?.title}</h5>
                  <p className="card-text">{res?.excerpt}</p>
                  <a href={`/Blog/${res?.slug}`} className="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
                <div className="card-footer">
                  <small className="text-body-secondary">Last updated {res?.updatedAt}</small>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BlogPage
