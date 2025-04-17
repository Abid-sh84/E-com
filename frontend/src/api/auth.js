import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create an axios instance for auth requests
const authClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if it exists
const setAuthToken = token => {
  if (token) {
    authClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Set for global axios too
    localStorage.setItem('token', token);
  } else {
    delete authClient.defaults.headers.common['Authorization'];
    delete axios.defaults.headers.common['Authorization']; // Clear for global axios too
    localStorage.removeItem('token');
  }
};

/**
 * Login user with email and password
 * @param {string} email 
 * @param {string} password
 * @returns {Object} user data with token
 */
export const login = async (email, password) => {
  try {
    console.log('Attempting login with:', { email }); // Debug log
    const response = await authClient.post('/users/login', { email, password });
    
    if (response.data && response.data.token) {
      setAuthToken(response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
      console.log('Login successful, token set');
    }
    
    return response.data;
  } catch (error) {
    console.error('Login API error:', error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || 'Failed to login. Please check your credentials.'
    );
  }
};

/**
 * Register a new user
 * @param {string} name 
 * @param {string} email 
 * @param {string} password 
 * @returns {Object} user data with token
 */
export const register = async (name, email, password) => {
  try {
    const response = await authClient.post('/users', { name, email, password });
    
    if (response.data && response.data.token) {
      setAuthToken(response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to register. Please try again.'
    );
  }
};

/**
 * Get the current user's profile
 * @returns {Object} user profile data
 */
export const getUserProfile = async () => {
  try {
    // Get token from local storage
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
    }
    
    const response = await authClient.get('/users/profile');
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to get user profile.'
    );
  }
};

/**
 * Update user profile data
 * @param {Object} userData 
 * @returns {Object} updated user data
 */
export const updateUserProfile = async (userData) => {
  try {
    // Ensure token is set before making request
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
    }
    
    console.log('Updating profile with data:', userData); // Debug log
    const response = await authClient.put('/users/profile', userData);
    console.log('Profile update response:', response.data); // Debug log
    
    if (response.data && response.data.token) {
      setAuthToken(response.data.token);
      
      // Update the stored user data
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      const updatedUser = { ...currentUser, ...response.data };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
    
    return response.data;
  } catch (error) {
    console.error('Update profile API error:', error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || 'Failed to update profile.'
    );
  }
};

/**
 * Logout user
 */
export const logout = () => {
  setAuthToken(null);
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

// Initialize token from localStorage when this module is imported
const token = localStorage.getItem('token');
if (token) {
  setAuthToken(token);
}
