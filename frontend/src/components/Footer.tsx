
import { Link } from 'react-router-dom';
import { Mail, Phone, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-starrynight-dark border-t border-starrynight-light/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center">
              <span className="font-comic text-2xl text-white">
                <span className="text-superhero-red">Comic</span>
                <span className="text-superhero-blue">Verse</span>
                <span className="text-superhero-yellow">Threads</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              Wear your favorite superheroes with our premium quality t-shirts inspired by comic book universes.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="font-comic text-lg text-white mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-sm text-gray-400 hover:text-superhero-yellow">All Products</Link></li>
              <li><Link to="/products?category=marvel" className="text-sm text-gray-400 hover:text-superhero-yellow">Marvel</Link></li>
              <li><Link to="/products?category=dc" className="text-sm text-gray-400 hover:text-superhero-yellow">DC Comics</Link></li>
              <li><Link to="/products?category=anime" className="text-sm text-gray-400 hover:text-superhero-yellow">Anime</Link></li>
            </ul>
          </div>
          
          {/* Help */}
          <div className="col-span-1">
            <h3 className="font-comic text-lg text-white mb-4">Help</h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-sm text-gray-400 hover:text-superhero-yellow">FAQ</Link></li>
              <li><Link to="/shipping" className="text-sm text-gray-400 hover:text-superhero-yellow">Shipping</Link></li>
              <li><Link to="/returns" className="text-sm text-gray-400 hover:text-superhero-yellow">Returns</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-400 hover:text-superhero-yellow">Contact Us</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="col-span-1">
            <h3 className="font-comic text-lg text-white mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-superhero-yellow" />
                <a href="mailto:info@comicversethreads.com" className="text-sm text-gray-400 hover:text-superhero-yellow">
                  info@comicversethreads.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-superhero-yellow" />
                <a href="tel:+1234567890" className="text-sm text-gray-400 hover:text-superhero-yellow">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Globe size={16} className="text-superhero-yellow" />
                <span className="text-sm text-gray-400">Worldwide Shipping</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-starrynight-light/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} ComicVerseThreads. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <Link to="/privacy" className="text-sm text-gray-500 hover:text-superhero-yellow">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-gray-500 hover:text-superhero-yellow">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
