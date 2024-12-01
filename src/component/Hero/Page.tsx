import React from 'react'

const HeroSection = () => {
  return (
    <div
      className="hero-section text-white text-center bg-dark d-flex align-items-center"
      style={{ height: '100vh' }}
    >
      <div className="container">
        <h1 className="display-4">Jas Mewah untuk Anda</h1>
        <p className="lead">
          Kami menyediakan koleksi jas premium untuk berbagai acara formal Anda.
        </p>
        <a href="#products" className="btn btn-primary btn-lg mt-4">
          Jelajahi Koleksi
        </a>
      </div>
    </div>
  )
}

export default HeroSection
