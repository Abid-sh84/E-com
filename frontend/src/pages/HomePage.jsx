"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import { featuredProducts, categories } from "../data/mockData"
import apiClient from "../api/client"

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [email, setEmail] = useState("")
  const [subscribeStatus, setSubscribeStatus] = useState({
    show: false,
    message: "",
    isError: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    // Create stars for background
    const createStars = () => {
      const starsContainer = document.getElementById('home-stars-container');
      if (!starsContainer) return;
      
      starsContainer.innerHTML = '';
      
      // Create stars with variety
      for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
          
        // Create different types of stars for variety
        if (i % 5 === 0) {
          // Larger, brighter stars
          star.className = 'star glow';
          star.style.width = `${Math.random() * 4 + 2}px`;
          star.style.height = star.style.width;
          star.style.boxShadow = '0 0 4px 1px rgba(255, 255, 255, 0.6)';
        } else if (i % 7 === 0) {
          // Colorful stars
          star.className = 'star colored';
          star.style.width = `${Math.random() * 3 + 1}px`;
          star.style.height = star.style.width;
          star.style.backgroundColor = ['#f0e8ff', '#fff6e0', '#d4e8ff'][Math.floor(Math.random() * 3)];
          star.style.animationDuration = `${Math.random() * 4 + 2}s`;
        } else {
          // Regular stars
          star.className = 'star';
          star.style.width = `${Math.random() * 2 + 1}px`;
          star.style.height = star.style.width;
          star.style.animationDuration = `${Math.random() * 3 + 2}s`;
        }
        
        // Position stars randomly
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        
        starsContainer.appendChild(star);
      }
      
      // Add occasional shooting stars
      setInterval(() => {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        shootingStar.style.top = `${Math.random() * 70}%`;
        shootingStar.style.left = `${Math.random() * 100}%`;
        shootingStar.style.width = `${Math.random() * 150 + 50}px`;
        shootingStar.style.animationDuration = `${Math.random() * 2 + 0.5}s`;
        
        starsContainer.appendChild(shootingStar);
        
        setTimeout(() => {
          shootingStar.remove();
        }, 1000);
      }, 4000);
    }
    
    createStars();

    return () => clearTimeout(timer)
  }, [])

  const handleSubscribe = async (e) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setSubscribeStatus({
        show: true,
        message: "Please enter your email address",
        isError: true,
      })
      return
    }

    setIsSubmitting(true)
    
    try {
      const { data } = await apiClient.post('/api/subscribers', { email })
      
      setSubscribeStatus({
        show: true,
        message: data.message || 'Thank you for subscribing!',
        isError: false,
      })
      
      setEmail("")
      
      // Hide the success message after 5 seconds
      setTimeout(() => {
        setSubscribeStatus({
          show: false,
          message: "",
          isError: false,
        })
      }, 5000)
    } catch (error) {
      console.error('Subscription error:', error);
      setSubscribeStatus({
        show: true,
        message: error.response?.data?.message || "Something went wrong. Please try again.",
        isError: true,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-indigo-950 relative">
      {/* Stars container for background */}
      <div id="home-stars-container" className="fixed inset-0 pointer-events-none overflow-hidden"></div>
      
      {/* Cosmic rays */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-px h-screen bg-blue-400 opacity-20" style={{boxShadow: '0 0 20px 5px rgba(96, 165, 250, 0.5)'}}></div>
        <div className="absolute top-0 left-2/4 w-px h-screen bg-purple-400 opacity-20" style={{boxShadow: '0 0 20px 5px rgba(192, 132, 252, 0.5)'}}></div>
        <div className="absolute top-0 left-3/4 w-px h-screen bg-yellow-400 opacity-20" style={{boxShadow: '0 0 20px 5px rgba(250, 204, 21, 0.5)'}}></div>
      </div>
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/60 to-indigo-900/60 z-10"></div>
        <div className="absolute inset-0 bg-[url('/images/cosmic-bg.jpg')] bg-cover bg-center"></div>
        
        {/* Hero emblem background */}
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none opacity-5">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-96 w-96" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" className="text-yellow-300" />
          </svg>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-float mb-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-purple-400 to-blue-400">
              COSMIC HERO COLLECTION
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-indigo-200 max-w-3xl mx-auto mb-12 animate-fade-in-delay">
            Discover our exclusive collection of superhero apparel inspired by the cosmic wonders of the universe
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 animate-fade-in-delay-2">
            <Link to="/products" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-full transform hover:scale-105 transition-all duration-300 flex items-center justify-center shadow-lg shadow-purple-900/30 border border-purple-600/50">
              <span className="mr-2">EXPLORE COLLECTION</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link
              to="/products?category=new"
              className="px-8 py-4 bg-gradient-to-r from-yellow-600/80 to-yellow-500/80 hover:from-yellow-500/80 hover:to-yellow-400/80 text-white font-bold rounded-full transform hover:scale-105 transition-all duration-300 flex items-center justify-center shadow-lg shadow-yellow-900/30 border border-yellow-600/50"
            >
              <span className="mr-2">NEW ARRIVALS</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-purple-400 to-blue-400 mb-4">
              CHOOSE YOUR UNIVERSE
            </h2>
            <p className="text-purple-300 max-w-2xl mx-auto">
              Explore our collections from your favorite comic universes
            </p>
          </div>

          {/* Autoscrolling categories container */}
          <div className="w-full overflow-hidden relative">
            <div className="categories-scroll flex animate-scroll py-4">
              {/* Double the categories to create seamless loop */}
              {[...categories, ...categories].map((category, index) => (
                <Link
                  key={`${category.id}-${index}`}
                  to={`/products?category=${category.slug}`}
                  className="group relative h-64 min-w-[280px] mx-3 overflow-hidden rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg shadow-indigo-900/50"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-indigo-950/70 to-transparent z-10"></div>
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-5"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                    <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
                    <p className="text-purple-300 text-sm">{category.count} Products</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Fade effect on the sides */}
            <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-indigo-950 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-indigo-950 to-transparent z-10"></div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-purple-400 to-blue-400 mb-4">
              FEATURED COLLECTION
            </h2>
            <p className="text-purple-300 max-w-2xl mx-auto">
              Our most popular superhero gear loved by fans worldwide
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-indigo-900/80 backdrop-blur-md rounded-xl border border-indigo-700/50 shadow-lg shadow-purple-900/30 animate-pulse h-96">
                  <div className="h-64 bg-indigo-800/50 rounded-t-xl relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-purple-500 to-blue-500 animate-gradient-x"></div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-indigo-800/50 rounded-full w-2/3"></div>
                    <div className="h-4 bg-indigo-800/50 rounded-full w-1/2"></div>
                    <div className="h-6 bg-yellow-500/20 rounded-full w-1/4 mt-2"></div>
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

          <div className="text-center mt-16">
            <Link to="/products" className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-indigo-950 font-bold rounded-full transform hover:scale-105 transition-all duration-300 inline-flex items-center shadow-lg shadow-yellow-900/30 border border-yellow-500/50">
              <span className="mr-2">VIEW ALL PRODUCTS</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Comic Strip Banner */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Glowing border effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-yellow-600/30 rounded-2xl blur-lg"></div>
          
          <div className="relative bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-indigo-900/80 backdrop-blur-md p-12 md:p-16 rounded-2xl border border-indigo-700/50 shadow-lg shadow-purple-900/30">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:max-w-xl">
                <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-purple-400 to-blue-400 mb-4">
                  JOIN OUR COSMIC COMMUNITY
                </h2>
                <p className="text-indigo-200 text-lg mb-8">
                  Subscribe to receive exclusive offers, cosmic news updates, and a special 15% discount on your first order!
                </p>
                <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleSubscribe}>
                  <div className="relative flex-grow">
                    <input 
                      type="email" 
                      placeholder="Your email address" 
                      className="w-full bg-indigo-800/50 border border-indigo-600 rounded-lg focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 text-white py-3 px-4 placeholder-indigo-400"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} 
                      required 
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-indigo-950 font-bold rounded-lg transform hover:scale-105 transition-all duration-300 inline-flex items-center justify-center shadow-md shadow-yellow-900/30"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>SUBSCRIBING...</span>
                      </>
                    ) : (
                      <>
                        <span>SUBSCRIBE</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
                {subscribeStatus.show && (
                  <div className={`mt-4 p-3 rounded-lg ${
                    subscribeStatus.isError 
                      ? "bg-red-900/50 text-red-200 border border-red-700/50" 
                      : "bg-green-900/50 text-green-200 border border-green-700/50"
                  }`}>
                    <div className="flex items-start">
                      {subscribeStatus.isError ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                      <p>{subscribeStatus.message}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="hidden md:block">
                <img src="/images/hero1.png" alt="Hero emblem" className="w-auto h-58 opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-r from-indigo-900/50 via-purple-900/50 to-indigo-900/50 backdrop-blur-sm p-8 rounded-xl border border-indigo-700/30 shadow-lg transform hover:translate-y-[-10px] transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg shadow-yellow-600/30">
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
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-400 mb-4 text-center">Premium Quality</h3>
              <p className="text-indigo-200 text-center">
                Our t-shirts are crafted from premium materials designed for comfort, durability and long-lasting vibrant colors.
              </p>
            </div>

            <div className="bg-gradient-to-r from-indigo-900/50 via-purple-900/50 to-indigo-900/50 backdrop-blur-sm p-8 rounded-xl border border-indigo-700/30 shadow-lg transform hover:translate-y-[-10px] transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg shadow-yellow-600/30">
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
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-400 mb-4 text-center">Free Shipping</h3>
              <p className="text-indigo-200 text-center">
                Enjoy complimentary shipping on all orders over $50. Fast and reliable delivery to your doorstep.
              </p>
            </div>

            <div className="bg-gradient-to-r from-indigo-900/50 via-purple-900/50 to-indigo-900/50 backdrop-blur-sm p-8 rounded-xl border border-indigo-700/30 shadow-lg transform hover:translate-y-[-10px] transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg shadow-yellow-600/30">
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
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-400 mb-4 text-center">Easy Returns</h3>
              <p className="text-indigo-200 text-center">
                Not satisfied? We offer hassle-free returns within 30 days for a full refund or exchange, no questions asked.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CSS for stars animation */}
      <style jsx global>{`
        @keyframes twinkle {
          0% { opacity: 0.3; }
          50% { opacity: 1; }
          100% { opacity: 0.3; }
        }
        
        @keyframes colored-twinkle {
          0% { opacity: 0.1; }
          50% { opacity: 0.8; }
          100% { opacity: 0.1; }
        }
        
        @keyframes glow {
          0% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 0.4; transform: scale(1); }
        }
        
        @keyframes shooting {
          0% { transform: translateX(0) translateY(0) rotate(-45deg); opacity: 1; }
          100% { transform: translateX(-100px) translateY(100px) rotate(-45deg); opacity: 0; }
        }
        
        @keyframes gradient-x {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-280px * ${categories.length} - 6px * ${categories.length})); }
        }
        
        .star {
          position: absolute;
          background-color: white;
          border-radius: 50%;
          animation: twinkle linear infinite;
        }
        
        .star.colored {
          animation: colored-twinkle linear infinite;
        }
        
        .star.glow {
          animation: glow linear infinite;
        }
        
        .shooting-star {
          position: absolute;
          height: 1px;
          background: linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,1));
          transform: rotate(-45deg);
          animation: shooting linear forwards;
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
          background-size: 400% 400%;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        
        .categories-scroll:hover {
          animation-play-state: paused;
        }
        
        /* Add small dots in a grid pattern for background texture */
        #home-stars-container:before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px),
            radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 30px 30px, 15px 15px;
          background-position: 0 0, 15px 15px;
        }
      `}</style>
    </div>
  )
}

export default HomePage
