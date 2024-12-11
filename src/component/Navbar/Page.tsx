import React from 'react'
import { GetAllAbout } from '@/api/aboutHook'
import { GetAllGaleri } from '@/api/galeriHook'

const Navbar = async () => {
  const FetchAbout = await GetAllAbout()
<<<<<<< HEAD

=======
>>>>>>> daf8797404ba121d23117f869d8d4f414cf92e72
  const FetchGaleri = await GetAllGaleri()

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
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                About Us
              </a>
              <ul className="dropdown-menu">
<<<<<<< HEAD
                {FetchAbout.docs.map((About, index) => {
                  return (
                    <li key={index}>
                      <a className="dropdown-item" href={`/About/${About?.slug}`}>
                        {About?.title}
                      </a>
                    </li>
                  )
                })}
=======
                <li>
                  <a className="dropdown-item" href={`/About/${FetchAbout?.slug}`}>
                    {FetchAbout?.title}
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
>>>>>>> daf8797404ba121d23117f869d8d4f414cf92e72
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
                Produk Kami
              </a>
              <ul className="dropdown-menu">
<<<<<<< HEAD
                {FetchGaleri.docs.map((Galeri, index) => {
                  return (
                    <li key={index}>
                      <a className="dropdown-item" href={`/Galeri/${Galeri?.slug}`}>
                        {Galeri?.title}
                      </a>
                    </li>
                  )
                })}
=======
                <li>
                  <a className="dropdown-item" href={`/Galeri/${FetchGaleri?.slug}`}>
                    {FetchGaleri?.title}
                  </a>
                </li>
>>>>>>> daf8797404ba121d23117f869d8d4f414cf92e72
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
<<<<<<< HEAD
              <a className="nav-link" href="/Blog">
                Blog
=======
              <a className="nav-link" href="#contact">
                Kontak
>>>>>>> daf8797404ba121d23117f869d8d4f414cf92e72
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
