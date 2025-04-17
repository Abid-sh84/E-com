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
  //hey these are the changes

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-white mb-8">Your Cart</h1>

        <div className="bg-indigo-900/50 rounded-lg p-8 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-indigo-400 mb-4"
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
          <h2 className="text-xl font-bold text-white mb-2">Your cart is empty</h2>
          <p className="text-indigo-300 mb-6">Looks like you haven't added any items to your cart yet.</p>
          <Link to="/products" className="comic-button">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-indigo-900/50 rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Cart Items ({cartItems.length})</h2>
                <button onClick={clearCart} className="text-indigo-300 hover:text-yellow-300 text-sm font-medium">
                  Clear Cart
                </button>
              </div>

              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={`${item.id}-${item.selectedSize}`}
                    className="flex flex-col sm:flex-row gap-4 pb-6 border-b border-indigo-800"
                  >
                    <div className="w-full sm:w-24 h-24 bg-white rounded-md overflow-hidden">
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
                          <p className="text-indigo-300 text-sm">Size: {item.selectedSize}</p>
                          {item.universe && <p className="text-indigo-300 text-sm">Universe: {item.universe}</p>}
                        </div>

                        <div className="mt-2 sm:mt-0 text-right">
                          {item.discount > 0 ? (
                            <div>
                              <span className="font-bold text-white">
                                ${(item.price * (1 - item.discount / 100)).toFixed(2)}
                              </span>
                              <span className="text-indigo-400 line-through ml-2">${item.price.toFixed(2)}</span>
                            </div>
                          ) : (
                            <span className="font-bold text-white">${item.price.toFixed(2)}</span>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.selectedSize, item.quantity - 1)}
                            className="w-8 h-8 rounded-l-md bg-indigo-800 text-white flex items-center justify-center hover:bg-indigo-700"
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
                          <div className="w-10 h-8 bg-white text-indigo-950 flex items-center justify-center font-medium">
                            {item.quantity}
                          </div>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.selectedSize, item.quantity + 1)}
                            className="w-8 h-8 rounded-r-md bg-indigo-800 text-white flex items-center justify-center hover:bg-indigo-700"
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
                          className="text-indigo-300 hover:text-red-400"
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
            <Link to="/products" className="text-yellow-300 hover:text-yellow-400 flex items-center">
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

        <div className="lg:col-span-1">
          <div className="bg-indigo-900/50 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-indigo-300">Subtotal</span>
                <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
              </div>

              {couponApplied && (
                <div className="flex justify-between text-green-400">
                  <span>Discount ({discount}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-indigo-300">Shipping</span>
                <span className="text-white font-medium">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>

              <div className="border-t border-indigo-800 pt-4 flex justify-between">
                <span className="text-white font-bold">Total</span>
                <span className="text-yellow-300 font-bold">${total.toFixed(2)}</span>
              </div>
            </div>

            <form onSubmit={handleApplyCoupon} className="mb-6">
              <label htmlFor="coupon" className="block text-white font-medium mb-2">
                Promo Code
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="coupon"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter code"
                  className="comic-input flex-1 bg-indigo-800 text-white border-indigo-700 focus:ring-yellow-400"
                  disabled={couponApplied}
                />
                <button
                  type="submit"
                  className={`ml-2 px-4 py-2 rounded-md font-medium ${
                    couponApplied
                      ? "bg-green-500 text-white cursor-not-allowed"
                      : "bg-yellow-400 text-indigo-950 hover:bg-yellow-300"
                  }`}
                  disabled={couponApplied}
                >
                  {couponApplied ? "Applied" : "Apply"}
                </button>
              </div>
              {couponApplied && <p className="text-green-400 text-sm mt-1">Coupon applied successfully!</p>}
            </form>

            <Link to="/checkout" className="comic-button w-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
