"use client"

import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const avatars = [
  { id: 1, name: "Superman", image: "https://res.cloudinary.com/dkmakj50l/image/upload/v1744447073/superman_avatar_geflb0.png" },
  { id: 2, name: "Batman", image: "https://res.cloudinary.com/dkmakj50l/image/upload/v1744447071/batman_avatar_crky4z.png" },
  { id: 3, name: "Spider-Man", image: "https://res.cloudinary.com/dkmakj50l/image/upload/v1744447073/spiderman_avatar_bfyiei.png" },
  { id: 4, name: "Wonder Woman", image: "https://res.cloudinary.com/dkmakj50l/image/upload/v1744447073/wonder_woman_avatar_cvdaqz.png" },
  { id: 5, name: "Iron Man", image: "https://res.cloudinary.com/dkmakj50l/image/upload/v1744447072/ironman_avatar_q5damd.png" },
  { id: 6, name: "Captain America", image: "https://res.cloudinary.com/dkmakj50l/image/upload/v1744447071/captain_america_avatar_yuwoay.png" },
  { id: 7, name: "Black Widow", image: "https://res.cloudinary.com/dkmakj50l/image/upload/v1744447071/black_widow_avatar_vftmap.png" },
  { id: 8, name: "Hulk", image: "https://res.cloudinary.com/dkmakj50l/image/upload/v1744447072/hulk_avatar_ddfg7j.png" },
  { id: 9, name: "Thor", image: "https://res.cloudinary.com/dkmakj50l/image/upload/v1744447073/thor_avatar_f82ndd.png" },
  { id: 10, name: "Captain Marvel", image: "https://res.cloudinary.com/dkmakj50l/image/upload/v1744447071/captain_marvel_avatar_ze1ozd.png" },
  { id: 11, name: "Wolverine", image: "https://res.cloudinary.com/dkmakj50l/image/upload/v1744447073/wolverine_avatar_ltqbwk.png" },
  { id: 12, name: "Doctor Strange", image: "https://res.cloudinary.com/dkmakj50l/image/upload/v1744447072/dr_strange_avatar_yh1zpb.png" }
]

const DEFAULT_AVATAR = "https://res.cloudinary.com/dkmakj50l/image/upload/v1744447073/superman_avatar_geflb0.png"

const ProfilePage = () => {
  const { currentUser, logout, updateUserAvatar, updateUserProfile, updateUserPassword } = useAuth()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState("profile")
  const [name, setName] = useState(currentUser?.name || "")
  const [email, setEmail] = useState(currentUser?.email || "")
  const [selectedAvatar, setSelectedAvatar] = useState(currentUser?.avatar || DEFAULT_AVATAR)
  const [password, setPassword] = useState("")
  const [showStars, setShowStars] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "")
      setEmail(currentUser.email || "")
      setSelectedAvatar(currentUser.avatar || DEFAULT_AVATAR)
    }
  }, [currentUser])

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

  useEffect(() => {
    const createStars = () => {
      if (!showStars) return;
      
      const starsContainer = document.getElementById('profile-stars-container');
      if (!starsContainer) return;
      
      starsContainer.innerHTML = '';
      
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

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const handleSaveProfile = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      await updateUserProfile(name, email)
      
      if (selectedAvatar !== currentUser?.avatar) {
        await updateUserAvatar(selectedAvatar)
      }
      
      if (password.trim() !== "") {
        await updateUserPassword(password)
        setPassword("")
      }
      
      const successToast = document.getElementById('success-toast')
      if (successToast) {
        successToast.classList.remove('hidden')
        setTimeout(() => {
          successToast.classList.add('hidden')
        }, 3000)
      }
    } catch (error) {
      console.error("Error updating profile:", error)
    } finally {
      setIsLoading(false)
    }
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

  useEffect(() => {
    if (currentUser && !currentUser.avatar) {
      updateUserAvatar(DEFAULT_AVATAR)
    }
  }, [])

  const currentAvatarObject = avatars.find(avatar => avatar.image === selectedAvatar) || 
    { id: 0, name: "Default Hero", image: DEFAULT_AVATAR }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-indigo-950 relative py-12">
      <div id="success-toast" className="fixed top-24 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-500 hidden z-50 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        Profile updated successfully!
      </div>

      <div id="profile-stars-container" className="fixed inset-0 pointer-events-none overflow-hidden"></div>
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-px h-screen bg-blue-400 opacity-20" style={{boxShadow: '0 0 20px 5px rgba(96, 165, 250, 0.5)'}}></div>
        <div className="absolute top-0 left-2/4 w-px h-screen bg-purple-400 opacity-20" style={{boxShadow: '0 0 20px 5px rgba(192, 132, 252, 0.5)'}}></div>
        <div className="absolute top-0 left-3/4 w-px h-screen bg-yellow-400 opacity-20" style={{boxShadow: '0 0 20px 5px rgba(250, 204, 21, 0.5)'}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-purple-400 to-blue-400 mb-8 text-center">
          HERO HEADQUARTERS
        </h1>
        <p className="text-center text-indigo-300 mb-12 max-w-2xl mx-auto">
          Customize your superhero profile, manage your orders, addresses and wishlist all in one place
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-yellow-600/30 rounded-xl blur-lg"></div>
              
              <div className="relative bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-indigo-900/80 backdrop-blur-md rounded-xl border border-indigo-700/50 p-6 shadow-lg shadow-purple-900/30">
                <div className="flex flex-col items-center mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-purple-500 rounded-full blur-md opacity-70"></div>
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-yellow-400 mb-4">
                      <img
                        src={selectedAvatar || DEFAULT_AVATAR}
                        alt={currentAvatarObject.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-bold text-white">{name || currentUser?.name || "Hero Name"}</h2>
                  <p className="text-indigo-300 text-sm">{email || currentUser?.email || "hero@example.com"}</p>
                  <p className="text-yellow-400 text-xs mt-2 bg-indigo-800/50 px-3 py-1 rounded-full">Avatar: {currentAvatarObject.name}</p>
                </div>

                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activeTab === "profile"
                        ? "bg-gradient-to-r from-indigo-800 to-purple-800 text-white shadow-md"
                        : "text-indigo-300 hover:bg-indigo-800/50 hover:text-white"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 mr-3 ${activeTab === "profile" ? "text-yellow-400" : "text-indigo-400"}`}
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
                    className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activeTab === "orders"
                        ? "bg-gradient-to-r from-indigo-800 to-purple-800 text-white shadow-md"
                        : "text-indigo-300 hover:bg-indigo-800/50 hover:text-white"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 mr-3 ${activeTab === "orders" ? "text-yellow-400" : "text-indigo-400"}`}
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
                    className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activeTab === "addresses"
                        ? "bg-gradient-to-r from-indigo-800 to-purple-800 text-white shadow-md"
                        : "text-indigo-300 hover:bg-indigo-800/50 hover:text-white"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 mr-3 ${activeTab === "addresses" ? "text-yellow-400" : "text-indigo-400"}`}
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
                    className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activeTab === "wishlist"
                        ? "bg-gradient-to-r from-indigo-800 to-purple-800 text-white shadow-md"
                        : "text-indigo-300 hover:bg-indigo-800/50 hover:text-white"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 mr-3 ${activeTab === "wishlist" ? "text-yellow-400" : "text-indigo-400"}`}
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
                    className="w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all duration-300 mt-6 border border-red-900/30"
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

                <div className="absolute -bottom-3 -right-3 transform rotate-12">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-yellow-600/30 rounded-xl blur-lg"></div>
              
              <div className="relative bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-indigo-900/80 backdrop-blur-md rounded-xl border border-indigo-700/50 p-6 shadow-lg shadow-purple-900/30">
                {activeTab === "profile" && (
                  <div>
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-400 mb-6">
                      Your Hero Identity
                    </h2>

                    <form onSubmit={handleSaveProfile}>
                      <div className="space-y-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-indigo-300 mb-1">
                            Hero Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-indigo-800/50 border border-indigo-700 rounded-lg focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 text-white p-3"
                            placeholder="Enter your hero name"
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-indigo-300 mb-1">
                            Secret Identity Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-indigo-800/50 border border-indigo-700 rounded-lg focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 text-white p-3"
                            placeholder="your.email@example.com"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-indigo-300 mb-3">
                            Choose Your Hero Avatar
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {avatars.map((avatar) => (
                              <button
                                key={avatar.id}
                                type="button"
                                onClick={() => setSelectedAvatar(avatar.image)}
                                className={`relative overflow-hidden rounded-lg transform transition-all duration-300 ${
                                  selectedAvatar === avatar.image
                                    ? "ring-4 ring-yellow-400 scale-105"
                                    : "hover:ring-2 hover:ring-purple-500 hover:scale-105"
                                }`}
                              >
                                <div className="p-4 bg-gradient-to-b from-indigo-800/80 to-indigo-900/80 text-center overflow-hidden group">
                                  <div className="relative w-full overflow-hidden rounded-full mb-3 aspect-square">
                                    <div className={`absolute inset-0 rounded-full ${selectedAvatar === avatar.image ? 'bg-gradient-to-r from-yellow-400/50 to-purple-500/50' : ''}`}></div>
                                    <img
                                      src={avatar.image}
                                      alt={avatar.name}
                                      className="w-full h-full object-cover rounded-full aspect-square relative z-10 transition-all duration-300 group-hover:scale-110"
                                    />
                                  </div>
                                  <p className="text-xs font-semibold text-white truncate">{avatar.name}</p>
                                </div>
                                {selectedAvatar === avatar.image && (
                                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-purple-500/30 flex items-center justify-center">
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
                            Update Secret Password
                          </label>
                          <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password"
                            className="w-full bg-indigo-800/50 border border-indigo-700 rounded-lg focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 text-white p-3"
                          />
                          <p className="text-xs text-indigo-400 mt-1">Leave blank to keep your current password</p>
                        </div>

                        <div className="pt-6">
                          <button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full flex justify-center items-center py-3 px-6 bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-indigo-950 font-bold rounded-lg transform hover:scale-105 transition-all duration-300 shadow-md shadow-yellow-600/30"
                          >
                            {isLoading ? (
                              <>
                                <svg
                                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-950"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Updating Profile...
                              </>
                            ) : (
                              "Update Hero Profile"
                            )}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}

                {activeTab === "orders" && (
                  <div>
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-400 mb-6">
                      Your Mission History
                    </h2>

                    {orders.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-indigo-800/70">
                          <thead>
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-yellow-300 uppercase tracking-wider">
                                Mission ID
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-yellow-300 uppercase tracking-wider">
                                Date
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-yellow-300 uppercase tracking-wider">
                                Items
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-yellow-300 uppercase tracking-wider">
                                Total
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-yellow-300 uppercase tracking-wider">
                                Status
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-yellow-300 uppercase tracking-wider">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-indigo-900/30 divide-y divide-indigo-800/50">
                            {orders.map((order) => (
                              <tr key={order.id} className="hover:bg-indigo-800/30 transition-colors">
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
                                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                      order.status === "Delivered"
                                        ? "bg-green-900/50 text-green-300 border border-green-700/50"
                                        : order.status === "Processing"
                                          ? "bg-yellow-900/50 text-yellow-300 border border-yellow-700/50"
                                          : "bg-blue-900/50 text-blue-300 border border-blue-700/50"
                                    }`}
                                  >
                                    {order.status}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                  <button className="text-yellow-400 hover:text-yellow-300 transition-colors font-medium">View Details</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-16 bg-indigo-900/30 rounded-lg border border-indigo-800/50">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-full flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-indigo-400"
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
                        <h3 className="text-lg font-medium text-white mb-2">No missions yet</h3>
                        <p className="text-indigo-300 mb-6">You haven't acquired any hero gear yet.</p>
                        <Link to="/products" className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-indigo-950 font-bold rounded-lg transform hover:scale-105 transition-all duration-300 inline-flex items-center shadow-lg">
                          Start Shopping
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "addresses" && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-400">
                        Secret Hideouts
                      </h2>
                      <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-lg transform hover:scale-105 transition-all duration-300 inline-flex items-center shadow-md shadow-purple-900/30">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Add New Hideout
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {addresses.map((address) => (
                        <div
                          key={address.id}
                          className={`relative overflow-hidden bg-gradient-to-r ${
                            address.isDefault 
                              ? 'from-indigo-800/80 to-purple-800/80' 
                              : 'from-indigo-900/80 to-indigo-800/80'
                          } rounded-lg p-6 border ${
                            address.isDefault ? "border-yellow-500/50" : "border-indigo-700/50"
                          } transform hover:scale-[1.02] transition-all duration-300 shadow-lg`}
                        >
                          {address.isDefault && (
                            <div className="absolute -right-10 -top-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl"></div>
                          )}
                          
                          <div className="flex justify-between items-start mb-4 relative">
                            <h3 className="font-bold text-white text-lg">{address.name}</h3>
                            {address.isDefault && (
                              <span className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-indigo-950 text-xs font-bold px-3 py-1 rounded-full">
                                Default
                              </span>
                            )}
                          </div>

                          <div className="text-indigo-200 space-y-2 mb-6 relative">
                            <p>{address.street}</p>
                            <p>
                              {address.city}, {address.state} {address.zip}
                            </p>
                            <p>{address.country}</p>
                          </div>

                          <div className="flex justify-between relative">
                            <div className="space-x-3">
                              <button className="text-yellow-400 hover:text-yellow-300 font-medium text-sm transition-colors">
                                <span className="flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                  </svg>
                                  Edit
                                </span>
                              </button>
                              <button
                                onClick={() => handleDeleteAddress(address.id)}
                                className="text-red-400 hover:text-red-300 font-medium text-sm transition-colors"
                              >
                                <span className="flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                  </svg>
                                  Delete
                                </span>
                              </button>
                            </div>

                            {!address.isDefault && (
                              <button
                                onClick={() => handleSetDefaultAddress(address.id)}
                                className="text-indigo-300 hover:text-white font-medium text-sm transition-colors"
                              >
                                <span className="flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                  </svg>
                                  Set as Default
                                </span>
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "wishlist" && (
                  <div>
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-400 mb-6">
                      Hero Gear Wishlist
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="col-span-full">
                        <div className="text-center py-16 bg-indigo-900/30 rounded-lg border border-indigo-800/50">
                          <div className="relative mb-6">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="h-24 w-24 rounded-full bg-gradient-to-r from-yellow-400 to-purple-600 opacity-20 blur-xl"></div>
                            </div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-16 w-16 mx-auto text-yellow-400 relative"
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
                          </div>
                          <h3 className="text-xl font-medium text-white mb-3">Your wishlist awaits heroes!</h3>
                          <p className="text-indigo-300 mb-6 max-w-md mx-auto">Save your favorite cosmic collectibles and superhero gear for your next adventure.</p>
                          <Link to="/products" className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-indigo-950 font-bold rounded-lg transform hover:scale-105 transition-all duration-300 inline-flex items-center shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                            Explore Hero Gear
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx="true">{`
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
      `}</style>
    </div>
  )
}

export default ProfilePage
