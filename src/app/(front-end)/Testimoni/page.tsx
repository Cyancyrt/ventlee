import { GetAllBlog } from '@/api/blogHook'
import React from 'react'

async function TestimoniPage() {
  const pageRes = await GetAllBlog()

  // Filter documents where contentType is 'post'
  const posts = pageRes?.docs?.filter((doc) => doc.contentType === 'testimoni')

  return (
    <div className="container mt-5">
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {posts?.map((res, index) => (
          <div className="col" key={index}>
            <div className="card h-100 justify-content-center">
              <img src="#" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{res?.title}</h5>
                <p className="card-text">{res?.excerpt}</p>
                <a href={`/Testimoni/${res?.slug}`} className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
              <div className="card-footer">
                <small className="text-body-secondary">Last updated {res?.updatedAt}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TestimoniPage
