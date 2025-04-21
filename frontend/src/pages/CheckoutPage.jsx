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
  const [showStars, setShowStars] = useState(true)

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
  const [checkoutStep, setCheckoutStep] = useState(1) // Track current checkout step
  
  // Create floating stars effect (same as cart/wishlist pages)
  useEffect(() => {
    const createStars = () => {
      if (!showStars) return;
      
      const starsContainer = document.getElementById('checkout-stars-container');
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

  const nextStep = () => {
    if (checkoutStep === 1) {
      // Validate shipping info before proceeding
      const shippingErrors = {};
      if (!formData.firstName.trim()) shippingErrors.firstName = "First name is required";
      if (!formData.lastName.trim()) shippingErrors.lastName = "Last name is required";
      if (!formData.email.trim()) shippingErrors.email = "Email is required";
      if (!formData.address.trim()) shippingErrors.address = "Address is required";
      if (!formData.city.trim()) shippingErrors.city = "City is required";
      if (!formData.state.trim()) shippingErrors.state = "State is required";
      if (!formData.zip.trim()) shippingErrors.zip = "ZIP code is required";
      
      if (Object.keys(shippingErrors).length > 0) {
        setErrors(shippingErrors);
        return;
      }
    }
    setCheckoutStep(2);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCheckoutStep(1);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-indigo-950 relative">
      {/* Stars container */}
      <div id="checkout-stars-container" className="fixed inset-0 pointer-events-none overflow-hidden"></div>
      
      {/* Cosmic rays */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-px h-screen bg-blue-400 opacity-20" style={{boxShadow: '0 0 20px 5px rgba(96, 165, 250, 0.5)'}}></div>
        <div className="absolute top-0 left-2/4 w-px h-screen bg-purple-400 opacity-20" style={{boxShadow: '0 0 20px 5px rgba(192, 132, 252, 0.5)'}}></div>
        <div className="absolute top-0 left-3/4 w-px h-screen bg-yellow-400 opacity-20" style={{boxShadow: '0 0 20px 5px rgba(250, 204, 21, 0.5)'}}></div>
      </div>
      
      {/* Glow effects */}
      <div className="absolute h-64 w-64 bg-blue-600/20 rounded-full blur-3xl top-1/4 left-1/4"></div>
      <div className="absolute h-64 w-64 bg-purple-600/20 rounded-full blur-3xl bottom-1/4 right-1/4"></div>
      <div className="absolute h-64 w-64 bg-yellow-500/10 rounded-full blur-3xl top-1/3 right-1/3"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-purple-400 to-blue-400 mb-2">
          COMPLETE YOUR ORDER
        </h1>
        <p className="text-center text-purple-300 mb-8">Ready to join the universe of heroes?</p>
        
        {/* Progress indicator */}
        <div className="flex items-center justify-center mb-12">
          <div className="relative flex items-center w-full max-w-3xl mx-auto">
            <div className={`w-1/2 h-1 ${checkoutStep > 1 ? 'bg-yellow-400' : 'bg-indigo-800'}`}></div>
            <div className={`w-1/2 h-1 ${checkoutStep > 2 ? 'bg-yellow-400' : 'bg-indigo-800'}`}></div>
            
            <div className="absolute left-0 -top-2 flex flex-col items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${checkoutStep >= 1 ? 'bg-yellow-400 text-indigo-900' : 'bg-indigo-800 text-white'} font-bold text-sm`}>1</div>
              <span className="text-xs mt-2 text-yellow-300">Shipping</span>
            </div>
            
            <div className="absolute left-1/2 -top-2 flex flex-col items-center -translate-x-1/2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${checkoutStep >= 2 ? 'bg-yellow-400 text-indigo-900' : 'bg-indigo-800 text-white'} font-bold text-sm`}>2</div>
              <span className="text-xs mt-2 text-yellow-300">Payment</span>
            </div>
            
            <div className="absolute right-0 -top-2 flex flex-col items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${checkoutStep >= 3 ? 'bg-yellow-400 text-indigo-900' : 'bg-indigo-800 text-white'} font-bold text-sm`}>3</div>
              <span className="text-xs mt-2 text-yellow-300">Confirmation</span>
            </div>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-indigo-900/80 backdrop-blur-md rounded-lg p-8 text-center border border-indigo-700/50 shadow-lg shadow-purple-900/30">
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
            <Link to="/products" className="inline-block px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-indigo-950 font-bold rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg shadow-yellow-900/20">
              DISCOVER HERO GEAR
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-indigo-900/80 backdrop-blur-md rounded-lg p-6 border border-indigo-700/50 shadow-lg shadow-purple-900/30 relative overflow-hidden">
                {/* Animated border glow */}
                <div className="absolute inset-0 border-4 border-transparent rounded-lg" style={{
                  background: 'linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.4), rgba(96, 165, 250, 0.4), rgba(250, 204, 21, 0.4), transparent) border-box',
                  WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  animation: 'borderRotate 4s linear infinite',
                  opacity: 0.6
                }}></div>
                
                {checkoutStep === 1 ? (
                  <div className="relative z-10 animate-fadeIn">
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-400 mb-6 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Shipping Information
                    </h2>
                    <form>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label htmlFor="firstName" className="block text-yellow-300 font-medium mb-2">
                            First Name
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              id="firstName"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              className={`w-full bg-indigo-800/70 text-white border-2 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 ${
                                errors.firstName ? "border-red-500" : "border-indigo-600 hover:border-indigo-500"
                              }`}
                              placeholder="John"
                            />
                            {errors.firstName && 
                              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                              </div>
                            }
                          </div>
                          {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
                        </div>
                        
                        <div>
                          <label htmlFor="lastName" className="block text-yellow-300 font-medium mb-2">
                            Last Name
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              id="lastName"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              className={`w-full bg-indigo-800/70 text-white border-2 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 ${
                                errors.lastName ? "border-red-500" : "border-indigo-600 hover:border-indigo-500"
                              }`}
                              placeholder="Doe"
                            />
                            {errors.lastName && 
                              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                              </div>
                            }
                          </div>
                          {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-yellow-300 font-medium mb-2">
                            Email
                          </label>
                          <div className="relative">
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className={`w-full bg-indigo-800/70 text-white border-2 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 ${
                                errors.email ? "border-red-500" : "border-indigo-600 hover:border-indigo-500"
                              }`}
                              placeholder="your@email.com"
                            />
                            {errors.email && 
                              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                              </div>
                            }
                          </div>
                          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-yellow-300 font-medium mb-2">
                            Phone
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full bg-indigo-800/70 text-white border-2 border-indigo-600 hover:border-indigo-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                            placeholder="(123) 456-7890"
                          />
                        </div>
                      </div>

                      <div className="mb-6">
                        <label htmlFor="address" className="block text-yellow-300 font-medium mb-2">
                          Address
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className={`w-full bg-indigo-800/70 text-white border-2 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 ${
                              errors.address ? "border-red-500" : "border-indigo-600 hover:border-indigo-500"
                            }`}
                            placeholder="123 Main Street"
                          />
                          {errors.address && 
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </div>
                          }
                        </div>
                        {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                          <label htmlFor="city" className="block text-yellow-300 font-medium mb-2">
                            City
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              id="city"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              className={`w-full bg-indigo-800/70 text-white border-2 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 ${
                                errors.city ? "border-red-500" : "border-indigo-600 hover:border-indigo-500"
                              }`}
                              placeholder="New York"
                            />
                            {errors.city && 
                              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                              </div>
                            }
                          </div>
                          {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
                        </div>
                        
                        <div>
                          <label htmlFor="state" className="block text-yellow-300 font-medium mb-2">
                            State
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              id="state"
                              name="state"
                              value={formData.state}
                              onChange={handleChange}
                              className={`w-full bg-indigo-800/70 text-white border-2 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 ${
                                errors.state ? "border-red-500" : "border-indigo-600 hover:border-indigo-500"
                              }`}
                              placeholder="NY"
                            />
                            {errors.state && 
                              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                              </div>
                            }
                          </div>
                          {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state}</p>}
                        </div>
                        
                        <div>
                          <label htmlFor="zip" className="block text-yellow-300 font-medium mb-2">
                            ZIP Code
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              id="zip"
                              name="zip"
                              value={formData.zip}
                              onChange={handleChange}
                              className={`w-full bg-indigo-800/70 text-white border-2 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 ${
                                errors.zip ? "border-red-500" : "border-indigo-600 hover:border-indigo-500"
                              }`}
                              placeholder="10001"
                            />
                            {errors.zip && 
                              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                              </div>
                            }
                          </div>
                          {errors.zip && <p className="mt-1 text-sm text-red-500">{errors.zip}</p>}
                        </div>
                      </div>

                      <div className="mb-8">
                        <label htmlFor="country" className="block text-yellow-300 font-medium mb-2">
                          Country
                        </label>
                        <select
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          className="w-full bg-indigo-800/70 text-white border-2 border-indigo-600 hover:border-indigo-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                        >
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Australia">Australia</option>
                        </select>
                      </div>

                      <div className="mt-8 text-right">
                        <button
                          type="button"
                          onClick={nextStep}
                          className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-indigo-950 font-bold rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg shadow-yellow-900/20 flex items-center ml-auto"
                        >
                          <span>Continue to Payment</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="relative z-10 animate-fadeIn">
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-400 mb-6 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Payment Information
                    </h2>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-6">
                        <label htmlFor="paymentMethod" className="block text-yellow-300 font-medium mb-2">
                          Payment Method
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div 
                            className={`bg-gradient-to-r relative overflow-hidden ${
                              formData.paymentMethod === "credit-card" 
                                ? "from-indigo-800/90 to-purple-800/90 border-yellow-400" 
                                : "from-indigo-900/50 to-indigo-900/50 border-transparent hover:border-indigo-600"
                            } p-4 rounded-lg border-2 cursor-pointer transition-all duration-300`}
                            onClick={() => setFormData({...formData, paymentMethod: "credit-card"})}
                          >
                            {formData.paymentMethod === "credit-card" && (
                              <div className="absolute inset-0 bg-yellow-400/10 animate-pulse"></div>
                            )}
                            <div className="flex items-center relative z-10">
                              <input
                                type="radio"
                                id="credit-card"
                                name="paymentMethod"
                                value="credit-card"
                                checked={formData.paymentMethod === "credit-card"}
                                onChange={handleChange}
                                className="h-4 w-4 text-yellow-400 focus:ring-yellow-400/50 border-indigo-600"
                              />
                              <label htmlFor="credit-card" className="ml-3 block text-white font-medium">
                                <div className="flex items-center">
                                  <div className="mr-3 p-2 bg-gradient-to-r from-yellow-400/20 to-yellow-400/10 rounded-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                  </div>
                                  <div>
                                    <div className="text-white font-bold">Credit Card</div>
                                    <div className="text-xs text-indigo-300">Visa, Mastercard, Amex</div>
                                  </div>
                                </div>
                              </label>
                            </div>
                          </div>
                          
                          <div 
                            className={`bg-gradient-to-r relative overflow-hidden ${
                              formData.paymentMethod === "paypal" 
                                ? "from-indigo-800/90 to-purple-800/90 border-yellow-400" 
                                : "from-indigo-900/50 to-indigo-900/50 border-transparent hover:border-indigo-600"
                            } p-4 rounded-lg border-2 cursor-pointer transition-all duration-300`}
                            onClick={() => setFormData({...formData, paymentMethod: "paypal"})}
                          >
                            {formData.paymentMethod === "paypal" && (
                              <div className="absolute inset-0 bg-yellow-400/10 animate-pulse"></div>
                            )}
                            <div className="flex items-center relative z-10">
                              <input
                                type="radio"
                                id="paypal"
                                name="paymentMethod"
                                value="paypal"
                                checked={formData.paymentMethod === "paypal"}
                                onChange={handleChange}
                                className="h-4 w-4 text-yellow-400 focus:ring-yellow-400/50 border-indigo-600"
                              />
                              <label htmlFor="paypal" className="ml-3 block text-white font-medium">
                                <div className="flex items-center">
                                  <div className="mr-3 p-2 bg-gradient-to-r from-blue-500/20 to-blue-500/10 rounded-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                  </div>
                                  <div>
                                    <div className="text-white font-bold">PayPal</div>
                                    <div className="text-xs text-indigo-300">Fast & secure payment</div>
                                  </div>
                                </div>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      {formData.paymentMethod === "credit-card" && (
                        <div className="bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-indigo-900/80 p-5 rounded-lg border border-indigo-700/50 animate-fadeIn">
                          <div className="mb-4">
                            <label htmlFor="cardNumber" className="block text-yellow-300 font-medium mb-2">
                              Card Number
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                id="cardNumber"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleChange}
                                className={`w-full bg-indigo-800/70 text-white border-2 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 ${
                                  errors.cardNumber ? "border-red-500" : "border-indigo-600 hover:border-indigo-500"
                                }`}
                                placeholder="1234 5678 9012 3456"
                              />
                              {errors.cardNumber && 
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                  </svg>
                                </div>
                              }
                              <div className="absolute right-12 top-1/2 -translate-y-1/2 flex space-x-1">
                                <div className="w-8 h-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded"></div>
                                <div className="w-5 h-5 bg-yellow-400 rounded-full"></div>
                              </div>
                            </div>
                            {errors.cardNumber && <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>}
                          </div>
                          
                          <div className="mb-4">
                            <label htmlFor="cardName" className="block text-yellow-300 font-medium mb-2">
                              Name on Card
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                id="cardName"
                                name="cardName"
                                value={formData.cardName}
                                onChange={handleChange}
                                className={`w-full bg-indigo-800/70 text-white border-2 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 ${
                                  errors.cardName ? "border-red-500" : "border-indigo-600 hover:border-indigo-500"
                                }`}
                                placeholder="John Doe"
                              />
                              {errors.cardName && 
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                  </svg>
                                </div>
                              }
                            </div>
                            {errors.cardName && <p className="mt-1 text-sm text-red-500">{errors.cardName}</p>}
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="cardExpiry" className="block text-yellow-300 font-medium mb-2">
                                Expiration Date
                              </label>
                              <div className="relative">
                                <input
                                  type="text"
                                  id="cardExpiry"
                                  name="cardExpiry"
                                  value={formData.cardExpiry}
                                  onChange={handleChange}
                                  className={`w-full bg-indigo-800/70 text-white border-2 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 ${
                                    errors.cardExpiry ? "border-red-500" : "border-indigo-600 hover:border-indigo-500"
                                  }`}
                                  placeholder="MM/YY"
                                />
                                {errors.cardExpiry && 
                                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                }
                              </div>
                              {errors.cardExpiry && <p className="mt-1 text-sm text-red-500">{errors.cardExpiry}</p>}
                            </div>
                            
                            <div>
                              <label htmlFor="cardCvc" className="block text-yellow-300 font-medium mb-2">
                                CVC
                              </label>
                              <div className="relative">
                                <input
                                  type="text"
                                  id="cardCvc"
                                  name="cardCvc"
                                  value={formData.cardCvc}
                                  onChange={handleChange}
                                  className={`w-full bg-indigo-800/70 text-white border-2 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 ${
                                    errors.cardCvc ? "border-red-500" : "border-indigo-600 hover:border-indigo-500"
                                  }`}
                                  placeholder="123"
                                />
                                {errors.cardCvc && 
                                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                  </svg>
                                </div>
                                }
                              </div>
                              {errors.cardCvc && <p className="mt-1 text-sm text-red-500">{errors.cardCvc}</p>}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {formData.paymentMethod === "paypal" && (
                        <div className="bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-indigo-900/80 p-5 rounded-lg border border-indigo-700/50 animate-fadeIn">
                          <p className="text-indigo-300 mb-4">
                            You will be redirected to PayPal to complete your purchase securely.
                          </p>
                          <div className="flex items-center gap-4 bg-indigo-800/50 p-4 rounded-lg">
                            <div className="p-3 bg-blue-500/20 rounded-full">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <p className="text-sm text-indigo-200">
                              After clicking "Complete Order", you'll be redirected to PayPal to finalize your payment securely, then returned to our site.
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="px-6 py-3 bg-indigo-800 hover:bg-indigo-700 text-white font-bold rounded-lg transition-all duration-300 flex items-center justify-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                          </svg>
                          Back to Shipping
                        </button>
                        
                        <button
                          type="submit"
                          disabled={isProcessing}
                          className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-indigo-950 font-bold rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg shadow-yellow-900/20 flex-1 flex items-center justify-center"
                        >
                          {isProcessing ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processing...
                            </>
                          ) : (
                            <>
                              <span>Complete Order</span>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-indigo-900/80 backdrop-blur-md rounded-lg border border-indigo-700/50 shadow-lg shadow-purple-900/30 p-6 sticky top-24">
                {/* Animated corner decorations */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-yellow-400/70"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-purple-400/70"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-400/70"></div>
                
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-400 mb-6 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Order Summary
                </h2>
                
                <div className="space-y-4 max-h-80 overflow-y-auto pr-2 mb-6 custom-scrollbar">
                  {cartItems.map((item) => (
                    <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 pb-4 border-b border-indigo-700/50 group">
                      <div className="w-20 h-20 bg-indigo-900/50 rounded-md overflow-hidden border border-indigo-700/50 group-hover:border-yellow-400/50 transition-colors duration-300 relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-indigo-800/70 group-hover:opacity-0 transition-opacity duration-300"></div>
                        <img
                          src={item.images?.[0] || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-white group-hover:text-yellow-300 transition-colors duration-300">{item.name}</h3>
                        <div className="flex items-center mt-1">
                          <span className="text-xs font-medium bg-purple-800/70 text-purple-300 px-2 py-0.5 rounded-full">Size: {item.selectedSize}</span>
                          <span className="ml-2 text-xs font-medium bg-indigo-800/70 text-indigo-300 px-2 py-0.5 rounded-full">Qty: {item.quantity}</span>
                        </div>
                        <div className="flex justify-end items-center mt-2">
                          {item.discount > 0 ? (
                            <div className="flex flex-col items-end">
                              <span className="font-bold text-yellow-300">
                                ${((item.price * (1 - item.discount / 100)) * item.quantity).toFixed(2)}
                              </span>
                              <span className="text-xs text-indigo-400 line-through">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          ) : (
                            <span className="font-bold text-yellow-300">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6 bg-indigo-900/50 p-4 rounded-lg border border-indigo-700/50">
                  <div className="flex justify-between items-center">
                    <span className="text-indigo-300">Subtotal</span>
                    <span className="font-medium text-white">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-indigo-300">Shipping</span>
                    {cartTotal > 50 ? (
                      <span className="font-medium text-green-400">FREE</span>
                    ) : (
                      <span className="font-medium text-white">${(10).toFixed(2)}</span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-indigo-300">Tax (10%)</span>
                    <span className="font-medium text-white">${(cartTotal * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="pt-3 border-t border-indigo-700/50 flex justify-between font-bold">
                    <span className="text-white">Total</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-400 text-xl">
                      ${(cartTotal + (cartTotal > 50 ? 0 : 10) + (cartTotal * 0.1)).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="bg-indigo-900/80 p-4 rounded-md border border-indigo-700/50">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-900/30 rounded-full mr-3 border border-green-700/50">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-white font-medium">Secure Checkout</p>
                      <p className="text-xs text-indigo-300">
                        All transactions are encrypted and secure
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add CSS for animations */}
      <style jsx global>{`
        @keyframes borderRotate {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
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
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(30, 27, 75, 0.3);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.7);
        }
      `}</style>
    </div>
  )
}

export default CheckoutPage
