import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import CanvasCursor from "../components/CanvasCursor"

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [tokenValid, setTokenValid] = useState(true)
  const [showStars, setShowStars] = useState(true)
  const [tokenVerifying, setTokenVerifying] = useState(true) // Add loading state for token verification

  const navigate = useNavigate()
  const { token } = useParams()

  // Create stars effect
  useEffect(() => {
    const createStars = () => {
      if (!showStars) return;
      
      const starsContainer = document.getElementById('reset-stars-container');
      if (!starsContainer) return;
      
      // Clear previous stars
      starsContainer.innerHTML = '';
      
      // Create stars
      for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
          
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
    };

    createStars();
    window.addEventListener('resize', createStars);
    
    return () => {
      window.removeEventListener('resize', createStars);
    };
  }, [showStars]);

  // Verify token validity
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setTokenValid(false);
        setTokenVerifying(false);
        return;
      }
      
      try {
        setTokenVerifying(true);
        // Fix: Use consistent URL format and remove /api from the URL since it's already in the endpoint
        await axios.get(`http://localhost:5000/api/users/reset-password/${token}/verify`);
        setTokenValid(true);
      } catch (err) {
        console.error("Token verification error:", err);
        setTokenValid(false);
        
        // Set more specific error message based on response
        if (err.response?.status === 400) {
          setError("This password reset link has expired. Please request a new one.");
        } else {
          setError("Invalid reset link. Please try requesting a new password reset.");
        }
      } finally {
        setTokenVerifying(false);
      }
    };
    
    verifyToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      
      // Fix: Use consistent URL format
      await axios.post(`http://localhost:5000/api/users/reset-password/${token}`, {
        password
      });
      
      setSuccess(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      
    } catch (err) {
      console.error("Password reset error:", err);
      if (err.response?.status === 400) {
        setError("This reset link has expired. Please request a new password reset.");
      } else {
        setError(err.response?.data?.message || "Failed to reset password. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-indigo-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Canvas cursor effect */}
      <CanvasCursor />
      
      {/* Stars container */}
      <div id="reset-stars-container" className="fixed inset-0 pointer-events-none overflow-hidden"></div>
      
      {/* Cosmic rays */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/3 w-px h-screen bg-blue-400 opacity-20" style={{boxShadow: '0 0 20px 5px rgba(96, 165, 250, 0.5)'}}></div>
        <div className="absolute top-0 left-2/3 w-px h-screen bg-purple-400 opacity-20" style={{boxShadow: '0 0 20px 5px rgba(192, 132, 252, 0.5)'}}></div>
      </div>
      
      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Glowing border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-yellow-600/30 rounded-xl blur-lg"></div>
        
        <div className="relative bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-indigo-900/80 backdrop-blur-md p-8 rounded-xl border border-indigo-700/50 shadow-lg shadow-purple-900/30">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
          </div>
          
          <h2 className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-purple-400 to-blue-400 animate-float">
            RESET PASSWORD
          </h2>
          
          {tokenVerifying ? (
            <div className="mt-6 text-center">
              <div className="flex justify-center">
                <svg className="animate-spin h-8 w-8 text-indigo-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <p className="mt-4 text-indigo-300">Verifying your reset link...</p>
            </div>
          ) : !tokenValid ? (
            <div className="mt-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-900/30 border-2 border-red-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Invalid or Expired Link</h3>
              <p className="text-indigo-300 mb-6">
                {error || "This password reset link is invalid or has expired."}
              </p>
              <button
                onClick={() => navigate("/login")}
                className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-indigo-950 font-bold rounded-lg transform hover:scale-105 transition-all duration-300"
              >
                Return to Login
              </button>
            </div>
          ) : success ? (
            <div className="mt-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-900/30 border-2 border-green-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Password Updated!</h3>
              <p className="text-indigo-300 mb-6">
                Your password has been successfully reset. Redirecting to login...
              </p>
              <div className="flex justify-center">
                <svg className="animate-spin h-8 w-8 text-indigo-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            </div>
          ) : (
            <>
              <p className="mt-2 text-center text-indigo-300">
                Create a new password for your account
              </p>
              
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
                    <label htmlFor="password" className="block text-sm font-medium text-indigo-300 mb-1 group-focus-within:text-yellow-300 transition-colors">
                      New Password
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
                        autoComplete="new-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 bg-indigo-800/50 border border-indigo-600 rounded-lg focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 text-white placeholder-indigo-400 transition-all"
                        placeholder="Enter new password"
                      />
                    </div>
                    <p className="mt-1 text-xs text-indigo-400">Must be at least 6 characters</p>
                  </div>
                  
                  <div className="group">
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-indigo-300 mb-1 group-focus-within:text-yellow-300 transition-colors">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400 group-focus-within:text-yellow-300 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <input
                        id="confirm-password"
                        name="confirm-password"
                        type="password"
                        autoComplete="new-password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 bg-indigo-800/50 border border-indigo-600 rounded-lg focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 text-white placeholder-indigo-400 transition-all"
                        placeholder="Confirm new password"
                      />
                    </div>
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
                        Resetting Password...
                      </>
                    ) : (
                      "Reset Password"
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
          
          {/* Comic style decorative elements */}
          <div className="absolute -top-4 -left-4 h-8 w-8 bg-yellow-400 rounded-full opacity-70 blur-md"></div>
          <div className="absolute -bottom-4 -right-4 h-8 w-8 bg-purple-500 rounded-full opacity-70 blur-md"></div>
        </div>
        
        {/* Comic style decorations */}
        <div className="absolute -top-3 -right-3 transform rotate-12">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
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

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default ResetPasswordPage
