"use client"

import { useState, useEffect, useRef } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useCart } from "../contexts/CartContext"
import { useWishlist } from "../contexts/WishlistContext"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { isAuthenticated, logout, currentUser } = useAuth()
  const { cartItems } = useCart()
  const { wishlistItems } = useWishlist()
  const location = useLocation()
  const navigate = useNavigate()
  const searchInputRef = useRef(null)
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [showSearch])

  useEffect(() => {
    const closeDropdown = () => {
      setShowProfileMenu(false);
    };
    
    document.addEventListener('click', closeDropdown);
    
    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, []);
  
  useEffect(() => {
    setIsMenuOpen(false);
    setShowProfileMenu(false);
  }, [location]);

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setShowSearch(false)
      setSearchQuery("")
    }
  }

  const handleProfileMenuToggle = (e) => {
    e.stopPropagation(); // Prevent document click from closing it immediately
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-indigo-950/90 backdrop-blur-md shadow-lg shadow-purple-900/20" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-400 rounded-full blur-sm opacity-30 group-hover:opacity-60 transition-opacity"></div>
                <img className="h-10 w-auto relative z-10" src="/images/logo.png" alt="Starforge Tees" />
              </div>
              <span className="ml-2 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 group-hover:from-yellow-200 group-hover:via-yellow-100 group-hover:to-yellow-200 transition-all duration-300">Starforge Tees</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`p-2 rounded-full text-white hover:bg-indigo-800/50 hover:text-yellow-300 transition-all duration-300 tooltip-container relative ${location.pathname === "/" && "text-yellow-300"}`}
              title="Home"
            >
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-purple-600/0 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="tooltip">Home</span>
            </Link>
            
            <Link
              to="/products"
              className={`p-2 rounded-full text-white hover:bg-indigo-800/50 hover:text-yellow-300 transition-all duration-300 tooltip-container relative ${location.pathname === "/products" && "text-yellow-300"}`}
              title="Shop"
            >
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-purple-600/0 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="tooltip">Shop</span>
            </Link>
            
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 rounded-full text-white hover:bg-indigo-800/50 hover:text-yellow-300 transition-all duration-300 tooltip-container relative"
              title="Search"
            >
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-purple-600/0 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="tooltip">Search</span>
            </button>
            
            <div className="relative tooltip-container">
              <Link 
                to="/wishlist" 
                className={`p-2 rounded-full text-white hover:bg-indigo-800/50 hover:text-yellow-300 transition-all duration-300 relative ${location.pathname === "/wishlist" && "text-yellow-300"}`}
                title="Wishlist"
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-purple-600/0 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="tooltip">Wishlist</span>
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center border border-purple-400 shadow-sm shadow-purple-600/50">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>
            </div>
            
            <div className="relative tooltip-container">
              <Link 
                to="/cart" 
                className={`p-2 rounded-full text-white hover:bg-indigo-800/50 hover:text-yellow-300 transition-all duration-300 relative ${location.pathname === "/cart" && "text-yellow-300"}`}
                title="Cart"
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-purple-600/0 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="tooltip">Cart</span>
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-500 text-indigo-950 text-xs rounded-full h-5 w-5 flex items-center justify-center border border-yellow-400 shadow-sm shadow-yellow-600/50">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </div>
            
            {isAuthenticated ? (
              <div className="relative tooltip-container">
                <button 
                  onClick={handleProfileMenuToggle}
                  className="p-2 rounded-full text-white hover:bg-indigo-800/50 hover:text-yellow-300 transition-all duration-300 flex items-center group"
                  title={currentUser?.name || "Profile"}
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden relative">
                    <div className="absolute inset-0 bg-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="w-full h-full rounded-full overflow-hidden bg-indigo-800 border-2 border-indigo-600 group-hover:border-yellow-400 transition-colors duration-300">
                      <img 
                        src={currentUser?.avatar || "/images/avatars/default.png"}
                        alt="Profile Avatar" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <span className="ml-2 hidden md:block text-sm font-medium group-hover:text-yellow-300 transition-colors duration-300">
                    {currentUser?.name || "User"}
                  </span>
                </button>
                
                {/* Profile Dropdown */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-gradient-to-b from-indigo-900 to-indigo-950 rounded-md shadow-lg py-1 z-10 border border-indigo-700 backdrop-blur-sm overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-indigo-500/5 to-purple-500/5"></div>
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-sm text-white hover:bg-indigo-800/70 flex items-center relative z-10"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      My Profile
                    </Link>
                    <Link 
                      to="/profile?tab=orders" 
                      className="block px-4 py-2 text-sm text-white hover:bg-indigo-800/70 flex items-center relative z-10"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      My Orders
                    </Link>
                    <div className="border-t border-indigo-700/50 my-1"></div>
                    <button 
                      onClick={() => {
                        logout();
                        setShowProfileMenu(false);
                      }} 
                      className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/20 hover:text-red-300 flex items-center relative z-10"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-indigo-950 font-bold rounded-md transform hover:scale-105 transition-all duration-300 shadow-md shadow-yellow-600/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Login
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setShowSearch(true)} className="p-2 text-white mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
            <div className="relative mr-2">
              <Link to="/cart">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </div>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-yellow-300 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-indigo-900/95 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${location.pathname === "/" ? "text-yellow-300 bg-indigo-800" : "text-white hover:text-yellow-300"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </Link>
            <Link
              to="/products"
              className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${location.pathname === "/products" ? "text-yellow-300 bg-indigo-800" : "text-white hover:text-yellow-300"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Shop
            </Link>
            <Link
              to="/cart"
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-white hover:text-yellow-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Cart ({cartItems.length})
            </Link>
            <Link
              to="/wishlist"
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-white hover:text-yellow-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Wishlist ({wishlistItems.length})
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-white hover:text-yellow-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout()
                    setIsMenuOpen(false)
                  }}
                  className="flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:text-yellow-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center px-3 py-2 rounded-md text-base font-medium bg-yellow-400 text-indigo-950 hover:bg-yellow-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Login / Signup
              </Link>
            )}
          </div>
        </div>
      )}
      
      {/* Search Overlay */}
      {showSearch && (
        <div className="fixed inset-0 bg-indigo-950/95 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="w-full max-w-2xl relative">
            <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full bg-indigo-800/80 text-white border border-indigo-600 focus:border-yellow-400 rounded-lg focus:ring-2 focus:ring-yellow-400/50 p-3 text-lg placeholder-indigo-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                ref={searchInputRef}
              />
              <button 
                type="submit" 
                className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-indigo-950 font-bold rounded-lg transform hover:scale-105 transition-all duration-300"
              >
                Search
              </button>
            </form>
            
            <button
              onClick={() => setShowSearch(false)}
              className="absolute -top-12 right-0 text-white hover:text-yellow-300 transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Added custom styles for animations */}
      <style jsx>{`
        .tooltip {
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          background-color: rgba(30, 27, 75, 0.95);
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
          opacity: 0;
          visibility: hidden;
          transition: all 0.2s ease;
          white-space: nowrap;
          border: 1px solid rgba(139, 92, 246, 0.3);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        
        .tooltip-container:hover .tooltip {
          opacity: 1;
          visibility: visible;
          top: -40px;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
      `}</style>
    </nav>
  )
}

export default Navbar
