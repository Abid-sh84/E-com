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

  // Featured hero images for categories
  const heroImages = {
    marvel: "/api/placeholder/600/300",
    dc: "/api/placeholder/600/300",
    anime: "/api/placeholder/600/300",
    classic: "/api/placeholder/600/300",
    default: "/api/placeholder/600/300"
  }

  useEffect(() => {
    // Immediately set mock data to ensure we have something to display
    setFilteredProducts(mockProducts);
    
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        // Update URL params
        const params = {};
        if (activeFilters.category) params.category = activeFilters.category;
        if (activeFilters.universe) params.universe = activeFilters.universe;
        if (activeFilters.type) params.type = activeFilters.type;
        if (activeFilters.priceRange) params.price = activeFilters.priceRange;
        if (activeFilters.sortBy) params.sort = activeFilters.sortBy;
        
        setSearchParams(params);
        
        // Try fetching products from API
        try {
          const result = await getProducts(activeFilters, pagination.page);
          
          if (result && result.products && result.products.length > 0) {
            console.log('Products fetched successfully:', result.products.length);
            setFilteredProducts(result.products);
            setPagination({
              page: result.page || 1,
              pages: result.pages || 1,
              count: result.count || result.products.length
            });
          } else {
            console.warn('No products returned from API, using mockData');
            setFilteredProducts(mockProducts);
            setPagination({
              page: 1,
              pages: 1,
              count: mockProducts.length
            });
          }
        } catch (error) {
          console.error('Error fetching products from API:', error);
          console.log('Falling back to mock data');
          setFilteredProducts(mockProducts);
          setPagination({
            page: 1,
            pages: 1,
            count: mockProducts.length
          });
        }
      } catch (error) {
        console.error('General error in fetchProducts:', error);
        setFilteredProducts(mockProducts);
      } finally {
        setIsLoading(false);
      }
    };
    
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

  // Get hero image based on active category or default
  const getHeroImage = () => {
    if (activeFilters.universe === "marvel") return heroImages.marvel;
    if (activeFilters.universe === "dc comics") return heroImages.dc;
    if (activeFilters.universe === "anime") return heroImages.anime;
    if (activeFilters.universe === "classic comics") return heroImages.classic;
    return heroImages.default;
  }

  return (
    <div className="min-h-screen bg-indigo-950 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMWUxYjRiIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiMyMTIwNGEiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')]">
      {/* Hero Banner with Stars Effect */}
      <div className="relative bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 py-12 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          {/* Star elements - lightweight SVG stars */}
          <div className="absolute top-10 left-20 w-1 h-1 bg-yellow-200 rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-40 w-2 h-2 bg-yellow-100 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 left-40 w-1 h-1 bg-yellow-200 rounded-full animate-pulse"></div>
          <div className="absolute top-15 left-60 w-1 h-1 bg-yellow-100 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-2 h-2 bg-yellow-200 rounded-full animate-pulse"></div>
          <div className="absolute top-5 right-10 w-1 h-1 bg-yellow-100 rounded-full animate-pulse"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3">
              <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-300 drop-shadow-lg" style={{textShadow: '0 0 10px rgba(250, 204, 21, 0.3)'}}>
                SUPERHERO TEES
              </h1>
              <p className="text-indigo-200 mt-2 text-lg md:text-xl">
                Find the perfect superhero t-shirt that matches your style
              </p>
              <div className="mt-6 flex space-x-4">
                <button className="bg-yellow-400 hover:bg-yellow-500 text-indigo-900 font-bold py-2 px-6 rounded-lg transform hover:scale-105 transition duration-200 shadow-lg" style={{boxShadow: '0 0 15px rgba(250, 204, 21, 0.5)'}}>
                  New Arrivals
                </button>
                <button className="bg-indigo-700 hover:bg-indigo-600 text-yellow-300 font-bold py-2 px-6 rounded-lg transform hover:scale-105 transition duration-200 shadow-lg" style={{boxShadow: '0 0 15px rgba(79, 70, 229, 0.5)'}}>
                  Featured Heroes
                </button>
              </div>
            </div>
            <div className="mt-6 md:mt-0 md:w-1/3">
              <img 
                src={getHeroImage()} 
                alt="Featured Superhero T-Shirts" 
                className="rounded-lg shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-300"
                style={{boxShadow: '0 0 25px rgba(79, 70, 229, 0.6)'}}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Categories Badges */}
        <div className="mb-8 hidden md:flex justify-center flex-wrap gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleFilterChange("category", category.slug)}
              className={`px-6 py-2 rounded-full ${
                activeFilters.category === category.slug 
                ? "bg-yellow-400 text-indigo-900 font-bold"
                : "bg-indigo-800 text-indigo-200 hover:bg-indigo-700"
              } transform hover:scale-105 transition duration-200`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Mobile filter dialog */}
          <div className="md:hidden">
            <button
              type="button"
              className="w-full bg-gradient-to-r from-indigo-800 to-purple-800 text-white px-4 py-3 rounded-lg flex items-center justify-center shadow-lg"
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
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
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              Filter Superhero Tees
            </button>

            {mobileFiltersOpen && (
              <div className="fixed inset-0 z-40 overflow-y-auto p-4 bg-indigo-950/90 backdrop-blur-sm">
                <div className="bg-gradient-to-b from-indigo-900 to-indigo-950 rounded-lg p-6 max-w-md mx-auto border border-indigo-700 shadow-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-yellow-300">Superhero Filters</h2>
                    <button
                      type="button"
                      className="text-indigo-300 hover:text-yellow-300"
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

                  <div className="space-y-6 text-indigo-200">
                    {/* Categories */}
                    <div>
                      <h3 className="font-medium mb-2 text-yellow-300">Categories</h3>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div key={category.id} className="flex items-center">
                            <input
                              id={`mobile-category-${category.id}`}
                              name="category"
                              type="checkbox"
                              className="h-4 w-4 rounded border-indigo-700 bg-indigo-800 text-yellow-400 focus:ring-yellow-400"
                              checked={activeFilters.category === category.slug}
                              onChange={() => handleFilterChange("category", category.slug)}
                            />
                            <label htmlFor={`mobile-category-${category.id}`} className="ml-3 text-sm">
                              {category.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Universe */}
                    <div>
                      <h3 className="font-medium mb-2 text-yellow-300">Universe</h3>
                      <div className="space-y-2">
                        {universes.map((universe) => (
                          <div key={universe} className="flex items-center">
                            <input
                              id={`mobile-universe-${universe}`}
                              name="universe"
                              type="checkbox"
                              className="h-4 w-4 rounded border-indigo-700 bg-indigo-800 text-yellow-400 focus:ring-yellow-400"
                              checked={activeFilters.universe === universe.toLowerCase()}
                              onChange={() => handleFilterChange("universe", universe.toLowerCase())}
                            />
                            <label htmlFor={`mobile-universe-${universe}`} className="ml-3 text-sm">
                              {universe}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* T-Shirt Type */}
                    <div>
                      <h3 className="font-medium mb-2 text-yellow-300">T-Shirt Type</h3>
                      <div className="space-y-2">
                        {tShirtTypes.map((type) => (
                          <div key={type} className="flex items-center">
                            <input
                              id={`mobile-type-${type}`}
                              name="type"
                              type="checkbox"
                              className="h-4 w-4 rounded border-indigo-700 bg-indigo-800 text-yellow-400 focus:ring-yellow-400"
                              checked={activeFilters.type === type.toLowerCase()}
                              onChange={() => handleFilterChange("type", type.toLowerCase())}
                            />
                            <label htmlFor={`mobile-type-${type}`} className="ml-3 text-sm">
                              {type}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price Range */}
                    <div>
                      <h3 className="font-medium mb-2 text-yellow-300">Price Range</h3>
                      <div className="space-y-2">
                        {priceRanges.map((range) => (
                          <div key={range.id} className="flex items-center">
                            <input
                              id={`mobile-price-${range.id}`}
                              name="price"
                              type="checkbox"
                              className="h-4 w-4 rounded border-indigo-700 bg-indigo-800 text-yellow-400 focus:ring-yellow-400"
                              checked={activeFilters.priceRange === range.id}
                              onChange={() => handleFilterChange("priceRange", range.id)}
                            />
                            <label htmlFor={`mobile-price-${range.id}`} className="ml-3 text-sm">
                              {range.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <button
                      type="button"
                      className="text-sm text-yellow-300 hover:text-yellow-400"
                      onClick={clearAllFilters}
                    >
                      Clear all filters
                    </button>
                    <button
                      type="button"
                      className="bg-yellow-400 text-indigo-900 font-bold px-4 py-2 rounded-md hover:bg-yellow-500"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar filters - desktop */}
          <div className="hidden md:block w-64 bg-gradient-to-b from-indigo-800 to-indigo-900 rounded-lg p-6 border border-indigo-700 shadow-lg" style={{boxShadow: '0 0 20px rgba(79, 70, 229, 0.3)'}}>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-yellow-300 mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center">
                      <button
                        className={`text-sm ${activeFilters.category === category.slug ? "text-yellow-300 font-medium" : "text-indigo-200 hover:text-yellow-300"} transition duration-200`}
                        onClick={() => handleFilterChange("category", category.slug)}
                      >
                        {category.name}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-indigo-700 pt-6">
                <h3 className="text-lg font-medium text-yellow-300 mb-3">Universe</h3>
                <div className="space-y-2">
                  {universes.map((universe) => (
                    <div key={universe} className="flex items-center">
                      <input
                        id={`universe-${universe}`}
                        name="universe"
                        type="checkbox"
                        className="h-4 w-4 rounded border-indigo-700 bg-indigo-800 text-yellow-400 focus:ring-yellow-400"
                        checked={activeFilters.universe === universe.toLowerCase()}
                        onChange={() => handleFilterChange("universe", universe.toLowerCase())}
                      />
                      <label htmlFor={`universe-${universe}`} className="ml-3 text-sm text-indigo-200 hover:text-yellow-100 transition duration-200">
                        {universe}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-indigo-700 pt-6">
                <h3 className="text-lg font-medium text-yellow-300 mb-3">T-Shirt Type</h3>
                <div className="space-y-2">
                  {tShirtTypes.map((type) => (
                    <div key={type} className="flex items-center">
                      <input
                        id={`type-${type}`}
                        name="type"
                        type="checkbox"
                        className="h-4 w-4 rounded border-indigo-700 bg-indigo-800 text-yellow-400 focus:ring-yellow-400"
                        checked={activeFilters.type === type.toLowerCase()}
                        onChange={() => handleFilterChange("type", type.toLowerCase())}
                      />
                      <label htmlFor={`type-${type}`} className="ml-3 text-sm text-indigo-200 hover:text-yellow-100 transition duration-200">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-indigo-700 pt-6">
                <h3 className="text-lg font-medium text-yellow-300 mb-3">Price Range</h3>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <div key={range.id} className="flex items-center">
                      <input
                        id={`price-${range.id}`}
                        name="price"
                        type="checkbox"
                        className="h-4 w-4 rounded border-indigo-700 bg-indigo-800 text-yellow-400 focus:ring-yellow-400"
                        checked={activeFilters.priceRange === range.id}
                        onChange={() => handleFilterChange("priceRange", range.id)}
                      />
                      <label htmlFor={`price-${range.id}`} className="ml-3 text-sm text-indigo-200 hover:text-yellow-100 transition duration-200">
                        {range.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-indigo-700 pt-6">
                <button
                  type="button"
                  className="text-sm text-yellow-300 hover:text-yellow-400 transition duration-200"
                  onClick={clearAllFilters}
                >
                  Clear all filters
                </button>
              </div>
            </div>
          </div>

          {/* Product grid */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-yellow-300">
                  {filteredProducts.length} {filteredProducts.length === 1 ? "Product" : "Products"}
                </h2>
              </div>

              <div className="mt-4 sm:mt-0">
                <select
                  value={activeFilters.sortBy}
                  onChange={(e) => setActiveFilters((prev) => ({ ...prev, sortBy: e.target.value }))}
                  className="bg-indigo-800 text-white border-indigo-700 rounded-lg px-4 py-2 focus:ring-yellow-400 focus:border-yellow-300"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="animate-pulse rounded-lg overflow-hidden bg-indigo-800/30 border border-indigo-700 shadow-lg h-96">
                    <div className="h-64 bg-indigo-700/20 rounded-t-lg"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-indigo-700/20 rounded"></div>
                      <div className="h-4 bg-indigo-700/20 rounded w-3/4"></div>
                      <div className="h-6 bg-indigo-700/20 rounded w-1/4 mt-2"></div>
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
              <div className="text-center py-12 bg-indigo-900/30 rounded-lg border border-indigo-800 shadow-lg">
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
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-xl font-bold text-yellow-300 mb-2">No superhero tees found</h3>
                <p className="text-indigo-300 mb-6">Try adjusting your filters to find the perfect superhero t-shirt.</p>
                <button 
                  onClick={clearAllFilters} 
                  className="bg-yellow-400 hover:bg-yellow-500 text-indigo-900 font-bold py-2 px-6 rounded-lg transform hover:scale-105 transition duration-200 shadow-lg"
                  style={{boxShadow: '0 0 15px rgba(250, 204, 21, 0.3)'}}
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {filteredProducts.length > 0 && pagination.pages > 1 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center space-x-3">
                  <button 
                    className="px-4 py-2 rounded-lg bg-indigo-800 text-white hover:bg-indigo-700 transition duration-200 shadow-md"
                    onClick={() => pagination.page > 1 && setPagination(prev => ({...prev, page: prev.page - 1}))}
                    disabled={pagination.page <= 1}
                  >
                    Previous
                  </button>
                  {[...Array(Math.min(pagination.pages, 3))].map((_, i) => (
                    <button 
                      key={i} 
                      className={`px-4 py-2 rounded-lg shadow-md ${pagination.page === i + 1 
                        ? "bg-yellow-400 text-indigo-900 font-bold" 
                        : "bg-indigo-800 text-white hover:bg-indigo-700"} transition duration-200`}
                      onClick={() => setPagination(prev => ({...prev, page: i + 1}))}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button 
                    className="px-4 py-2 rounded-lg bg-indigo-800 text-white hover:bg-indigo-700 transition duration-200 shadow-md"
                    onClick={() => pagination.page < pagination.pages && setPagination(prev => ({...prev, page: prev.page + 1}))}
                    disabled={pagination.page >= pagination.pages}
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
            
            {/* Featured Hero Banner */}
            {filteredProducts.length > 0 && (
              <div className="mt-12 bg-gradient-to-r from-indigo-800 via-purple-800 to-indigo-800 rounded-lg overflow-hidden relative shadow-lg">
                <div className="absolute inset-0 opacity-20">
                  {/* Star elements */}
                  <div className="absolute top-5 left-10 w-1 h-1 bg-yellow-200 rounded-full"></div>
                  <div className="absolute top-10 right-20 w-2 h-2 bg-yellow-100 rounded-full"></div>
                  <div className="absolute bottom-5 left-20 w-1 h-1 bg-yellow-200 rounded-full"></div>
                </div>
                <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between relative z-10">
                  <div className="md:w-2/3 mb-4 md:mb-0">
                    <h3 className="text-2xl font-bold text-yellow-300 mb-2">Join Our Superhero Community</h3>
                    <p className="text-indigo-200">Get exclusive deals, updates on new releases, and special hero discounts!</p>
                  </div>
                  <div>
                    <button className="bg-yellow-400 hover:bg-yellow-500 text-indigo-900 font-bold py-2 px-6 rounded-lg transform hover:scale-105 transition duration-200 shadow-lg">
                      Subscribe Now
                    </button>
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

export default ProductsPage