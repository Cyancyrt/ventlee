import './global.css'
import PathPage from '@/component/path/page'
import Footer from './Footer'
import Navbar from './Navbar'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="w-full h-full">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
