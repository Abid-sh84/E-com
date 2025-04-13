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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/90 to-indigo-900/70 z-10"></div>
        <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center animate-pulse-slow"></div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="hero-title mb-6 animate-fade-in">Unleash Your Inner Hero</h1>
          <p className="text-xl md:text-2xl text-indigo-200 max-w-3xl mx-auto mb-8 animate-fade-in-delay">
            Discover our exclusive collection of superhero t-shirts inspired by the cosmic beauty of Starry Night
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-delay-2">
            <Link to="/products" className="comic-button">
              Shop Collection
            </Link>
            <Link
              to="/products?category=new"
              className="px-6 py-3 bg-indigo-700 text-white font-bold rounded-md transform transition-all hover:scale-105 hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-700/50 active:scale-95"
            >
              New Arrivals
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-indigo-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-yellow-300 text-center mb-12">Shop by Universe</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.slug}`}
                className="group relative h-64 overflow-hidden rounded-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-indigo-950/70 to-transparent z-10"></div>
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <h3 className="text-xl font-bold text-white">{category.name}</h3>
                  <p className="text-indigo-300 text-sm mt-1">{category.count} Products</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-yellow-300 text-center mb-12">Featured Products</h2>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="comic-card animate-pulse h-96">
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
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/products" className="comic-button">
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
    </div>
  )
}

export default HomePage
