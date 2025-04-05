
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../components/Layout';
import ProductGrid from '../components/ProductGrid';
import { products, getProductsByCategory, getFeaturedProducts } from '../data/products';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

const ProductPage = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const featured = searchParams.get('featured');
  
  // State for sorting (can be expanded later)
  const [sortBy, setSortBy] = useState('newest');
  
  let displayProducts = products;
  let title = 'All Products';
  let description = 'Browse our complete collection of superhero and comic-inspired t-shirts.';
  
  if (category) {
    displayProducts = getProductsByCategory(category);
    // Capitalize first letter of category
    title = `${category.charAt(0).toUpperCase() + category.slice(1)} Collection`;
    
    // Custom descriptions based on category
    if (category === 'marvel') {
      description = 'Discover amazing Marvel Universe t-shirts featuring your favorite Avengers, X-Men, and more!';
    } else if (category === 'dc') {
      description = 'Show your love for the Justice League, Batman, Superman and other DC heroes with our premium t-shirts.';
    } else if (category === 'anime') {
      description = 'Express your passion for anime with our exclusive collection of anime-inspired superhero t-shirts.';
    }
  } else if (featured === 'true') {
    displayProducts = getFeaturedProducts();
    title = 'Featured Collection';
    description = 'Our handpicked selection of the most popular and exclusive superhero t-shirts.';
  }
  
  // Apply sorting
  const sortedProducts = [...displayProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    // Default: newest
    return b.id.localeCompare(a.id); // Simple approximation for "newest"
  });
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Banner */}
        <div className="relative bg-gradient-to-r from-starrynight-blue to-starrynight-dark rounded-lg overflow-hidden mb-12">
          <div className="absolute inset-0">
            {[...Array(15)].map((_, index) => (
              <div
                key={index}
                className="star"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              ></div>
            ))}
          </div>
          
          <div className="relative z-10 p-8 md:p-12">
            <h1 className="font-comic text-4xl md:text-5xl text-white mb-4 text-shadow-md">{title}</h1>
            <p className="text-starrynight-light text-lg max-w-2xl">{description}</p>
            
            {featured === 'true' && (
              <div className="mt-4 inline-flex items-center gap-2 bg-superhero-yellow/20 text-superhero-yellow px-4 py-1 rounded-full">
                <Sparkles size={16} />
                <span className="font-comic">Limited Edition Items</span>
              </div>
            )}
          </div>
          
          {/* Decorative element */}
          <div className="absolute bottom-0 right-0 w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-superhero-yellow/30 to-transparent rounded-full -mb-16 -mr-16 blur-2xl"></div>
        </div>
        
        {/* Filter and Sort Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-starrynight-blue/20 p-4 rounded-lg">
          <div className="text-white font-medium">
            {sortedProducts.length} Products
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-starrynight-light">Sort by:</span>
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'newest', label: 'Newest' },
                { value: 'price-low', label: 'Price: Low to High' },
                { value: 'price-high', label: 'Price: High to Low' },
                { value: 'rating', label: 'Top Rated' },
              ].map((option) => (
                <Button
                  key={option.value}
                  variant={sortBy === option.value ? 'default' : 'outline'}
                  size="sm"
                  className={sortBy === option.value 
                    ? 'bg-superhero-yellow text-superhero-black' 
                    : 'border-starrynight-light/20 text-starrynight-light hover:text-white hover:bg-starrynight-blue/30'}
                  onClick={() => setSortBy(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Products Grid */}
        <ProductGrid products={sortedProducts} />
        
        {/* Pagination placeholder (for future implementation) */}
        <div className="flex justify-center mt-12">
          <div className="inline-flex bg-starrynight-blue/20 p-1 rounded-lg">
            <Button variant="ghost" size="sm" className="text-starrynight-light">1</Button>
            <Button variant="outline" size="sm" className="bg-superhero-yellow text-superhero-black border-none">2</Button>
            <Button variant="ghost" size="sm" className="text-starrynight-light">3</Button>
            <Button variant="ghost" size="sm" className="text-starrynight-light">...</Button>
            <Button variant="ghost" size="sm" className="text-starrynight-light">10</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
