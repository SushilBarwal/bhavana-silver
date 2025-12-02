import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Breadcrumb } from '../components/common';
import { FiFileText } from 'react-icons/fi';

/**
 * Terms and Conditions Page Component
 */
const TermsPage = () => {
  const pageRef = useRef(null);

  const breadcrumbItems = [
    { label: 'HOME', link: '/' },
    { label: 'TERMS & CONDITIONS', active: true }
  ];

  useGSAP(() => {
    gsap.fromTo(pageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' });
  }, { scope: pageRef });

  return (
    <div ref={pageRef} className="terms-page bg-white min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <Breadcrumb items={breadcrumbItems} />

        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <FiFileText className="w-12 h-12 text-primary" />
            <h1 className="section-heading">TERMS & CONDITIONS</h1>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-body text-gray-600 mb-8">
              Last Updated: November 2024
            </p>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p className="text-body text-gray-700 leading-relaxed mb-4">
                By accessing and using the Bhavana Silver Jewellery website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.
              </p>
              <p className="text-body text-gray-700 leading-relaxed">
                These Terms and Conditions govern your use of our website, mobile applications, and any related services provided by Bhavana Silver Jewellery.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Wholesale Business Model</h2>
              <p className="text-body text-gray-700 leading-relaxed mb-4">
                Bhavana Silver Jewellery operates exclusively as a B2B wholesale jewelry supplier. Our products and services are intended for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-body text-gray-700 ml-4">
                <li>Registered jewelry retailers and wholesalers</li>
                <li>Licensed jewelry businesses with valid tax identification</li>
                <li>Authorized commercial buyers with trade credentials</li>
              </ul>
              <p className="text-body text-gray-700 leading-relaxed mt-4">
                All orders are subject to minimum order quantities (MOQ) as specified for each product category.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Account Registration</h2>
              <p className="text-body text-gray-700 leading-relaxed mb-4">
                To place orders, you must create an account and provide:
              </p>
              <ul className="list-disc list-inside space-y-2 text-body text-gray-700 ml-4">
                <li>Valid business registration documents</li>
                <li>Tax identification number (TIN) or business license</li>
                <li>Contact information and billing address</li>
                <li>Authorized representative details</li>
              </ul>
              <p className="text-body text-gray-700 leading-relaxed mt-4">
                You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Pricing and Payment</h2>
              <p className="text-body text-gray-700 leading-relaxed mb-4">
                All prices are quoted in USD and are subject to change without notice. Prices displayed on our website are wholesale prices for qualified business buyers only.
              </p>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Payment Terms:</h3>
              <ul className="list-disc list-inside space-y-2 text-body text-gray-700 ml-4">
                <li>Full payment required before shipment for new customers</li>
                <li>Net 30 payment terms available for established accounts</li>
                <li>Accepted payment methods: Wire transfer, credit card, PayPal</li>
                <li>All orders subject to credit approval</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Order Processing and Fulfillment</h2>
              <p className="text-body text-gray-700 leading-relaxed mb-4">
                Orders are processed within 3-5 business days after payment confirmation. Custom orders may require additional processing time (15-20 business days).
              </p>
              <p className="text-body text-gray-700 leading-relaxed mb-4">
                We reserve the right to refuse or cancel any order for any reason, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-body text-gray-700 ml-4">
                <li>Product unavailability or stock limitations</li>
                <li>Pricing errors or technical issues</li>
                <li>Fraudulent or unauthorized transactions</li>
                <li>Failure to meet minimum order requirements</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Returns and Exchanges</h2>
              <p className="text-body text-gray-700 leading-relaxed mb-4">
                We accept returns within 14 days of delivery for defective products or shipping errors only. Custom-made or personalized items are non-returnable.
              </p>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Return Conditions:</h3>
              <ul className="list-disc list-inside space-y-2 text-body text-gray-700 ml-4">
                <li>Products must be unworn, unused, and in original packaging</li>
                <li>All tags, certificates, and documentation must be intact</li>
                <li>Return authorization (RA) number required before shipping</li>
                <li>Return shipping costs borne by customer unless product defect</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Product Quality and Authenticity</h2>
              <p className="text-body text-gray-700 leading-relaxed mb-4">
                All products are guaranteed to be authentic and meet the specifications as described. We provide:
              </p>
              <ul className="list-disc list-inside space-y-2 text-body text-gray-700 ml-4">
                <li>Certificate of authenticity for precious metals and gemstones</li>
                <li>Quality assurance documentation</li>
                <li>Detailed product specifications and measurements</li>
                <li>Compliance with international jewelry standards</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Intellectual Property</h2>
              <p className="text-body text-gray-700 leading-relaxed mb-4">
                All content, designs, logos, and images on this website are the property of Bhavana Silver Jewellery and protected by copyright laws. Unauthorized use, reproduction, or distribution is prohibited.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Limitation of Liability</h2>
              <p className="text-body text-gray-700 leading-relaxed mb-4">
                Bhavana Silver Jewellery shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our products or services. Our total liability is limited to the purchase price of the product in question.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Governing Law</h2>
              <p className="text-body text-gray-700 leading-relaxed mb-4">
                These Terms and Conditions are governed by the laws of India. Any disputes shall be resolved in the courts of Jaipur, Rajasthan, India.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Changes to Terms</h2>
              <p className="text-body text-gray-700 leading-relaxed mb-4">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website. Continued use of our services constitutes acceptance of the modified terms.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contact Information</h2>
              <p className="text-body text-gray-700 leading-relaxed mb-4">
                For questions about these Terms and Conditions, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded">
                <p className="text-body text-gray-700">
                  <strong>Bhavana Silver Jewellery</strong><br />
                  G-34-35, SEZ Phase 2, Sitapura Industrial Area<br />
                  Jaipur, Rajasthan 302022, India<br />
                  Email: sales@bhavanjewellery.com<br />
                  Phone: +91 81072 87333
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
