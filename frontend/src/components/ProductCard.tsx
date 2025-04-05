
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../data/products';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="product-card group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Sale Badge */}
      {product.discountPercentage > 0 && (
        <div className="absolute top-3 left-3 z-10 bg-superhero-red text-white font-comic text-sm px-2 py-1 rounded-full">
          {product.discountPercentage}% OFF
        </div>
      )}
      
      {/* Wishlist Button */}
      <button 
        className={`absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/10 backdrop-blur-sm transition-all duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={(e) => {
          e.preventDefault();
          console.log('Added to wishlist:', product.id);
        }}
      >
        <Heart size={18} className="text-white hover:text-superhero-red" />
      </button>
      
      <Link to={`/product/${product.id}`} className="block overflow-hidden">
        <div className="aspect-square overflow-hidden relative">
          {/* Overlay effect on hover */}
          <div className={`absolute inset-0 bg-gradient-to-t from-starrynight-dark to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300 z-10`}></div>
          
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-comic text-lg text-white group-hover:text-superhero-yellow transition-colors">
              {product.name}
            </h3>
            
            <div className="flex items-center">
              <Star size={16} fill="#FFD600" className="text-superhero-yellow" />
              <span className="ml-1 text-sm text-starrynight-gold">{product.rating}</span>
            </div>
          </div>
          
          <div className="mt-2 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <p className="text-lg font-semibold text-white">${product.price.toFixed(2)}</p>
              {product.originalPrice && product.originalPrice > product.price && (
                <p className="text-sm text-starrynight-light line-through">${product.originalPrice.toFixed(2)}</p>
              )}
            </div>
            <span className="text-xs px-2 py-1 bg-starrynight-blue/30 rounded-full text-starrynight-light">{product.type}</span>
          </div>
          
          {/* Category Badge */}
          <div className="mt-2">
            <span className="text-xs px-2 py-0.5 bg-starrynight-gold/20 text-starrynight-gold rounded-full">
              {product.category.toUpperCase()}
            </span>
          </div>
        </div>
      </Link>

      {/* Quick Add Button */}
      <div 
        className={`absolute bottom-4 right-4 transition-all duration-300 ${
          isHovered ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2'
        }`}
      >
        <Button 
          size="icon" 
          className="bg-superhero-yellow text-superhero-black hover:bg-superhero-yellow/90 shadow-lg"
          onClick={(e) => {
            e.preventDefault();
            // Add to cart functionality will go here
            console.log('Adding to cart:', product.id);
          }}
        >
          <ShoppingCart size={20} />
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
