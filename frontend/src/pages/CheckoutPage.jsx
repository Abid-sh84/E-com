"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../contexts/CartContext"
import { createOrder } from "../api/orders"
import { useAuth } from "../contexts/AuthContext"

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart, prepareOrderItems } = useCart()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
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

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
    paymentMethod: "credit-card",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvc: "",
  })

  const [errors, setErrors] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Basic validation
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.address.trim()) newErrors.address = "Address is required"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.state.trim()) newErrors.state = "State is required"
    if (!formData.zip.trim()) newErrors.zip = "ZIP code is required"

    // Payment validation
    if (formData.paymentMethod === "credit-card") {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = "Card number is required"
      if (!formData.cardName.trim()) newErrors.cardName = "Name on card is required"
      if (!formData.cardExpiry.trim()) newErrors.cardExpiry = "Expiration date is required"
      if (!formData.cardCvc.trim()) newErrors.cardCvc = "CVC is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    if (!isAuthenticated) {
      navigate('/login?redirect=checkout');
      return;
    }

    setIsProcessing(true)

    try {
      // Create order data object
      const orderData = {
        orderItems: prepareOrderItems(),
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          postalCode: formData.zip,
          country: formData.country,
        },
        paymentMethod: formData.paymentMethod,
        itemsPrice: cartTotal,
        taxPrice: cartTotal * 0.1,  // 10% tax
        shippingPrice: 10.00,       // Flat rate shipping
        totalPrice: cartTotal + (cartTotal * 0.1) + 10.00
      };

      // Submit order to backend
      const createdOrder = await createOrder(orderData);

      // Redirect to confirmation page
      clearCart();
      navigate(`/order/${createdOrder._id}`);
    } catch (error) {
      console.error('Error during checkout:', error);
      // Show error message to user
    } finally {
      setIsProcessing(false);
    }
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
        <h1 className="text-3xl font-serif font-bold text-yellow-300 mb-8 text-center">Complete Your Mission</h1>

        {cartItems.length === 0 ? (
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
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-blue-900/40 backdrop-blur-sm rounded-lg p-6 border border-blue-400 shadow-lg shadow-blue-500/20">
                <h2 className="text-xl font-serif font-bold text-yellow-300 mb-6">Hero Information</h2>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="firstName" className="block text-white font-serif font-medium mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`w-full bg-blue-800/70 text-white border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 font-serif ${
                          errors.firstName ? "border-red-500" : "border-blue-600"
                        }`}
                        placeholder="John"
                      />
                      {errors.firstName && <p className="mt-1 text-sm text-red-400 font-serif">{errors.firstName}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-white font-serif font-medium mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`w-full bg-blue-800/70 text-white border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 font-serif ${
                          errors.lastName ? "border-red-500" : "border-blue-600"
                        }`}
                        placeholder="Doe"
                      />
                      {errors.lastName && <p className="mt-1 text-sm text-red-400 font-serif">{errors.lastName}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-white font-serif font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full bg-blue-800/70 text-white border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 font-serif ${
                          errors.email ? "border-red-500" : "border-blue-600"
                        }`}
                        placeholder="your@email.com"
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-400 font-serif">{errors.email}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-white font-serif font-medium mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-blue-800/70 text-white border border-blue-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 font-serif"
                        placeholder="(123) 456-7890"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="address" className="block text-white font-serif font-medium mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`w-full bg-blue-800/70 text-white border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 font-serif ${
                        errors.address ? "border-red-500" : "border-blue-600"
                      }`}
                      placeholder="123 Main Street"
                    />
                    {errors.address && <p className="mt-1 text-sm text-red-400 font-serif">{errors.address}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <label htmlFor="city" className="block text-white font-serif font-medium mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`w-full bg-blue-800/70 text-white border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 font-serif ${
                          errors.city ? "border-red-500" : "border-blue-600"
                        }`}
                        placeholder="New York"
                      />
                      {errors.city && <p className="mt-1 text-sm text-red-400 font-serif">{errors.city}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="state" className="block text-white font-serif font-medium mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className={`w-full bg-blue-800/70 text-white border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 font-serif ${
                          errors.state ? "border-red-500" : "border-blue-600"
                        }`}
                        placeholder="NY"
                      />
                      {errors.state && <p className="mt-1 text-sm text-red-400 font-serif">{errors.state}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="zip" className="block text-white font-serif font-medium mb-2">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        id="zip"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        className={`w-full bg-blue-800/70 text-white border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 font-serif ${
                          errors.zip ? "border-red-500" : "border-blue-600"
                        }`}
                        placeholder="10001"
                      />
                      {errors.zip && <p className="mt-1 text-sm text-red-400 font-serif">{errors.zip}</p>}
                    </div>
                  </div>

                  <div className="mb-8">
                    <label htmlFor="country" className="block text-white font-serif font-medium mb-2">
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full bg-blue-800/70 text-white border border-blue-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 font-serif"
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>

                  <div className="border-t border-blue-700 pt-6 mb-6">
                    <h2 className="text-xl font-serif font-bold text-yellow-300 mb-6">Power Source</h2>
                    
                    <div className="mb-6">
                      <label htmlFor="paymentMethod" className="block text-white font-serif font-medium mb-2">
                        Payment Method
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div 
                          className={`bg-blue-800/70 p-4 rounded-lg border-2 cursor-pointer ${
                            formData.paymentMethod === "credit-card" 
                              ? "border-yellow-300" 
                              : "border-transparent hover:border-blue-600"
                          }`}
                          onClick={() => setFormData({...formData, paymentMethod: "credit-card"})}
                        >
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="credit-card"
                              name="paymentMethod"
                              value="credit-card"
                              checked={formData.paymentMethod === "credit-card"}
                              onChange={handleChange}
                              className="h-4 w-4 text-yellow-400"
                            />
                            <label htmlFor="credit-card" className="ml-3 block text-white font-serif font-medium">
                              <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                                Credit Card
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {formData.paymentMethod === "credit-card" && (
                      <div className="bg-blue-900/50 p-4 rounded-lg">
                        <div className="mb-4">
                          <label htmlFor="cardNumber" className="block text-white font-serif font-medium mb-2">
                            Card Number
                          </label>
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            className={`w-full bg-blue-800/70 text-white border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 font-serif ${
                              errors.cardNumber ? "border-red-500" : "border-blue-600"
                            }`}
                            placeholder="1234 5678 9012 3456"
                          />
                          {errors.cardNumber && <p className="mt-1 text-sm text-red-400 font-serif">{errors.cardNumber}</p>}
                        </div>
                        
                        <div className="mb-4">
                          <label htmlFor="cardName" className="block text-white font-serif font-medium mb-2">
                            Name on Card
                          </label>
                          <input
                            type="text"
                            id="cardName"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleChange}
                            className={`w-full bg-blue-800/70 text-white border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 font-serif ${
                              errors.cardName ? "border-red-500" : "border-blue-600"
                            }`}
                            placeholder="John Doe"
                          />
                          {errors.cardName && <p className="mt-1 text-sm text-red-400 font-serif">{errors.cardName}</p>}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="cardExpiry" className="block text-white font-serif font-medium mb-2">
                              Expiration Date
                            </label>
                            <input
                              type="text"
                              id="cardExpiry"
                              name="cardExpiry"
                              value={formData.cardExpiry}
                              onChange={handleChange}
                              className={`w-full bg-blue-800/70 text-white border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 font-serif ${
                                errors.cardExpiry ? "border-red-500" : "border-blue-600"
                              }`}
                              placeholder="MM/YY"
                            />
                            {errors.cardExpiry && <p className="mt-1 text-sm text-red-400 font-serif">{errors.cardExpiry}</p>}
                          </div>
                          
                          <div>
                            <label htmlFor="cardCvc" className="block text-white font-serif font-medium mb-2">
                              CVC
                            </label>
                            <input
                              type="text"
                              id="cardCvc"
                              name="cardCvc"
                              value={formData.cardCvc}
                              onChange={handleChange}
                              className={`w-full bg-blue-800/70 text-white border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 font-serif ${
                                errors.cardCvc ? "border-red-500" : "border-blue-600"
                              }`}
                              placeholder="123"
                            />
                            {errors.cardCvc && <p className="mt-1 text-sm text-red-400 font-serif">{errors.cardCvc}</p>}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                      <Link to="/cart" className="text-center py-3 px-6 bg-blue-700 text-white font-serif font-bold rounded-md hover:bg-blue-600 transition-all transform hover:scale-105 shadow-md shadow-blue-600/50">
                        Return to Cart
                      </Link>
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="flex-1 px-6 py-3 rounded-md bg-purple-600 text-white font-serif font-medium hover:bg-purple-500 transition duration-300 text-center transform hover:scale-105 shadow-md shadow-purple-500/50"
                      >
                        {isProcessing ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          "Complete Your Mission"
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-blue-900/40 backdrop-blur-sm rounded-lg p-6 border border-blue-400 shadow-lg shadow-blue-500/20 sticky top-24">
                <h2 className="text-xl font-serif font-bold text-yellow-300 mb-6">Mission Summary</h2>
                
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2 mb-6">
                  {cartItems.map((item) => (
                    <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 pb-4 border-b border-blue-700">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-900 to-purple-900 rounded-md overflow-hidden">
                        <img
                          src={item.images[0] || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover mix-blend-luminosity"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-serif font-medium text-white">{item.name}</h3>
                        <p className="text-blue-300 text-sm font-serif">Size: {item.selectedSize}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm text-blue-300 font-serif">Qty: {item.quantity}</span>
                          <span className="font-serif font-medium text-white">
                            ${item.discount > 0
                              ? ((item.price * (1 - item.discount / 100)) * item.quantity).toFixed(2)
                              : (item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-blue-300 font-serif">
                    <span>Subtotal</span>
                    <span className="text-white">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-blue-300 font-serif">
                    <span>Shipping</span>
                    <span className="text-white">${(cartTotal > 50 ? 0 : 10).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-blue-300 font-serif">
                    <span>Tax (10%)</span>
                    <span className="text-white">${(cartTotal * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="pt-3 border-t border-blue-700 flex justify-between font-bold">
                    <span className="text-white font-serif">Total</span>
                    <span className="text-yellow-300 font-serif">${(cartTotal + (cartTotal > 50 ? 0 : 10) + (cartTotal * 0.1)).toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-blue-900/80 p-4 rounded-md">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <p className="text-sm text-blue-300 font-serif">
                      <span className="text-white font-medium">Secure Checkout</span> - Your identity is protected
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add global CSS for the theme */}
      <style jsx global>{`
        body {
          font-family: 'Cinzel', serif;
          background-color: #000;
          color: white;
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

export default CheckoutPage