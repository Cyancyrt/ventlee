// import HeroSection from '@/component/Hero/Page'
// import React from 'react'

// const FeaturedProducts = () => {
//   const products = [
//     {
//       id: 1,
//       name: 'Jas Formal Hitam',
//       price: 'Rp2.500.000',
//       img: 'https://via.placeholder.com/300',
//     },
//     { id: 2, name: 'Jas Pernikahan', price: 'Rp3.000.000', img: 'https://via.placeholder.com/300' },
//     { id: 3, name: 'Jas Slim Fit', price: 'Rp2.800.000', img: 'https://via.placeholder.com/300' },
//   ]

//   return (
//     <div>
//       <section id="products">
//         <div>
//           <h2>Produk Unggulan</h2>
//           <div>
//             {products.map((product) => (
//               <div key={product.id}>
//                 <img src={product.img} alt={product.name} />
//                 <div>
//                   <h5>{product.name}</h5>
//                   <p>{product.price}</p>
//                   <a href="#">Detail</a>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }

// export default FeaturedProducts

import Image from "next/image";
import { Cormorant_Garamond } from "next/font/google";
import clsx from "clsx";
import { TestNavbar } from "@/component/Navbar/Page";

// If loading a variable font, you don't need to specify the font weight
const cormorant_garamond = Cormorant_Garamond({
  weight: "600",
  subsets: ["latin"],
});

export default function Home() {
  return (

    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
    	<SlideShow/>
      </main>
    </div>
  );
}

const SlideShow = () => {
  return (
    <>
<div className="flex w-full h-screen relative">
  {/* Image with gradient overlay */}
  <div className="relative w-full h-full">
    
    <Image src="/image1.png" layout="fill" objectFit="cover" alt="a" className="-z-10" />
      {/* Text section */}
  
  
  </div>


</div>

      

      {/* EXLUSIVE SUIT  */}
      <div className="flex w-full h-screen  flex-wrap">
        <div className="w-1/2 h-full relative -z-0">
          <Image src={"/image2.png"} layout="fill" objectFit="cover" alt="a" />
        </div>
        <div className="w-1/2">
          <div className="flex flex-col justify-center mx-auto w-1/2 text-center h-full">
            <h1
              className={clsx(
                "text-6xl font-bold text-black",
                cormorant_garamond.className
              )}
            >
              EXLUSIVE SUIT
            </h1>
            <p className="text-black text-lg">
              Experience luxury and precision with our Exclusive Suit
              collection. Tailored to perfection with premium fabrics and master
              craftsmanship, each suit is designed to highlight your
              individuality. Whether for formal events or daily sophistication,
              our suits offer unmatched style and confidence.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-row-reverse w-full h-screen ">
        <div className="w-1/2 h-full relative -z-0">
          <Image src={"/image3.jpeg"} layout="fill" objectFit="cover" alt="a" />
        </div>
        <div className="w-1/2 h-full">
          <div className="flex flex-col justify-center mx-auto text-center h-full w-1/2">
            <h1
              className={clsx(
                "text-6xl font-bold text-black",
                cormorant_garamond.className
              )}
            >
              CHANGSAN
            </h1>
            <p className="text-black text-lg">
              Discover elegance in tradition. Our Changsan collection blends
              modern touches with classic attire, creating a timeless style for
              any occasion.
            </p>
          </div>
        </div>
      </div>

      {/* New Collection  */}
      <div className="flex-row w-full h-screen">
        <div className="w-1/2 text-center mx-auto p-10">
          <h1 className={cormorant_garamond.className}>
            <span className="text-5xl">LIFETIME ACHIEVEMENT</span>
          </h1>
          <p className="text-lg">
            Vincent Lee received the “Lifetime Achievement Award” at the 28th
            Congress of the Federation of Asian Master Tailors, Kuala Lumpur,
            Malaysia.
          </p>
        </div>
        <div className="flex w-full h-screen bg-black">
          <div className="w-1/2 relative">
            <Image
              src={"/achievement1.png"}
              layout="fill"
              objectFit="cover"
              alt="a"
            />
          </div>
          <div className="w-1/2  relative">
            <Image
              src={"/achievement2.png"}
              layout="fill"
              objectFit="cover"
              alt="a"
            />
          </div>
        </div>
      </div>

      <div
        style={{
          backgroundImage:
            "linear-gradient(to top, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.1)), url('/award.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="bg-gray-900 text-white p-52 h-[1000px] flex justify-between items-center"
      >
        <h2
          className={clsx(
            "text-[48px] font-bold mb-4",
            cormorant_garamond.className
          )}
        >
          Official Member of World Tailor Association
        </h2>
        <div className="flex w-10/12 justify-between ">
          <div className="flex flex-col items-center">
            <div className="w-44 h-44 bg-gray-700 rounded-full" />
            <p className="mt-2">INDONESIAN (PTI)</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-44 h-44 bg-gray-700 rounded-full" />
            <p className="mt-2">WORLD (WFMT)</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-44 h-44 bg-gray-700 rounded-full" />
            <p className="mt-2">ASIAN (FAMT)</p>
          </div>
        </div>
      </div>
    </>
  );
};
