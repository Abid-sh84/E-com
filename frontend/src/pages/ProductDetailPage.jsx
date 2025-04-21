"use client"

import { useState, useEffect, useMemo, lazy, Suspense } from "react"
import { useParams, Link } from "react-router-dom"
import { useCart } from "../contexts/CartContext"
import { useWishlist } from "../contexts/WishlistContext"
import { products } from "../data/mockData"
// Use lazy loading for ProductCard components
const ProductCard = lazy(() => import("../components/ProductCard"))

const ProductDetailPage = () => {
  const { id } = useParams()
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("description")
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewTitle, setReviewTitle] = useState('')
  const [reviewText, setReviewText] = useState('')
  const [error, setError] = useState(null)
  
  // Generate random stars for cosmic background
  const [stars] = useState(() => 
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 2 + 1,
      animationDelay: `${Math.random() * 3}s`
    }))
  )

  const sizes = ["S", "M", "L", "XL", "XXL"]

  // Optimize product fetching with better error handling
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // Find product (simulated API call)
        const foundProduct = products.find(
          (p) => p.id.toString() === id.toString()
        )
        
        // Short delay to simulate API loading
        setTimeout(() => {
          if (!foundProduct) {
            setError("Product not found")
            setIsLoading(false)
            return
          }
          
          setProduct(foundProduct)
          
          // Default to first available size if there are sizes
          if (foundProduct.sizes && foundProduct.sizes.length > 0) {
            setSelectedSize(foundProduct.sizes[0])
          }
          
          // Check if item is in wishlist
          if (isInWishlist) {
            setIsWishlisted(isInWishlist(foundProduct.id))
          }
          
          setIsLoading(false)
        }, 300) // Reduced timeout for better performance
      } catch (err) {
        setError("Failed to load product")
        setIsLoading(false)
      }
    }
    
    fetchProduct()
  }, [id, isInWishlist])

  // Use memoization for related products to prevent unnecessary re-renders
  const relatedProducts = useMemo(() => {
    if (!product) return []
    
    return products
      .filter((p) => p.id !== product.id && p.universe === product.universe)
      .slice(0, 4)
  }, [product])

  const handleAddToCart = () => {
    if (!selectedSize) {
      return
    }

    // Add product to cart with selected options
    addToCart({
      ...product,
      selectedSize,
      quantity,
    })
  }

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id)
      setIsWishlisted(false)
    } else {
      addToWishlist(product)
      setIsWishlisted(true)
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1)
    }
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add review logic
      await createProductReview(id, {
        rating: reviewRating,
        title: reviewTitle,
        comment: reviewText
      });
      
      // Refresh product to show new review
      const updatedProduct = await getProductById(id);
      setProduct(updatedProduct);
      
      // Reset form
      setReviewRating(5);
      setReviewTitle('');
      setReviewText('');
    } catch (error) {
      console.error('Error submitting review:', error);
      setError("Failed to submit review. Please try again.");
    }
  };

  // Enhanced loading state with cosmic-themed skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen relative bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 overflow-hidden">
        {/* Cosmic background elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-indigo-950 to-black opacity-90"></div>
          
          {/* Random stars */}
          {stars.map(star => (
            <div 
              key={star.id}
              className="absolute rounded-full bg-white animate-pulse"
              style={{
                top: `${star.top}%`,
                left: `${star.left}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: Math.random() * 0.7 + 0.3,
                animationDuration: '3s',
                animationDelay: star.animationDelay
              }}
            ></div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Image skeleton */}
              <div className="bg-indigo-800/30 rounded-lg h-96 border border-indigo-700/50 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20" 
                     style={{
                       backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
                       backgroundSize: '20px 20px',
                     }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-4 border-yellow-300/30 border-t-yellow-300 rounded-full animate-spin"></div>
              </div>
              
              {/* Content skeleton */}
              <div className="space-y-6">
                <div className="h-8 bg-indigo-800/40 rounded w-3/4 border border-indigo-700/30"></div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-5 w-5 mr-1 bg-indigo-800/40 rounded-full border border-indigo-700/30"></div>
                  ))}
                </div>
                <div className="h-10 bg-indigo-800/40 rounded w-1/3 border border-indigo-700/30"></div>
                <div className="h-4 bg-indigo-800/40 rounded w-full border border-indigo-700/30"></div>
                <div className="h-4 bg-indigo-800/40 rounded w-5/6 border border-indigo-700/30"></div>
                <div className="flex gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-12 w-12 bg-indigo-800/40 rounded border border-indigo-700/30"></div>
                  ))}
                </div>
                <div className="h-12 bg-indigo-800/40 rounded w-full border border-indigo-700/30"></div>
              </div>
            </div>
            
            {/* Related products skeleton */}
            <div className="mt-16">
              <div className="h-8 bg-indigo-800/40 rounded w-1/4 mb-8 border border-indigo-700/30"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-indigo-800/40 rounded-lg h-64 border border-indigo-700/30"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="bg-indigo-900/80 backdrop-blur-sm p-8 rounded-xl border border-indigo-700/50 shadow-lg shadow-purple-900/30 text-center max-w-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-yellow-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-2xl font-bold text-white mb-4">Oops! Something went wrong</h2>
          <p className="text-indigo-300 mb-6">{error === "Product not found" ? "The product you're looking for doesn't exist or has been removed." : error}</p>
          <Link to="/products" className="inline-block px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-indigo-950 font-bold rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg">
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  // Main component rendering
  return (
    <div className="min-h-screen relative bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 overflow-hidden">
      {/* Cosmic background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-indigo-950 to-black opacity-90"></div>
        
        {/* Decorative vertical lines */}
        <div className="absolute top-0 left-1/4 w-px h-screen bg-blue-400 opacity-20" style={{boxShadow: '0 0 20px 5px rgba(96, 165, 250, 0.5)'}}></div>
        <div className="absolute top-0 left-2/4 w-px h-screen bg-purple-400 opacity-20" style={{boxShadow: '0 0 20px 5px rgba(192, 132, 252, 0.5)'}}></div>
        <div className="absolute top-0 left-3/4 w-px h-screen bg-yellow-400 opacity-20" style={{boxShadow: '0 0 20px 5px rgba(250, 204, 21, 0.5)'}}></div>
        
        {/* Random stars */}
        {stars.map(star => (
          <div 
            key={star.id}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: Math.random() * 0.7 + 0.3,
              animationDuration: '3s',
              animationDelay: star.animationDelay
            }}
          ></div>
        ))}
        
        {/* Glow effects */}
        <div className="absolute h-32 w-32 bg-blue-600/30 rounded-full blur-3xl top-1/4 left-1/4"></div>
        <div className="absolute h-32 w-32 bg-purple-600/30 rounded-full blur-3xl top-3/4 right-1/4"></div>
        <div className="absolute h-32 w-32 bg-yellow-500/20 rounded-full blur-3xl top-1/3 right-1/3"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Breadcrumbs */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-indigo-300">
            <li>
              <Link to="/" className="hover:text-yellow-300 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li>
              <Link to="/products" className="hover:text-yellow-300 transition-colors">
                Products
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li className="text-yellow-300 font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images with enhanced styling */}
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-indigo-900/80 backdrop-blur-sm rounded-xl overflow-hidden border border-indigo-700/50 shadow-lg shadow-purple-900/30 relative group">
              {/* Badge overlays */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                {product.isNew && (
                  <div className="bg-yellow-400 text-indigo-950 text-xs font-bold px-3 py-1 rounded-full shadow-lg transform transition-transform group-hover:scale-110 group-hover:rotate-3 flex items-center">
                    <span className="mr-1">✦</span> NEW
                  </div>
                )}
                {product.discount > 0 && (
                  <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg transform transition-transform group-hover:scale-110 group-hover:-rotate-3 flex items-center">
                    <span className="mr-1">⚡</span> {product.discount}% OFF
                  </div>
                )}
              </div>
              
              {/* Main image with cosmic overlay */}
              <div className="relative">
                <img
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-auto object-contain aspect-square transition-transform duration-700 group-hover:scale-105"
                  loading="eager" // Load main image immediately
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/50 to-transparent opacity-50 pointer-events-none"></div>
              </div>
            </div>

            {/* Thumbnail navigation with cosmic styling */}
            <div className="grid grid-cols-5 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`bg-gradient-to-r from-indigo-900/80 to-indigo-800/80 rounded-md overflow-hidden border-2 transition-all ${
                    selectedImage === index 
                      ? "border-yellow-400 shadow-md shadow-yellow-400/20" 
                      : "border-indigo-700/30 hover:border-indigo-500/50"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="w-full h-auto object-cover aspect-square"
                    loading="lazy" // Lazy load thumbnails
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info with cosmic styling */}
          <div className="bg-gradient-to-r from-indigo-900/40 via-purple-900/40 to-indigo-900/40 backdrop-blur-sm p-6 rounded-xl border border-indigo-700/50 shadow-lg shadow-purple-900/20">
            {product.isNew && (
              <span className="inline-block bg-gradient-to-r from-green-400 to-green-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 shadow-sm">
                NEW ARRIVAL
              </span>
            )}

            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-yellow-200 to-yellow-300 mb-3">
              {product.name}
            </h1>

            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 ${i < product.rating ? "text-yellow-400" : "text-gray-500"}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-indigo-300 ml-2">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            <div className="mb-6">
              {product.discount > 0 ? (
                <div className="flex items-center bg-indigo-900/50 p-3 rounded-lg border border-indigo-700/30">
                  <span className="text-3xl font-bold text-yellow-300">
                    ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                  </span>
                  <span className="text-xl text-indigo-400 line-through ml-3">${product.price.toFixed(2)}</span>
                  <span className="ml-auto bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    SAVE {product.discount}%
                  </span>
                </div>
              ) : (
                <div className="bg-indigo-900/50 p-3 rounded-lg border border-indigo-700/30">
                  <span className="text-3xl font-bold text-yellow-300">${product.price.toFixed(2)}</span>
                </div>
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-white mb-3">Size</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold transition-all duration-300 ${
                      selectedSize === size
                        ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-indigo-950 shadow-lg shadow-yellow-600/30"
                        : "bg-indigo-800/70 text-white hover:bg-indigo-700 border border-indigo-700/50"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {selectedSize === "" && (
                <p className="text-red-400 text-sm mt-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Please select a size
                </p>
              )}
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-medium text-white mb-3">Quantity</h3>
              <div className="flex items-center">
                <button
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className="w-12 h-12 rounded-l-lg bg-indigo-800/70 text-white flex items-center justify-center hover:bg-indigo-700/90 border border-indigo-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <div className="w-16 h-12 bg-white text-indigo-950 flex items-center justify-center font-bold border-y border-indigo-700/50">
                  {quantity}
                </div>
                <button
                  onClick={increaseQuantity}
                  disabled={quantity >= 10}
                  className="w-12 h-12 rounded-r-lg bg-indigo-800/70 text-white flex items-center justify-center hover:bg-indigo-700/90 border border-indigo-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              <p className="text-xs text-indigo-300 mt-2">Maximum: 10 per order</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-indigo-950 font-bold rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg shadow-yellow-900/20 flex-1 flex items-center justify-center"
                disabled={!selectedSize}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Add to Cart
              </button>

              <button
                onClick={handleWishlistToggle}
                className={`px-6 py-3 rounded-lg font-bold flex items-center justify-center transition-all duration-300 ${
                  isWishlisted
                    ? "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-400 hover:to-red-500 shadow-lg shadow-red-900/20"
                    : "bg-indigo-800/70 text-white hover:bg-indigo-700/90 border border-indigo-700/50"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 mr-2 ${isWishlisted ? "fill-white" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={isWishlisted ? 0 : 2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
              </button>
            </div>

            <div className="bg-indigo-900/50 rounded-lg p-4 mb-6 border border-indigo-700/30">
              <div className="flex items-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-white">In stock and ready to ship</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-white">Order within 12 hours for same-day dispatch</span>
              </div>
            </div>

            {/* Tabs with cosmic styling */}
            <div className="border-t border-indigo-700/50 pt-6">
              <div className="flex mb-4 border-b border-indigo-700/50">
                {["description", "details", "reviews"].map((tab) => (
                  <button
                    key={tab}
                    className={`pb-2 px-4 font-medium transition-all ${
                      activeTab === tab 
                        ? "text-yellow-300 border-b-2 border-yellow-300" 
                        : "text-indigo-300 hover:text-white"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    {tab === "reviews" && ` (${product.reviewCount})`}
                  </button>
                ))}
              </div>

              <div className="text-indigo-200 leading-relaxed">
                {activeTab === "description" && (
                  <p className="animate-fadeIn">
                    {product.description ||
                      "Experience the perfect blend of comfort and style with this premium superhero-themed t-shirt. Made from high-quality materials, this t-shirt features vibrant colors and detailed artwork that won't fade after washing. The breathable fabric ensures all-day comfort, whether you're out with friends or lounging at home."}
                  </p>
                )}

                {activeTab === "details" && (
                  <div className="space-y-4 animate-fadeIn">
                    <div>
                      <h4 className="font-medium text-white">Material</h4>
                      <p>60% combed ringspun cotton, 40% polyester jersey</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Care Instructions</h4>
                      <p>Machine wash cold with like colors, tumble dry low</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Features</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Premium quality print that won't crack or fade</li>
                        <li>Soft and comfortable fabric</li>
                        <li>Reinforced stitching for durability</li>
                        <li>Officially licensed design</li>
                        <li>Unisex fit</li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-white text-lg">{product.reviewCount} Reviews</h4>
                        <div className="flex items-center">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-5 w-5 ${i < product.rating ? "text-yellow-400" : "text-gray-500"}`}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-indigo-300 ml-2">{product.rating} out of 5</span>
                        </div>
                      </div>

                      <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold rounded-full hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg shadow-purple-900/20">
                        Write a Review
                      </button>
                    </div>

                    {/* Sample reviews with enhanced styling */}
                    <div className="space-y-6">
                      <div className="bg-indigo-900/30 rounded-lg p-4 border border-indigo-700/30">
                        <div className="flex items-center mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-4 w-4 ${i < 5 ? "text-yellow-400" : "text-gray-500"}`}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <h5 className="font-medium text-white ml-2">Amazing quality and design!</h5>
                        </div>
                        <p className="text-sm text-indigo-300 mb-2">By John D. on May 15, 2023</p>
                        <p>
                          This t-shirt exceeded my expectations! The fabric is super soft and comfortable, and the design
                          is even more vibrant in person. I've washed it several times and the colors haven't faded at
                          all. Definitely worth the price!
                        </p>
                      </div>

                      <div className="bg-indigo-900/30 rounded-lg p-4 border border-indigo-700/30">
                        <div className="flex items-center mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-4 w-4 ${i < 4 ? "text-yellow-400" : "text-gray-500"}`}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <h5 className="font-medium text-white ml-2">Great shirt, runs a bit small</h5>
                        </div>
                        <p className="text-sm text-indigo-300 mb-2">By Sarah M. on April 3, 2023</p>
                        <p>
                          I love the design and quality of this shirt! The only reason I'm giving it 4 stars instead of 5
                          is because it runs a bit smaller than expected. I'd recommend sizing up if you're between sizes.
                          Otherwise, it's perfect!
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products with cosmic styling */}
        <div className="mt-16 relative">
          {/* Decorative glow effect */}
          <div className="absolute -top-10 left-1/3 transform -translate-x-1/2 w-[300px] h-[100px] rounded-full bg-yellow-500/10 blur-3xl"></div>
          
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-white to-yellow-300 mb-8">You May Also Like</h2>

          <Suspense fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-indigo-800/40 rounded-lg h-64 border border-indigo-700/30 animate-pulse"></div>
              ))}
            </div>
          }>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  )
}

// Add this to your global CSS or create a new file if needed
const globalStyles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-in-out;
  }
`;

export default ProductDetailPage
