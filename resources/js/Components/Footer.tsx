import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react"
import { Link } from "@inertiajs/react"

export default function Footer() {
  return (
    <footer className="w-full border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div>
            <h3 className="text-lg font-semibold">OUR COMPANY</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">About Us</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Career</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Media</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Blog</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Our Stores</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Customer Stories</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Investor Relations</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">USEFUL LINKS</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Custom Furniture</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Exporters</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Buy in Bulk</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Hotel Furniture</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Delivery Location</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Sitemap</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">SHOP BY ROOM</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Living Room</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Bedroom</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Dining Room</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Kids Room</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Modular Furniture</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Modular Kitchen</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Modular Wardrobe</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">PARTNERS</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Become a Franchise</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Sell on WoodenStreet</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Design Partner</Link></li>
            </ul>
            <div className="mt-8">
              <h3 className="text-lg font-semibold">TRUSTED BY</h3>
              <div className="mt-4 flex gap-4">
                <img
                  src="/placeholder.svg"
                  alt="QRO Certified"
                  width={60}
                  height={60}
                  className="h-12 w-auto"
                />
                <img
                  src="/placeholder.svg"
                  alt="UKcert Certified"
                  width={60}
                  height={60}
                  className="h-12 w-auto"
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">NEED HELP</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Help Center</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Contact Us</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Ask Experts</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Track your order</Link></li>
            </ul>
            <div className="mt-6 flex space-x-4">
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <Youtube className="h-6 w-6" />
                <span className="sr-only">YouTube</span>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8">
          <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col items-start gap-4">
              <div className="flex gap-4">
                <img
                  src="https://fernindia.com/wp-content/uploads/2024/10/logo-e1729487436319-400x114.png"
                  alt="Google Play"
                  width={140}
                  height={42}
                  className="h-10 w-auto"
                />
                
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Delivery Across India : </p>
              <p className="mt-1 text-sm text-gray-600">
                Ahmedabad, Bangalore, Bhopal, Chandigarh, Chennai, Coimbatore, Faridabad, Ghaziabad, Goa, Gurgaon, Hyderabad,
                Indore, Jaipur and More Cities
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </footer>
  )
}