"use client"
import { Link } from "react-router-dom"
import { useWishlist } from "../contexts/WishlistContext"
import { useCart } from "../contexts/CartContext"
import { useEffect, useState } from "react"

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()
  const [showStars, setShowStars] = useState(true)

  // Create floating stars effect
  useEffect(() => {
    const createStars = () => {
      if (!showStars) return;
      
      const starsContainer = document.getElementById('stars-container');
      if (!starsContainer) return;
      
      // Clear previous stars
      starsContainer.innerHTML = '';
      
      // Create new stars
      for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = `${Math.random() * 3 + 1}px`;
        star.style.height = star.style.width;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.animationDuration = `${Math.random() * 3 + 2}s`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        starsContainer.appendChild(star);
      }
    };

    createStars();
    window.addEventListener('resize', createStars);
    
    return () => {
      window.removeEventListener('resize', createStars);
    };
  }, [showStars]);

  const handleRemoveItem = (id) => {
    removeFromWishlist(id)
  }

  const handleAddToCart = (product) => {
    addToCart(product, 1, "M", product.colors ? product.colors[0] : "Default")
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-indigo-950 relative">
        {/* Stars container */}
        <div id="stars-container" className="fixed inset-0 pointer-events-none overflow-hidden"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-purple-400 to-blue-400 mb-2">
            YOUR HERO COLLECTION
          </h1>
          <p className="text-center text-purple-300 mb-8">Assemble your favorites</p>

          <div className="bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-indigo-900/80 backdrop-blur-md rounded-lg p-8 text-center border border-indigo-700 shadow-lg shadow-purple-900/30">
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-24 w-24 rounded-full bg-gradient-to-r from-yellow-400 to-purple-600 opacity-20 blur-xl"></div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-20 w-20 mx-auto text-yellow-300 relative"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Your wishlist is empty!</h2>
            <p className="text-purple-300 mb-8">Add your favorite hero items to save them for your next adventure.</p>
            <Link to="/products" className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-full hover:from-purple-500 hover:to-blue-500 transform hover:scale-105 transition-all duration-300 shadow-md shadow-purple-900/50">
              DISCOVER HERO GEAR
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-indigo-950 relative">
      {/* Stars container */}
      <div id="stars-container" className="fixed inset-0 pointer-events-none overflow-hidden"></div>
      
      {/* Cosmic rays */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-px h-screen bg-blue-400 opacity-20" style={{boxShadow: '0 0 20px 5px rgba(96, 165, 250, 0.5)'}}></div>
        <div className="absolute top-0 left-2/4 w-px h-screen bg-purple-400 opacity-20" style={{boxShadow: '0 0 20px 5px rgba(192, 132, 252, 0.5)'}}></div>
        <div className="absolute top-0 left-3/4 w-px h-screen bg-yellow-400 opacity-20" style={{boxShadow: '0 0 20px 5px rgba(250, 204, 21, 0.5)'}}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="mb-6 md:mb-0">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-purple-400 to-blue-400">
              YOUR HERO COLLECTION
            </h1>
            <p className="text-purple-300 mt-2">Items saved for your next adventure</p>
          </div>
          <button 
            onClick={clearWishlist} 
            className="px-4 py-2 bg-gradient-to-r from-red-800/70 to-red-600/70 backdrop-blur-sm hover:from-red-700 hover:to-red-500 text-white rounded-full flex items-center space-x-2 transform hover:scale-105 transition-all duration-300 border border-red-600/50 shadow-md shadow-red-900/30"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>Clear All</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {wishlistItems.map((item) => (
            <div key={item.id} className="group relative">
              {/* Card glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-yellow-600/30 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-indigo-900/80 backdrop-blur-md rounded-lg overflow-hidden border border-indigo-700/50 shadow-lg shadow-purple-900/30 transform group-hover:scale-102 transition-all duration-300">
                <div className="relative">
                  <Link to={`/products/${item.id}`}>
                    <div className="relative overflow-hidden">
                      <img
                        src={item.images?.[0] || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 to-transparent opacity-50"></div>
                    </div>
                  </Link>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="absolute top-3 right-3 bg-black/40 hover:bg-black/60 backdrop-blur-sm p-2 rounded-full transition-all duration-300 border border-white/20 z-10"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-red-400 hover:text-red-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="p-5">
                  <Link to={`/products/${item.id}`} className="block mb-2">
                    <h3 className="font-bold text-xl text-white group-hover:text-yellow-300 transition-colors">{item.name}</h3>
                  </Link>

                  {item.universe && (
                    <span className="inline-block text-xs font-medium bg-purple-800/70 text-purple-300 px-3 py-1 rounded-full border border-purple-700/50">
                      {item.universe}
                    </span>
                  )}

                  <div className="flex items-center justify-between mt-4">
                    <div>
                      {item.discount > 0 ? (
                        <div className="flex items-center">
                          <span className="font-bold text-lg text-yellow-300">
                            ${(item.price * (1 - item.discount / 100)).toFixed(2)}
                          </span>
                          <span className="text-indigo-400 line-through ml-2 text-sm">${item.price.toFixed(2)}</span>
                        </div>
                      ) : (
                        <span className="font-bold text-lg text-yellow-300">${item.price?.toFixed(2) || "29.99"}</span>
                      )}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3 px-4 rounded-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/products" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-800/70 to-purple-800/70 backdrop-blur-sm hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-full transform hover:scale-105 transition-all duration-300 border border-indigo-700/50 shadow-md shadow-purple-900/30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Continue Shopping
          </Link>
        </div>
      </div>

      {/* Add CSS for stars animation */}
      <style jsx global>{`
        @keyframes twinkle {
          0% { opacity: 0.3; }
          50% { opacity: 1; }
          100% { opacity: 0.3; }
        }
        
        .star {
          position: absolute;
          background-color: white;
          border-radius: 50%;
          animation: twinkle linear infinite;
        }
      `}</style>
    </div>
  )
}

export default WishlistPage