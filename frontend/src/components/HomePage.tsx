
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedProducts, products } from '../data/products';
import ProductGrid from './ProductGrid';
import { Button } from '@/components/ui/button';
import { Sparkles, Zap, ShieldCheck } from 'lucide-react';

const HomePage = () => {
  const [stars, setStars] = useState<Array<{ top: string; left: string; size: string; delay: string }>>([]);
  const featuredProducts = getFeaturedProducts();
  
  // Generate random stars for the hero background
  useEffect(() => {
    const newStars = Array.from({ length: 70 }, () => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 4 + 1}px`,
      delay: `${Math.random() * 3}s`,
    }));
    setStars(newStars);
  }, []);

  // Get one product from each category
  const marvelProduct = products.find(product => product.category === 'marvel');
  const dcProduct = products.find(product => product.category === 'dc');
  const animeProduct = products.find(product => product.category === 'anime');

  return (
    <div>
      {/* Hero Section with enhanced visuals */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          {stars.map((star, index) => (
            <div
              key={index}
              className="star"
              style={{
                top: star.top,
                left: star.left,
                width: star.size,
                height: star.size,
                animationDelay: star.delay,
              }}
            ></div>
          ))}
        </div>
        
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
              <div className="inline-block bg-superhero-yellow/20 text-superhero-yellow px-4 py-2 rounded-full mb-4 font-comic animate-pulse-soft">
                New Summer Collection!
              </div>
              
              <h1 className="font-comic text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6">
                <span className="text-superhero-red">Super</span> Styles for
                <span className="text-superhero-yellow animate-float inline-block ml-2"> Super </span> 
                <span className="text-white relative">
                  Fans
                  <span className="absolute -top-3 -right-6 text-3xl text-starrynight-gold">★</span>
                </span>
              </h1>
              
              <p className="text-starrynight-light max-w-lg mx-auto md:mx-0 mb-8">
                Express your love for comics and superheroes with our premium quality t-shirts. 
                From Marvel to DC to Anime, we've got your favorite characters covered.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button asChild className="comic-btn relative overflow-hidden group">
                  <Link to="/products" className="flex items-center">
                    <span className="absolute top-0 left-0 w-0 h-full bg-white/20 transform -skew-x-12 group-hover:w-full group-hover:transition-all duration-700"></span>
                    <Zap size={18} className="mr-2" />
                    <span className="relative">Shop Now</span>
                  </Link>
                </Button>
                
                <Button variant="outline" asChild className="border-starrynight-gold text-starrynight-gold hover:bg-starrynight-gold/10">
                  <Link to="/products?featured=true" className="flex items-center">
                    <Sparkles size={18} className="mr-2" />
                    Featured Collection
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="md:w-1/2 relative">
              <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto animate-hero-float">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-superhero-blue/40 to-superhero-red/30 blur-xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1622445272461-c6580cab8755?q=80&w=2574&auto=format&fit=crop"
                  alt="Superhero T-shirt"
                  className="w-full h-full object-cover rounded-full border-4 border-superhero-yellow shadow-xl relative z-10"
                />
                
                <div className="comic-bubble absolute -top-16 -right-8 p-3 transform rotate-12 animate-float">
                  <p className="text-sm font-comic">Limited Edition!</p>
                </div>
                
                <div className="absolute -bottom-4 -right-4 bg-superhero-red text-white font-comic w-24 h-24 rounded-full flex items-center justify-center transform rotate-12 text-xl z-20">
                  20% OFF
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features section */}
      <section className="py-12 bg-starrynight-blue/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-starrynight-dark/60 p-6 rounded-lg border border-starrynight-light/10 text-center transform transition-transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-superhero-blue to-starrynight-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck size={32} className="text-white" />
              </div>
              <h3 className="font-comic text-xl text-white mb-2">Premium Quality</h3>
              <p className="text-starrynight-light">100% cotton superhero tees that last for years</p>
            </div>
            
            <div className="bg-starrynight-dark/60 p-6 rounded-lg border border-starrynight-light/10 text-center transform transition-transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-superhero-red to-starrynight-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap size={32} className="text-white" />
              </div>
              <h3 className="font-comic text-xl text-white mb-2">Fast Shipping</h3>
              <p className="text-starrynight-light">Quick delivery to your doorstep worldwide</p>
            </div>
            
            <div className="bg-starrynight-dark/60 p-6 rounded-lg border border-starrynight-light/10 text-center transform transition-transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-superhero-yellow to-starrynight-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles size={32} className="text-white" />
              </div>
              <h3 className="font-comic text-xl text-white mb-2">Unique Designs</h3>
              <p className="text-starrynight-light">Exclusive artwork you won't find anywhere else</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="container mx-auto px-4 py-16">
        <ProductGrid products={featuredProducts} title="Featured Products" />
        
        <div className="text-center mt-8">
          <Button asChild className="comic-btn">
            <Link to="/products">View All Products</Link>
          </Button>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="bg-starrynight-blue/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-comic text-4xl text-white mb-12 text-center">Shop By Universe</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Marvel */}
            <div className="relative overflow-hidden rounded-lg group">
              <div className="absolute inset-0 bg-gradient-to-b from-superhero-red/30 to-transparent z-0"></div>
              <img 
                src={marvelProduct?.images[0]} 
                alt="Marvel Collection" 
                className="w-full h-72 object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-superhero-red/80 to-transparent flex items-end p-6">
                <div>
                  <h3 className="font-comic text-2xl text-white mb-2">Marvel Universe</h3>
                  <Button asChild className="bg-white text-superhero-red hover:bg-white/90">
                    <Link to="/products?category=marvel">Shop Marvel</Link>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* DC */}
            <div className="relative overflow-hidden rounded-lg group">
              <div className="absolute inset-0 bg-gradient-to-b from-superhero-blue/30 to-transparent z-0"></div>
              <img 
                src={dcProduct?.images[0]} 
                alt="DC Collection" 
                className="w-full h-72 object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-superhero-blue/80 to-transparent flex items-end p-6">
                <div>
                  <h3 className="font-comic text-2xl text-white mb-2">DC Comics</h3>
                  <Button asChild className="bg-white text-superhero-blue hover:bg-white/90">
                    <Link to="/products?category=dc">Shop DC</Link>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Anime */}
            <div className="relative overflow-hidden rounded-lg group">
              <div className="absolute inset-0 bg-gradient-to-b from-superhero-yellow/30 to-transparent z-0"></div>
              <img 
                src={animeProduct?.images[0]} 
                alt="Anime Collection" 
                className="w-full h-72 object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-superhero-yellow/80 to-transparent flex items-end p-6">
                <div>
                  <h3 className="font-comic text-2xl text-superhero-black mb-2">Anime Heroes</h3>
                  <Button asChild className="bg-superhero-black text-superhero-yellow hover:bg-superhero-black/90">
                    <Link to="/products?category=anime">Shop Anime</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-starrynight-dark to-starrynight-blue/50 p-8 rounded-lg border border-starrynight-light/20">
          <h2 className="font-comic text-4xl text-white mb-6">Join the League of Extraordinary Shoppers</h2>
          <p className="text-starrynight-light mb-8">
            Subscribe to our newsletter to receive exclusive offers, early access to new designs, and superhero-sized discounts!
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-superhero-yellow/50 bg-starrynight-blue border border-starrynight-light/20 text-white"
              required
            />
            <Button className="comic-btn whitespace-nowrap">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
