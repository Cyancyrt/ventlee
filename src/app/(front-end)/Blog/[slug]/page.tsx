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
        {blogData.externalLinks?.map((link, index) => <ExternalLinks key={index} link={link} />)}
      </section>
    </Fragment>
  )
}
function ExternalLinks({ index, link }: { index: number; link: any }) {
  return (
    <div className="external-links">
      <h3>External Links</h3>
      <ul>
        <li key={index}>
          <a href={link?.url} target="_blank" rel="noopener noreferrer">
            {link?.url}
          </a>
        </li>
      </ul>
    </div>
  )
}

export default BlogPage
