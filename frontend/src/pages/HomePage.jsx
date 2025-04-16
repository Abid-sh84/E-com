"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import { featuredProducts, categories } from "../data/mockData"

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-indigo-950 text-white">
      {/* Hero Section */}
      <section className="relative h-screen md:h-[85vh] flex items-center overflow-hidden">
        {/* Starry Night Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-950 to-blue-900 overflow-hidden">
          {/* Stars effect using pseudo-elements will be added via a style tag */}
          <div className="absolute inset-0 opacity-30" 
              style={{
                background: 'radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 40px), radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 30px), radial-gradient(white, rgba(255,255,255,.1) 2px, transparent 40px)',
                backgroundSize: '550px 550px, 350px 350px, 250px 250px',
                backgroundPosition: '0 0, 40px 60px, 130px 270px',
                animation: 'starsMove 200s linear infinite'
              }}>
          </div>
          
          {/* Swirling effect overlay */}
          <div className="absolute inset-0 bg-indigo-900/30 mix-blend-overlay animate-pulse duration-1000"></div>
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Fixed the heading to remove the visible rectangle background issue */}
          <h1 className="text-5xl md:text-7xl font-bold text-yellow-300 mb-6 transform -rotate-1 inline-block"
              style={{ 
                textShadow: '0 0 10px rgba(255, 229, 179, 0.5), 0 0 20px rgba(255, 229, 179, 0.3)',
                fontFamily: 'Bangers, cursive'
              }}>
            Unleash Your Inner Hero
          </h1>
          <p className="text-xl md:text-2xl text-indigo-200 max-w-3xl mx-auto mb-8 opacity-90">
            Discover our exclusive collection of superhero t-shirts inspired by the cosmic beauty of Starry Night
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/products" 
              className="bg-yellow-400 text-indigo-950 font-bold text-lg uppercase px-8 py-4 rounded-md border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-1 hover:rotate-0 hover:scale-105 transition-all active:translate-x-1 active:translate-y-1 active:shadow-none">
              Shop Collection
            </Link>
            <Link
              to="/products?category=new"
              className="px-6 py-3 bg-indigo-700 text-white font-bold rounded-md transform transition-all hover:scale-105 hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-700/50 active:scale-95">
              New Arrivals
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-indigo-900/70 backdrop-blur-sm relative overflow-hidden">
        {/* Van Gogh swirl background effect */}
        <div className="absolute inset-0 opacity-10 bg-cover bg-center mix-blend-soft-light"
             style={{
               backgroundImage: "url('https://i.imgur.com/JvlO0zE.jpg')",
               filter: "blur(3px)"
             }}>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl font-bold text-yellow-300 text-center mb-12 transform rotate-1 inline-block"
              style={{ 
                textShadow: '2px 2px 0px black',
                fontFamily: 'Bangers, cursive'
              }}>
            Shop by Universe
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.slug}`}
                className="group relative h-64 overflow-hidden rounded-lg border-2 border-black transform hover:-rotate-1 transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.7)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,0.7)]"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-indigo-950/70 to-transparent z-10"></div>
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <h3 className="text-xl font-bold text-white" style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.8)' }}>
                    {category.name}
                  </h3>
                  <p className="text-indigo-300 text-sm mt-1">{category.count} Products</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 relative">
        {/* Small decorative stars background */}
        <div className="absolute inset-0 opacity-30" 
            style={{
              background: 'radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 20px)',
              backgroundSize: '120px 120px',
              backgroundPosition: '0 0'
            }}>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl font-bold text-yellow-300 text-center mb-12 transform -rotate-1 inline-block"
              style={{ 
                textShadow: '2px 2px 0px black',
                fontFamily: 'Bangers, cursive'
              }}>
            Featured Products
          </h2>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.7)] transform rotate-1 animate-pulse h-96">
                  <div className="h-64 bg-indigo-300/20 rounded-t-lg"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-indigo-300/20 rounded"></div>
                    <div className="h-4 bg-indigo-300/20 rounded w-3/4"></div>
                    <div className="h-6 bg-indigo-300/20 rounded w-1/4 mt-2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.7)] transform rotate-1 hover:rotate-0 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,0.7)] transition-all duration-300 hover:translate-y-1 overflow-hidden">
                  <Link to={`/products/${product.id}`}>
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      {product.discount && (
                        <div className="absolute top-2 right-2 bg-red-600 text-white font-bold px-3 py-1 rounded-full border-2 border-black transform -rotate-12 shadow-md">
                          {product.discount}% OFF!
                        </div>
                      )}
                    </div>
                    <div className="p-4 text-indigo-950">
                      <h3 className="text-xl font-bold uppercase tracking-wide">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="bg-red-600 text-white font-bold px-3 py-1 rounded-full border border-black transform -rotate-2 inline-block">
                          ${product.price.toFixed(2)}
                        </span>
                        <button className="bg-yellow-400 text-indigo-950 font-bold px-3 py-1 rounded border border-black hover:bg-yellow-300 transition-colors">
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link 
              to="/products" 
              className="bg-yellow-400 text-indigo-950 font-bold text-lg uppercase px-8 py-4 rounded-md border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-1 hover:rotate-0 hover:scale-105 transition-all inline-block">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Comic Strip Banner */}
      <section className="py-16 bg-[url('/images/comic-strip-bg.jpg')] bg-cover bg-fixed relative">
        <div className="absolute inset-0 bg-indigo-950/70"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white p-8 rounded-lg max-w-3xl mx-auto transform rotate-1 shadow-xl">
            <h2 className="text-3xl font-bold text-indigo-950 mb-4">Join Our Superhero Community!</h2>
            <p className="text-indigo-700 mb-6">
              Subscribe to get exclusive offers, new arrival alerts, and 10% off your first order!
            </p>

            <form className="flex flex-col sm:flex-row gap-2">
              <input type="email" placeholder="Your email address" className="comic-input flex-grow" required />
              <button type="submit" className="comic-button whitespace-nowrap">
                Subscribe Now
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-indigo-900/50 rounded-lg">
              <div className="w-16 h-16 mx-auto mb-4 bg-yellow-400 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-indigo-950"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-yellow-300 mb-2">Premium Quality</h3>
              <p className="text-indigo-300">
                Our t-shirts are made from high-quality materials for maximum comfort and durability.
              </p>
            </div>

            <div className="text-center p-6 bg-indigo-900/50 rounded-lg">
              <div className="w-16 h-16 mx-auto mb-4 bg-yellow-400 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-indigo-950"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-yellow-300 mb-2">Free Shipping</h3>
              <p className="text-indigo-300">
                Enjoy free shipping on all orders over $50. Fast delivery to your doorstep.
              </p>
            </div>

            <div className="text-center p-6 bg-indigo-900/50 rounded-lg">
              <div className="w-16 h-16 mx-auto mb-4 bg-yellow-400 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-indigo-950"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-yellow-300 mb-2">Easy Returns</h3>
              <p className="text-indigo-300">Not satisfied? Return within 30 days for a full refund or exchange.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional CSS for animations */}
      <style jsx>{`
        @keyframes starsMove {
          from { background-position: 0 0, 40px 60px, 130px 270px; }
          to { background-position: 550px 550px, 390px 610px, 680px 820px; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

export default HomePage