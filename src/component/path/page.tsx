'use client'
import React from 'react'
import { usePathname } from 'next/navigation'

function PathPage() {
  const pathname = usePathname()
  const pathArray = pathname === '/' ? ['Home'] : pathname.split('/').filter((path) => path)
  return (
    <div>
      <p>Current Path: {pathArray.join(' > ')}</p> {/* Menampilkan path */}
    </div>
  )
}

export default PathPage
