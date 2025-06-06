import React, { Fragment } from 'react'
import { RefreshRouteOnSave } from './RefreshRouteOnSave'
import Image from 'next/image'
import { GetOneTestimoni } from '@/api/blogHook'

import { HTMLCONVERT, BlockSerializer } from '@/component/hooks/serialize'

async function BlogPage({ params }) {
  const response = await GetOneTestimoni({ params })
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
          <HTMLCONVERT nodes={response?.description?.root?.children} />
          {response?.image && (
            <Image src={response?.image?.url} alt={response?.image?.alt} width={400} height={500} />
          )}
          {layout &&
            layout?.map(
              (block, index) =>
                !block?.IsSideBar && ( // Render only non-sidebar blocks in main content
                  <div key={index}>
                    <BlockSerializer nodes={[block]} />
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
                     <BlockSerializer nodes={[block]} />
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
