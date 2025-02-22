import { GetAllBlog } from '@/api/blogHook'
import { HtmlRenderer, TextSerial } from '@/component/hooks/serialize'
import { getLastUpdated } from '@/component/hooks/serialize'
import React from 'react'

async function TestimoniPage() {
  const pageRes = await GetAllBlog()

  // Filter documents where contentType is 'testimoni'
  const posts = pageRes?.docs?.filter((doc) => doc.contentType === 'testimoni')
  console.log("test")
  return (
    <div className="container mt-5">
      <div className="row g-4">
        {posts?.map((res, index) => {
          const imageHeader = res?.Header[0]?.image
          const layout = res?.layout

          return (
            <div className="col-12" key={index}>
              {/* Flexbox Wrapper for Main Content and Sidebar */}
              <div className="d-flex flex-row">
                {/* Main Content */}
                <div className="card mb-3 flex-grow-1 me-3" style={{ maxWidth: '540px' }}>
                  <div className="row g-0">
                    <div className="col-md-4">
                      {imageHeader && (
                        <img
                          src={imageHeader?.url}
                          className="img-fluid rounded-start"
                          alt={imageHeader?.alt || 'Image'}
                        />
                      )}
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{res?.title}</h5>
                        <div className="card-text">
                          <HtmlRenderer htmlString={res?.description_html} />
                        </div>
                        <p className="card-text">
                          <small className="text-body-secondary">
                            {getLastUpdated(res?.updatedAt)}
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                {layout?.some((block) => block?.IsSideBar) && (
                  <aside
                    className="flex-shrink-0 "
                    style={{
                      borderLeft: '1px solid #ddd',
                      padding: '10px',
                      maxWidth: '250px',
                      minWidth: '200px',
                      marginLeft: '20px', // Menambahkan jarak antara sidebar dan konten utama
                    }}
                  >
                    <h3>Side Content</h3>
                    {layout?.map(
                      (block, index) =>
                        block.IsSideBar && (
                          <div key={index}>
                            <TextSerial nodes={[block]} />
                          </div>
                        ),
                    )}
                  </aside>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TestimoniPage
