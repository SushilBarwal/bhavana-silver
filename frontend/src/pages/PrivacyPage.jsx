import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Breadcrumb } from '../components/common';
import { FiShield, FiLock, FiEye } from 'react-icons/fi';

/**
 * Privacy Policy Page Component
 */
const PrivacyPage = () => {
  const pageRef = useRef(null);

  const breadcrumbItems = [
    { label: 'HOME', link: '/' },
    { label: 'PRIVACY POLICY', active: true }
  ];

  useGSAP(() => {
    gsap.fromTo(pageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' });
  }, { scope: pageRef });

  return (
    <div ref={pageRef} className="privacy-page bg-white min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <Breadcrumb items={breadcrumbItems} />

        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <FiShield className="w-12 h-12 text-primary" />
            <h1 className="section-heading">PRIVACY POLICY</h1>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-body text-gray-600 mb-8">
              Last Updated: November 2024
            </p>

            <div className="bg-blue-50 border-l-4 border-primary p-6 mb-8">
              <div className="flex items-start gap-3">
                <FiLock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-body text-gray-700 leading-relaxed">
                  At Bhavana Silver Jewellery, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data.
                </p>
              </div>
            </div>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Business Information</h3>
              <p className="text-body text-gray-700 leading-relaxed mb-4">
                As a B2B wholesale platform, we collect business-related information including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-body text-gray-700 ml-4 mb-4">
                <li>Company name and business registration details</li>
                <li>Tax identification number (TIN) or business license</li>
                <li>Business address and contact information</li>
                <li>Authorized representative details</li>
                <li>Trade references and credit information</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Personal Information</h3>
              <ul className="list-disc list-inside space-y-2 text-body text-gray-700 ml-4 mb-4">
                <li>Name, email address, and phone number</li>
                <li>Billing and shipping addresses</li>
                <li>Payment information (processed securely through third-party providers)</li>
                <li>Account credentials (username and encrypted password)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Automated Information</h3>
              <ul className="list-disc list-inside space-y-2 text-body text-gray-700 ml-4">
                <li>IP address and browser type</li>
                <li>Device information and operating system</li>
                <li>Pages visited and time spent on our website</li>
                <li>Referring website and search terms</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-body text-gray-700 leading-relaxed mb-4">
                We use the collected information for the following purposes:
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Order Processing and Fulfillment</h3>
              <ul className="list-disc list-inside space-y-2 text-body text-gray-700 ml-4 mb-4">
                <li>Process and complete your orders</li>
                <li>Arrange shipping and delivery</li>
                <li>Send order confirmations and updates</li>
                <li>Handle returns and exchanges</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Account Management</h3>
              <ul className="list-disc list-inside space-y-2 text-body text-gray-700 ml-4 mb-4">
                <li>Create and maintain your business account</li>
                <li>Verify your identity and business credentials</li>
                <li>Provide customer support and assistance</li>
                <li>Manage your preferences and settings</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Communication</h3>
              <ul className="list-disc list-inside space-y-2 text-body text-gray-700 ml-4 mb-4">
                <li>Send product updates and catalogs</li>
                <li>Share promotional offers and discounts</li>
                <li>Provide industry news and insights</li>
                <li>Respond to inquiries and support requests</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Business Operations</h3>
              <ul className="list-disc list-inside space-y-2 text-body text-gray-700 ml-4">
                <li>Improve our products and services</li>
                <li>Analyze website usage and customer behavior</li>
                <li>Detect and prevent fraud or security issues</li>
                <li>Comply with legal and regulatory requirements</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information Sharing and Disclosure</h2>
              <p className="text-body text-gray-700 leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information with:
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Service Providers</h3>
              <p className="text-body text-gray-700 leading-relaxed mb-4">
                We work with trusted third-party service providers who assist us in:
              </p>
              <ul className="list-disc list-inside space-y-2 text-body text-gray-700 ml-4 mb-4">
                <li>Payment processing (PayPal, Stripe, etc.)</li>
                <li>Shipping and logistics (DHL, FedEx, UPS)</li>
                <li>Email marketing and communications</li>
                <li>Website hosting and analytics</li>
                <li>Customer relationship management (CRM)</li>
              </ul>
              <p className="text-body text-gray-700 leading-relaxed">
                These providers are bound by confidentiality agreements and only use your information to perform services on our behalf.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Legal Requirements</h3>
              <p className="text-body text-gray-700 leading-relaxed mb-4">
                We may disclose your information when required by law or to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-body text-gray-700 ml-4">
                <li>Comply with legal obligations or court orders</li>
                <li>Protect our rights, property, or safety</li>
                <li>Prevent fraud or investigate security issues</li>
                <li>Enforce our terms and conditions</li>
              </ul>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <FiLock className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-semibold text-gray-900">4. Data Security</h2>
              </div>
              <p className="text-body text-gray-700 leading-relaxed mb-4">
                We implement industry-standard security measures to protect your information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-body text-gray-700 ml-4 mb-4">
                <li><strong>SSL/TLS Encryption:</strong> Secure data transmission using 256-bit encryption</li>
                <li><strong>Secure Servers:</strong> Data stored on protected servers with firewalls</li>
                <li><strong>Access Controls:</strong> Limited access to authorized personnel only</li>
                <li><strong>Regular Audits:</strong> Security assessments and vulnerability testing</li>
                <li><strong>PCI Compliance:</strong> Payment Card Industry Data Security Standards compliance</li>
              </ul>
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded">
                <p className="text-question text-yellow-800">
                  <strong>Note:</strong> While we take extensive measures to secure your data, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security but continuously work to improve our protection systems.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Cookies and Tracking Technologies</h2>
              <p className="text-body text-gray-700 leading-relaxed mb-4">
                We use cookies and similar technologies to enhance your browsing experience:
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Types of Cookies</h3>
              <ul className="list-disc list-inside space-y-2 text-body text-gray-700 ml-4 mb-4">
                <li><strong>Essential Cookies:</strong> Required for website functionality and security</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
                <li><strong>Marketing Cookies:</strong> Track your preferences for personalized content</li>
                <li><strong>Functionality Cookies:</strong> Remember your settings and preferences</li>
              </ul>
              <p className="text-body text-gray-700 leading-relaxed">
                You can control cookies through your browser settings. Note that disabling cookies may affect website functionality.
              </p>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <FiEye className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-semibold text-gray-900">6. Your Rights and Choices</h2>
              </div>
              <p className="text-body text-gray-700 leading-relaxed mb-4">
                You have the following rights regarding your personal information:
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Access and Correction</h3>
              <ul className="list-disc list-inside space-y-2 text-body text-gray-700 ml-4 mb-4">
                <li>Request a copy of your personal data</li>
                <li>Update or correct inaccurate information</li>
                <li>Download your account data in portable format</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Communication Preferences</h3>
              <ul className="list-disc list-inside space-y-2 text-body text-gray-700 ml-4 mb-4">
                <li>Opt-out of marketing emails (unsubscribe link included)</li>
                <li>Manage notification settings in your account</li>
                <li>Choose preferred communication channels</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Data Deletion</h3>
              <ul className="list-disc list-inside space-y-2 text-body text-gray-700 ml-4">
                <li>Request deletion of your personal data</li>
                <li>Close your account (subject to legal retention requirements)</li>
                <li>We'll retain data for legal compliance (e.g., tax records, transaction history)</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Data Retention</h2>
              <p className="text-body text-gray-700 leading-relaxed mb-4">
                We retain your information for as long as necessary to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-body text-gray-700 ml-4 mb-4">
                <li>Maintain your active account and provide services</li>
                <li>Comply with legal, tax, and accounting obligations</li>
                <li>Resolve disputes and enforce agreements</li>
                <li>Prevent fraud and maintain security</li>
              </ul>
              <p className="text-body text-gray-700 leading-relaxed">
                Inactive accounts may be deleted after 5 years of inactivity, following notification to the registered email address.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. International Data Transfers</h2>
              <p className="text-body text-gray-700 leading-relaxed mb-4">
                As a global wholesale business, your information may be transferred to and processed in countries outside your jurisdiction. We ensure adequate protection through:
              </p>
              <ul className="list-disc list-inside space-y-2 text-body text-gray-700 ml-4">
                <li>Standard contractual clauses approved by regulatory authorities</li>
                <li>Compliance with international data protection frameworks</li>
                <li>Adequate security measures in all locations</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Children's Privacy</h2>
              <p className="text-body text-gray-700 leading-relaxed">
                Our services are intended for business use only and not directed to individuals under 18 years of age. We do not knowingly collect personal information from children.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to This Policy</h2>
              <p className="text-body text-gray-700 leading-relaxed mb-4">
                We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will:
              </p>
              <ul className="list-disc list-inside space-y-2 text-body text-gray-700 ml-4 mb-4">
                <li>Post the updated policy on our website</li>
                <li>Update the "Last Updated" date</li>
                <li>Notify you of significant changes via email</li>
                <li>Provide 30 days notice for material changes</li>
              </ul>
              <p className="text-body text-gray-700 leading-relaxed">
                Continued use of our services after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Us</h2>
              <p className="text-body text-gray-700 leading-relaxed mb-4">
                For privacy-related questions, concerns, or to exercise your rights:
              </p>
              <div className="bg-gray-50 p-6 rounded">
                <p className="text-body text-gray-700">
                  <strong>Privacy Officer</strong><br />
                  Bhavana Silver Jewellery<br />
                  G-34-35, SEZ Phase 2, Sitapura Industrial Area<br />
                  Jaipur, Rajasthan 302022, India<br />
                  <br />
                  Email: privacy@bhavanjewellery.com<br />
                  Phone: +91 81072 87333<br />
                  Business Hours: Monday-Saturday, 9:00 AM - 6:00 PM IST
                </p>
              </div>
              <p className="text-body text-gray-700 leading-relaxed mt-4">
                We aim to respond to all privacy requests within 30 days.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
