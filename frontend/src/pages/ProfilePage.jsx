"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const avatars = [
  { id: 1, name: "Superman", image: "https://res.cloudinary.com/dkmakj50l/image/upload/v1744354387/WhatsApp_Image_2025-04-11_at_12.13.25_PM-removebg-preview_g2ad1m.png" },
  { id: 2, name: "Batman", image: "https://res.cloudinary.com/dkmakj50l/image/upload/v1744354388/WhatsApp_Image_2025-04-11_at_12.14.29_PM-removebg-preview_ftyxmr.png" },
  { id: 3, name: "Spider-Man", image: "https://res.cloudinary.com/dkmakj50l/image/upload/v1744354387/WhatsApp_Image_2025-04-11_at_12.12.57_PM-removebg-preview_rzrzds.png" },
  { id: 4, name: "Wonder Woman", image: "https://res.cloudinary.com/dkmakj50l/image/upload/v1744354388/WhatsApp_Image_2025-04-11_at_12.14.15_PM-removebg-preview_asrzmc.png" },
  { id: 5, name: "Iron Man", image: "https://res.cloudinary.com/dkmakj50l/image/upload/v1744354387/WhatsApp_Image_2025-04-11_at_12.12.12_PM-removebg-preview_dqcxf3.png" },
  { id: 6, name: "Captain America", image: "https://res.cloudinary.com/dkmakj50l/image/upload/v1744354387/WhatsApp_Image_2025-04-11_at_12.12.41_PM-removebg-preview_bgghul.png" },
  { id: 7, name: "Black Widow", image: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/169.jpg" },
  { id: 8, name: "Hulk", image: "https://res.cloudinary.com/dkmakj50l/image/upload/v1744354387/WhatsApp_Image_2025-04-11_at_12.13.41_PM-removebg-preview_hdpju2.png" },
]

const ProfilePage = () => {
  const { currentUser, logout, updateUserAvatar } = useAuth()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState("profile")
  const [name, setName] = useState(currentUser?.name || "")
  const [email, setEmail] = useState(currentUser?.email || "")
  const [selectedAvatar, setSelectedAvatar] = useState(currentUser?.avatar || avatars[0].image)

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Home",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
      isDefault: true,
    },
    {
      id: 2,
      name: "Work",
      street: "456 Office Blvd",
      city: "San Francisco",
      state: "CA",
      zip: "94107",
      country: "United States",
      isDefault: false,
    },
  ])

  const [orders, setOrders] = useState([
    {
      id: "ORD-1234",
      date: "2023-05-10",
      total: 89.97,
      status: "Delivered",
      items: 3,
    },
    {
      id: "ORD-5678",
      date: "2023-04-22",
      total: 34.99,
      status: "Processing",
      items: 1,
    },
    {
      id: "ORD-9012",
      date: "2023-03-15",
      total: 124.95,
      status: "Delivered",
      items: 4,
    },
  ])

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const handleSaveProfile = (e) => {
    e.preventDefault()
    // Update the user profile including avatar
    updateUserAvatar(selectedAvatar)
    
    // This would normally make an API call to update the user profile
    // For demo purposes, we'll just show a success message
    alert("Profile updated successfully!")
  }

  const handleSetDefaultAddress = (id) => {
    setAddresses(
      addresses.map((address) => ({
        ...address,
        isDefault: address.id === id,
      })),
    )
  }

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter((address) => address.id !== id))
  }

  // Immediately update avatar when selected (optional, can be removed if you want to update only on save)
  useEffect(() => {
    if (selectedAvatar !== currentUser?.avatar && selectedAvatar) {
      updateUserAvatar(selectedAvatar)
    }
  }, [selectedAvatar])

  // Find current avatar object for display name
  const currentAvatarObject = avatars.find(avatar => avatar.image === selectedAvatar) || avatars[0]

  return (
    <div className="min-h-screen bg-gray-950 bg-[url('/images/starry-night-bg.jpg')] bg-cover bg-fixed bg-blend-overlay">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-yellow-300 mb-8 text-center comic-font">My Superhero Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-indigo-950/80 rounded-lg p-6 border-2 border-purple-600 shadow-lg shadow-purple-500/20">
              <div className="flex flex-col items-center mb-6">
                <div className="w-28 h-28 rounded-full overflow-hidden bg-white mb-4 border-4 border-yellow-400 shadow-lg shadow-yellow-400/30">
                  <img
                    src={selectedAvatar || "/images/avatars/default.png"}
                    alt={currentAvatarObject.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-xl font-bold text-yellow-300">{name || currentUser?.name || "User"}</h2>
                <p className="text-blue-300 text-sm">{email || currentUser?.email || "user@example.com"}</p>
                <p className="text-yellow-400 text-xs mt-1 font-bold">Avatar: {currentAvatarObject.name}</p>
              </div>

              <nav className="space-y-3">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center px-4 py-3 rounded-md text-sm font-bold transform transition hover:scale-105 ${
                    activeTab === "profile"
                      ? "bg-purple-800/80 text-yellow-300 border-l-4 border-yellow-400"
                      : "text-blue-300 hover:bg-purple-900 hover:text-yellow-300"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Profile
                </button>

                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full flex items-center px-4 py-3 rounded-md text-sm font-bold transform transition hover:scale-105 ${
                    activeTab === "orders"
                      ? "bg-purple-800/80 text-yellow-300 border-l-4 border-yellow-400"
                      : "text-blue-300 hover:bg-purple-900 hover:text-yellow-300"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3"
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
                  Orders
                </button>

                <button
                  onClick={() => setActiveTab("addresses")}
                  className={`w-full flex items-center px-4 py-3 rounded-md text-sm font-bold transform transition hover:scale-105 ${
                    activeTab === "addresses"
                      ? "bg-purple-800/80 text-yellow-300 border-l-4 border-yellow-400"
                      : "text-blue-300 hover:bg-purple-900 hover:text-yellow-300"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Addresses
                </button>

                <button
                  onClick={() => setActiveTab("wishlist")}
                  className={`w-full flex items-center px-4 py-3 rounded-md text-sm font-bold transform transition hover:scale-105 ${
                    activeTab === "wishlist"
                      ? "bg-purple-800/80 text-yellow-300 border-l-4 border-yellow-400"
                      : "text-blue-300 hover:bg-purple-900 hover:text-yellow-300"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3"
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
                  Wishlist
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-3 rounded-md text-sm font-bold text-red-400 hover:bg-red-900/30 hover:text-red-300 transform transition hover:scale-105"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="bg-indigo-950/80 rounded-lg p-6 border-2 border-purple-600 shadow-lg shadow-purple-500/20">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div>
                  <h2 className="text-2xl font-bold text-yellow-300 mb-6 comic-font">Superhero Identity</h2>

                  <form onSubmit={handleSaveProfile}>
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-blue-300 mb-1">
                          Secret Identity (Name)
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-indigo-900 text-yellow-300 border-2 border-blue-500 rounded-md px-4 py-2 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-blue-300 mb-1">
                          Communication Device (Email)
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-indigo-900 text-yellow-300 border-2 border-blue-500 rounded-md px-4 py-2 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
                        />
                      </div>

                      <div>
                        <label className="block text-lg font-bold text-blue-300 mb-3">
                          Choose Your Superhero Avatar
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                          {avatars.map((avatar) => (
                            <button
                              key={avatar.id}
                              type="button"
                              onClick={() => setSelectedAvatar(avatar.image)}
                              className={`relative rounded-lg overflow-hidden transform transition hover:scale-105 ${
                                selectedAvatar === avatar.image
                                  ? "ring-4 ring-yellow-400"
                                  : "ring-1 ring-purple-500 hover:ring-2 hover:ring-blue-500"
                              }`}
                            >
                              <div className="p-2 bg-indigo-900 text-center">
                                <img
                                  src={avatar.image || "/placeholder.svg"}
                                  alt={avatar.name}
                                  className="w-full h-auto aspect-square object-cover mb-2"
                                />
                                <p className="text-xs text-yellow-300 font-bold truncate">{avatar.name}</p>
                              </div>
                              {selectedAvatar === avatar.image && (
                                <div className="absolute inset-0 bg-yellow-400/30 flex items-center justify-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-white drop-shadow-lg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={3}
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="password" className="block text-sm font-medium text-blue-300 mb-1">
                          Secret Code (Password)
                        </label>
                        <input
                          type="password"
                          id="password"
                          placeholder="Enter new secret code"
                          className="w-full bg-indigo-900 text-yellow-300 border-2 border-blue-500 rounded-md px-4 py-2 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
                        />
                        <p className="text-xs text-blue-400 mt-1">Leave blank to keep your current secret code</p>
                      </div>

                      <div className="pt-4">
                        <button 
                          type="submit" 
                          className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-400 text-purple-900 font-bold rounded-md hover:from-yellow-400 hover:to-yellow-300 transform transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg shadow-yellow-500/30"
                        >
                          SAVE IDENTITY
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div>
                  <h2 className="text-2xl font-bold text-yellow-300 mb-6 comic-font">Mission History</h2>

                  {orders.length > 0 ? (
                    <div className="overflow-x-auto bg-indigo-900/50 rounded-lg border border-purple-500">
                      <table className="min-w-full divide-y divide-purple-700">
                        <thead>
                          <tr className="bg-purple-900/50">
                            <th className="px-6 py-3 text-left text-xs font-bold text-blue-300 uppercase tracking-wider">
                              Mission ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-blue-300 uppercase tracking-wider">
                              Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-blue-300 uppercase tracking-wider">
                              Items
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-blue-300 uppercase tracking-wider">
                              Total
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-blue-300 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-blue-300 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-purple-700">
                          {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-purple-900/30 transition">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-yellow-300">{order.id}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-300">
                                {new Date(order.date).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-300">{order.items}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-300">
                                ${order.total.toFixed(2)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`px-3 py-1 inline-flex text-xs font-bold rounded-full ${
                                    order.status === "Delivered"
                                      ? "bg-green-900 text-green-300 border border-green-500"
                                      : order.status === "Processing"
                                        ? "bg-yellow-900 text-yellow-300 border border-yellow-500"
                                        : "bg-blue-900 text-blue-300 border border-blue-500"
                                  }`}
                                >
                                  {order.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <button className="text-yellow-400 hover:text-yellow-300 font-bold transition">View Details</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-indigo-900/30 rounded-lg border border-purple-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 mx-auto text-blue-400 mb-4"
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
                      <h3 className="text-xl font-bold text-yellow-300 mb-2">No missions yet</h3>
                      <p className="text-blue-300 mb-6">You haven't accepted any missions yet.</p>
                      <button className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-400 text-purple-900 font-bold rounded-md hover:from-yellow-400 hover:to-yellow-300 transform transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg shadow-yellow-500/30">
                        FIND A MISSION
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === "addresses" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-yellow-300 comic-font">Secret Hideouts</h2>
                    <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-md hover:from-blue-500 hover:to-blue-400 transform transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-md shadow-blue-500/30">
                      ADD NEW HIDEOUT
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className={`bg-indigo-900/60 rounded-lg p-5 border-2 ${
                          address.isDefault ? "border-yellow-400 shadow-md shadow-yellow-400/20" : "border-purple-600"
                        } transition hover:bg-indigo-800/60`}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-bold text-lg text-yellow-300">{address.name}</h3>
                          {address.isDefault && (
                            <span className="bg-yellow-400 text-purple-900 text-xs font-bold px-3 py-1 rounded-full">
                              PRIMARY
                            </span>
                          )}
                        </div>

                        <div className="text-blue-300 text-sm space-y-1 mb-4">
                          <p>{address.street}</p>
                          <p>
                            {address.city}, {address.state} {address.zip}
                          </p>
                          <p>{address.country}</p>
                        </div>

                        <div className="flex justify-between">
                          <div className="space-x-4">
                            <button className="text-yellow-400 hover:text-yellow-300 text-sm font-bold transition">EDIT</button>
                            <button
                              onClick={() => handleDeleteAddress(address.id)}
                              className="text-red-400 hover:text-red-300 text-sm font-bold transition"
                            >
                              DELETE
                            </button>
                          </div>

                          {!address.isDefault && (
                            <button
                              onClick={() => handleSetDefaultAddress(address.id)}
                              className="text-blue-300 hover:text-blue-200 text-sm font-bold transition"
                            >
                              SET AS PRIMARY
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === "wishlist" && (
                <div>
                  <h2 className="text-2xl font-bold text-yellow-300 mb-6 comic-font">Gadget Wishlist</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* This would normally display the user's wishlist items */}
                    <div className="text-center py-12 bg-indigo-900/30 rounded-lg border border-purple-600 col-span-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 mx-auto text-blue-400 mb-4"
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
                      <h3 className="text-xl font-bold text-yellow-300 mb-2">Your gadget wishlist is empty</h3>
                      <p className="text-blue-300 mb-6">Add superhero gadgets to your wishlist to save them for later.</p>
                      <button className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-400 text-purple-900 font-bold rounded-md hover:from-yellow-400 hover:to-yellow-300 transform transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg shadow-yellow-500/30">
                        EXPLORE GADGETS
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage