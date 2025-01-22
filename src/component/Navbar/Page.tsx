import React from 'react'
import { GetAllGaleri } from '@/api/galeriHook'
import { GetAllCategories } from '@/api/categoryHook'
import { GetAllBlog } from '@/api/blogHook'
const Navbar = async () => {
  const FetchGaleri = await GetAllGaleri()
  const FetchBlog = await GetAllBlog()
  const fetchCategory = await GetAllCategories()
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href={'/'}>
          Jas Mewah
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {fetchCategory.docs
              .filter(
                (category) =>
                  category?.description !== 'blog' && category?.description !== 'testimoni',
              ) // Filter kategori, kecualikan 'blog'
              .map((category, index) => {
                return (
                  <li className="nav-item dropdown" key={index}>
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {category.title}
                    </a>

                    <ul className="dropdown-menu">
                      {FetchBlog.docs
                        .filter((res) => res?.contentType?.description === category.description)
                        .map((res, index) => {
                          return (
                            <li key={index}>
                              <a
                                className="dropdown-item"
                                href={`/${res?.contentType?.title}/${res?.slug}`}
                              >
                                {res?.title}
                              </a>
                            </li>
                          )
                        })}
                    </ul>
                  </li>
                )
              })}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Produk Kami
              </a>
              <ul className="dropdown-menu">
                <li>
                  {FetchGaleri.docs.map((Galeri, index) => {
                    return (
                      <a className="dropdown-item" key={index} href={`/Galeri/${Galeri?.slug}`}>
                        {Galeri?.title}
                      </a>
                    )
                  })}
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Testimoni
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href={'/Testimoni'}>
                    Komentar
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href={'/Blog'}>
                Blog
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
export default Navbar
