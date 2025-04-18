import axios from 'axios';

// Create the base API client
const apiClient = axios.create({
  baseURL: 'http://localhost:5000',  // Update this to match your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
