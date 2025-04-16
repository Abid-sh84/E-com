import { Link } from "react-router-dom";
import PageTemplate from "../components/PageTemplate";

const TermsPage = () => {
  return (
    <PageTemplate
      title="Terms of Service"
      subtitle="Please read these terms carefully before using our services"
    >
      <div className="space-y-8 text-indigo-200">
        <p className="italic text-sm">Last Updated: May 15, 2023</p>
        
        <section className="mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Introduction</h3>
          <p className="mb-4">
            Welcome to Starry Comics. These Terms of Service ("Terms") govern your use of our website, services, and products. By accessing or using our website, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you may not use our services.
          </p>
          <p>
            Please read these Terms carefully before using our website. Your access to and use of the service is conditioned on your acceptance of and compliance with these Terms.
          </p>
        </section>
        
        <section className="mb-8">
          <h3 className="text-xl font-bold text-white mb-4">User Accounts</h3>
          <p className="mb-4">
            When you create an account with us, you must provide accurate, complete, and up-to-date information. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
          </p>
          <p className="mb-4">
            You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password. You agree not to disclose your password to any third party.
          </p>
          <p>
            You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
          </p>
        </section>
        
        <section className="mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Purchases</h3>
          <p className="mb-4">
            If you wish to purchase any product made available through the service ("Purchase"), you may be asked to supply certain information relevant to your Purchase including, without limitation, your credit card number, the expiration date of your credit card, your billing address, and your shipping information.
          </p>
          <p className="mb-4">
            You represent and warrant that: (i) you have the legal right to use any credit card(s) or other payment method(s) in connection with any Purchase; and that (ii) the information you supply to us is true, correct and complete.
          </p>
          <p>
            The service may employ the use of third-party services for the purpose of facilitating payment and the completion of Purchases. By submitting your information, you grant us the right to provide the information to these third parties subject to our Privacy Policy.
          </p>
        </section>
        
        <section className="mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Product Availability and Accuracy</h3>
          <p className="mb-4">
            We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address.
          </p>
          <p className="mb-4">
            We reserve the right to limit or prohibit orders that, in our sole judgment, appear to be placed by dealers, resellers or distributors.
          </p>
          <p>
            All descriptions of products or product pricing are subject to change at any time without notice, at our sole discretion. We reserve the right to discontinue any product at any time.
          </p>
        </section>
        
        <section className="mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Intellectual Property</h3>
          <p className="mb-4">
            The Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of Starry Comics and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
          </p>
          <p>
            Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Starry Comics.
          </p>
        </section>
        
        <section className="mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Limitation of Liability</h3>
          <p className="mb-4">
            In no event shall Starry Comics, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content.
          </p>
        </section>
        
        <section className="mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Governing Law</h3>
          <p>
            These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
          </p>
        </section>
        
        <section className="mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Changes to Terms</h3>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
          </p>
        </section>
        
        <section>
          <h3 className="text-xl font-bold text-white mb-4">Contact Us</h3>
          <p className="mb-6">
            If you have any questions about these Terms, please contact us:
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/contact" 
              className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-indigo-950 font-bold rounded-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default TermsPage;
