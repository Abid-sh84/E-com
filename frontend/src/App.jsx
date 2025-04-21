import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import ProductsPage from "./pages/ProductsPage"
import ProductDetailPage from "./pages/ProductDetailPage"
import CartPage from "./pages/CartPage"
import WishlistPage from "./pages/WishlistPage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import ProfilePage from "./pages/ProfilePage"
import CheckoutPage from "./pages/CheckoutPage"
import ResetPasswordPage from "./pages/ResetPasswordPage"
import GoogleAuthCallback from "./components/GoogleAuthCallback"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import FaqPage from "./pages/FaqPage"
import ShippingPage from "./pages/ShippingPage"
import TermsPage from "./pages/TermsPage"
import ReturnsPage from "./pages/ReturnsPage"
import PrivacyPage from "./pages/PrivacyPage"
import CookiesPage from "./pages/CookiesPage"
import { CartProvider } from "./contexts/CartContext"
import { WishlistProvider } from "./contexts/WishlistContext"
import { AuthProvider } from "./contexts/AuthContext"
// adding all routes
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <div className="flex flex-col min-h-screen bg-indigo-950 bg-[url('/images/starry-bg.png')] bg-fixed bg-cover">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
                <Route path="/auth/google/callback" element={<GoogleAuthCallback />} />
                {/* Information pages */}
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/shipping" element={<ShippingPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/returns" element={<ReturnsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/cookies" element={<CookiesPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
