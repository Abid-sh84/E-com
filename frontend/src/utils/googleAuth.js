/**
 * Handle Google Sign In
 * @param {Function} callback - Function to call after successful sign in
 */
export const handleGoogleSignIn = (callback) => {
  if (!window.google) {
    console.error('Google API not loaded');
    return;
  }

  try {
    const auth2 = window.google.accounts.oauth2;
    
    // Google OAuth client configuration
    const client = auth2.initTokenClient({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      scope: 'email profile',
      callback: (response) => {
        // Get user info using the access token
        if (response.access_token) {
          fetchUserInfo(response.access_token, callback);
        }
      },
    });
    
    client.requestAccessToken();
  } catch (error) {
    console.error('Google Sign In Error:', error);
  }
};

/**
 * Fetch Google user info with access token
 * @param {string} accessToken - Google OAuth access token
 * @param {Function} callback - Callback to handle user data
 */
const fetchUserInfo = async (accessToken, callback) => {
  try {
    const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user info');
    }

    const userData = await response.json();
    // Call the provided callback with user data
    callback({
      name: userData.name,
      email: userData.email,
      // Use a random password or token-based auth for Google users
      googleId: userData.sub,
      avatar: userData.picture,
    });
  } catch (error) {
    console.error('Error fetching user info:', error);
  }
};

/**
 * Load Google API script
 */
export const loadGoogleScript = () => {
  // Check if the script is already loaded
  if (document.getElementById('google-auth-script')) return;

  const script = document.createElement('script');
  script.src = 'https://accounts.google.com/gsi/client';
  script.id = 'google-auth-script';
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
};
