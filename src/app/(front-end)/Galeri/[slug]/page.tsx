import React, { Fragment } from 'react'
import { RefreshRouteOnSave } from '../../About/[slug]/RefreshRouteOnSave'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { GetOneGaleri } from '@/api/galeriHook'

const GaleriPage = async ({ params }) => {
  const pageRes = await GetOneGaleri({ params })
  let image: string[] = []
  const images = pageRes?.docs?.[0].layout
  images?.map((res) => {
    image = res.uploads
  })

  if (images === null) {
    return notFound()
  }
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Image Grid</h2>
      <div className="row">
        <Fragment>
          <RefreshRouteOnSave />
          <section id="Galeri" className="Galeri">
            <div
              className="d-flex flex-wrap overflow-auto"
              style={{
                whiteSpace: 'nowrap',
                overflowX: 'auto',
              }}
            >
              {image.map((image, index) => (
                <div className="col-2 mb-3 d-flex justify-content-center" key={index}>
                  <Image
                    src={image?.uploadBlock?.image.url}
                    alt={image?.uploadBlock?.image?.alt}
                    width={500}
                    height={500}
                    objectFit="cover"
                    className="img-thumbnail"
                  />
                </div>
              ))}
            </div>
          </section>
        </Fragment>
      </div>
    </div>
  )
}

export default GaleriPage
