"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useCart } from "../contexts/CartContext"

const CartPage = () => {
  const { cartItems, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const [couponApplied, setCouponApplied] = useState(false)
  const [discount, setDiscount] = useState(0)

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
      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black py-12 px-4 sm:px-6 lg:px-8 relative">
        {/* Stars background effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="stars-1"></div>
          <div className="stars-2"></div>
          <div className="stars-3"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-3xl font-bold text-white mb-8 flex items-center">
            <span className="mr-2">Your Hero Gear</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </h1>

          <div className="bg-blue-900/40 backdrop-blur-sm rounded-lg p-8 text-center border border-blue-500/30 shadow-lg shadow-blue-500/20">
            <div className="w-20 h-20 mx-auto bg-blue-800/70 rounded-full flex items-center justify-center mb-4 shadow-inner shadow-blue-600/50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-yellow-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Your inventory is empty</h2>
            <p className="text-blue-300 mb-6">Your hero's arsenal awaits! Add some gear to your mission loadout.</p>
            <Link to="/products" className="group relative inline-flex items-center justify-center py-3 px-6 font-medium rounded-lg text-white bg-gradient-to-r from-blue-700 to-purple-700 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition duration-300 shadow-lg shadow-blue-700/50">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-300 group-hover:text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <span className="ml-4">Gear Up Now</span>
            </Link>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-6 -right-6 w-12 h-12 bg-yellow-400 rounded-full opacity-50 animate-pulse"></div>
          <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-purple-500 rounded-full opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Stars background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="stars-1"></div>
        <div className="stars-2"></div>
        <div className="stars-3"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <h1 className="text-3xl font-bold text-white mb-8 flex items-center">
          <span className="mr-2">Your Hero Gear</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-blue-900/40 backdrop-blur-sm rounded-lg overflow-hidden border border-blue-500/30 shadow-lg shadow-blue-500/20">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-white flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Mission Loadout ({cartItems.length})
                  </h2>
                  <button 
                    onClick={clearCart} 
                    className="text-blue-300 hover:text-red-400 text-sm font-medium transition duration-300 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Clear Inventory
                  </button>
                </div>

                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div
                      key={`${item.id}-${item.selectedSize}`}
                      className="flex flex-col sm:flex-row gap-4 pb-6 border-b border-blue-700"
                    >
                      <div className="w-full sm:w-24 h-24 bg-black/30 rounded-md overflow-hidden border border-blue-500/50 shadow-md">
                        <img
                          src={item.images[0] || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <div>
                            <h3 className="font-bold text-white">{item.name}</h3>
                            <p className="text-blue-300 text-sm">Size: {item.selectedSize}</p>
                            {item.universe && (
                              <p className="text-blue-300 text-sm flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Universe: {item.universe}
                              </p>
                            )}
                          </div>

                          <div className="mt-2 sm:mt-0 text-right">
                            {item.discount > 0 ? (
                              <div>
                                <span className="font-bold text-yellow-300">
                                  ${(item.price * (1 - item.discount / 100)).toFixed(2)}
                                </span>
                                <span className="text-blue-400 line-through ml-2">${item.price.toFixed(2)}</span>
                              </div>
                            ) : (
                              <span className="font-bold text-yellow-300">${item.price.toFixed(2)}</span>
                            )}
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.selectedSize, item.quantity - 1)}
                              className="w-8 h-8 rounded-l-md bg-blue-800/70 text-white flex items-center justify-center hover:bg-blue-700/70 transition duration-300"
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
                            <div className="w-10 h-8 bg-blue-900/70 text-white border-x border-blue-700 flex items-center justify-center font-medium">
                              {item.quantity}
                            </div>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.selectedSize, item.quantity + 1)}
                              className="w-8 h-8 rounded-r-md bg-blue-800/70 text-white flex items-center justify-center hover:bg-blue-700/70 transition duration-300"
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
                            className="text-blue-400 hover:text-red-400 transition duration-300"
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
              <Link to="/products" className="text-yellow-300 hover:text-yellow-400 flex items-center transition duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Continue Equipping
              </Link>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-blue-900/40 backdrop-blur-sm rounded-lg p-6 border border-blue-500/30 shadow-lg shadow-blue-500/20 relative">
              <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-400/10 rounded-bl-full"></div>
              
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Mission Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-blue-300">Subtotal</span>
                  <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
                </div>

                {couponApplied && (
                  <div className="flex justify-between text-green-400">
                    <span>Hero Discount ({discount}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-blue-300">Transport Fee</span>
                  <span className="text-white font-medium">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>

                <div className="border-t border-blue-700 pt-4 flex justify-between">
                  <span className="text-white font-bold">Total</span>
                  <span className="text-yellow-300 font-bold">${total.toFixed(2)}</span>
                </div>
              </div>

              <form onSubmit={handleApplyCoupon} className="mb-6">
                <label htmlFor="coupon" className="block text-white font-medium mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Hero Code
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="coupon"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter code"
                    className="w-full bg-blue-800/50 text-white border border-blue-600 rounded-l-lg py-2 px-4 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-300"
                    disabled={couponApplied}
                  />
                  <button
                    type="submit"
                    className={`px-4 py-2 rounded-r-lg font-medium ${
                      couponApplied
                        ? "bg-green-500 text-white cursor-not-allowed"
                        : "bg-yellow-400 text-blue-900 hover:bg-yellow-300 transition duration-300"
                    }`}
                    disabled={couponApplied}
                  >
                    {couponApplied ? "Applied" : "Apply"}
                  </button>
                </div>
                {couponApplied && <p className="text-green-400 text-sm mt-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Hero discount activated!
                </p>}
              </form>

              <Link to="/checkout" className="group relative w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-gradient-to-r from-blue-700 to-purple-700 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition duration-300 shadow-lg shadow-blue-700/50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                Deploy Mission
              </Link>
              
              {/* Small decorative element */}
              <div className="absolute bottom-0 left-0 w-12 h-12 bg-purple-500/10 rounded-tr-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage