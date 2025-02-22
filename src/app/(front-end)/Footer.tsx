export default function Footer() {
  return (
<>
  {/* Pembatas*/}
  <div className="max-w-7xl mx-auto">
    <div className="my-8">
      <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
    </div>
  </div>
  <footer className="p-8 bg-white">
    {/* Newsletter Section */}
    <div className="mb-12">
      <h3 className="text-xl mb-4">Inspire me with all the latest Dior news</h3>
      <div className="flex gap-4 max-w-md">
        <input
          type="email"
          placeholder="*E-mail"
          className="border p-2 flex-grow"
        />
        <button className="bg-gray-800 text-white px-6 py-2">Confirm</button>
      </div>
    </div>
    {/* Footer Links */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Dior Boutiques */}
      <div>
        <h4 className="font-semibold mb-4">Dior Boutiques</h4>
        <ul className="space-y-2">
          <li>Christian Dior Couture</li>
          <li>Parfums Christian Dior</li>
        </ul>
      </div>
      {/* Client Services */}
      <div>
        <h4 className="font-semibold mb-4">Client Services</h4>
        <ul className="space-y-2">
          <li>Contact</li>
          <li>FAQ</li>
        </ul>
      </div>
      {/* The House of Dior */}
      <div>
        <h4 className="font-semibold mb-4">The House Of Dior</h4>
        <ul className="space-y-2">
          <li>Dior Sustainability</li>
          <li>Ethics &amp; Compliance</li>
          <li>Careers</li>
        </ul>
      </div>
      {/* Legal Terms */}
      <div>
        <h4 className="font-semibold mb-4">Legal Terms</h4>
        <ul className="space-y-2">
          <li>Legal Terms</li>
          <li>Privacy Notice</li>
          <li>Sitemap</li>
        </ul>
      </div>
    </div>
    {/* Sosmed, Bahasa */}
    <div className="flex justify-between items-center mt-12 pt-8 border-t">
      <div className="flex gap-4">
        <span>Follow Us</span>
        <a href="#">Tiktok</a>
        <a href="#">Instagram</a>
        <a href="#">X</a>
        <a href="#">Facebook</a>
        <a href="#">Pinterest</a>
        <a href="#">LinkedIn</a>
      </div>
      <div>
        <select className="border p-2">
          <option>Indonesia (English)</option>
        </select>
      </div>
    </div>
  </footer>
</>

  )
}