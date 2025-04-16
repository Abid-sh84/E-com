import PageTemplate from "../components/PageTemplate";
import { Link } from "react-router-dom";

const ShippingPage = () => {
  return (
    <PageTemplate
      title="Shipping Policy"
      subtitle="Everything you need to know about how we deliver your cosmic collectibles"
    >
      <div className="space-y-8 text-indigo-200">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-400 mb-6">
          Shipping Information
        </h2>
        
        <section className="mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Processing Times</h3>
          <p className="mb-4">
            All orders are processed within 1-2 business days (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped.
          </p>
          <p>
            During peak seasons or promotional periods, processing times may be slightly longer. If there are any significant delays with your order, we'll contact you directly.
          </p>
        </section>
        
        <section className="mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Shipping Methods & Delivery Times</h3>
          
          <div className="bg-indigo-900/50 rounded-lg overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-indigo-800">
                <thead className="bg-indigo-800/50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-yellow-300 uppercase tracking-wider">
                      Shipping Method
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-yellow-300 uppercase tracking-wider">
                      Estimated Delivery
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-yellow-300 uppercase tracking-wider">
                      Cost
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-indigo-800">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">Standard Domestic</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-300">3-5 business days</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-300">$5.99 (Free over $50)</td>
                  </tr>
                  <tr className="bg-indigo-800/20">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">Express Domestic</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-300">1-2 business days</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-300">$12.99</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">International Standard</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-300">7-14 business days</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-300">Starting at $15.99</td>
                  </tr>
                  <tr className="bg-indigo-800/20">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">International Express</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-300">3-5 business days</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-300">Starting at $29.99</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <p className="text-sm italic">
            *Delivery times are estimates and not guaranteed. Delivery times may be affected by customs clearance procedures for international shipments.
          </p>
        </section>
        
        <section className="mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Free Shipping</h3>
          <p>
            We're happy to offer free standard domestic shipping on all orders over $50. This applies to standard shipping only and excludes oversized items. International orders and expedited shipping options are not eligible for free shipping.
          </p>
        </section>
        
        <section className="mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Tracking Information</h3>
          <p className="mb-4">
            You will receive a shipping confirmation email with your tracking number once your order ships. If you do not receive tracking information within 5 business days of your order, please contact us for assistance.
          </p>
          <p>
            For international orders, tracking may be limited once the package leaves the United States and enters the destination country's postal service.
          </p>
        </section>
        
        <section className="mb-8">
          <h3 className="text-xl font-bold text-white mb-4">International Shipping</h3>
          <p className="mb-4">
            We currently ship to over 50 countries worldwide. International customers may be subject to customs fees, import duties, and taxes after the shipment reaches the destination country. These charges are the responsibility of the recipient and vary by country.
          </p>
          <p>
            We are not responsible for delays due to customs processing or additional fees imposed by your country's customs agencies.
          </p>
        </section>
        
        <section className="mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Shipping Restrictions</h3>
          <p>
            Certain items, particularly limited editions or products containing delicate materials, may have shipping restrictions to specific countries. These restrictions will be noted on the product page.
          </p>
        </section>
        
        <section>
          <h3 className="text-xl font-bold text-white mb-4">Contact Us</h3>
          <p className="mb-6">
            If you have any questions about shipping or delivery, please don't hesitate to contact our customer service team.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/contact" 
              className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-indigo-950 font-bold rounded-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
            >
              Contact Support
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

export default ShippingPage;
