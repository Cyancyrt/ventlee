'use client'
import React, { useState } from 'react'

const Navbar = async () => {
  return (
    <>
      <nav className="border-b border-gray-200 px-4 py-3">
        {/* Mobile Navbar */}
        <div className="flex items-center justify-between lg:hidden">
          <button className="text-gray-700 focus:outline-none">
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
          <span className="text-lg font-bold">LOUIS VUITTON</span>
          <button className="text-gray-700 focus:outline-none">
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
                d="M5.121 5.121a1.5 1.5 0 000 2.121l1.415 1.415M12 14l7 7M7.05 7.05a7 7 0 019.9 9.9m-12.72-3.3L5.293 13.293"
              />
            </svg>
          </button>
        </div>

        {/* Desktop Navbar */}
        <div className="hidden lg:flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <SidebarMenu />

            <button className="text-gray-700 focus:outline-none">Cari</button>
          </div>
          <span className="text-lg font-bold">LOUIS VUITTON</span>
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 focus:outline-none">Hubungi Kami</button>
            <button className="text-gray-700 focus:outline-none">
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
                  d="M3.172 3.172a4 4 0 015.656 0l1.414 1.414m4.95 4.95l1.415 1.415a4 4 0 010 5.656l-1.415 1.414m-4.95-4.95L8.828 8.828a4 4 0 010-5.656l1.415-1.414"
                />
              </svg>
            </button>
            <button className="text-gray-700 focus:outline-none">
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
                  d="M5 12a7 7 0 1114 0A7 7 0 015 12z"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}
function SidebarMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Trigger Button */}
      <button onClick={toggleSidebar} className="text-gray-700 focus:outline-none">
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
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-2/3 sm:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
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
          <a href="#" className="text-lg font-semibold text-gray-800">
            Gifts
          </a>
          <a href="#" className="text-lg font-semibold text-gray-800">
            Terbaru
          </a>
          <a href="#" className="text-lg font-semibold text-gray-800">
            Tas dan Produk Kulit Berukuran Kecil
          </a>
          <a href="#" className="text-lg font-semibold text-gray-800">
            Wanita
          </a>
          <a href="#" className="text-lg font-semibold text-gray-800">
            Pria
          </a>
          <a href="#" className="text-lg font-semibold text-gray-800">
            Perhiasan
          </a>
          <a href="#" className="text-lg font-semibold text-gray-800">
            Jam Tangan
          </a>
          <a href="#" className="text-lg font-semibold text-gray-800">
            Parfum
          </a>
          <a href="#" className="text-lg font-semibold text-gray-800">
            Trunks, Travel and Home
          </a>
          <a href="#" className="text-lg font-semibold text-gray-800">
            Layanan
          </a>
        </div>
      </div>
    </>
  )
}

export default Navbar
