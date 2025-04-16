"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { googleAuth } from "../api/auth"

// Google OAuth client ID from Vite environment variables
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { login, googleLogin } = useAuth()
  const navigate = useNavigate()

  // Load Google API script
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

    return () => {
      const scriptElement = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
      if (scriptElement) {
        document.body.removeChild(scriptElement);
      }
    };
  }, []);

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
    e.preventDefault()

    if (!email || !password) {
      setError("Please enter both email and password")
      return
    }

    try {
      setError("")
      setIsLoading(true)

      await login(email, password)
      navigate("/")
    } catch (err) {
      setError("Failed to log in. Please check your credentials.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-900 to-black bg-opacity-90" style={{ backgroundImage: "url('https://via.placeholder.com/1920x1080?text=')", backgroundBlendMode: "overlay", backgroundSize: "cover" }}>
      {/* Stars background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="stars-1"></div>
        <div className="stars-2"></div>
        <div className="stars-3"></div>
      </div>
      
      <div className="max-w-md w-full space-y-8 bg-blue-900/40 backdrop-blur-sm p-8 rounded-lg border border-blue-500/30 shadow-lg shadow-blue-500/20 relative z-10">
        <div>
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center shadow-lg shadow-yellow-400/50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-white">Hero Login Portal</h2>
          <p className="mt-2 text-center text-sm text-blue-300">
            Or{" "}
            <Link to="/signup" className="font-medium text-yellow-300 hover:text-yellow-400 transition duration-300">
              register your superhero identity
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-md animate-pulse">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div className="relative">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-blue-800/50 text-white border border-blue-600 rounded-lg py-3 px-4 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-300"
                placeholder="Secret Identity (Email)"
              />
              <div className="absolute top-3 right-3 text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-blue-800/50 text-white border border-blue-600 rounded-lg py-3 px-4 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-300"
                placeholder="Super Secret Password"
              />
              <div className="absolute top-3 right-3 text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-blue-700 bg-blue-800/50 text-yellow-400 focus:ring-yellow-400"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-blue-300">
                Remember my identity
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-yellow-300 hover:text-yellow-400 transition duration-300">
                Lost your powers?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-gradient-to-r from-blue-700 to-purple-700 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition duration-300 shadow-lg shadow-blue-700/50"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-blue-300 group-hover:text-blue-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                </svg>
              </span>
              {isLoading ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
              ) : (
                "Enter the Heroverse"
              )}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-blue-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-blue-900/50 text-blue-300">Or use your alter ego</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3">
            <button
              type="button"
              onClick={handleGoogleButtonClick}
              disabled={isLoading}
              className="w-full inline-flex justify-center py-2 px-4 border border-blue-700 rounded-lg shadow-sm bg-blue-800/50 text-sm font-medium text-white hover:bg-blue-700/50 transition duration-300"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
              </svg>
              Sign in with Google
            </button>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -top-6 -right-6 w-12 h-12 bg-yellow-400 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-purple-500 rounded-full opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
    </div>
  )
}

// CSS Animations to add to your global CSS
const cssToAdd = `
/* Starry background animations */
.stars-1, .stars-2, .stars-3 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  animation: animateStars 50s linear infinite;
}

.stars-1:after, .stars-2:after, .stars-3:after {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.stars-1:after {
  background-image: radial-gradient(white, rgba(0,0,0,0) 2px);
  background-size: 100px 100px;
}

.stars-2 {
  animation-delay: -25s;
}

.stars-2:after {
  background-image: radial-gradient(white, rgba(0,0,0,0) 1px);
  background-size: 50px 50px;
}

.stars-3 {
  animation-delay: -37.5s;
}

.stars-3:after {
  background-image: radial-gradient(white, rgba(0,0,0,0) 0.5px);
  background-size: 25px 25px;
}

@keyframes animateStars {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100vh);
  }
}
`;

export default LoginPage