import { notFound } from 'next/navigation'
import { GetOneGaleri } from '@/api/galeriHook'
import { FeaturedImageGallery } from '../../Gallery'
import Image from 'next/image'



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

  // return <GaleriPageInner images={image} />
  return <Gallery images={image} />
}

const Gallery = ({ images }) => {
  return (<>

  <FeaturedImageGallery/>
    {/*Bagian Background*/}
    <div className="relative h-[80vh]">
      <Image
        src="/card-aset/suits.jpg"
        alt="background"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h1 className="text-white text-3xl font-bold mb-4">SUITS</h1>
        <p className="text-white text-center max-w-5xl px-4 line-clamp-2">
          Corneliani men &apos; s suits are sartorial classics with refined styles and
          relaxed constructions. The Made in Italy style and quality is firmly yet
          fluidly expressed in the suits, refined even further by the quality of
          the fabrics used. Perfect for pairing with classic shirts and fine
          quality accessories.
        </p>
      </div>
    </div>
    {/*Bagian Card/grid*/}
    <section className="card-page mb-14 mt-14 mx-auto max-w-7xl px-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {images.map((image, index) => (
          <>
            {/* Product 1 */}
            <div className="group relative" key={index}>
              <div className="relative w-full aspect-[3/4] overflow-hidden">
                {/* Main Image */}
                <a href="#" className="block w-full h-full">
                  <Image
                    src={image?.uploadBlock.image.url}
                    alt="product-1"
                    className="absolute inset-0 w-full h-full object-cover group-hover:opacity-0 transition-opacity duration-300"
                  />
                  {/* Hover Image */}
                  <Image
                    src="/card-aset/hover-1.jpg"
                    alt="product-1-hover"
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </a>
                {/* Wishlist Icon */}
                <button className="absolute top-4 right-4 p-2 bg-white/80 rounded-full">
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </button>
              </div>
              {/* Product Info */}
              <div className="mt-4">
                <h3 className="text-lg font-medium">
                  <a href="#" className="hover:underline">
                    Blue s13o wool twill suit with micropattern
                  </a>
                </h3>
                <div className="mt-2 flex justify-between items-center">
                  <div>
                    <span className="text-lg font-semibold">€1,190</span>
                    <span className="ml-2 text-gray-500 line-through">€1,700</span>
                  </div>
                  <span className="text-sm">1 color</span>
                </div>
              </div>
            </div>
          </>
        ))}

      </div>
    </section>
  </>
  )
}


export default GaleriPage
