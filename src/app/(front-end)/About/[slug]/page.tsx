import React, { Fragment } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { RefreshRouteOnSave } from './RefreshRouteOnSave'
import { notFound } from 'next/navigation'
import TextSerial from '@/component/hooks/serialize'
import Image from 'next/image'

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
  if (data === null) {
    return notFound()
  }

  return (
    <div>
      <h1></h1>
    </div>
    // <Fragment>
    //   <RefreshRouteOnSave />
    //   <section id="about" className="about">
    //     <h2>{data?.title}</h2>
    //     {TextSerial(data?.description)}
    //     {data?.image && (
    //       <Image src={data?.image?.url} alt={data?.image?.alt} width={400} height={500} />
    //     )}
    //   </section>
    // </Fragment>
  )
}

export default AboutUs
