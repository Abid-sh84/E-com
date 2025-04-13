"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { handleGoogleSignIn, loadGoogleScript } from "../utils/googleAuth"

const SignupPage = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { signup } = useAuth()
  const navigate = useNavigate()
  
  // Load Google script on component mount
  useEffect(() => {
    loadGoogleScript();
  }, []);

  // Handle Google authentication response
  const handleGoogleAuth = async (userData) => {
    try {
      setIsLoading(true)
      // You'll need to implement Google sign-in in your AuthContext
      // For now, let's use the regular signup with Google data
      await signup(userData.name, userData.email, `google-${userData.googleId}`)
      navigate("/")
    } catch (err) {
      setError("Failed to sign up with Google. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    try {
      setError("")
      setIsLoading(true)

      await signup(name, email, password)
      navigate("/")
    } catch (err) {
      setError("Failed to create an account. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Google Sign-in handler
  const handleGoogleClick = () => {
    handleGoogleSignIn(handleGoogleAuth);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-indigo-900/50 p-8 rounded-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-yellow-300">Create your account</h2>
          <p className="mt-2 text-center text-sm text-indigo-300">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-yellow-300 hover:text-yellow-400">
              Sign in instead
            </Link>
          </p>
        </div>

        {error && <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-md">{error}</div>}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="comic-input w-full bg-indigo-800 text-white border-indigo-700 focus:ring-yellow-400"
                placeholder="Full Name"
              />
            </div>
            <div>
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
                className="comic-input w-full bg-indigo-800 text-white border-indigo-700 focus:ring-yellow-400"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="comic-input w-full bg-indigo-800 text-white border-indigo-700 focus:ring-yellow-400"
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="comic-input w-full bg-indigo-800 text-white border-indigo-700 focus:ring-yellow-400"
                placeholder="Confirm Password"
              />
            </div>
          </div>

          <div>
            <button type="submit" disabled={isLoading} className="comic-button w-full flex justify-center">
              {isLoading ? (
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
              ) : (
                "Create Account"
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
              <span className="px-2 bg-indigo-900 text-indigo-300">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3">
            <button
              type="button"
              onClick={handleGoogleClick}
              className="w-full inline-flex justify-center py-2 px-4 border border-indigo-700 rounded-md shadow-sm bg-indigo-800 text-sm font-medium text-white hover:bg-indigo-700"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
              </svg>
              Sign up with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
