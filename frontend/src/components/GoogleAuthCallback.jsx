import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const GoogleAuthCallback = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { loginWithGoogle } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        setLoading(true);
        
        // Get token from URL parameters
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        const errorMsg = params.get("error");
        
        if (errorMsg) {
          console.error("Error from Google auth:", errorMsg);
          setError(`Authentication failed: ${errorMsg}`);
          setLoading(false);
          return;
        }
        
        if (!token) {
          console.error("No token received from Google auth");
          setError("Authentication failed: No token received");
          setLoading(false);
          return;
        }
        
        console.log("Token received, completing authentication...");
        
        // Complete Google authentication process
        await loginWithGoogle(token);
        
        // Get redirect target (or default to home)
        const redirectTarget = localStorage.getItem("redirectAfterLogin") || "/";
        localStorage.removeItem("redirectAfterLogin");
        
        // Navigate to destination
        navigate(redirectTarget);
      } catch (error) {
        console.error("Google auth callback error:", error);
        setError(`Authentication failed: ${error.message || "Unknown error"}`);
        setLoading(false);
      }
    };
    
    handleCallback();
  }, [navigate, loginWithGoogle]);
  
  // Show loading or error state
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-indigo-950 flex items-center justify-center py-12 px-4">
      <div className="bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-indigo-900/80 backdrop-blur-md p-8 rounded-xl border border-indigo-700/50 shadow-lg shadow-purple-900/30 max-w-md w-full">
        {loading ? (
          <div className="text-center">
            <div className="inline-block animate-spin h-12 w-12 border-4 border-indigo-300 border-t-yellow-400 rounded-full mb-4"></div>
            <h2 className="text-2xl font-bold text-white mb-2">Completing Authentication</h2>
            <p className="text-indigo-300">Please wait while we log you in...</p>
          </div>
        ) : error ? (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-900/30 border-2 border-red-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Authentication Failed</h2>
            <p className="text-indigo-300 mb-6">{error}</p>
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-indigo-950 font-bold rounded-lg transform hover:scale-105 transition-all duration-300"
            >
              Back to Login
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default GoogleAuthCallback;
