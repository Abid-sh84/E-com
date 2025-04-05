
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  images: string[];
  category: string;
  theme: string;
  type: string;
  sizes: string[];
  colors: string[];
  inStock: boolean;
  featured: boolean;
  rating: number;
  reviews: number;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Spider-Man Web Slinger',
    description: 'Unleash your inner hero with this premium Spider-Man themed t-shirt featuring the iconic web-slinger in action. Made with high-quality cotton for maximum comfort.',
    price: 29.99,
    originalPrice: 39.99,
    discountPercentage: 25,
    images: ['https://images.unsplash.com/photo-1593642532744-d377ab507dc8'],
    category: 'marvel',
    theme: 'Spider-Man',
    type: 'Graphic Printed',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Red', 'Blue', 'Black'],
    inStock: true,
    featured: true,
    rating: 4.8,
    reviews: 125,
  },
  {
    id: '2',
    name: 'Batman Dark Knight',
    description: 'Embrace the darkness with this sleek Batman-themed t-shirt featuring the Dark Knight silhouette against the Gotham skyline. Perfect for any DC Comics fan.',
    price: 32.99,
    originalPrice: 42.99,
    discountPercentage: 23,
    images: ['https://images.unsplash.com/photo-1602751584553-8ba896038310'],
    category: 'dc',
    theme: 'Batman',
    type: 'Graphic Printed',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Gray', 'Navy Blue'],
    inStock: true,
    featured: true,
    rating: 4.9,
    reviews: 210,
  },
  {
    id: '3',
    name: 'Naruto Sage Mode',
    description: 'Channel your inner ninja with this vibrant Naruto Sage Mode t-shirt. Features high-quality print that won\'t fade with washing.',
    price: 27.99,
    originalPrice: 34.99,
    discountPercentage: 20,
    images: ['https://images.unsplash.com/photo-1522096823084-2d1aa8411c13'],
    category: 'anime',
    theme: 'Naruto',
    type: 'Graphic Printed',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Orange', 'Black', 'White'],
    inStock: true,
    featured: true,
    rating: 4.7,
    reviews: 98,
  },
  {
    id: '4',
    name: 'Iron Man Arc Reactor',
    description: 'Light up the room with this glow-in-the-dark Iron Man Arc Reactor t-shirt. Perfect for Marvel fans who want to showcase their love for technology and heroism.',
    price: 34.99,
    originalPrice: 44.99,
    discountPercentage: 22,
    images: ['https://images.unsplash.com/photo-1529374814760-71f6d39922d6'],
    category: 'marvel',
    theme: 'Iron Man',
    type: 'Specialty Print',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Red', 'Gold', 'Black'],
    inStock: true,
    featured: false,
    rating: 4.9,
    reviews: 156,
  },
  {
    id: '5',
    name: 'Superman Classic Logo',
    description: 'Show off your superhero pride with this classic Superman logo t-shirt. Made with 100% organic cotton for a comfortable fit that lasts all day.',
    price: 25.99,
    originalPrice: 32.99,
    discountPercentage: 21,
    images: ['https://images.unsplash.com/photo-1489987707025-afc232f7ea0f'],
    category: 'dc',
    theme: 'Superman',
    type: 'Classic Logo',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Blue', 'Red', 'White'],
    inStock: true,
    featured: false,
    rating: 4.6,
    reviews: 89,
  },
  {
    id: '6',
    name: 'One Punch Man Serious',
    description: 'Get serious about style with this One Punch Man themed t-shirt featuring Saitama in his iconic serious pose. Ultra-comfortable material that breathes well.',
    price: 28.99,
    originalPrice: 35.99,
    discountPercentage: 19,
    images: ['https://images.unsplash.com/photo-1554568218-0f1715e72254'],
    category: 'anime',
    theme: 'One Punch Man',
    type: 'Graphic Printed',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Yellow', 'Black'],
    inStock: true,
    featured: false,
    rating: 4.7,
    reviews: 72,
  },
  {
    id: '7',
    name: 'Wonder Woman Warrior',
    description: 'Embrace your inner warrior with this empowering Wonder Woman themed t-shirt. Features a comfortable fit and durable print.',
    price: 31.99,
    originalPrice: 39.99,
    discountPercentage: 20,
    images: ['https://images.unsplash.com/photo-1503342394128-c104d54dba01'],
    category: 'dc',
    theme: 'Wonder Woman',
    type: 'Graphic Printed',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Red', 'Blue', 'Gold'],
    inStock: true,
    featured: true,
    rating: 4.8,
    reviews: 104,
  },
  {
    id: '8',
    name: 'Black Panther Wakanda',
    description: 'Wakanda Forever! Represent with this stunning Black Panther themed t-shirt featuring tribal motifs and the iconic mask design.',
    price: 33.99,
    originalPrice: 42.99,
    discountPercentage: 21,
    images: ['https://images.unsplash.com/photo-1496347646636-ea47f7d6b37b'],
    category: 'marvel',
    theme: 'Black Panther',
    type: 'Graphic Printed',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Purple', 'Silver'],
    inStock: true,
    featured: false,
    rating: 4.9,
    reviews: 135,
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category.toLowerCase());
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};
