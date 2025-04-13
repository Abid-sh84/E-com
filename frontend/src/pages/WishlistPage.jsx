"use client"
import { Link } from "react-router-dom"
import { useWishlist } from "../contexts/WishlistContext"
import { useCart } from "../contexts/CartContext"

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()

  const handleRemoveItem = (id) => {
    removeFromWishlist(id)
  }

  const handleAddToCart = (product) => {
    addToCart(product, 1, "M", product.colors ? product.colors[0] : "Default")
    // Optionally remove from wishlist after adding to cart
    // removeFromWishlist(product.id);
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-white mb-8">Your Wishlist</h1>

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
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <h2 className="text-xl font-bold text-white mb-2">Your wishlist is empty</h2>
          <p className="text-indigo-300 mb-6">Add your favorite items to your wishlist to save them for later.</p>
          <Link to="/products" className="comic-button">
            Explore Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Your Wishlist</h1>
        <button onClick={clearWishlist} className="text-indigo-300 hover:text-yellow-300 text-sm font-medium">
          Clear Wishlist
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistItems.map((item) => (
          <div key={item.id} className="bg-indigo-900/50 rounded-lg overflow-hidden">
            <div className="relative">
              <Link to={`/products/${item.id}`}>
                <img
                  src={item.images?.[0] || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-64 object-cover"
                />
              </Link>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="absolute top-2 right-2 bg-white/80 hover:bg-white p-2 rounded-full transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4">
              <Link to={`/products/${item.id}`} className="block mb-1">
                <h3 className="font-bold text-white hover:text-yellow-300 transition-colors">{item.name}</h3>
              </Link>

              {item.universe && (
                <span className="text-xs font-medium bg-indigo-800 text-indigo-300 px-2 py-0.5 rounded">
                  {item.universe}
                </span>
              )}

              <div className="flex items-center justify-between mt-3">
                <div>
                  {item.discount > 0 ? (
                    <div className="flex items-center">
                      <span className="font-bold text-white">
                        ${(item.price * (1 - item.discount / 100)).toFixed(2)}
                      </span>
                      <span className="text-indigo-400 line-through ml-2 text-sm">${item.price.toFixed(2)}</span>
                    </div>
                  ) : (
                    <span className="font-bold text-white">${item.price?.toFixed(2) || "29.99"}</span>
                  )}
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-yellow-400 hover:bg-yellow-300 text-indigo-950 px-3 py-1 rounded-md text-sm font-medium transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link to="/products" className="text-yellow-300 hover:text-yellow-400 flex items-center justify-center">
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
  )
}

export default WishlistPage
