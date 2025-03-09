import React, { Fragment } from 'react'
import { RefreshRouteOnSave } from '../../blog/[slug]/RefreshRouteOnSave'
import Image from 'next/image'
import { GetOneAbout } from '@/api/blogHook'

import { HtmlRenderer, TextSerial } from '@/component/hooks/serialize'
import PostNextPrev from '../../blog/prevAndNextPost'

async function BlogPage({ params }) {
  const response = await GetOneAbout({ params })
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
          <h2>{response?.title}</h2>
          <HtmlRenderer htmlString={response?.description_html} />
          {response?.image && (
            <Image src={response?.image?.url} alt={response?.image?.alt} width={400} height={500} />
          )}
          {layout &&
            layout?.map(
              (block, index) =>
                !block?.IsSideBar && ( // Render only non-sidebar blocks in main content
                  <div key={index}>
                    <TextSerial nodes={[block]} />
                  </div>
                ),
            )}
        </div>

        {/* Side Content Area */}
        {layout?.some((block) => block?.IsSideBar) && (
          <aside style={{ flex: '1', borderLeft: '1px solid #ddd', padding: '10px' }}>
            <h3>Side Content</h3>
            {layout?.map(
              (block, index) =>
                block.IsSideBar && ( // Render only sidebar blocks here
                  <div key={index}>
                    <TextSerial nodes={[block]} />
                  </div>
                ),
            )}
          </aside>
        )}
      </section>
    </Fragment>
  )
}
export default BlogPage
