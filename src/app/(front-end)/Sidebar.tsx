'use client'

import { useState } from "react";

export default function SidebarMenu({ routes }) {
  const { galleries, categories, blogs } = routes;
  const [isOpen, setIsOpen] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const [showProduk, setShowProduk] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Filter events dari data blogs
  const events = blogs.filter(item => item.contentType.slug === 'event');

  // Filter kategori untuk mengeluarkan item dengan slug "event"
  const filteredCategories = categories.filter(item => item.slug !== 'event');

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={toggleSidebar}
        className="text-gray-700 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar Overlay */}
      <div
        className={`fixed  inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar */}
      <div
        className={`absolute top-0 bg-red-500 left-0  z-40 w-2/3 sm:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Close Button */}
        <button
          onClick={toggleSidebar}
          className="flex items-center space-x-2 p-4 text-gray-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <span>Tutup</span>
        </button>

        {/* Menu Items */}
        <div className="flex flex-col space-y-4 p-4">
          <ul>
            {/* Dropdown Events */}
            <li>
              <button
                onClick={() => setShowEvents(!showEvents)}
                className="flex justify-between items-center w-full py-2 text-left"
              >
                <span>Events</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transform transition-transform duration-200 ${showEvents ? "rotate-90" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              {showEvents && (
                <ul className="pl-4">
                  {events.map(event => (
                    <li key={event.id} className="py-1">
                      <a href={`/${event.slug}`} className="text-gray-600 hover:text-gray-800">
                        {event.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Flat Categories (tanpa dropdown dan exclude event) */}
             {filteredCategories.map(item => (
              <li key={item.id} className="py-1">
                <a href={`/${item.slug}`} className="hover:text-gray-800">
                  {item.title}
                </a>
              </li>
            ))}

            {/* Dropdown Produk Kami */}
            <li>
              <button
                onClick={() => setShowProduk(!showProduk)}
                className="flex justify-between items-center w-full py-2 text-left"
              >
                <span>Produk Kami</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transform transition-transform duration-200 ${showProduk ? "rotate-90" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              {showProduk && (
                <ul className="pl-4">
                  {galleries.map(item => (
                    <li key={item.id} className="py-1">
                      <a href={`/Galeri/${item.slug}`} className="text-gray-600 hover:text-gray-800">
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}


{/*{categories?.docs?.filter(
                                (category) =>
                                    category?.description !== 'blog' && category?.description !== 'testimoni',
                            ) // Filter kategori, kecualikan 'blog' dan 'testimoni'
                                .map((category, index) => {
                                    // Filter artikel yang sesuai dengan kategori
                                    const filteredBlogs = blogs?.docs?.filter(
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
                                            <ul>
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
                                })}*/}
