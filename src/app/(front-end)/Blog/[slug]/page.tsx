import React, { Fragment } from 'react'
import { RefreshRouteOnSave } from '../../Blog/[slug]/RefreshRouteOnSave'
import Image from 'next/image'
import { GetOneBlog } from '@/api/blogHook'

import { HTMLCONVERT, HeaderImage, BlockSerializer } from '@/component/hooks/serialize'
import PostNextPrev from '../../Blog/prevAndNextPost'

async function BlogPage({ params }) {
  const response = await GetOneBlog({ params })
  const layout = response?.layout
  if (!response) return null
  return (
    <Fragment>
      <RefreshRouteOnSave />
      <section
        id="about"
        className="about"
        key={response.id}
        style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}
      >
        {/* Main Content Area */}
        <div style={{ flex: layout?.some((block) => block.isSideBar) ? '3' : '1' }}>
          <div className="relative h-[80vh]">
            <img
              src={HeaderImage(response)}
              alt="background"
              className="w-full h-full object-cover brightness-75"
            />
            <div className="absolute bottom-16 left-0 right-0">
              <h1 className="text-white text-4xl font-medium text-center max-w-4xl mx-auto px-4">
                {response?.title}
              </h1>
            </div>
          </div>
          <div className="content mx-auto max-w-4xl px-4 py-16 text-left">
            <HTMLCONVERT nodes={response?.description?.root?.children} />
            <section className="max-w-7xl ml-14 mr-14 px-4 py-8 mb-14 mt-14">
              <div className="grid grid-cols-2 grid-rows-1 gap-14">
                {response?.image && (
                  <Image
                    src={response?.image?.url}
                    alt={response?.image?.alt}
                    className="rounded"
                  />
                )}
              </div>
            </section>

            {layout &&
              layout?.map(
                (block, index) =>
                  !block?.IsSideBar && ( // Render only non-sidebar blocks in main content
                    <section key={index}>
                      <BlockSerializer nodes={[block]} />
                    </section>
                  ),
              )}
          </div>
        </div>

        {/* Side Content Area */}
        {layout?.some((block) => block?.IsSideBar) && (
          <aside style={{ flex: '1', borderLeft: '1px solid #ddd', padding: '10px' }}>
            <h3>Side Content</h3>
            {layout?.map(
              (block, index) =>
                block.IsSideBar && ( // Render only sidebar blocks here
                  <div key={index}>
                    <BlockSerializer nodes={[block]} />
                  </div>
                ),
            )}
          </aside>
        )}
      </section>
      <PostNextPrev slug={response?.slug} />
    </Fragment>
  )
}
export default BlogPage
