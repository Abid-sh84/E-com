"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { login as loginApi, register as registerApi, getUserProfile, googleAuth } from '../api/auth'

// Create context
const AuthContext = createContext({
  currentUser: null,
  isAuthenticated: false,
  loading: true,
  login: () => Promise.resolve(),
  signup: () => Promise.resolve(),
  logout: () => {},
  googleLogin: () => Promise.resolve(),
});

// Define the provider component as a named function for consistent exports
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      const user = JSON.parse(savedUser)
      setCurrentUser(user)
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const userData = await loginApi(email, password);
      setCurrentUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", userData.token);
      return userData;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error.response?.data?.message || 'Failed to login');
    }
  }

  const signup = async (name, email, password) => {
    try {
      const userData = await registerApi(name, email, password);
      setCurrentUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", userData.token);
      return userData;
    } catch (error) {
      console.error('Signup error:', error);
      throw new Error(error.response?.data?.message || 'Failed to create account');
    }
  }

  const logout = () => {
    setCurrentUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    navigate('/login')
  }

  const updateUserAvatar = (avatarUrl) => {
    if (currentUser) {
      // Update user in state
      const updatedUser = {
        ...currentUser,
        avatar: avatarUrl
      };
      
      setCurrentUser(updatedUser);
      
      // Update user in localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      // In a real app, you would also make an API call here
      // to update the user's avatar on the server
      // updateProfileApi({ avatar: avatarUrl });
    }
  };

  const googleLogin = async (credential, userData = null) => {
    try {
      console.log("Processing Google login with credential");
      // If we have userData from OAuth2 flow, pass it to the API
      const response = await googleAuth(credential, userData);
      const user = response.data || response;
      
      setCurrentUser(user);
      setIsAuthenticated(true);
      
      // Store user data and token in localStorage
      localStorage.setItem("user", JSON.stringify(user));
      if (user.token) {
        localStorage.setItem("token", user.token);
      }
      
      return user;
    } catch (error) {
      console.error("Google auth failed in context:", error);
      throw error;
    }
  };

  const value = {
    currentUser,
    isAuthenticated,
    loading,
    login,
    signup,
    logout,
    updateUserAvatar,
    googleLogin
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

// Export the hook separately as a named function
export function useAuth() {
  return useContext(AuthContext);
}
