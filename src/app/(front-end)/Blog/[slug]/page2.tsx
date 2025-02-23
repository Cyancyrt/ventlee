export default async function BlogDetail() {
  return (
    <>
      <div className="relative h-[80vh]">
        <img
          src="article-1-aset/article-1-main.jpg"
          alt="background"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute bottom-16 left-0 right-0">
          <h1 className="text-white text-4xl font-medium text-center max-w-4xl mx-auto px-4">
            CORNELIANI HAS AN OVER-60-YEAR HISTORY OF EXCELLENCE
          </h1>
        </div>
      </div>
      {/*ISI ARTIKEL*/}
      <div className="content mx-auto max-w-4xl px-4 py-16 text-left">
        <h1 className="text-3xl font-bold mb-4">Mantua, the place where it all began</h1>
        <p>
          Corneliani was founded in Mantua in the 1930s thanks to the visionary entrepreneurial
          spirit of Alfredo Corneliani, one of the Italian pioneers of men's fashion, who began to
          produce handcrafted raincoats and outerwear, quickly gaining widespread acclaim.
          Production was then interrupted due to the Second World War and it was his sons, Claudio
          and Carlalberto, who founded Corneliani Spa in 1958, giving it a scope and identity that
          would distinguish it over the years as an outstanding Italian company and international
          benchmark in the menswear sector.
        </p>
        <br />
        <p>
          The period from the 1970s to 2010 saw the brand establish itself in a larger production
          facility (1974), open its own office in the United States (1985) and receive important
          awards: the Leonardo Quality Award conferred by the President of the Republic (2005); the
          exhibition in Florence and the monograph for the 50th anniversary celebration (2008) and
          the participation at Pitti Uomo as a special guest (2010).
        </p>
        <br />
        <p>
          In 2016, Investcorp, a private equity firm with more than 30 years of successful
          investments in high-potential companies, acquired the majority of the capital with the aim
          of continuing and accelerating the brand's international development.
        </p>
      </div>
      <section className="max-w-7xl ml-14 mr-14 px-4 py-8 mb-14 mt-14">
        <div className="grid grid-cols-2 grid-rows-1 gap-14">
          <img src="article-1-aset/article-1.jpeg" alt="image-1" className="rounded" />
          <img src="article-1-aset/article-2.jpeg" alt="image-2" className="rounded" />
        </div>
      </section>
      <section className="relative mx-auto mb-14">
        <div className="relative">
          <img
            src="article-1-aset/article-3.jpeg"
            alt="Timeless Elegance"
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 lg:w-1/2">
            <div className="text-white p-8 lg:pl-16 h-full flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-4">Timeless Elegance</h2>
              <p className="leading-relaxed text-gray-200">
                At Corneliani, over time, we have developed and treasured a legacy that combines
                passion and fine craftsmanship. Thanks to our values and natural inclination for
                excellence, we remain true to ourselves, upholding the best of Italian elegance and
                thereby standing the test of time and fashion.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 gap-16">
          <div>
            <img
              src="article-1-aset/article-4.jpeg"
              alt="Suit Corneliani"
              className="w-full h-auto rounded"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl mb-6">DISCOVER CORNELIANI SUITS AND JACKETS</h2>
            <p className="mb-8">
              Minimal elegance, sophisticated materials and impeccable fits. Suits and jackets are
              sartorial classics with relaxed tailoring and construction. From single-breasted and
              double-breasted jackets to elegant suits for a sophisticated daily look, Made in Italy
              is robustly, yet fluidly expressed in all its collections.
            </p>
            <button className="bg-gray-900 text-white px-8 py-3 w-fit hover:bg-gray-500 transition-colors">
              TELUSURI LEBIH LANJUT
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
