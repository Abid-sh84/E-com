"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useCart } from "../contexts/CartContext"

const CartPage = () => {
  const { cartItems, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const [couponApplied, setCouponApplied] = useState(false)
  const [discount, setDiscount] = useState(0)
  const [stars, setStars] = useState([])

  // Generate stars for the background animation
  useEffect(() => {
    const generateStars = () => {
      const newStars = []
      for (let i = 0; i < 100; i++) {
        newStars.push({
          id: i,
          top: Math.random() * 100,
          left: Math.random() * 100,
          size: Math.random() * 3 + 1,
          animationDuration: Math.random() * 10 + 5,
        })
      }
      setStars(newStars)
    }

    generateStars()
  }, [])

  const handleQuantityChange = (id, size, newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      updateQuantity(id, size, newQuantity)
    }
  }

  const handleRemoveItem = (id, size) => {
    removeFromCart(id, size)
  }

  const handleApplyCoupon = (e) => {
    e.preventDefault()

    // This would normally validate the coupon with an API
    // For demo purposes, we'll just apply a fixed discount for any code
    if (couponCode.trim() !== "") {
      setCouponApplied(true)
      setDiscount(10) // 10% discount
    }
  }

  const calculateTotal = () => {
    const subtotal = cartTotal
    const discountAmount = couponApplied ? subtotal * (discount / 100) : 0
    const shipping = subtotal > 50 ? 0 : 5.99

    return {
      subtotal,
      discountAmount,
      shipping,
      total: subtotal - discountAmount + shipping,
    }
  }

  const { subtotal, discountAmount, shipping, total } = calculateTotal()

  if (cartItems.length === 0) {
    return (
      <div className="relative min-h-screen overflow-hidden">
        {/* Stars background */}
        <div className="fixed inset-0 bg-black z-0">
          {stars.map((star) => (
            <div
              key={star.id}
              className="absolute bg-white rounded-full animate-pulse z-0"
              style={{
                top: `${star.top}%`,
                left: `${star.left}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDuration: `${star.animationDuration}s`,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <h1 className="text-3xl font-serif font-bold text-white mb-8 text-center glow">Your Cosmic Cart</h1>

          <div className="bg-blue-900/40 backdrop-blur-sm rounded-lg p-8 text-center border border-blue-400 shadow-lg shadow-blue-500/20">
            <div className="h-16 w-16 mx-auto text-blue-300 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-serif font-bold text-white mb-2">Your cosmic cart awaits heroes</h2>
            <p className="text-blue-200 mb-6">The universe of super gear is ready for your selection.</p>
            <Link to="/products" className="inline-block px-6 py-3 rounded-md bg-purple-600 text-white font-serif font-medium hover:bg-purple-500 transform hover:scale-105 transition duration-300 shadow-md shadow-purple-500/50">
              Explore the Collection
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Stars background */}
      <div className="fixed inset-0 bg-black z-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full animate-pulse z-0"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDuration: `${star.animationDuration}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <h1 className="text-3xl font-serif font-bold text-white mb-8 text-center">Your Heroic Collection</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-blue-900/40 backdrop-blur-sm rounded-lg overflow-hidden border border-blue-400 shadow-lg shadow-blue-500/20">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-serif font-bold text-white">Your Items ({cartItems.length})</h2>
                  <button 
                    onClick={clearCart} 
                    className="text-blue-300 hover:text-yellow-300 text-sm font-serif font-medium transform hover:scale-105 transition duration-300"
                  >
                    Clear Cart
                  </button>
                </div>

                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div
                      key={`${item.id}-${item.selectedSize}`}
                      className="flex flex-col sm:flex-row gap-4 pb-6 border-b border-blue-700"
                    >
                      <div className="w-full sm:w-24 h-24 bg-gradient-to-br from-blue-900 to-purple-900 rounded-md overflow-hidden">
                        <img
                          src={item.images[0] || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover mix-blend-luminosity"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <div>
                            <h3 className="font-serif font-bold text-white">{item.name}</h3>
                            <p className="text-blue-300 text-sm font-serif">Size: {item.selectedSize}</p>
                            {item.universe && (
                              <p className="text-blue-300 text-sm font-serif">Universe: {item.universe}</p>
                            )}
                          </div>

                          <div className="mt-2 sm:mt-0 text-right">
                            {item.discount > 0 ? (
                              <div>
                                <span className="font-serif font-bold text-white">
                                  ${(item.price * (1 - item.discount / 100)).toFixed(2)}
                                </span>
                                <span className="text-blue-400 line-through ml-2">${item.price.toFixed(2)}</span>
                              </div>
                            ) : (
                              <span className="font-serif font-bold text-white">${item.price.toFixed(2)}</span>
                            )}
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.selectedSize, item.quantity - 1)}
                              className="w-8 h-8 rounded-l-md bg-purple-800 text-white flex items-center justify-center hover:bg-purple-700 transition duration-300"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <div className="w-10 h-8 bg-blue-800 text-white flex items-center justify-center font-serif font-medium">
                              {item.quantity}
                            </div>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.selectedSize, item.quantity + 1)}
                              className="w-8 h-8 rounded-r-md bg-purple-800 text-white flex items-center justify-center hover:bg-purple-700 transition duration-300"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>

                          <button
                            onClick={() => handleRemoveItem(item.id, item.selectedSize)}
                            className="text-blue-300 hover:text-red-400 transition duration-300"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link to="/products" className="text-yellow-300 hover:text-yellow-400 flex items-center font-serif transition duration-300 transform hover:translate-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Continue Your Quest
              </Link>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-blue-900/40 backdrop-blur-sm rounded-lg p-6 border border-blue-400 shadow-lg shadow-blue-500/20">
              <h2 className="text-xl font-serif font-bold text-white mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-blue-300 font-serif">Subtotal</span>
                  <span className="text-white font-serif font-medium">${subtotal.toFixed(2)}</span>
                </div>

                {couponApplied && (
                  <div className="flex justify-between text-green-400 font-serif">
                    <span>Hero Discount ({discount}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-blue-300 font-serif">Shipping</span>
                  <span className="text-white font-serif font-medium">
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="border-t border-blue-700 pt-4 flex justify-between">
                  <span className="text-white font-serif font-bold">Total</span>
                  <span className="text-yellow-300 font-serif font-bold">${total.toFixed(2)}</span>
                </div>
              </div>

              <form onSubmit={handleApplyCoupon} className="mb-6">
                <label htmlFor="coupon" className="block text-white font-serif font-medium mb-2">
                  Hero Code
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="coupon"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter secret code"
                    className="flex-1 bg-blue-800/70 text-white border border-blue-600 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 font-serif"
                    disabled={couponApplied}
                  />
                  <button
                    type="submit"
                    className={`px-4 py-2 rounded-r-md font-serif font-medium transition duration-300 ${
                      couponApplied
                        ? "bg-green-600 text-white cursor-not-allowed"
                        : "bg-purple-600 text-white hover:bg-purple-500"
                    }`}
                    disabled={couponApplied}
                  >
                    {couponApplied ? "Applied" : "Apply"}
                  </button>
                </div>
                {couponApplied && <p className="text-green-400 text-sm font-serif mt-1">Hero code activated!</p>}
              </form>

              <Link 
                to="/checkout" 
                className="block w-full px-6 py-3 rounded-md bg-purple-600 text-white font-serif font-medium hover:bg-purple-500 transition duration-300 text-center transform hover:scale-105 shadow-md shadow-purple-500/50"
              >
                <div className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  Complete Your Mission
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Add global CSS for the theme */}
      <style jsx global>{`
        body {
          font-family: 'Cinzel', serif; /* Formal font */
          background-color: #000;
          color: white;
        }
        
        .glow {
          text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0073e6, 0 0 20px #0073e6;
        }
        
        @keyframes pulse {
          0% { opacity: 0.3; }
          50% { opacity: 1; }
          100% { opacity: 0.3; }
        }
        
        .animate-pulse {
          animation: pulse 3s infinite;
        }
      `}</style>
    </div>
  )
}

export default CartPage