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

  const events = blogs.filter(item => item.contentType.slug === 'event');
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
        className={`fixed top-0 inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 w-2/3 sm:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Close Button */}
        <button
          onClick={toggleSidebar}
          className="flex items-center p-4 text-gray-700 focus:outline-none"
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
          <span className="ml-2 text-lg font-semibold">Tutup</span>
        </button>

        {/* Menu Items */}
        <div className="flex flex-col px-4">
          <ul className="space-y-2">
            {/* Dropdown Events */}
            <li className="text-lg px-4 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-200">
              <button
                onClick={() => setShowEvents(!showEvents)}
                className="flex justify-between items-center w-full text-gray-800 font-semibold"
              >
                <span>🎉 Events</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 transform transition-transform duration-200 ${showEvents ? "rotate-90" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              {showEvents && (
                <ul className="mt-2 space-y-1 pl-6">
                  {events.map(event => (
                    <li key={event.id} className="py-2 pl-3 rounded-lg bg-gray-50 hover:bg-gray-200 transition">
                      <a href={`/${event.slug}`} className="text-gray-700 hover:text-gray-900">
                        {event.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Flat Categories (without dropdown) */}
            {filteredCategories.map(item => (
              <li key={item.id} className="py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-200 transition">
                <a href={`/${item.slug}`} className="text-gray-800 font-semibold hover:text-gray-900">
                  {item.title}
                </a>
              </li>
            ))}

            {/* Dropdown Produk Kami */}
            <li className="text-lg px-4 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-200">
              <button
                onClick={() => setShowProduk(!showProduk)}
                className="flex justify-between items-center w-full text-gray-800 font-semibold"
              >
                <span>🛍 Produk Kami</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 transform transition-transform duration-200 ${showProduk ? "rotate-90" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              {showProduk && (
                <ul className="mt-2 space-y-1 pl-6">
                  {galleries.map(item => (
                    <li key={item.id} className="py-2 pl-3 rounded-lg bg-gray-50 hover:bg-gray-200 transition">
                      <a href={`/Galeri/${item.slug}`} className="text-gray-700 hover:text-gray-900">
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
