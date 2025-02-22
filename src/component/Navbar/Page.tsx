import React from 'react'
import { GetAllGaleri } from '@/api/galeriHook'
import { GetAllCategories } from '@/api/categoryHook'
import { GetAllBlog } from '@/api/blogHook'
export const TestNavbar = async () => {
  const FetchGaleri = await GetAllGaleri()
  const FetchBlog = await GetAllBlog()
  const fetchCategory = await GetAllCategories()
  return (
    <nav className="">
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
              ) // Filter kategori, kecualikan 'blog' dan 'testimoni'
              .map((category, index) => {
                // Filter artikel yang sesuai dengan kategori
                const filteredBlogs = FetchBlog.docs.filter(
                  (res) => res?.contentType?.description === category.description,
                )

                return filteredBlogs.length > 0 ? (
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
                      {filteredBlogs.map((res, blogIndex) => (
                        <li key={blogIndex}>
                          <a
                            className="dropdown-item"
                            href={`/${res?.contentType?.title}/${res?.slug}`}
                          >
                            {res?.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li className="nav-item" key={index}>
                    <a className="nav-link" href="#">
                      {category.title}
                    </a>
                  </li>
                )
              })}

            <li className={`nav-item ${FetchGaleri.docs.length > 0 ? 'dropdown' : ''}`}>
              <a
                className={`nav-link ${FetchGaleri.docs.length > 0 ? 'dropdown-toggle' : ''} `}
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
