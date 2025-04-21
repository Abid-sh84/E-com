import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-indigo-950 to-indigo-950/90 border-t border-indigo-900/50 backdrop-blur-sm pt-16 pb-8 relative z-10">
      {/* Star background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-20" 
             style={{
               backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px), radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
               backgroundSize: "30px 30px, 15px 15px",
             }}>
        </div>
      </div>
      
      {/* Cosmic rays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/5 w-px h-full bg-blue-400 opacity-10" style={{boxShadow: '0 0 20px 5px rgba(96, 165, 250, 0.3)'}}></div>
        <div className="absolute top-0 left-2/4 w-px h-full bg-purple-400 opacity-10" style={{boxShadow: '0 0 20px 5px rgba(192, 132, 252, 0.3)'}}></div>
        <div className="absolute top-0 left-4/5 w-px h-full bg-yellow-400 opacity-10" style={{boxShadow: '0 0 20px 5px rgba(250, 204, 21, 0.3)'}}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="mb-10 md:mb-0">
            <Link to="/" className="flex items-center mb-5 group">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-400 rounded-full blur-sm opacity-30 group-hover:opacity-60 transition-opacity"></div>
                <img className="h-7 w-auto relative z-10" src="https://wallpaper.dog/large/10844735.png" alt="Starry Comics" />
              </div>
              <span className="ml-3 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-purple-400 to-blue-400">Starforge Tees</span>
            </Link>
            <p className="text-indigo-300 mb-5 max-w-xs">
              Your destination for premium superhero merchandise from all universes. Officially licensed products with worldwide shipping.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-indigo-800/50 hover:bg-indigo-700/50 flex items-center justify-center border border-indigo-700/50 hover:border-indigo-600/50 hover:text-yellow-300 transition-all duration-300">
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-indigo-800/50 hover:bg-indigo-700/50 flex items-center justify-center border border-indigo-700/50 hover:border-indigo-600/50 hover:text-yellow-300 transition-all duration-300">
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-indigo-800/50 hover:bg-indigo-700/50 flex items-center justify-center border border-indigo-700/50 hover:border-indigo-600/50 hover:text-yellow-300 transition-all duration-300">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-yellow-300 font-bold text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-indigo-300 hover:text-yellow-300 transition-colors duration-300 flex items-center group">
                  <span className="absolute h-[1px] w-0 bg-yellow-300 left-0 bottom-0 transition-all duration-300 group-hover:w-full opacity-70"></span>
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=marvel" className="text-indigo-300 hover:text-yellow-300 transition-colors duration-300 flex items-center group">
                  <span className="absolute h-[1px] w-0 bg-yellow-300 left-0 bottom-0 transition-all duration-300 group-hover:w-full opacity-70"></span>
                  Marvel Universe
                </Link>
              </li>
              <li>
                <Link to="/products?category=dc" className="text-indigo-300 hover:text-yellow-300 transition-colors duration-300 flex items-center group">
                  <span className="absolute h-[1px] w-0 bg-yellow-300 left-0 bottom-0 transition-all duration-300 group-hover:w-full opacity-70"></span>
                  DC Comics
                </Link>
              </li>
              <li>
                <Link to="/products?category=anime" className="text-indigo-300 hover:text-yellow-300 transition-colors duration-300 flex items-center group">
                  <span className="absolute h-[1px] w-0 bg-yellow-300 left-0 bottom-0 transition-all duration-300 group-hover:w-full opacity-70"></span>
                  Anime Superheroes
                </Link>
              </li>
              <li>
                <Link to="/products?category=classic" className="text-indigo-300 hover:text-yellow-300 transition-colors duration-300 flex items-center group">
                  <span className="absolute h-[1px] w-0 bg-yellow-300 left-0 bottom-0 transition-all duration-300 group-hover:w-full opacity-70"></span>
                  Classic Comics
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-yellow-300 font-bold text-lg mb-4">Account</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-indigo-300 hover:text-yellow-300 transition-colors duration-300 flex items-center group">
                  <span className="absolute h-[1px] w-0 bg-yellow-300 left-0 bottom-0 transition-all duration-300 group-hover:w-full opacity-70"></span>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-indigo-300 hover:text-yellow-300 transition-colors duration-300 flex items-center group">
                  <span className="absolute h-[1px] w-0 bg-yellow-300 left-0 bottom-0 transition-all duration-300 group-hover:w-full opacity-70"></span>
                  Register
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-indigo-300 hover:text-yellow-300 transition-colors duration-300 flex items-center group">
                  <span className="absolute h-[1px] w-0 bg-yellow-300 left-0 bottom-0 transition-all duration-300 group-hover:w-full opacity-70"></span>
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-indigo-300 hover:text-yellow-300 transition-colors duration-300 flex items-center group">
                  <span className="absolute h-[1px] w-0 bg-yellow-300 left-0 bottom-0 transition-all duration-300 group-hover:w-full opacity-70"></span>
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-indigo-300 hover:text-yellow-300 transition-colors duration-300 flex items-center group">
                  <span className="absolute h-[1px] w-0 bg-yellow-300 left-0 bottom-0 transition-all duration-300 group-hover:w-full opacity-70"></span>
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-yellow-300 font-bold text-lg mb-4">Information</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-indigo-300 hover:text-yellow-300 transition-colors duration-300 flex items-center group">
                  <span className="absolute h-[1px] w-0 bg-yellow-300 left-0 bottom-0 transition-all duration-300 group-hover:w-full opacity-70"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-indigo-300 hover:text-yellow-300 transition-colors duration-300 flex items-center group">
                  <span className="absolute h-[1px] w-0 bg-yellow-300 left-0 bottom-0 transition-all duration-300 group-hover:w-full opacity-70"></span>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-indigo-300 hover:text-yellow-300 transition-colors duration-300 flex items-center group">
                  <span className="absolute h-[1px] w-0 bg-yellow-300 left-0 bottom-0 transition-all duration-300 group-hover:w-full opacity-70"></span>
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-indigo-300 hover:text-yellow-300 transition-colors duration-300 flex items-center group">
                  <span className="absolute h-[1px] w-0 bg-yellow-300 left-0 bottom-0 transition-all duration-300 group-hover:w-full opacity-70"></span>
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-indigo-300 hover:text-yellow-300 transition-colors duration-300 flex items-center group">
                  <span className="absolute h-[1px] w-0 bg-yellow-300 left-0 bottom-0 transition-all duration-300 group-hover:w-full opacity-70"></span>
                  Returns & Exchanges
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-indigo-800 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <p className="text-indigo-300 text-sm">&copy; {new Date().getFullYear()} Starry Comics. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <Link to="/privacy" className="text-indigo-400 hover:text-yellow-300 text-sm transition-colors duration-300">Privacy Policy</Link>
              <Link to="/terms" className="text-indigo-400 hover:text-yellow-300 text-sm transition-colors duration-300">Terms of Service</Link>
              <Link to="/cookies" className="text-indigo-400 hover:text-yellow-300 text-sm transition-colors duration-300">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
