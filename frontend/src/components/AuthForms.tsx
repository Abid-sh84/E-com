import { useState, useRef, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
// import { FcGoogle } from "react-icons/fc";

const AuthForms = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const { toast } = useToast();

  // Refs for input fields
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const registerEmailRef = useRef(null);
  const registerPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setIsLoggedIn(true);
      setUserDetails(JSON.parse(user));
    }
  }, []);

  // Load Google API script
  useEffect(() => {
    const loadGoogleScript = () => {
      return new Promise<void>((resolve) => {
        // Check if the script is already loaded
        if (
          document.querySelector(
            'script[src="https://accounts.google.com/gsi/client"]'
          )
        ) {
          resolve();
          return;
        }

        // Load the Google API Client
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        document.body.appendChild(script);
      });
    };

    const initializeGoogleAuth = async () => {
      await loadGoogleScript();

      // After script has loaded, check if Google API is available
      if (window.google && !isLoggedIn) {
        try {
          window.google.accounts.id.initialize({
            client_id:
              "754449509657-hopidveuu7fcp4oofftbl9r3fcah7do9.apps.googleusercontent.com",
            callback: handleGoogleResponse,
          });

          // Render the button only after initialization
          renderGoogleButton();
        } catch (error) {
          console.error("Error initializing Google Sign-In:", error);
        }
      }
    };

    initializeGoogleAuth();

    return () => {
      // Cleanup any Google Sign-In related resources if needed
    };
  }, [isLoggedIn]);

  // Handle Google authentication response
  const handleGoogleResponse = async (response) => {
    setIsLoading(true);
    try {
      // Send the ID token to backend for verification
      const backendResponse = await fetch(
        "http://localhost:5000/api/users/google-auth",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ credential: response.credential }),
        }
      );

      const data = await backendResponse.json().catch(() => {
        // If JSON parsing fails, create a default error object
        return { message: "Server returned an invalid response" };
      });

      if (backendResponse.ok) {
        toast({
          title: "Google Login Successful",
          description: `Welcome, ${data.user.firstName}!`,
        });
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setIsLoggedIn(true);
        setUserDetails(data.user);
      } else {
        // More specific error handling based on status code
        let errorMessage = data.message || "Google authentication failed";

        if (backendResponse.status === 500) {
          errorMessage =
            "Server error occurred. Please try again later or contact support.";
          console.error("Server error details:", data);
        }

        toast({
          title: "Authentication Error",
          description: errorMessage,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Google auth error:", error);
      toast({
        title: "Error",
        description:
          "Something went wrong with Google authentication. Please try again later.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const renderGoogleButton = () => {
    if (window.google) {
      try {
        // Try to find the button element
        const buttonElement = document.getElementById("google-login-button");
        if (buttonElement) {
          window.google.accounts.id.renderButton(buttonElement, {
            theme: "outline",
            size: "large",
            width: 250, // Use numeric value instead of percentage
            text: "signin_with",
          });
        }
      } catch (error) {
        console.error("Error rendering Google button:", error);
      }
    }
  };

  const handleGoogleLogin = () => {
    if (window.google) {
      try {
        window.google.accounts.id.prompt();
      } catch (error) {
        console.error("Error prompting Google Sign-In:", error);
        toast({
          title: "Error",
          description: "Google sign-in is not available right now.",
        });
      }
    } else {
      toast({
        title: "Error",
        description: "Google sign-in is not available right now.",
      });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        toast({
          title: "Login Successful",
          description: `Welcome, ${data.user.firstName}!`,
        });
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setIsLoggedIn(true);
        setUserDetails(data.user);
      } else {
        toast({ title: "Error", description: data.message });
      }
    } catch (error) {
      toast({ title: "Error", description: "Something went wrong." });
    }

    setIsLoading(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const email = registerEmailRef.current?.value;
    const password = registerPasswordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    if (password !== confirmPassword) {
      toast({ title: "Error", description: "Passwords do not match!" });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        toast({
          title: "Registration Successful",
          description: "You can now log in.",
        });
      } else {
        toast({ title: "Error", description: data.message });
      }
    } catch (error) {
      toast({ title: "Error", description: "Something went wrong." });
    }

    setIsLoading(false);
  };

  const handleLogout = () => {
    // Sign out from Google as well
    if (window.google) {
      window.google.accounts.id.disableAutoSelect();
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserDetails(null);
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const firstName = firstNameRef.current?.value || userDetails.firstName;
    const lastName = lastNameRef.current?.value || userDetails.lastName;
    const email = emailRef.current?.value || userDetails.email;
    const password = passwordRef.current?.value;

    try {
      const response = await fetch("http://localhost:5000/api/users/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        toast({
          title: "Update Successful",
          description: "Your details have been updated.",
        });
        setUserDetails(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        toast({ title: "Error", description: data.message });
      }
    } catch (error) {
      toast({ title: "Error", description: "Something went wrong." });
    }

    setIsLoading(false);
  };

  if (isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-comic text-4xl text-white mb-2">
              Welcome, {userDetails.firstName}!
            </h1>
            <p className="text-starrynight-light">
              Manage your superhero collection
            </p>
          </div>

          <div className="bg-starrynight-blue/20 p-6 rounded-lg border border-starrynight-light/20">
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input
                  ref={firstNameRef}
                  id="first-name"
                  defaultValue={userDetails.firstName}
                  className="bg-starrynight-blue/30 border-starrynight-light/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input
                  ref={lastNameRef}
                  id="last-name"
                  defaultValue={userDetails.lastName}
                  className="bg-starrynight-blue/30 border-starrynight-light/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  ref={emailRef}
                  id="email"
                  defaultValue={userDetails.email}
                  className="bg-starrynight-blue/30 border-starrynight-light/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">New Password (optional)</Label>
                <Input
                  ref={passwordRef}
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="bg-starrynight-blue/30 border-starrynight-light/30"
                />
              </div>

              <Button
                type="submit"
                className="comic-btn w-full"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Details"}
              </Button>
            </form>

            <Button onClick={handleLogout} className="comic-btn w-full mt-4">
              Logout
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-comic text-4xl text-white mb-2">
            Welcome, Hero!
          </h1>
          <p className="text-starrynight-light">
            Sign in to manage your superhero collection
          </p>
        </div>

        <div className="bg-starrynight-blue/20 p-6 rounded-lg border border-starrynight-light/20">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            {/* Login Form */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    ref={emailRef}
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    required
                    className="bg-starrynight-blue/30 border-starrynight-light/30"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    ref={passwordRef}
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    className="bg-starrynight-blue/30 border-starrynight-light/30"
                  />
                </div>

                <Button
                  type="submit"
                  className="comic-btn w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>

                <div className="relative my-4">
                  <Separator />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-starrynight-blue px-2 text-xs text-starrynight-light">
                      OR
                    </span>
                  </div>
                </div>

                <div
                  id="google-login-button"
                  className="w-full flex justify-center mb-2"
                ></div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                >
                  Sign in with Google
                </Button>
              </form>
            </TabsContent>

            {/* Register Form */}
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input
                      ref={firstNameRef}
                      id="first-name"
                      placeholder="John"
                      required
                      className="bg-starrynight-blue/30 border-starrynight-light/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input
                      ref={lastNameRef}
                      id="last-name"
                      placeholder="Doe"
                      required
                      className="bg-starrynight-blue/30 border-starrynight-light/30"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    ref={registerEmailRef}
                    id="register-email"
                    type="email"
                    placeholder="your.email@example.com"
                    required
                    className="bg-starrynight-blue/30 border-starrynight-light/30"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <Input
                    ref={registerPasswordRef}
                    id="register-password"
                    type="password"
                    placeholder="••••••••"
                    required
                    className="bg-starrynight-blue/30 border-starrynight-light/30"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    ref={confirmPasswordRef}
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    required
                    className="bg-starrynight-blue/30 border-starrynight-light/30"
                  />
                </div>

                <Button
                  type="submit"
                  className="comic-btn w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Register"}
                </Button>

                <div className="relative my-4">
                  <Separator />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-starrynight-blue px-2 text-xs text-starrynight-light">
                      OR
                    </span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                >
                  Sign in with Google
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

// Add TypeScript declarations for the Google API
declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          prompt: (callback?: () => void) => void;
          renderButton: (element: HTMLElement, options: any) => void;
          disableAutoSelect: () => void;
        };
      };
    };
  }
}

export default AuthForms;
