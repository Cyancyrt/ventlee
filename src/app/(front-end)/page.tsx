import HeroSection from '@/component/Hero/Page'
import React from 'react'

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: 'Jas Formal Hitam',
      price: 'Rp2.500.000',
      img: 'https://via.placeholder.com/300',
    },
    { id: 2, name: 'Jas Pernikahan', price: 'Rp3.000.000', img: 'https://via.placeholder.com/300' },
    { id: 3, name: 'Jas Slim Fit', price: 'Rp2.800.000', img: 'https://via.placeholder.com/300' },
  ]

  return (
    <div>
      <section id="products">
        <div>
          <h2>Produk Unggulan</h2>
          <div>
            {products.map((product) => (
              <div key={product.id}>
                <img src={product.img} alt={product.name} />
                <div>
                  <h5>{product.name}</h5>
                  <p>{product.price}</p>
                  <a href="#">Detail</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default FeaturedProducts
