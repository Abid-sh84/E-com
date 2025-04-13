"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Create context with a default value
const WishlistContext = createContext({
  wishlistItems: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  isInWishlist: () => false,
});

// Export the hook separately from the provider component
export const useWishlist = () => useContext(WishlistContext);

// Define the provider component separately from the hook
export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([])

  useEffect(() => {
    // Load wishlist from localStorage
    const savedWishlist = localStorage.getItem("wishlist")
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist))
    }
  }, [])

  useEffect(() => {
    // Save wishlist to localStorage
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems))
  }, [wishlistItems])

  const addToWishlist = (product) => {
    setWishlistItems((prevItems) => {
      // Check if item already exists in wishlist
      const exists = prevItems.some((item) => item.id === product.id)

      if (exists) {
        return prevItems
      } else {
        return [...prevItems, product]
      }
    })
  }

  const removeFromWishlist = (productId) => {
    setWishlistItems((prevItems) => {
      return prevItems.filter((item) => item.id !== productId)
    })
  }

  // Updated function to correctly compare IDs by converting both to strings
  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id.toString() === productId.toString())
  }

  const value = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  }

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}
