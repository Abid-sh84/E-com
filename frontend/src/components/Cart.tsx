
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash, Plus, Minus, ShoppingCart as CartIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Mock cart data
const initialCartItems = [
  {
    id: '1',
    name: 'Spider-Man Web Slinger',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1593642532744-d377ab507dc8',
    size: 'L',
    color: 'Red',
    quantity: 1,
  },
  {
    id: '2',
    name: 'Batman Dark Knight',
    price: 32.99,
    image: 'https://images.unsplash.com/photo-1602751584553-8ba896038310',
    size: 'M',
    color: 'Black',
    quantity: 2,
  },
];

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(initialCartItems);
  
  // Calculate cart totals
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 5.99;
  const total = subtotal + shipping;
  
  // Update quantity
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };
  
  // Remove item from cart
  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };
  
  // Empty cart
  const handleClearCart = () => {
    setCartItems([]);
  };
  
  // Proceed to checkout
  const handleCheckout = () => {
    // Normally would navigate to checkout, but just show a message for now
    alert('Checkout functionality is not implemented in this demo');
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="w-24 h-24 bg-starrynight-blue/30 rounded-full flex items-center justify-center">
            <CartIcon size={40} className="text-starrynight-light" />
          </div>
          
          <h2 className="font-comic text-3xl text-white">Your Cart is Empty</h2>
          
          <p className="text-starrynight-light max-w-md">
            Looks like you haven't added any superhero apparel to your cart yet.
            Check out our awesome collections!
          </p>
          
          <Button 
            className="comic-btn mt-4"
            onClick={() => navigate('/products')}
          >
            Shop Now
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-comic text-3xl md:text-4xl text-white mb-8">Your Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-starrynight-blue/20 rounded-lg border border-starrynight-light/20 overflow-hidden">
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-starrynight-blue/30 text-sm text-starrynight-light">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-center">Total</div>
            </div>
            
            {cartItems.map((item) => (
              <div key={item.id} className="border-t border-starrynight-light/10 p-4 md:grid md:grid-cols-12 md:gap-4 md:items-center">
                {/* Product Info - Mobile & Desktop */}
                <div className="md:col-span-6 flex gap-4 mb-4 md:mb-0">
                  <Link to={`/product/${item.id}`} className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                  
                  <div>
                    <Link to={`/product/${item.id}`} className="font-medium text-white hover:text-superhero-yellow">
                      {item.name}
                    </Link>
                    <div className="text-sm text-starrynight-light mt-1">
                      <span className="inline-block mr-2">Size: {item.size}</span>
                      <span>Color: {item.color}</span>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="flex items-center text-sm text-superhero-red hover:text-superhero-red/80 mt-2 md:hidden"
                    >
                      <Trash size={14} className="mr-1" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
                
                {/* Price - Mobile & Desktop */}
                <div className="md:col-span-2 md:text-center flex justify-between md:block mb-2 md:mb-0">
                  <div className="text-sm text-starrynight-light md:hidden">Price:</div>
                  <div className="text-white">${item.price.toFixed(2)}</div>
                </div>
                
                {/* Quantity - Mobile & Desktop */}
                <div className="md:col-span-2 md:text-center flex justify-between md:justify-center items-center mb-2 md:mb-0">
                  <div className="text-sm text-starrynight-light md:hidden">Quantity:</div>
                  <div className="flex items-center border border-starrynight-light/20 rounded-md">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 text-white hover:bg-starrynight-blue"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-3 py-1 text-white">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 text-white hover:bg-starrynight-blue"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                
                {/* Total - Mobile & Desktop */}
                <div className="md:col-span-2 md:text-center flex justify-between md:block">
                  <div className="text-sm text-starrynight-light md:hidden">Total:</div>
                  <div className="text-white font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                </div>
                
                {/* Remove Button - Desktop only */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="hidden md:flex ml-auto text-superhero-red hover:text-superhero-red/80"
                >
                  <Trash size={18} />
                </button>
              </div>
            ))}
            
            {/* Cart Actions */}
            <div className="p-4 border-t border-starrynight-light/10 flex justify-between">
              <Button 
                variant="outline" 
                className="text-starrynight-light border-starrynight-light/20 hover:bg-starrynight-light/10"
                onClick={() => navigate('/products')}
              >
                Continue Shopping
              </Button>
              
              <Button 
                variant="outline" 
                className="text-superhero-red border-superhero-red/20 hover:bg-superhero-red/10"
                onClick={handleClearCart}
              >
                Clear Cart
              </Button>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-starrynight-blue/20 rounded-lg border border-starrynight-light/20 p-6">
            <h2 className="font-comic text-2xl text-white mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-starrynight-light">Subtotal</span>
                <span className="text-white">${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-starrynight-light">Shipping</span>
                <span className="text-white">${shipping.toFixed(2)}</span>
              </div>
              
              <div className="pt-4 border-t border-starrynight-light/10 flex justify-between">
                <span className="font-medium text-white">Total</span>
                <span className="font-bold text-xl text-white">${total.toFixed(2)}</span>
              </div>
            </div>
            
            {/* Promo Code */}
            <div className="mb-6">
              <label className="text-white mb-2 block">Promo Code</label>
              <div className="flex gap-2">
                <Input 
                  type="text"
                  placeholder="Enter code"
                  className="bg-starrynight-blue/30 border-starrynight-light/30"
                />
                <Button variant="outline" className="whitespace-nowrap border-starrynight-light/30 text-white">
                  Apply
                </Button>
              </div>
            </div>
            
            {/* Checkout Button */}
            <Button 
              className="comic-btn w-full py-6"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </Button>
            
            {/* Payment Methods */}
            <div className="mt-6 pt-6 border-t border-starrynight-light/10 flex justify-center">
              <div className="flex gap-4">
                <div className="w-10 h-6 bg-white rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-blue-700">VISA</span>
                </div>
                <div className="w-10 h-6 bg-white rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-red-600">MC</span>
                </div>
                <div className="w-10 h-6 bg-white rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-blue-500">PP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
