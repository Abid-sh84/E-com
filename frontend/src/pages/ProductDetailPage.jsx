"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useCart } from "../contexts/CartContext"
import { useWishlist } from "../contexts/WishlistContext"
import { products } from "../data/mockData"
import ProductCard from "../components/ProductCard"

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

  const sizes = ["S", "M", "L", "XL", "XXL"]

  useEffect(() => {
    // Simulate loading data
    setIsLoading(true)

    // Find the product with the matching ID - using parseInt to ensure we're comparing numbers
    // Updated to handle both string and number IDs correctly
    const foundProduct = products.find(
      (p) => p.id.toString() === id.toString()
    )

    setTimeout(() => {
      setProduct(foundProduct)
      if (foundProduct) {
        // Default to first available size if there are sizes
        if (foundProduct.sizes && foundProduct.sizes.length > 0) {
          setSelectedSize(foundProduct.sizes[0])
        }
        
        // Check if item is in wishlist
        if (isInWishlist) {
          setIsWishlisted(isInWishlist(foundProduct.id))
        }
      }
      setIsLoading(false)
    }, 500)
  }, [id, isInWishlist])

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size")
      return
    }

    // Make sure we're passing the complete product object with the selected size and quantity
    addToCart({
      ...product,
      selectedSize,
      quantity,
    })

    // Show confirmation
    alert(`${product.name} (${selectedSize}) added to cart!`)
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
    // Add review logic
    try {
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
      // Show error to user
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-indigo-300/20 rounded-lg h-96"></div>
            <div className="space-y-4">
              <div className="h-8 bg-indigo-300/20 rounded w-3/4"></div>
              <div className="h-6 bg-indigo-300/20 rounded w-1/4"></div>
              <div className="h-4 bg-indigo-300/20 rounded w-full"></div>
              <div className="h-4 bg-indigo-300/20 rounded w-full"></div>
              <div className="h-10 bg-indigo-300/20 rounded w-1/3 mt-6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Product Not Found</h2>
        <p className="text-indigo-300 mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/products" className="comic-button">
          Back to Products
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumbs */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-indigo-300">
          <li>
            <Link to="/" className="hover:text-yellow-300">
              Home
            </Link>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li>
            <Link to="/products" className="hover:text-yellow-300">
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
        {/* Product Images */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg overflow-hidden">
            <img
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-auto object-contain aspect-square"
            />
          </div>

          <div className="grid grid-cols-5 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`bg-white rounded-md overflow-hidden border-2 ${selectedImage === index ? "border-yellow-400" : "border-transparent"}`}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className="w-full h-auto object-cover aspect-square"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          {product.isNew && (
            <span className="inline-block bg-green-500 text-white text-xs font-bold px-2 py-1 rounded mb-2">
              NEW ARRIVAL
            </span>
          )}

          <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>

          <div className="flex items-center mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${i < product.rating ? "text-yellow-400" : "text-gray-400"}`}
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
              <div className="flex items-center">
                <span className="text-3xl font-bold text-white">
                  ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                </span>
                <span className="text-xl text-indigo-400 line-through ml-3">${product.price.toFixed(2)}</span>
                <span className="ml-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  {product.discount}% OFF
                </span>
              </div>
            ) : (
              <span className="text-3xl font-bold text-white">${product.price.toFixed(2)}</span>
            )}
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-white mb-2">Size</h3>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 rounded-md flex items-center justify-center font-bold transition-all
                    ${
                      selectedSize === size
                        ? "bg-yellow-400 text-indigo-950"
                        : "bg-indigo-800 text-white hover:bg-indigo-700"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {selectedSize === "" && <p className="text-red-400 text-sm mt-2">Please select a size</p>}
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium text-white mb-2">Quantity</h3>
            <div className="flex items-center">
              <button
                onClick={decreaseQuantity}
                className="w-10 h-10 rounded-l-md bg-indigo-800 text-white flex items-center justify-center hover:bg-indigo-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <div className="w-16 h-10 bg-white text-indigo-950 flex items-center justify-center font-bold">
                {quantity}
              </div>
              <button
                onClick={increaseQuantity}
                className="w-10 h-10 rounded-r-md bg-indigo-800 text-white flex items-center justify-center hover:bg-indigo-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={handleAddToCart}
              className="comic-button flex-1 flex items-center justify-center"
              disabled={!selectedSize}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
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
              Add to Cart
            </button>

            <button
              onClick={handleWishlistToggle}
              className={`px-6 py-3 rounded-md font-bold flex items-center justify-center transition-all
                ${
                  isWishlisted
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-indigo-800 text-white hover:bg-indigo-700"
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

          <div className="bg-indigo-900/50 rounded-lg p-4 mb-6">
            <div className="flex items-center mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-yellow-400 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-white">In stock and ready to ship</span>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-yellow-400 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-white">Order within 12 hours for same-day dispatch</span>
            </div>
          </div>

          <div className="border-t border-indigo-800 pt-6">
            <div className="flex mb-4 border-b border-indigo-800">
              <button
                className={`pb-2 px-4 font-medium ${activeTab === "description" ? "text-yellow-300 border-b-2 border-yellow-300" : "text-indigo-300 hover:text-white"}`}
                onClick={() => setActiveTab("description")}
              >
                Description
              </button>
              <button
                className={`pb-2 px-4 font-medium ${activeTab === "details" ? "text-yellow-300 border-b-2 border-yellow-300" : "text-indigo-300 hover:text-white"}`}
                onClick={() => setActiveTab("details")}
              >
                Details
              </button>
              <button
                className={`pb-2 px-4 font-medium ${activeTab === "reviews" ? "text-yellow-300 border-b-2 border-yellow-300" : "text-indigo-300 hover:text-white"}`}
                onClick={() => setActiveTab("reviews")}
              >
                Reviews ({product.reviewCount})
              </button>
            </div>

            <div className="text-indigo-200 leading-relaxed">
              {activeTab === "description" && (
                <p>
                  {product.description ||
                    "Experience the perfect blend of comfort and style with this premium superhero-themed t-shirt. Made from high-quality materials, this t-shirt features vibrant colors and detailed artwork that won't fade after washing. The breathable fabric ensures all-day comfort, whether you're out with friends or lounging at home."}
                </p>
              )}

              {activeTab === "details" && (
                <div className="space-y-4">
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
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-white text-lg">{product.reviewCount} Reviews</h4>
                      <div className="flex items-center">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              className={`h-5 w-5 ${i < product.rating ? "text-yellow-400" : "text-gray-400"}`}
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

                    <button className="comic-button text-sm">Write a Review</button>
                  </div>

                  {/* Sample reviews */}
                  <div className="space-y-4">
                    <div className="border-b border-indigo-800 pb-4">
                      <div className="flex items-center mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              className={`h-4 w-4 ${i < 5 ? "text-yellow-400" : "text-gray-400"}`}
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

                    <div className="border-b border-indigo-800 pb-4">
                      <div className="flex items-center mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              className={`h-4 w-4 ${i < 4 ? "text-yellow-400" : "text-gray-400"}`}
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

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-yellow-300 mb-8">You May Also Like</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products
            .filter((p) => p.id !== product.id && p.universe === product.universe)
            .slice(0, 4)
            .map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
