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
    <div className="container-fluid mt-2">
      <HeroSection />
      <section id="products" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">Produk Unggulan</h2>
          <div className="row">
            {products.map((product) => (
              <div key={product.id} className="col-md-4 mb-4">
                <div className="card">
                  <img src={product.img} className="card-img-top" alt={product.name} />
                  <div className="card-body text-center">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.price}</p>
                    <a href="#" className="btn btn-primary">
                      Detail
                    </a>
                  </div>
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
