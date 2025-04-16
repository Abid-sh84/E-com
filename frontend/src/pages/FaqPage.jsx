import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../components/PageTemplate';

const FaqPage = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState('general');

  // Organize FAQs by category
  const faqCategories = {
    general: [
      {
        question: 'How long does shipping take?',
        answer: 'Shipping times vary by location. Domestic orders typically arrive within 3-5 business days, while international orders may take 7-14 business days. All orders include tracking information so you can monitor your package\'s journey.'
      },
      {
        question: 'Are your products officially licensed?',
        answer: 'Yes! All our products are 100% officially licensed merchandise. We partner directly with Marvel, DC, and other major studios to ensure authenticity and quality for every item we sell.'
      },
      {
        question: 'What is your return policy?',
        answer: 'We offer a 30-day return policy for unused items in their original packaging. If you\'re not satisfied with your purchase, please contact our customer service team to initiate a return. Note that custom or personalized items cannot be returned unless defective.'
      },
      {
        question: 'Do you ship internationally?',
        answer: 'Yes, we ship to over 50 countries worldwide. International shipping costs and delivery times are calculated at checkout based on your location and chosen shipping method.'
      },
      {
        question: 'How can I track my order?',
        answer: 'Once your order ships, you\'ll receive a confirmation email with tracking information. You can also log into your account on our website to view your order status and tracking details at any time.'
      },
      {
        question: 'Are there any discounts for bulk orders?',
        answer: 'Yes, we offer special discounts for bulk or wholesale orders. Please contact our sales team at wholesale@starrycomics.com with details about your order requirements for a custom quote.'
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, and Google Pay. All payments are securely processed with encryption to protect your financial information.'
      },
      {
        question: 'How do I care for my comic collectibles?',
        answer: 'For comics, store them in acid-free bags with backing boards in a cool, dry place away from direct sunlight. For figures and statues, regular dusting with a soft microfiber cloth is recommended. Avoid displaying items in direct sunlight to prevent color fading.'
      }
    ],
    products: [
      {
        question: 'How do I know if a product is in stock?',
        answer: 'All products displayed on our website show real-time inventory status. If an item is out of stock, you\'ll see an "Out of Stock" label or "Pre-order" option if it will be available again soon.'
      },
      {
        question: 'Can I request a specific comic variant?',
        answer: 'For variant covers or special editions, the specific variant is listed in the product description. If you\'re looking for a specific variant not listed, please contact customer service before ordering.'
      },
      {
        question: 'Do you sell graded comics?',
        answer: 'Yes, we offer CGC and CBCS graded comics. These are clearly marked in the product description with the grade and certification number.'
      },
      {
        question: 'Are your action figures new in box?',
        answer: 'Unless specifically noted as "loose" or "opened," all action figures and collectibles are brand new in their original packaging.'
      }
    ],
    account: [
      {
        question: 'How do I create an account?',
        answer: 'Click the "Login" button in the top navigation, then select "Register" and fill out the form with your information. You\'ll receive a confirmation email to verify your account.'
      },
      {
        question: 'Can I place an order without creating an account?',
        answer: 'Yes, we offer guest checkout for convenience. However, creating an account allows you to track orders, save favorites, and receive special member discounts.'
      },
      {
        question: 'I forgot my password. What should I do?',
        answer: 'On the login page, click "Forgot Password" and enter your email address. You\'ll receive instructions to reset your password via email.'
      },
      {
        question: 'How do I update my shipping address?',
        answer: 'Log into your account, go to "My Account," select "Addresses," and you can edit existing addresses or add new ones.'
      }
    ],
    orders: [
      {
        question: 'Can I change or cancel my order?',
        answer: 'If your order hasn\'t shipped yet, please contact customer service immediately to request changes or cancellation. Once an order ships, it cannot be modified.'
      },
      {
        question: 'What happens if an item in my order is out of stock?',
        answer: 'We\'ll contact you if any items in your order are unavailable. You can choose to wait for the item, substitute it, or receive a refund for that specific item.'
      },
      {
        question: 'Do you offer order insurance?',
        answer: 'All orders over $100 include complimentary shipping insurance. For orders under $100, you can add shipping insurance at checkout for a small fee.'
      },
      {
        question: 'How are pre-orders handled?',
        answer: 'For pre-orders, your card is charged at the time of purchase. When the item arrives in our inventory, it will be shipped to you with priority. You\'ll receive an email notification when your pre-order ships.'
      }
    ]
  };

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const changeCategory = (category) => {
    setActiveCategory(category);
    setOpenIndex(null);
  };

  return (
    <PageTemplate
      title="Frequently Asked Questions"
      subtitle="Everything you need to know about Starry Comics"
    >
      {/* Category tabs */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex space-x-2 min-w-max">
          {Object.keys(faqCategories).map(category => (
            <button
              key={category}
              onClick={() => changeCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category 
                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-indigo-950' 
                  : 'bg-indigo-900/50 text-white hover:bg-indigo-800/70'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-400 mb-8">
        {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Questions
      </h2>
      
      <div className="space-y-6">
        {faqCategories[activeCategory].map((faq, index) => (
          <div 
            key={index} 
            className={`bg-indigo-900/50 border ${openIndex === index ? 'border-yellow-400/50' : 'border-indigo-700/50'} rounded-lg overflow-hidden transition-all duration-300`}
          >
            <button 
              className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
              onClick={() => toggleFaq(index)}
            >
              <span className="font-medium text-white text-lg">{faq.question}</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-6 w-6 transition-transform duration-300 ${openIndex === index ? 'transform rotate-180 text-yellow-400' : 'text-indigo-400'}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div 
              className={`px-6 overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-96 pb-6' : 'max-h-0'
              }`}
            >
              <p className="text-indigo-300">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 p-6 bg-indigo-900/50 border border-indigo-700/50 rounded-lg">
        <h3 className="text-xl font-bold text-white mb-4">Still have questions?</h3>
        <p className="text-indigo-300 mb-6">
          Our support team is ready to help you with any other questions you might have about our products, services, or your specific order.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            to="/contact" 
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-indigo-950 font-bold rounded-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact Support
          </Link>
          <a 
            href="mailto:support@starrycomics.com" 
            className="px-6 py-3 bg-indigo-800 hover:bg-indigo-700 text-white font-bold rounded-lg transition-all duration-300 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
            Email Us Directly
          </a>
        </div>
      </div>

      {/* Additional FAQ categories for more comprehensive content */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-400 mb-6">
          Popular FAQ Categories
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <div className="bg-indigo-900/50 p-5 rounded-xl border border-indigo-700/50 transform hover:translate-y-[-5px] transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/30">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Orders & Shipping
            </h3>
            <p className="text-sm text-indigo-300 mb-4">Find information about order processing, shipping methods, and delivery times.</p>
            <Link 
              to="/shipping" 
              className="text-yellow-300 hover:text-yellow-200 text-sm flex items-center"
            >
              View Shipping Policy
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="bg-indigo-900/50 p-5 rounded-xl border border-indigo-700/50 transform hover:translate-y-[-5px] transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/30">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
              </svg>
              Returns & Exchanges
            </h3>
            <p className="text-sm text-indigo-300 mb-4">Learn about our return policy, exchanges, and refund processes.</p>
            <Link 
              to="/returns" 
              className="text-yellow-300 hover:text-yellow-200 text-sm flex items-center"
            >
              View Return Policy
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="bg-indigo-900/50 p-5 rounded-xl border border-indigo-700/50 transform hover:translate-y-[-5px] transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/30">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Product Authenticity
            </h3>
            <p className="text-sm text-indigo-300 mb-4">Information about product verification, licensing, and quality assurance.</p>
            <Link 
              to="/about" 
              className="text-yellow-300 hover:text-yellow-200 text-sm flex items-center"
            >
              Learn About Our Quality
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default FaqPage;
