
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product, getProductById } from '../data/products';
import { Heart, ShoppingCart, Star, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const product = id ? getProductById(id) : null;
  
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="font-comic text-3xl text-white mb-4">Product Not Found</h2>
        <p className="text-starrynight-light mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Button 
          className="comic-btn"
          onClick={() => navigate('/products')}
        >
          Back to Products
        </Button>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "You must select a size before adding to cart",
        variant: "destructive",
      });
      return;
    }
    
    if (!selectedColor) {
      toast({
        title: "Please select a color",
        description: "You must select a color before adding to cart",
        variant: "destructive",
      });
      return;
    }
    
    // Add to cart logic would go here
    toast({
      title: "Added to cart!",
      description: `${quantity} × ${product.name} (${selectedColor}, ${selectedSize}) added to your cart`,
      variant: "default",
    });
    
    console.log('Added to cart:', { 
      productId: product.id,
      name: product.name,
      size: selectedSize,
      color: selectedColor,
      quantity
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Image */}
        <div className="lg:w-1/2">
          <div className="aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-starrynight-blue to-starrynight-dark border border-starrynight-light/20">
            <img 
              src={product.images[0]} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Product Info */}
        <div className="lg:w-1/2">
          <div className="flex flex-col h-full">
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <span className="inline-block bg-starrynight-gold/20 text-starrynight-gold text-xs px-3 py-1 rounded-full mb-2">
                    {product.category.toUpperCase()}
                  </span>
                  <h1 className="font-comic text-3xl md:text-4xl text-white mb-2">{product.name}</h1>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-white hover:text-superhero-red"
                >
                  <Heart size={24} />
                </Button>
              </div>
              
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star 
                    key={i} 
                    size={18} 
                    fill={i < Math.floor(product.rating) ? "#FFD600" : "none"} 
                    className={i < Math.floor(product.rating) ? "text-superhero-yellow" : "text-gray-400"} 
                  />
                ))}
                <span className="text-sm text-starrynight-light ml-2">({product.reviews} reviews)</span>
              </div>
              
              {/* Price */}
              <div className="text-2xl font-bold text-white mb-6">${product.price.toFixed(2)}</div>
              
              {/* Description */}
              <p className="text-starrynight-light mb-8">{product.description}</p>
              
              {/* Size Selection */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium">Size</span>
                  <a href="#size-chart" className="text-sm text-superhero-yellow hover:underline">Size Guide</a>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`w-12 h-12 rounded-md flex items-center justify-center font-medium transition ${
                        selectedSize === size 
                          ? 'bg-superhero-yellow text-superhero-black border-2 border-superhero-black' 
                          : 'bg-starrynight-blue/50 text-white border border-starrynight-light/20 hover:bg-starrynight-blue'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Color Selection */}
              <div className="mb-6">
                <span className="text-white font-medium mb-2 block">Color</span>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => {
                    // Convert color names to tailwind-compatible color classes
                    const colorClass = (() => {
                      switch (color.toLowerCase()) {
                        case 'red': return 'bg-red-600';
                        case 'blue': return 'bg-blue-600';
                        case 'black': return 'bg-black';
                        case 'white': return 'bg-white';
                        case 'gray': return 'bg-gray-400';
                        case 'navy blue': return 'bg-blue-900';
                        case 'yellow': return 'bg-yellow-400';
                        case 'orange': return 'bg-orange-500';
                        case 'purple': return 'bg-purple-600';
                        case 'gold': return 'bg-yellow-600';
                        case 'silver': return 'bg-gray-300';
                        default: return 'bg-gray-500';
                      }
                    })();
                    
                    return (
                      <button
                        key={color}
                        className={`w-10 h-10 rounded-full ${colorClass} flex items-center justify-center transition-transform ${
                          selectedColor === color ? 'ring-2 ring-superhero-yellow ring-offset-2 ring-offset-starrynight-dark scale-110' : ''
                        }`}
                        onClick={() => setSelectedColor(color)}
                        title={color}
                      >
                        {selectedColor === color && <Check size={16} className={color.toLowerCase() === 'white' ? 'text-black' : 'text-white'} />}
                      </button>
                    );
                  })}
                </div>
              </div>
              
              {/* Quantity */}
              <div className="mb-8">
                <span className="text-white font-medium mb-2 block">Quantity</span>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-starrynight-light text-white"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="mx-4 text-white w-8 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-starrynight-light text-white"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Add to Cart Button */}
            <div className="mt-auto flex flex-col sm:flex-row gap-4">
              <Button 
                className="comic-btn flex-1 py-6 flex items-center justify-center gap-2"
                onClick={handleAddToCart}
              >
                <ShoppingCart size={20} />
                <span>Add to Cart</span>
              </Button>
              <Button 
                variant="outline"
                className="border-superhero-red text-superhero-red hover:bg-superhero-red/10 flex-1 flex items-center justify-center gap-2"
              >
                <Heart size={20} />
                <span>Add to Wishlist</span>
              </Button>
            </div>
            
            {/* Additional Info */}
            <div className="mt-6 pt-6 border-t border-starrynight-light/20">
              <div className="flex flex-wrap gap-4">
                <div className="text-sm">
                  <span className="text-starrynight-light">Type:</span>
                  <span className="text-white ml-1">{product.type}</span>
                </div>
                <div className="text-sm">
                  <span className="text-starrynight-light">Theme:</span>
                  <span className="text-white ml-1">{product.theme}</span>
                </div>
                <div className="text-sm">
                  <span className="text-starrynight-light">Category:</span>
                  <span className="text-white ml-1">{product.category}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
