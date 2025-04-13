"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Create context with default value
const CartContext = createContext({
  cartItems: [],
  cartTotal: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
});

// Export the hook separately
export const useCart = () => useContext(CartContext)

// Define the provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [cartTotal, setCartTotal] = useState(0)

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    // Save cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cartItems))

    // Calculate total
    const total = cartItems.reduce((sum, item) => {
      const price = item.discount > 0 ? item.price * (1 - item.discount / 100) : item.price
      return sum + price * item.quantity
    }, 0)

    setCartTotal(total)
  }, [cartItems])

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === product.id && item.selectedSize === product.selectedSize,
      )

      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += product.quantity || 1
        return updatedItems
      } else {
        // Add new item to cart
        return [...prevItems, { ...product, quantity: product.quantity || 1 }]
      }
    })
  }

  const removeFromCart = (id, size) => {
    setCartItems((prevItems) => prevItems.filter((item) => !(item.id === id && item.selectedSize === size)))
  }

  const updateQuantity = (id, size, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id && item.selectedSize === size ? { ...item, quantity } : item)),
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  // Prepare cart data for order creation
  const prepareOrderItems = () => {
    return cartItems.map(item => ({
      product: item._id,
      name: item.name,
      image: item.images[0],
      price: item.discount > 0 
        ? item.price * (1 - item.discount / 100) 
        : item.price,
      size: item.selectedSize,
      quantity: item.quantity
    }))
  }

  const value = {
    cartItems,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    prepareOrderItems  // Add this function to the context
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
