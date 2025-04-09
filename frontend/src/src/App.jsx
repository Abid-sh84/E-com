import { Toaster } from "@/components/ui/toaster";
 import { Toaster as Sonner } from "@/components/ui/sonner";
 import { TooltipProvider } from "@/components/ui/tooltip";
 import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
 import { BrowserRouter, Routes, Route } from "react-router-dom";
 
 // Pages
 import Index from "./pages/Index";
 import ProductPage from "./pages/ProductPage";
 import ProductDetailPage from "./pages/ProductDetailPage";
 import CartPage from "./pages/CartPage";
 import AuthPage from "./pages/AuthPage";
 import ProfilePage from "./pages/ProfilePage";
 import NotFound from "./pages/NotFound";
 
 const queryClient = new QueryClient();
 
 const App = () => (
   <QueryClientProvider client={queryClient}>
     <TooltipProvider>
       <Toaster />
       <Sonner />
       <BrowserRouter>
         <Routes>
           <Route path="/" element={<Index />} />
           <Route path="/products" element={<ProductPage />} />
           <Route path="/product/:id" element={<ProductDetailPage />} />
           <Route path="/cart" element={<CartPage />} />
           <Route path="/auth" element={<AuthPage />} />
           <Route path="/profile" element={<ProfilePage />} />
           <Route path="*" element={<NotFound />} />
         </Routes>
       </BrowserRouter>
     </TooltipProvider>
   </QueryClientProvider>
 );
 
 export default App;
