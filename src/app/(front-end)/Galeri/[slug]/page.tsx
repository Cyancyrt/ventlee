import GaleriPageInner from './innerPage'
import { notFound } from 'next/navigation'
import { GetOneGaleri } from '@/api/galeriHook'

const GaleriPage = async ({ params }) => {
  const pageRes = await GetOneGaleri({ params })
  let image: string[] = []

  const images = pageRes?.docs
  images?.map((res) => {
    image = res.uploads
  })

  if (!image || image.length === 0) {
    return notFound()
  }

  return <GaleriPageInner images={image} />
}

export default GaleriPage
