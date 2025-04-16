"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { googleAuth } from "../api/auth"

// Google OAuth client ID from Vite environment variables
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showStars, setShowStars] = useState(true)

  const { login, googleLogin } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Function to create stars - moved outside useEffect for reuse
  const createStars = () => {
    if (!showStars) return;
    
    const starsContainer = document.getElementById('login-stars-container');
    if (!starsContainer) return;
    
    // Clear previous stars
    starsContainer.innerHTML = '';
    
    // Create new stars with variety
    for (let i = 0; i < 100; i++) {
      const star = document.createElement('div');
        
      // Create different types of stars for variety
      if (i % 5 === 0) {
        // Larger, brighter stars
        star.className = 'star glow';
        star.style.width = `${Math.random() * 4 + 2}px`;
        star.style.height = star.style.width;
        star.style.boxShadow = '0 0 4px 1px rgba(255, 255, 255, 0.6)';
      } else if (i % 7 === 0) {
        // Colorful stars
        star.className = 'star colored';
        star.style.width = `${Math.random() * 3 + 1}px`;
        star.style.height = star.style.width;
        const colors = ['#fcf0bc', '#e0f7fa', '#fff8e1', '#f3e5f5'];
        star.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      } else {
        // Regular stars
        star.className = 'star';
        star.style.width = `${Math.random() * 3 + 0.5}px`;
        star.style.height = star.style.width;
      }
      
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = `${Math.random() * 100}vh`;
      star.style.animationDuration = `${Math.random() * 5 + 1}s`;
      star.style.animationDelay = `${Math.random() * 5}s`;
      starsContainer.appendChild(star);
    }
    
    // Add a few shooting stars
    for (let i = 0; i < 3; i++) {
      const shootingStar = document.createElement('div');
      shootingStar.className = 'shooting-star';
      shootingStar.style.left = `${Math.random() * 100}vw`;
      shootingStar.style.top = `${Math.random() * 50}vh`;
      shootingStar.style.width = `${Math.random() * 60 + 30}px`;
      shootingStar.style.animationDelay = `${Math.random() * 20 + 5}s`;
      shootingStar.style.animationDuration = `${Math.random() * 2 + 1}s`;
      starsContainer.appendChild(shootingStar);
    }
  };

  // Load Google API script and create stars
  useEffect(() => {
    // Check if Google API is already loaded
    if (document.querySelector('script[src="https://accounts.google.com/gsi/client"]')) {
      return;
    }

    // Load the Google API script
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => initializeGoogleSignIn();
    document.body.appendChild(script);
    
    createStars();
    window.addEventListener('resize', createStars);

    return () => {
      const scriptElement = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
      if (scriptElement) {
        document.body.removeChild(scriptElement);
      }
      window.removeEventListener('resize', createStars);
    };
  }, [showStars]);

  // Recreate stars when navigating back to this page
  useEffect(() => {
    // This will run every time the location changes
    // and we're on the login page
    createStars();
  }, [location.pathname]);

  const initializeGoogleSignIn = () => {
    if (window.google && GOOGLE_CLIENT_ID) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleOneTapResponse
      });
    }
  };

  const handleGoogleOneTapResponse = async (response) => {
    try {
      const { credential } = response;
      await googleLogin(credential);
      navigate("/");
    } catch (err) {
      console.error("Google auth error:", err);
      setError("Failed to sign in with Google. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleButtonClick = () => {
    setIsLoading(true);
    if (window.google && GOOGLE_CLIENT_ID) {
      window.google.accounts.id.prompt();
    } else {
      setError("Google Sign-In is not available right now.");
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      setError("");
      setIsLoading(true);
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError("Failed to log in. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-indigo-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Stars container */}
      <div id="login-stars-container" className="fixed inset-0 pointer-events-none overflow-hidden"></div>
      
      {/* Cosmic rays */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/3 w-px h-screen bg-blue-400 opacity-20" style={{boxShadow: '0 0 20px 5px rgba(96, 165, 250, 0.5)'}}></div>
        <div className="absolute top-0 left-2/3 w-px h-screen bg-purple-400 opacity-20" style={{boxShadow: '0 0 20px 5px rgba(192, 132, 252, 0.5)'}}></div>
      </div>
      
      {/* Hero emblem background */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none opacity-5">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-96 w-96" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" className="text-yellow-300" />
        </svg>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Glowing border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-yellow-600/30 rounded-xl blur-lg"></div>
        
        <div className="relative bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-indigo-900/80 backdrop-blur-md p-8 rounded-xl border border-indigo-700/50 shadow-lg shadow-purple-900/30">
          <div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
            <h2 className="mt-4 text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-purple-400 to-blue-400 animate-float">
              HERO LOGIN
            </h2>
            <p className="mt-2 text-center text-sm text-indigo-300">
              Or{" "}
              <Link to="/signup" className="font-medium text-yellow-300 hover:text-yellow-400 transition-colors">
                create a new account
              </Link>
            </p>
          </div>
          {error && (
            <div className="mt-6 bg-red-900/40 border border-red-700 text-red-300 px-4 py-3 rounded-lg flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div className="group">
                <label htmlFor="email-address" className="block text-sm font-medium text-indigo-300 mb-1 group-focus-within:text-yellow-300 transition-colors">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400 group-focus-within:text-yellow-300 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 bg-indigo-800/50 border border-indigo-600 rounded-lg focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 text-white placeholder-indigo-400 transition-all"
                    placeholder="Email address"
                  />
                </div>
              </div>
              <div className="group">
                <label htmlFor="password" className="block text-sm font-medium text-indigo-300 mb-1 group-focus-within:text-yellow-300 transition-colors">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400 group-focus-within:text-yellow-300 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 bg-indigo-800/50 border border-indigo-600 rounded-lg focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 text-white placeholder-indigo-400 transition-all"
                    placeholder="Password"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-indigo-700 bg-indigo-800 text-yellow-400 focus:ring-yellow-400"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-indigo-300">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-yellow-300 hover:text-yellow-400 transition-colors">
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
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
                    Signing in...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                    </svg>
                    Sign in
                  </>
                )}
              </button>
            </div>
          </form>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-indigo-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-indigo-300">Or continue with</span>
              </div>
            </div>
            <div className="mt-6">
              <button
                type="button"
                onClick={handleGoogleButtonClick}
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3 px-4 border border-indigo-600 rounded-lg shadow-sm bg-indigo-800/70 hover:bg-indigo-700/70 backdrop-blur-sm text-white font-medium transition-all duration-300"
              >
                <svg className="w-5 h-5 mr-2 text-red-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                </svg>
                Sign in with Google
              </button>
            </div>
          </div>
          {/* Comic style decorative elements */}
          <div className="absolute -top-4 -left-4 h-8 w-8 bg-yellow-400 rounded-full opacity-70 blur-md"></div>
          <div className="absolute -bottom-4 -right-4 h-8 w-8 bg-purple-500 rounded-full opacity-70 blur-md"></div>
        </div>
        {/* Comic style decorations - stars burst */}
        <div className="absolute -top-3 -right-3 transform rotate-12">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </div>
        <div className="absolute -bottom-3 -left-3 transform -rotate-12">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </div>
      </div>
      
      {/* Add CSS for stars animation */}
      <style jsx global>{`
        @keyframes twinkle {
          0% { opacity: 0.3; }
          50% { opacity: 1; }
          100% { opacity: 0.3; }
        }
        
        @keyframes colored-twinkle {
          0% { opacity: 0.1; }
          50% { opacity: 0.8; }
          100% { opacity: 0.1; }
        }
        
        @keyframes glow {
          0% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 0.4; transform: scale(1); }
        }
        
        @keyframes shooting {
          0% { transform: translateX(0) translateY(0) rotate(-45deg); opacity: 1; }
          100% { transform: translateX(-100px) translateY(100px) rotate(-45deg); opacity: 0; }
        }
        
        .star {
          position: absolute;
          background-color: white;
          border-radius: 50%;
          animation: twinkle linear infinite;
        }
        
        .star.colored {
          animation: colored-twinkle linear infinite;
        }
        
        .star.glow {
          animation: glow linear infinite;
        }
        
        .shooting-star {
          position: absolute;
          height: 1px;
          background: linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,1));
          transform: rotate(-45deg);
          animation: shooting linear infinite;
        }
        
        /* Add small dots in a grid pattern for background texture */
        #login-stars-container:before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px),
            radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 30px 30px, 15px 15px;
          background-position: 0 0, 15px 15px;
        }
      `}</style>
    </div>
  )
}

export default LoginPage
