"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import { getProducts } from "../api/products"
import { products as mockProducts, categories } from "../data/mockData"

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filteredProducts, setFilteredProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilters, setActiveFilters] = useState({
    category: searchParams.get("category") || "",
    universe: searchParams.get("universe") || "",
    type: searchParams.get("type") || "",
    priceRange: searchParams.get("price") || "",
    sortBy: searchParams.get("sort") || "newest",
  })
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    count: 0
  })

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Add cosmic effect state
  const [stars, setStars] = useState([])

  // Generate random stars for background effect
  useEffect(() => {
    const generateStars = () => {
      const starCount = 50;
      const newStars = [];
      
      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          top: Math.random() * 100, // % position
          left: Math.random() * 100, // % position
          size: Math.random() * 2 + 1, // px size between 1-3px
          animationDuration: Math.random() * 3 + 2, // seconds between 2-5s
          animationDelay: Math.random() * 2, // seconds between 0-2s
        });
      }
      
      setStars(newStars);
    };
    
    generateStars();
  }, []);

  const tShirtTypes = [
    "Oversized",
    "Acid Wash",
    "Graphic Printed",
    "Solid Color",
    "Polo",
    "Sleeveless",
    "Long Sleeve",
    "Henley",
    "Hooded",
    "Crop Top",
  ]

  const universes = [
    "Marvel",
    "DC Comics",
    "Anime",
    "Classic Comics",
    "Sci-Fi & Fantasy",
    "Video Games",
    "Custom Fan Art",
  ]

  const priceRanges = [
    { id: "under-20", name: "Under $20", range: [0, 20] },
    { id: "20-30", name: "$20 - $30", range: [20, 30] },
    { id: "30-40", name: "$30 - $40", range: [30, 40] },
    { id: "over-40", name: "Over $40", range: [40, 1000] },
  ]

  const sortOptions = [
    { value: "newest", label: "Newest Arrivals" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "popularity", label: "Most Popular" },
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm) {
      const filtered = mockProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredProducts(filtered)
    } else {
      fetchProducts()
    }
  }

  const clearSearch = () => {
    setSearchTerm("")
    fetchProducts()
  }

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const params = {};
      if (activeFilters.category) params.category = activeFilters.category;
      if (activeFilters.universe) params.universe = activeFilters.universe;
      if (activeFilters.type) params.type = activeFilters.type;
      if (activeFilters.priceRange) params.price = activeFilters.priceRange;
      if (activeFilters.sortBy) params.sort = activeFilters.sortBy;
      
      setSearchParams(params);
      
      try {
        const result = await getProducts(activeFilters, pagination.page);
        
        if (result && result.products && result.products.length > 0) {
          setFilteredProducts(result.products);
          setPagination({
            page: result.page || 1,
            pages: result.pages || 1,
            count: result.count || result.products.length
          });
        } else {
          setFilteredProducts(mockProducts);
          setPagination({
            page: 1,
            pages: 1,
            count: mockProducts.length
          });
        }
      } catch (error) {
        setFilteredProducts(mockProducts);
        setPagination({
          page: 1,
          pages: 1,
          count: mockProducts.length
        });
      }
    } catch (error) {
      setFilteredProducts(mockProducts);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setFilteredProducts(mockProducts);
    fetchProducts();
  }, [activeFilters, pagination.page, setSearchParams]);

  const handleFilterChange = (filterType, value) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType] === value ? "" : value,
    }))
  }

  const clearAllFilters = () => {
    setActiveFilters({
      category: "",
      universe: "",
      type: "",
      priceRange: "",
      sortBy: "newest",
    })
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced cosmic background with stars that match HomePage */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-indigo-950 to-black opacity-90"></div>
        
        {/* Animated cosmic rays */}
        <div className="absolute top-0 left-1/4 w-px h-screen bg-blue-400 opacity-20" style={{boxShadow: '0 0 20px 5px rgba(96, 165, 250, 0.5)'}}></div>
        <div className="absolute top-0 left-2/4 w-px h-screen bg-purple-400 opacity-20" style={{boxShadow: '0 0 20px 5px rgba(192, 132, 252, 0.5)'}}></div>
        <div className="absolute top-0 left-3/4 w-px h-screen bg-yellow-400 opacity-20" style={{boxShadow: '0 0 20px 5px rgba(250, 204, 21, 0.5)'}}></div>
        
        {/* Random stars */}
        {stars.map(star => (
          <div 
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: Math.random() * 0.7 + 0.3,
              animation: `twinkle ${star.animationDuration}s ease-in-out infinite`,
              animationDelay: `${star.animationDelay}s`
            }}
          />
        ))}

        {/* Larger glowing stars */}
        <div className="absolute h-2 w-2 bg-white rounded-full top-24 left-[15%] animate-pulse" 
             style={{boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.7)'}}></div>
        <div className="absolute h-3 w-3 bg-blue-200 rounded-full top-56 left-[35%] animate-pulse" 
             style={{boxShadow: '0 0 15px 5px rgba(191, 219, 254, 0.7)', animationDelay: '0.3s'}}></div>
        <div className="absolute h-2 w-2 bg-yellow-200 rounded-full top-32 left-[65%] animate-pulse" 
             style={{boxShadow: '0 0 10px 3px rgba(254, 240, 138, 0.7)', animationDelay: '0.7s'}}></div>
        <div className="absolute h-2 w-2 bg-purple-200 rounded-full top-80 left-[85%] animate-pulse" 
             style={{boxShadow: '0 0 12px 4px rgba(233, 213, 255, 0.7)', animationDelay: '1.1s'}}></div>
        <div className="absolute h-4 w-4 bg-white rounded-full top-64 left-[25%] animate-pulse" 
             style={{boxShadow: '0 0 20px 5px rgba(255, 255, 255, 0.7)', animationDelay: '1.5s'}}></div>
        
        {/* Nebula-like effects */}
        <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-3xl"></div>
        <div className="absolute top-[50%] right-[10%] w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-3xl"></div>
        <div className="absolute bottom-[10%] left-[30%] w-[500px] h-[500px] rounded-full bg-yellow-500/5 blur-3xl"></div>

        {/* Shooting star animation */}
        <div className="absolute top-[20%] left-0 w-[150px] h-[1px] bg-white transform -rotate-[15deg]"
             style={{
               boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.8)',
               animation: 'shootingstar 5s linear infinite',
               animationDelay: '3s'
             }}></div>
        <div className="absolute top-[60%] left-[20%] w-[100px] h-[1px] bg-white transform -rotate-[25deg]"
             style={{
               boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.8)',
               animation: 'shootingstar 7s linear infinite',
               animationDelay: '1s'
             }}></div>
      </div>

      {/* Add global animations for the cosmic effects */}
      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        
        @keyframes shootingstar {
          0% { transform: translateX(0) translateY(0) rotate(-15deg); opacity: 0; }
          10% { opacity: 1; }
          70% { opacity: 1; }
          100% { transform: translateX(1000px) translateY(300px) rotate(-15deg); opacity: 0; }
        }
      `}</style>

      <div className="relative z-10 bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          {/* Cosmic grid background effect for hero section */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 opacity-20" 
                 style={{
                   backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px), radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)',
                   backgroundSize: '30px 30px, 15px 15px',
                   backgroundPosition: '0 0, 15px 15px'
                 }}></div>
            
            {/* Hero section glow effects */}
            <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-yellow-400/20 blur-3xl"></div>
            <div className="absolute -top-20 left-1/4 transform -translate-x-1/2 w-[300px] h-[200px] rounded-full bg-blue-400/20 blur-3xl"></div>
            <div className="absolute -top-20 right-1/4 transform translate-x-1/2 w-[300px] h-[200px] rounded-full bg-purple-400/20 blur-3xl"></div>
          </div>
          
          {/* Keep the rest of the hero content */}
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-white to-yellow-300 mb-4 text-center">Superhero Collection</h1>
          <p className="text-indigo-200 text-center text-lg max-w-2xl mx-auto">Find the perfect superhero t-shirt that matches your style from our exclusive collection</p>
          
          {/* Rest of the existing search form */}
          <form onSubmit={handleSearch} className="mt-8 max-w-2xl mx-auto relative">
            <div className="relative">
              <input
                type="text"
                className="w-full py-3 pl-12 pr-10 rounded-full bg-indigo-800/60 backdrop-blur-sm border border-indigo-700/50 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all duration-300"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              {searchTerm && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-indigo-300 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <button type="submit" className="absolute right-1 top-1 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-indigo-950 font-bold py-2 px-6 rounded-full transform hover:scale-105 transition-all duration-300">
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:hidden mb-4">
            <button
              type="button"
              className="w-full bg-gradient-to-r from-indigo-800 to-indigo-700 text-white px-4 py-3 rounded-lg flex items-center justify-center border border-indigo-600 shadow-lg shadow-indigo-900/50 hover:from-indigo-700 hover:to-indigo-600 transition-all duration-300"
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-yellow-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              Filter Products
            </button>

            {mobileFiltersOpen && (
              <div className="fixed inset-0 z-40 overflow-y-auto p-4 bg-indigo-950/90 backdrop-blur-sm">
                <div className="bg-gradient-to-b from-indigo-900 to-indigo-950 rounded-lg p-6 max-w-md mx-auto border border-indigo-700/50 shadow-lg shadow-purple-900/30">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-yellow-300">Filter Products</h2>
                    <button
                      type="button"
                      className="text-indigo-300 hover:text-white transition-colors"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-6 text-white">
                    <div>
                      <h3 className="font-bold text-yellow-300 mb-3">Categories</h3>
                      <div className="space-y-2 pl-2">
                        {categories.map((category) => (
                          <div key={category.id} className="flex items-center">
                            <input
                              id={`mobile-category-${category.id}`}
                              name="category"
                              type="checkbox"
                              className="h-4 w-4 rounded border-indigo-700 bg-indigo-900 text-yellow-400 focus:ring-yellow-400"
                              checked={activeFilters.category === category.slug}
                              onChange={() => handleFilterChange("category", category.slug)}
                            />
                            <label htmlFor={`mobile-category-${category.id}`} className="ml-3 text-sm text-indigo-200">
                              {category.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-yellow-300 mb-3">Universe</h3>
                      <div className="space-y-2 pl-2">
                        {universes.map((universe) => (
                          <div key={universe} className="flex items-center">
                            <input
                              id={`mobile-universe-${universe}`}
                              name="universe"
                              type="checkbox"
                              className="h-4 w-4 rounded border-indigo-700 bg-indigo-900 text-yellow-400 focus:ring-yellow-400"
                              checked={activeFilters.universe === universe.toLowerCase()}
                              onChange={() => handleFilterChange("universe", universe.toLowerCase())}
                            />
                            <label htmlFor={`mobile-universe-${universe}`} className="ml-3 text-sm text-indigo-200">
                              {universe}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-yellow-300 mb-3">T-Shirt Type</h3>
                      <div className="space-y-2 pl-2">
                        {tShirtTypes.map((type) => (
                          <div key={type} className="flex items-center">
                            <input
                              id={`mobile-type-${type}`}
                              name="type"
                              type="checkbox"
                              className="h-4 w-4 rounded border-indigo-700 bg-indigo-900 text-yellow-400 focus:ring-yellow-400"
                              checked={activeFilters.type === type.toLowerCase()}
                              onChange={() => handleFilterChange("type", type.toLowerCase())}
                            />
                            <label htmlFor={`mobile-type-${type}`} className="ml-3 text-sm text-indigo-200">
                              {type}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-yellow-300 mb-3">Price Range</h3>
                      <div className="space-y-2 pl-2">
                        {priceRanges.map((range) => (
                          <div key={range.id} className="flex items-center">
                            <input
                              id={`mobile-price-${range.id}`}
                              name="price"
                              type="checkbox"
                              className="h-4 w-4 rounded border-indigo-700 bg-indigo-900 text-yellow-400 focus:ring-yellow-400"
                              checked={activeFilters.priceRange === range.id}
                              onChange={() => handleFilterChange("priceRange", range.id)}
                            />
                            <label htmlFor={`mobile-price-${range.id}`} className="ml-3 text-sm text-indigo-200">
                              {range.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-indigo-800 pt-4">
                    <button
                      type="button"
                      className="text-sm text-yellow-300 hover:text-yellow-400 transition-colors"
                      onClick={clearAllFilters}
                    >
                      Clear all filters
                    </button>
                    <button
                      type="button"
                      className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-indigo-950 font-bold px-6 py-2 rounded-lg transform hover:scale-105 transition-all duration-300 shadow-md shadow-yellow-800/20"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="hidden md:block w-64 bg-gradient-to-b from-indigo-900/80 to-indigo-950/80 backdrop-blur-sm rounded-xl p-6 border border-indigo-700/50 shadow-lg shadow-indigo-900/30 h-fit sticky top-24">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-yellow-300 mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" clipRule="evenodd" />
                  </svg>
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center group relative">
                      <button
                        className={`text-sm px-3 py-1.5 rounded-lg w-full text-left transition-all ${
                          activeFilters.category === category.slug 
                            ? "bg-yellow-400/20 text-yellow-300 font-medium" 
                            : "text-indigo-200 hover:bg-indigo-800/50 hover:text-yellow-300"
                        }`}
                        onClick={() => handleFilterChange("category", category.slug)}
                      >
                        {category.name}
                      </button>
                      <span className="absolute h-[1px] w-0 bg-yellow-300 left-0 bottom-0 transition-all duration-300 group-hover:w-full opacity-70"></span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-indigo-800 pt-6">
                <h3 className="text-lg font-bold text-yellow-300 mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                  </svg>
                  Universe
                </h3>
                <div className="space-y-2">
                  {universes.map((universe) => (
                    <div key={universe} className="flex items-center">
                      <input
                        id={`universe-${universe}`}
                        name="universe"
                        type="checkbox"
                        className="h-4 w-4 rounded border-indigo-700 bg-indigo-900 text-yellow-400 focus:ring-yellow-400"
                        checked={activeFilters.universe === universe.toLowerCase()}
                        onChange={() => handleFilterChange("universe", universe.toLowerCase())}
                      />
                      <label htmlFor={`universe-${universe}`} className="ml-3 text-sm text-indigo-200 hover:text-yellow-300 cursor-pointer transition-colors">
                        {universe}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-indigo-800 pt-6">
                <h3 className="text-lg font-bold text-yellow-300 mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                  </svg>
                  T-Shirt Type
                </h3>
                <div className="space-y-2">
                  {tShirtTypes.map((type) => (
                    <div key={type} className="flex items-center">
                      <input
                        id={`type-${type}`}
                        name="type"
                        type="checkbox"
                        className="h-4 w-4 rounded border-indigo-700 bg-indigo-900 text-yellow-400 focus:ring-yellow-400"
                        checked={activeFilters.type === type.toLowerCase()}
                        onChange={() => handleFilterChange("type", type.toLowerCase())}
                      />
                      <label htmlFor={`type-${type}`} className="ml-3 text-sm text-indigo-200 hover:text-yellow-300 cursor-pointer transition-colors">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-indigo-800 pt-6">
                <h3 className="text-lg font-bold text-yellow-300 mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                  Price Range
                </h3>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <div key={range.id} className="flex items-center">
                      <input
                        id={`price-${range.id}`}
                        name="price"
                        type="checkbox"
                        className="h-4 w-4 rounded border-indigo-700 bg-indigo-900 text-yellow-400 focus:ring-yellow-400"
                        checked={activeFilters.priceRange === range.id}
                        onChange={() => handleFilterChange("priceRange", range.id)}
                      />
                      <label htmlFor={`price-${range.id}`} className="ml-3 text-sm text-indigo-200 hover:text-yellow-300 cursor-pointer transition-colors">
                        {range.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-indigo-800 pt-6">
                <button
                  type="button"
                  className="w-full py-2 border border-yellow-400/50 text-yellow-300 hover:bg-yellow-400/10 rounded-lg transition-colors flex items-center justify-center gap-2 group"
                  onClick={clearAllFilters}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:rotate-180 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                  Reset Filters
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 bg-indigo-900/40 backdrop-blur-sm p-4 rounded-xl border border-indigo-700/30">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {filteredProducts.length} {filteredProducts.length === 1 ? "Product" : "Products"} 
                  {activeFilters.category && categories.find(c => c.slug === activeFilters.category) && (
                    <span className="ml-2 text-yellow-300">in {categories.find(c => c.slug === activeFilters.category).name}</span>
                  )}
                </h2>
              </div>

              <div className="mt-4 sm:mt-0 relative">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                  </svg>
                  <select
                    value={activeFilters.sortBy}
                    onChange={(e) => setActiveFilters((prev) => ({ ...prev, sortBy: e.target.value }))}
                    className="bg-indigo-800/80 text-white border border-indigo-700 rounded-lg py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 appearance-none"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-indigo-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-indigo-900/40 rounded-lg border border-indigo-700/30 overflow-hidden animate-pulse h-96">
                    <div className="h-64 bg-indigo-800/50 rounded-t-lg"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-indigo-800/70 rounded w-3/4"></div>
                      <div className="h-4 bg-indigo-800/70 rounded w-1/2"></div>
                      <div className="h-6 bg-indigo-800/70 rounded-full w-1/4 mt-2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts && filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id || product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-indigo-900/40 backdrop-blur-sm rounded-lg border border-indigo-700/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto text-yellow-300 mb-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-2xl font-bold text-white mb-4">No products found</h3>
                <p className="text-indigo-300 mb-8 max-w-md mx-auto">Try adjusting your filters or search term to find what you're looking for.</p>
                <button 
                  onClick={clearAllFilters} 
                  className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-indigo-950 font-bold rounded-lg transform hover:scale-105 transition-all duration-300 inline-flex items-center shadow-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                  Clear All Filters
                </button>
              </div>
            )}

            {filteredProducts.length > 0 && pagination.pages > 1 && (
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center space-x-4 bg-indigo-900/40 p-3 px-6 rounded-full backdrop-blur-sm border border-indigo-700/30 shadow-lg">
                  <button 
                    className={`px-4 py-2 rounded-full ${
                      pagination.page <= 1 
                        ? "bg-indigo-800/50 text-indigo-400 cursor-not-allowed" 
                        : "bg-indigo-800 text-white hover:bg-indigo-700 transform hover:scale-105 transition-all"
                    }`}
                    onClick={() => pagination.page > 1 && setPagination(prev => ({...prev, page: prev.page - 1}))}
                    disabled={pagination.page <= 1}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  {[...Array(Math.min(pagination.pages, 5))].map((_, i) => (
                    <button 
                      key={i} 
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        pagination.page === i + 1 
                          ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-indigo-950 font-bold transform scale-110 shadow-md" 
                          : "bg-indigo-800/70 text-white hover:bg-indigo-700 transform hover:scale-105"
                      }`}
                      onClick={() => setPagination(prev => ({...prev, page: i + 1}))}
                    >
                      {i + 1}
                    </button>
                  ))}
                  
                  <button 
                    className={`px-4 py-2 rounded-full ${
                      pagination.page >= pagination.pages 
                        ? "bg-indigo-800/50 text-indigo-400 cursor-not-allowed" 
                        : "bg-indigo-800 text-white hover:bg-indigo-700 transform hover:scale-105 transition-all"
                    }`}
                    onClick={() => pagination.page < pagination.pages && setPagination(prev => ({...prev, page: prev.page + 1}))}
                    disabled={pagination.page >= pagination.pages}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l-4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsPage
