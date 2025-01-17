'use client'
import React, { Fragment, useState } from 'react'
import { RefreshRouteOnSave } from '../../About/[slug]/RefreshRouteOnSave'
import Image from 'next/image'

const GaleriPageInner = ({ images }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const imagesPerPage = 3

  // Menghitung total gambar yang ditampilkan berdasarkan halaman aktif
  const indexOfLastImage = currentPage * imagesPerPage
  const indexOfFirstImage = indexOfLastImage - imagesPerPage
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage)

  // Menghitung jumlah halaman
  const totalPages = Math.ceil(images.length / imagesPerPage)

  // Fungsi untuk pindah ke halaman berikutnya
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  // Fungsi untuk pindah ke halaman sebelumnya
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Galeri</h2>
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
              {currentImages.map((image, index) => (
                <div className="col-2 mb-3 d-flex justify-content-center" key={index}>
                  <Image
                    src={image?.uploadBlock?.image?.url}
                    alt={image?.uploadBlock?.image?.alt}
                    width={500}
                    height={500}
                    objectFit="cover"
                    className="img-thumbnail"
                  />
                </div>
              ))}
            </div>

            {/* Paginasi */}
            <div className="d-flex justify-content-between mt-4">
              {currentPage > 1 && (
                <button className="btn btn-primary" onClick={prevPage}>
                  Previous
                </button>
              )}
              <span>
                Page {currentPage} of {totalPages}
              </span>
              {currentPage < totalPages && (
                <button className="btn btn-primary" onClick={nextPage}>
                  Next
                </button>
              )}
            </div>
          </section>
        </Fragment>
      </div>
    </div>
  )
}

export default GaleriPageInner
