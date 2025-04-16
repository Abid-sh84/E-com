import { Link } from "react-router-dom";
import PageTemplate from "../components/PageTemplate";

const PrivacyPage = () => {
  return (
    <PageTemplate
      title="Privacy Policy"
      subtitle="How we collect, use, and protect your information"
    >
      <div className="space-y-8 text-indigo-200">
        <p className="italic text-sm">Last Updated: May 15, 2023</p>
        
        <section className="mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Introduction</h3>
          <p>
            At Starry Comics, we respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.
          </p>
        </section>
        
        <section className="mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Information We Collect</h3>
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-purple-300">Personal Information</h4>
            <p className="mb-2">We may collect personal information that you voluntarily provide when you:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Create an account</li>
              <li>Make a purchase</li>
              <li>Sign up for our newsletter</li>
              <li>Contact our customer service</li>
              <li>Participate in promotions or surveys</li>
            </ul>
            <p className="mt-2">This information may include your name, email address, postal address, phone number, and payment information.</p>
            
            <h4 className="text-lg font-medium text-purple-300 mt-6">Automatically Collected Information</h4>
            <p className="mb-2">When you visit our website, we automatically collect certain information, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Referral source</li>
              <li>Pages visited</li>
              <li>Time and date of visit</li>
              <li>Time spent on each page</li>
            </ul>
          </div>
        </section>
        
        <section className="mb-8">
          <h3 className="text-xl font-bold text-white mb-4">How We Use Your Information</h3>
          <p className="mb-4">We use the information we collect for various purposes, including:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-indigo-900/50 p-5 rounded-xl border border-indigo-700/50">
              <h4 className="font-bold text-white mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Order Processing
              </h4>
              <p className="text-sm">To process and fulfill your orders, including sending order confirmations, shipping notifications, and updates</p>
            </div>
            
            <div className="bg-indigo-900/50 p-5 rounded-xl border border-indigo-700/50">
              <h4 className="font-bold text-white mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Account Management
              </h4>
              <p className="text-sm">To create and manage your account, including your purchase history, wishlists, and preferences</p>
            </div>
            
            <div className="bg-indigo-900/50 p-5 rounded-xl border border-indigo-700/50">
              <h4 className="font-bold text-white mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Customer Service
              </h4>
              <p className="text-sm">To respond to inquiries, provide support, and address complaints or concerns</p>
            </div>
            
            <div className="bg-indigo-900/50 p-5 rounded-xl border border-indigo-700/50">
              <h4 className="font-bold text-white mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Marketing
              </h4>
              <p className="text-sm">To send newsletters, offers, and other promotional content (with your consent)</p>
            </div>
          </div>
        </section>
        
        <section className="mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Your Rights</h3>
          <p className="mb-4">Depending on your location, you may have certain rights regarding your personal data:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Right to access your personal data</li>
            <li>Right to rectify inaccurate information</li>
            <li>Right to delete your personal data</li>
            <li>Right to restrict processing of your data</li>
            <li>Right to data portability</li>
            <li>Right to object to processing of your data</li>
            <li>Right to withdraw consent</li>
          </ul>
          <p className="mt-4">
            To exercise any of these rights, please contact us using the information provided below.
          </p>
        </section>
        
        <section className="mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Data Security</h3>
          <p>
            We implement appropriate technical and organizational measures to protect your personal data from unauthorized access, disclosure, alteration, or destruction. However, no data transmission or storage system is 100% secure, so we cannot guarantee absolute security.
          </p>
        </section>
        
        <section className="mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Third-Party Services</h3>
          <p>
            Our website may contain links to third-party websites or services that are not owned or controlled by us. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before providing any personal information.
          </p>
        </section>
        
        <section>
          <h3 className="text-xl font-bold text-white mb-4">Contact Us</h3>
          <p className="mb-6">
            If you have any questions about this privacy policy or our data practices, please contact us at:
          </p>
          
          <div className="bg-indigo-900/50 p-5 rounded-xl border border-indigo-700/50 max-w-md mb-8">
            <p className="mb-1"><span className="text-yellow-300 font-medium">Email:</span> privacy@starrycomics.com</p>
            <p className="mb-1"><span className="text-yellow-300 font-medium">Address:</span> 123 Cosmic Lane, Universe City, Galaxy 12345</p>
            <p><span className="text-yellow-300 font-medium">Phone:</span> +1 (888) 123-4567</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/contact" 
              className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-indigo-950 font-bold rounded-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
            >
              Contact Us
            </Link>
            <Link 
              to="/faq" 
              className="px-6 py-3 bg-indigo-800 hover:bg-indigo-700 text-white font-bold rounded-lg transition-all duration-300 flex items-center justify-center"
            >
              View FAQs
            </Link>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default PrivacyPage;
