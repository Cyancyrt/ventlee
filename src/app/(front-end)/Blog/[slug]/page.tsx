import React, { Fragment } from 'react'
import { RefreshRouteOnSave } from './RefreshRouteOnSave'
import Image from 'next/image'
import { GetOneBlog } from '@/api/blogHook'

import { HtmlRenderer } from '@/component/hooks/serialize'

async function BlogPage({ params }) {
  const response = await GetOneBlog({ params })
  const blogData = response?.docs?.[0]
  if (!blogData) return null
  return (
    <Fragment>
      <RefreshRouteOnSave />
      <section id="about" className="about" key={blogData.id}>
        <h2>{blogData?.title}</h2>
        <HtmlRenderer htmlString={blogData?.description_html} />

        {blogData?.image && (
          <Image src={blogData?.image?.url} alt={blogData?.image?.alt} width={400} height={500} />
        )}
      </section>
    </Fragment>
  )
}
export default BlogPage
