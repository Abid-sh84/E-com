import { useState, useRef } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AuthForms = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Refs for input fields
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const registerEmailRef = useRef(null);
  const registerPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        toast({ title: "Login Successful", description: `Welcome, ${data.user.firstName}!` });
        localStorage.setItem('token', data.token);
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
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        toast({ title: "Registration Successful", description: "You can now log in." });
      } else {
        toast({ title: "Error", description: data.message });
      }
    } catch (error) {
      toast({ title: "Error", description: "Something went wrong." });
    }

    setIsLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-comic text-4xl text-white mb-2">Welcome, Hero!</h1>
          <p className="text-starrynight-light">Sign in to manage your superhero collection</p>
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
                  <Input ref={emailRef} id="email" type="email" placeholder="your.email@example.com" required className="bg-starrynight-blue/30 border-starrynight-light/30" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input ref={passwordRef} id="password" type="password" placeholder="••••••••" required className="bg-starrynight-blue/30 border-starrynight-light/30" />
                </div>

                <Button type="submit" className="comic-btn w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </TabsContent>

            {/* Register Form */}
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input ref={firstNameRef} id="first-name" placeholder="John" required className="bg-starrynight-blue/30 border-starrynight-light/30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input ref={lastNameRef} id="last-name" placeholder="Doe" required className="bg-starrynight-blue/30 border-starrynight-light/30" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input ref={registerEmailRef} id="register-email" type="email" placeholder="your.email@example.com" required className="bg-starrynight-blue/30 border-starrynight-light/30" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <Input ref={registerPasswordRef} id="register-password" type="password" placeholder="••••••••" required className="bg-starrynight-blue/30 border-starrynight-light/30" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input ref={confirmPasswordRef} id="confirm-password" type="password" placeholder="••••••••" required className="bg-starrynight-blue/30 border-starrynight-light/30" />
                </div>

                <Button type="submit" className="comic-btn w-full" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Register"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AuthForms;
