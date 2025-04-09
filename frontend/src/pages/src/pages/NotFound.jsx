import { useLocation } from "react-router-dom";
 import { useEffect } from "react";
 import Layout from "../components/Layout";
 import { Button } from "@/components/ui/button";
 import { Link } from "react-router-dom";
 
 const NotFound = () => {
   const location = useLocation();
 
   useEffect(() => {
     console.error(
       "404 Error: User attempted to access non-existent route:",
       location.pathname
     );
   }, [location.pathname]);
 
   return (
     <Layout>
       <div className="container mx-auto px-4 py-20 text-center">
         <div className="relative w-52 h-52 mx-auto mb-8">
           <div className="absolute inset-0 bg-superhero-red rounded-full opacity-20 animate-pulse-soft"></div>
           <h1 className="absolute inset-0 flex items-center justify-center font-comic text-8xl text-superhero-red">404</h1>
         </div>
         
         <h2 className="font-comic text-4xl text-white mb-4">Page Not Found</h2>
         
         <p className="text-starrynight-light max-w-lg mx-auto mb-8">
           Oops! Even superheroes get lost sometimes. The page you're looking for 
           doesn't exist or has been moved to another universe.
         </p>
         
         <Button asChild className="comic-btn">
           <Link to="/">Return to Homepage</Link>
         </Button>
       </div>
     </Layout>
   );
 };
 
 export default NotFound;
