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

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="bg-indigo-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-yellow-300">Shop Our Collection</h1>
          <p className="text-indigo-200 mt-2">Find the perfect superhero t-shirt that matches your style</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Mobile filter dialog */}
          <div className="md:hidden">
            <button
              type="button"
              className="w-full bg-indigo-900 text-white px-4 py-2 rounded-md flex items-center justify-center"
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
              Filters
            </button>

            {mobileFiltersOpen && (
              <div className="fixed inset-0 z-40 overflow-y-auto p-4 bg-indigo-950/90 backdrop-blur-sm">
                <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-indigo-950">Filters</h2>
                    <button
                      type="button"
                      className="text-gray-500 hover:text-gray-700"
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

                  <div className="space-y-6 text-indigo-950">
                    {/* Categories */}
                    <div>
                      <h3 className="font-medium mb-2">Categories</h3>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div key={category.id} className="flex items-center">
                            <input
                              id={`mobile-category-${category.id}`}
                              name="category"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
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
                      <h3 className="font-medium mb-2">Universe</h3>
                      <div className="space-y-2">
                        {universes.map((universe) => (
                          <div key={universe} className="flex items-center">
                            <input
                              id={`mobile-universe-${universe}`}
                              name="universe"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
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
                      <h3 className="font-medium mb-2">T-Shirt Type</h3>
                      <div className="space-y-2">
                        {tShirtTypes.map((type) => (
                          <div key={type} className="flex items-center">
                            <input
                              id={`mobile-type-${type}`}
                              name="type"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
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
                      <h3 className="font-medium mb-2">Price Range</h3>
                      <div className="space-y-2">
                        {priceRanges.map((range) => (
                          <div key={range.id} className="flex items-center">
                            <input
                              id={`mobile-price-${range.id}`}
                              name="price"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
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
                      className="text-sm text-indigo-600 hover:text-indigo-800"
                      onClick={clearAllFilters}
                    >
                      Clear all filters
                    </button>
                    <button
                      type="button"
                      className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
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
          <div className="hidden md:block w-64 bg-indigo-900/30 rounded-lg p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-yellow-300 mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center">
                      <button
                        className={`text-sm ${activeFilters.category === category.slug ? "text-yellow-300 font-medium" : "text-indigo-200 hover:text-yellow-300"}`}
                        onClick={() => handleFilterChange("category", category.slug)}
                      >
                        {category.name}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-indigo-800 pt-6">
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
                      <label htmlFor={`universe-${universe}`} className="ml-3 text-sm text-indigo-200">
                        {universe}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-indigo-800 pt-6">
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
                      <label htmlFor={`type-${type}`} className="ml-3 text-sm text-indigo-200">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-indigo-800 pt-6">
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
                      <label htmlFor={`price-${range.id}`} className="ml-3 text-sm text-indigo-200">
                        {range.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-indigo-800 pt-6">
                <button
                  type="button"
                  className="text-sm text-yellow-300 hover:text-yellow-400"
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
                <h2 className="text-xl font-bold text-white">
                  {filteredProducts.length} {filteredProducts.length === 1 ? "Product" : "Products"}
                </h2>
              </div>

              <div className="mt-4 sm:mt-0">
                <select
                  value={activeFilters.sortBy}
                  onChange={(e) => setActiveFilters((prev) => ({ ...prev, sortBy: e.target.value }))}
                  className="comic-input bg-indigo-800 text-white border-indigo-700 focus:ring-yellow-400"
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
                  <div key={index} className="comic-card animate-pulse h-96">
                    <div className="h-64 bg-indigo-300/20 rounded-t-lg"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-indigo-300/20 rounded"></div>
                      <div className="h-4 bg-indigo-300/20 rounded w-3/4"></div>
                      <div className="h-6 bg-indigo-300/20 rounded w-1/4 mt-2"></div>
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
              <div className="text-center py-12">
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
                <h3 className="text-xl font-bold text-white mb-2">No products found</h3>
                <p className="text-indigo-300 mb-6">Try adjusting your filters to find what you're looking for.</p>
                <button onClick={clearAllFilters} className="comic-button">
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {filteredProducts.length > 0 && pagination.pages > 1 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button 
                    className="px-3 py-1 rounded-md bg-indigo-800 text-white hover:bg-indigo-700"
                    onClick={() => pagination.page > 1 && setPagination(prev => ({...prev, page: prev.page - 1}))}
                    disabled={pagination.page <= 1}
                  >
                    Previous
                  </button>
                  {[...Array(Math.min(pagination.pages, 3))].map((_, i) => (
                    <button 
                      key={i} 
                      className={`px-3 py-1 rounded-md ${pagination.page === i + 1 ? "bg-yellow-400 text-indigo-950 font-bold" : "bg-indigo-800 text-white hover:bg-indigo-700"}`}
                      onClick={() => setPagination(prev => ({...prev, page: i + 1}))}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button 
                    className="px-3 py-1 rounded-md bg-indigo-800 text-white hover:bg-indigo-700"
                    onClick={() => pagination.page < pagination.pages && setPagination(prev => ({...prev, page: prev.page + 1}))}
                    disabled={pagination.page >= pagination.pages}
                  >
                    Next
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
