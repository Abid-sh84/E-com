import { useState } from 'react';
 import { Link } from 'react-router-dom';
 import { Menu, ShoppingCart, User, Search, X } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 
 const Navbar = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [searchOpen, setSearchOpen] = useState(false);
   
   // Mock cart count
   const cartCount = 0;
 
   return (
     <header className="sticky top-0 z-50 bg-starrynight-dark/90 backdrop-blur-sm border-b border-starrynight-light/20">
       <div className="container mx-auto px-4 py-3">
         <div className="flex items-center justify-between">
           {/* Logo */}
           <Link to="/" className="flex items-center">
             <span className="font-comic text-2xl md:text-3xl text-white">
               <span className="text-superhero-red">Comic</span>
               <span className="text-superhero-blue">Verse</span>
               <span className="text-superhero-yellow">Threads</span>
             </span>
           </Link>
 
           {/* Desktop Navigation */}
           <nav className="hidden md:flex items-center space-x-6">
             <Link to="/products" className="text-white hover:text-superhero-yellow transition">Shop All</Link>
             <Link to="/products?category=marvel" className="text-white hover:text-superhero-yellow transition">Marvel</Link>
             <Link to="/products?category=dc" className="text-white hover:text-superhero-yellow transition">DC</Link>
             <Link to="/products?category=anime" className="text-white hover:text-superhero-yellow transition">Anime</Link>
           </nav>
 
           {/* Search, Cart, and User */}
           <div className="flex items-center space-x-4">
             {/* Search Toggle */}
             <Button 
               variant="ghost" 
               size="icon" 
               onClick={() => setSearchOpen(!searchOpen)}
               className="text-white hover:text-superhero-yellow"
             >
               <Search size={20} />
             </Button>
             
             {/* Cart */}
             <Link to="/cart" className="relative">
               <Button 
                 variant="ghost" 
                 size="icon"
                 className="text-white hover:text-superhero-yellow"
               >
                 <ShoppingCart size={20} />
                 {cartCount > 0 && (
                   <span className="absolute -top-1 -right-1 bg-superhero-red text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                     {cartCount}
                   </span>
                 )}
               </Button>
             </Link>
             
             {/* User */}
             <Link to="/auth">
               <Button 
                 variant="ghost" 
                 size="icon"
                 className="text-white hover:text-superhero-yellow"
               >
                 <User size={20} />
               </Button>
             </Link>
 
             {/* Mobile Menu Toggle */}
             <Button 
               variant="ghost"
               size="icon"
               className="md:hidden text-white"
               onClick={() => setIsMenuOpen(!isMenuOpen)}
             >
               <Menu size={24} />
             </Button>
           </div>
         </div>
 
         {/* Search Bar */}
         {searchOpen && (
           <div className="absolute inset-x-0 top-full bg-starrynight-dark/95 p-4">
             <div className="container mx-auto flex items-center">
               <Input 
                 type="text" 
                 placeholder="Search for t-shirts..." 
                 className="w-full pr-10" 
               />
               <Button 
                 variant="ghost" 
                 size="icon" 
                 onClick={() => setSearchOpen(false)}
                 className="absolute right-6 text-white"
               >
                 <X size={20} />
               </Button>
             </div>
           </div>
         )}
       </div>
       
       {/* Mobile Menu */}
       {isMenuOpen && (
         <div className="md:hidden absolute inset-x-0 top-full bg-starrynight-dark/95 border-t border-starrynight-light/20">
           <nav className="container mx-auto p-4 flex flex-col space-y-3">
             <Link 
               to="/products" 
               onClick={() => setIsMenuOpen(false)}
               className="text-white hover:text-superhero-yellow py-2 transition"
             >
               Shop All
             </Link>
             <Link 
               to="/products?category=marvel" 
               onClick={() => setIsMenuOpen(false)}
               className="text-white hover:text-superhero-yellow py-2 transition"
             >
               Marvel
             </Link>
             <Link 
               to="/products?category=dc" 
               onClick={() => setIsMenuOpen(false)}
               className="text-white hover:text-superhero-yellow py-2 transition"
             >
               DC
             </Link>
             <Link 
               to="/products?category=anime" 
               onClick={() => setIsMenuOpen(false)}
               className="text-white hover:text-superhero-yellow py-2 transition"
             >
               Anime
             </Link>
           </nav>
         </div>
       )}
     </header>
   );
 };
 
 export default Navbar;
