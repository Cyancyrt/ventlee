import React, { Fragment } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { RefreshRouteOnSave } from './RefreshRouteOnSave'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { HtmlRenderer, TextSerial } from '@/component/hooks/serialize'

const AboutUs = async ({ params }) => {
  const payload = await getPayload({ config })
  const { slug } = await params

  const pageRes = await payload.find({
    collection: 'about',
    draft: true,
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const data = pageRes?.docs?.[0]
  const layout = data?.layout
  const image = data?.image
  if (data === null) {
    return notFound()
  }

  return (
    <Fragment>
      <RefreshRouteOnSave />
      <section id="about" className="about">
        <h2>{data?.title}</h2>
        <HtmlRenderer htmlString={data?.description_html} />
        {image && <Image src={image?.url} alt={image?.alt} width={400} height={500} />}
        {layout &&
          layout?.map((block, index) => (
            <div key={index}>
              <TextSerial nodes={[block]} />
            </div>
          ))}
      </section>
    </Fragment>
  )
}

export default AboutUs
