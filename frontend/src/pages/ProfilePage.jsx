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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-indigo-900/50 rounded-lg p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-white mb-4">
                <img
                  src={selectedAvatar || "/images/avatars/default.png"}
                  alt={currentAvatarObject.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-xl font-bold text-white">{name || currentUser?.name || "User"}</h2>
              <p className="text-indigo-300 text-sm">{email || currentUser?.email || "user@example.com"}</p>
              <p className="text-yellow-400 text-xs mt-1">Avatar: {currentAvatarObject.name}</p>
            </div>

            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                  activeTab === "profile"
                    ? "bg-indigo-800 text-white"
                    : "text-indigo-300 hover:bg-indigo-800 hover:text-white"
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
                className={`w-full flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                  activeTab === "orders"
                    ? "bg-indigo-800 text-white"
                    : "text-indigo-300 hover:bg-indigo-800 hover:text-white"
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
                className={`w-full flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                  activeTab === "addresses"
                    ? "bg-indigo-800 text-white"
                    : "text-indigo-300 hover:bg-indigo-800 hover:text-white"
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
                className={`w-full flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                  activeTab === "wishlist"
                    ? "bg-indigo-800 text-white"
                    : "text-indigo-300 hover:bg-indigo-800 hover:text-white"
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
                className="w-full flex items-center px-4 py-2 rounded-md text-sm font-medium text-red-400 hover:bg-red-500/20 hover:text-red-300"
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
          <div className="bg-indigo-900/50 rounded-lg p-6">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div>
                <h2 className="text-xl font-bold text-white mb-6">Profile Information</h2>

                <form onSubmit={handleSaveProfile}>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-indigo-300 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="comic-input w-full bg-indigo-800 text-white border-indigo-700 focus:ring-yellow-400"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-indigo-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="comic-input w-full bg-indigo-800 text-white border-indigo-700 focus:ring-yellow-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-indigo-300 mb-3">
                        Choose Your Superhero Avatar
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {avatars.map((avatar) => (
                          <button
                            key={avatar.id}
                            type="button"
                            onClick={() => setSelectedAvatar(avatar.image)}
                            className={`relative rounded-lg overflow-hidden ${
                              selectedAvatar === avatar.image
                                ? "ring-4 ring-yellow-400"
                                : "hover:ring-2 hover:ring-indigo-500"
                            }`}
                          >
                            <div className="p-2 bg-indigo-800/50 text-center">
                              <img
                                src={avatar.image || "/placeholder.svg"}
                                alt={avatar.name}
                                className="w-full h-auto aspect-square object-cover mb-2"
                              />
                              <p className="text-xs text-white truncate">{avatar.name}</p>
                            </div>
                            {selectedAvatar === avatar.image && (
                              <div className="absolute inset-0 bg-yellow-400/30 flex items-center justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-8 w-8 text-white"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
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
                      <label htmlFor="password" className="block text-sm font-medium text-indigo-300 mb-1">
                        Change Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        placeholder="Enter new password"
                        className="comic-input w-full bg-indigo-800 text-white border-indigo-700 focus:ring-yellow-400"
                      />
                      <p className="text-xs text-indigo-400 mt-1">Leave blank to keep your current password</p>
                    </div>

                    <div className="pt-4">
                      <button type="submit" className="comic-button">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div>
                <h2 className="text-xl font-bold text-white mb-6">Order History</h2>

                {orders.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-indigo-800">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">
                            Order ID
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">
                            Items
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">
                            Total
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-indigo-800">
                        {orders.map((order) => (
                          <tr key={order.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{order.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-300">
                              {new Date(order.date).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-300">{order.items}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-300">
                              ${order.total.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  order.status === "Delivered"
                                    ? "bg-green-100 text-green-800"
                                    : order.status === "Processing"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {order.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-300">
                              <button className="text-yellow-300 hover:text-yellow-400">View Details</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 mx-auto text-indigo-400 mb-4"
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
                    <h3 className="text-lg font-medium text-white mb-2">No orders yet</h3>
                    <p className="text-indigo-300 mb-4">You haven't placed any orders yet.</p>
                    <button className="comic-button">Start Shopping</button>
                  </div>
                )}
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-white">Saved Addresses</h2>
                  <button className="comic-button text-sm">Add New Address</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className={`bg-indigo-800/50 rounded-lg p-4 border ${
                        address.isDefault ? "border-yellow-400" : "border-indigo-700"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-white">{address.name}</h3>
                        {address.isDefault && (
                          <span className="bg-yellow-400 text-indigo-950 text-xs font-bold px-2 py-1 rounded">
                            Default
                          </span>
                        )}
                      </div>

                      <div className="text-indigo-300 text-sm space-y-1 mb-4">
                        <p>{address.street}</p>
                        <p>
                          {address.city}, {address.state} {address.zip}
                        </p>
                        <p>{address.country}</p>
                      </div>

                      <div className="flex justify-between">
                        <div className="space-x-2">
                          <button className="text-yellow-300 hover:text-yellow-400 text-sm">Edit</button>
                          <button
                            onClick={() => handleDeleteAddress(address.id)}
                            className="text-red-400 hover:text-red-300 text-sm"
                          >
                            Delete
                          </button>
                        </div>

                        {!address.isDefault && (
                          <button
                            onClick={() => handleSetDefaultAddress(address.id)}
                            className="text-indigo-300 hover:text-white text-sm"
                          >
                            Set as Default
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
                <h2 className="text-xl font-bold text-white mb-6">My Wishlist</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* This would normally display the user's wishlist items */}
                  <div className="text-center py-8 col-span-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 mx-auto text-indigo-400 mb-4"
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
                    <h3 className="text-lg font-medium text-white mb-2">Your wishlist is empty</h3>
                    <p className="text-indigo-300 mb-4">Add items to your wishlist to save them for later.</p>
                    <button className="comic-button">Explore Products</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
