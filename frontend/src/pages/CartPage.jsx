"use client"
import { Link } from "react-router-dom"
import { useCart } from "../contexts/CartContext"
import { useState, useEffect } from "react"

const CartPage = () => {
  const { cartItems, removeFromCart, updateCartItemQuantity, clearCart } = useCart()
  const [showStars, setShowStars] = useState(true)
  const [couponCode, setCouponCode] = useState("")
  const [couponApplied, setCouponApplied] = useState(false)
  const [discountAmount, setDiscountAmount] = useState(0)
  
  // Calculate cart subtotal
  const subtotal = cartItems.reduce((total, item) => {
    const itemPrice = item.discount > 0 
      ? item.price * (1 - item.discount / 100) 
      : item.price
    return total + (itemPrice * item.quantity)
  }, 0)
  
  // Shipping cost
  const shippingCost = subtotal > 100 ? 0 : 9.99
  
  // Total cost
  const totalCost = subtotal + shippingCost - discountAmount

  // Create floating stars effect (same as WishlistPage)
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
    removeFromCart(id)
  }

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      updateCartItemQuantity(id, newQuantity)
    }
  }

  const handleApplyCoupon = () => {
    // Simple coupon code logic - could be expanded to check against valid codes
    if (couponCode.toLowerCase() === "hero25") {
      const discount = subtotal * 0.25
      setDiscountAmount(discount)
      setCouponApplied(true)
    } else {
      alert("Invalid coupon code")
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-indigo-950 relative">
        {/* Stars container */}
        <div id="stars-container" className="fixed inset-0 pointer-events-none overflow-hidden"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-purple-400 to-blue-400 mb-2">
            YOUR HERO CART
          </h1>
          <p className="text-center text-purple-300 mb-8">Ready to equip your gear?</p>

          <div className="bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-indigo-900/80 backdrop-blur-md rounded-lg p-8 text-center border-2 border-indigo-600 shadow-lg shadow-purple-900/30 relative overflow-hidden">
            {/* Animated border glow */}
            <div className="absolute inset-0 border-4 border-transparent rounded-lg" style={{
              background: 'linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.6), rgba(96, 165, 250, 0.6), rgba(250, 204, 21, 0.6), transparent) border-box',
              WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              animation: 'borderRotate 4s linear infinite',
            }}></div>
            
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
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Your cart is empty!</h2>
            <p className="text-purple-300 mb-8">Add some hero gear to your cart and prepare for your next adventure.</p>
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
              YOUR HERO CART
            </h1>
            <p className="text-purple-300 mt-2">Ready to equip for your next adventure</p>
          </div>
          <button 
            onClick={clearCart} 
            className="px-4 py-2 bg-gradient-to-r from-red-800/70 to-red-600/70 backdrop-blur-sm hover:from-red-700 hover:to-red-500 text-white rounded-full flex items-center space-x-2 transform hover:scale-105 transition-all duration-300 border border-red-600/50 shadow-md shadow-red-900/30"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>Clear Cart</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-indigo-900/80 backdrop-blur-md rounded-lg border border-indigo-700/50 shadow-lg shadow-purple-900/30 overflow-hidden">
              <div className="p-6 border-b border-indigo-700/50">
                <h2 className="text-2xl font-bold text-white">Cart Items ({cartItems.length})</h2>
              </div>
              
              {cartItems.map((item) => (
                <div key={item.id} className="p-6 border-b border-indigo-700/50 group">
                  <div className="flex flex-col sm:flex-row items-center">
                    <div className="flex-shrink-0 w-24 h-24 mb-4 sm:mb-0 relative overflow-hidden rounded-lg">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 group-hover:opacity-75 transition-opacity"></div>
                      <img
                        src={item.images?.[0] || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="sm:ml-6 flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-white group-hover:text-yellow-300 transition-colors">
                            {item.name}
                          </h3>
                          <div className="mt-1 flex items-center">
                            <span className="text-sm text-indigo-300">
                              Size: {item.selectedSize || "M"}
                            </span>
                            {item.selectedColor && (
                              <span className="ml-4 text-sm text-indigo-300">
                                Color: {item.selectedColor}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="mt-4 sm:mt-0">
                          {item.discount > 0 ? (
                            <div className="flex flex-col items-end">
                              <span className="font-bold text-lg text-yellow-300">
                                ${((item.price * (1 - item.discount / 100)) * item.quantity).toFixed(2)}
                              </span>
                              <span className="text-sm text-indigo-400 line-through">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          ) : (
                            <span className="font-bold text-lg text-yellow-300">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-l-md bg-indigo-800 text-white flex items-center justify-center hover:bg-indigo-700"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <div className="w-10 h-8 bg-indigo-800/50 border-y border-indigo-700 text-white flex items-center justify-center font-bold">
                            {item.quantity}
                          </div>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-r-md bg-indigo-800 text-white flex items-center justify-center hover:bg-indigo-700"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                        
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-400 hover:text-red-300 transition-colors group"
                        >
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            <span className="ml-2 group-hover:underline">Remove</span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <Link to="/products" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-800/70 to-purple-800/70 backdrop-blur-sm hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-full transform hover:scale-105 transition-all duration-300 border-2 border-indigo-600/50 shadow-md shadow-purple-900/30">
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
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-indigo-900/80 backdrop-blur-md rounded-lg border border-indigo-700/50 shadow-lg shadow-purple-900/30 overflow-hidden">
              <div className="p-6 border-b border-indigo-700/50">
                <h2 className="text-2xl font-bold text-white">Order Summary</h2>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-indigo-300">Subtotal</span>
                    <span className="font-medium text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-indigo-300">Shipping</span>
                    {shippingCost === 0 ? (
                      <span className="font-medium text-green-400">FREE</span>
                    ) : (
                      <span className="font-medium text-white">${shippingCost.toFixed(2)}</span>
                    )}
                  </div>
                  
                  {couponApplied && (
                    <div className="flex justify-between items-center">
                      <span className="text-indigo-300">Discount (HERO25)</span>
                      <span className="font-medium text-green-400">-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="pt-4 border-t border-indigo-700/50">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-white">Total</span>
                      <span className="text-xl font-bold text-yellow-300">${totalCost.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                {!couponApplied && (
                  <div className="mt-6">
                    <label htmlFor="coupon" className="block text-sm font-medium text-indigo-300 mb-2">
                      Have a coupon code?
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        id="coupon"
                        placeholder="Enter code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 bg-indigo-800/50 border border-indigo-700 rounded-l-md px-4 py-2 text-white placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="bg-indigo-700 hover:bg-indigo-600 text-white px-4 py-2 rounded-r-md transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    <p className="text-xs text-indigo-400 mt-1">Try "HERO25" for 25% off your order</p>
                  </div>
                )}
                
                <div className="mt-6">
                  <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-3 px-4 rounded-md transform hover:scale-105 transition-all duration-300 border border-indigo-500/30 shadow-lg shadow-purple-900/30 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    Proceed to Checkout
                  </button>
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-indigo-300 text-sm">We accept</p>
                  <div className="flex justify-center space-x-2 mt-2">
                    <div className="w-12 h-8 bg-white/10 rounded-md flex items-center justify-center px-2">
                      <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-sm"></div>
                    </div>
                    <div className="w-12 h-8 bg-white/10 rounded-md flex items-center justify-center px-2">
                      <div className="w-full h-full bg-gradient-to-r from-yellow-500 to-red-500 rounded-sm"></div>
                    </div>
                    <div className="w-12 h-8 bg-white/10 rounded-md flex items-center justify-center px-2">
                      <div className="w-full h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-sm"></div>
                    </div>
                    <div className="w-12 h-8 bg-white/10 rounded-md flex items-center justify-center px-2">
                      <div className="w-full h-full bg-gradient-to-r from-gray-700 to-gray-900 rounded-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Security Badge */}
            <div className="mt-6 bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-indigo-900/80 backdrop-blur-md rounded-lg border border-indigo-700/50 p-4 flex items-center justify-center shadow-lg shadow-purple-900/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm text-indigo-300">Secure Checkout - 256-bit SSL Encryption</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS for animations */}
      <style jsx global>{`
        @keyframes twinkle {
          0% { opacity: 0.3; }
          50% { opacity: 1; }
          100% { opacity: 0.3; }
        }
        
        @keyframes borderGlow {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
        
        @keyframes borderRotate {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
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

export default CartPage