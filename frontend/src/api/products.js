import apiClient from './client';

/**
 * Get products with optional filters
 * @param {Object} filters - Filter options
 * @param {number} page - Page number
 * @returns {Promise} - Products data
 */
export const getProducts = async (filters = {}, page = 1) => {
  const { category, universe, type, priceRange, sortBy, keyword } = filters;
  
  let queryString = `?page=${page}`;
  if (category) queryString += `&category=${category}`;
  if (universe) queryString += `&universe=${universe}`;
  if (type) queryString += `&type=${type}`;
  if (priceRange) queryString += `&price=${priceRange}`;
  if (sortBy) queryString += `&sort=${sortBy}`;
  if (keyword) queryString += `&keyword=${keyword}`;
  
  try {
    const response = await apiClient.get(`/products${queryString}`);
    
    // Check if response contains products
    if (!response.data || !response.data.products || response.data.products.length === 0) {
      console.warn('No products returned from API, falling back to getAllProducts');
      return getAllProducts();
    }
    
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    // Fall back to getAllProducts in case of error
    console.warn('Error from API, falling back to getAllProducts');
    return getAllProducts();
  }
};

/**
 * Get all products without filters (fallback function)
 * @returns {Promise} - All products data
 */
export const getAllProducts = async () => {
  try {
    // First try to get from API
    const response = await apiClient.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching all products:', error);
    
    // If API fails, fall back to import from local data
    console.warn('Falling back to local product data');
    try {
      const { products } = await import('../data/mockData');
      return {
        products,
        page: 1,
        pages: 1,
        count: products.length
      };
    } catch (localError) {
      console.error('Error importing local product data:', localError);
      throw new Error('Failed to fetch products from any source');
    }
  }
};

/**
 * Get a product by ID
 * @param {string} id - Product ID
 * @returns {Promise} - Product data
 */
export const getProductById = async (id) => {
  try {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw new Error(error.response?.data?.message || 'Product not found');
  }
};

/**
 * Get top rated products
 * @returns {Promise} - Top products data
 */
export const getTopProducts = async () => {
  try {
    const response = await apiClient.get('/products/top');
    return response.data;
  } catch (error) {
    console.error('Error fetching top products:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch top products');
  }
};

/**
 * Get new arrival products
 * @returns {Promise} - New products data
 */
export const getNewProducts = async () => {
  try {
    const response = await apiClient.get('/products/new');
    return response.data;
  } catch (error) {
    console.error('Error fetching new products:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch new products');
  }
};

/**
 * Get products by category
 * @param {string} category - Category name
 * @returns {Promise} - Products by category
 */
export const getProductsByCategory = async (category) => {
  try {
    const response = await apiClient.get(`/products/category/${category}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch products by category');
  }
};

/**
 * Create a product review
 * @param {string} productId - Product ID
 * @param {Object} review - Review data
 * @returns {Promise} - Review result
 */
export const createProductReview = async (productId, review) => {
  try {
    const response = await apiClient.post(`/products/${productId}/reviews`, review);
    return response.data;
  } catch (error) {
    console.error('Error creating review:', error);
    throw new Error(error.response?.data?.message || 'Failed to create review');
  }
};
