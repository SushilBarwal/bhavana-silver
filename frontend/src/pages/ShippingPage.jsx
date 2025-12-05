import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Breadcrumb } from '../components/common';
import { FiTruck, FiPackage, FiGlobe } from 'react-icons/fi';

/**
 * Shipping and Delivery Policy Page Component
 */
const ShippingPage = () => {
  const pageRef = useRef(null);

  const breadcrumbItems = [
    { label: 'HOME', link: '/' },
    { label: 'SHIPPING & DELIVERY', active: true }
  ];

  useGSAP(() => {
    gsap.fromTo(pageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' });
  }, { scope: pageRef });

  return (
    <div ref={pageRef} className="shipping-page bg-white min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <Breadcrumb items={breadcrumbItems} />

        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <FiTruck className="w-12 h-12 text-primary" />
            <h1 className="section-heading">SHIPPING & DELIVERY POLICY</h1>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-body text-gray-600 mb-8">
              Last Updated: November 2024
            </p>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Overview</h2>
              <p className="text-body text-gray-700 leading-relaxed mb-4">
                At Bhavana Silver Jewellery, we are committed to delivering your wholesale jewelry orders safely, securely, and efficiently. This policy outlines our shipping procedures, delivery timelines, and important information for international B2B customers.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Processing Time</h2>
              <div className="bg-blue-50 border-l-4 border-primary p-6 mb-4">
                <div className="flex items-start gap-3">
                  <FiPackage className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-body text-gray-700 leading-relaxed mb-2">
                      <strong>Standard Orders:</strong> 3-5 business days
                    </p>
                    <p className="text-body text-gray-700 leading-relaxed mb-2">
                      <strong>Custom/Made-to-Order:</strong> 15-20 business days
                    </p>
                    <p className="text-body text-gray-700 leading-relaxed">
                      <strong>Bulk Orders (1000+ pieces):</strong> 25-30 business days
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-body text-gray-700 leading-relaxed">
                Processing begins after payment confirmation and order verification. We'll send you tracking information as soon as your order ships.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Shipping Methods</h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-primary pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">International Express Shipping</h3>
                  <p className="text-body text-gray-700 leading-relaxed mb-2">
                    <strong>Carriers:</strong> DHL Express, FedEx International Priority, UPS Worldwide Express
                  </p>
                  <p className="text-body text-gray-700 leading-relaxed mb-2">
                    <strong>Delivery Time:</strong> 3-7 business days (depending on destination)
                  </p>
                  <p className="text-body text-gray-700 leading-relaxed mb-2">
                    <strong>Tracking:</strong> Full tracking with real-time updates
                  </p>
                  <p className="text-body text-gray-700 leading-relaxed">
                    <strong>Insurance:</strong> Fully insured for declared value
                  </p>
                </div>

                <div className="border-l-4 border-gray-400 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Standard International Shipping</h3>
                  <p className="text-body text-gray-700 leading-relaxed mb-2">
                    <strong>Carriers:</strong> International registered post, standard courier
                  </p>
                  <p className="text-body text-gray-700 leading-relaxed mb-2">
                    <strong>Delivery Time:</strong> 10-15 business days
                  </p>
                  <p className="text-body text-gray-700 leading-relaxed">
                    <strong>Best For:</strong> Non-urgent bulk orders
                  </p>
                </div>

                <div className="border-l-4 border-gray-400 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Freight Shipping (Large Orders)</h3>
                  <p className="text-body text-gray-700 leading-relaxed mb-2">
                    <strong>For Orders:</strong> Over 50kg or high-volume shipments
                  </p>
                  <p className="text-body text-gray-700 leading-relaxed mb-2">
                    <strong>Delivery Time:</strong> 15-30 business days (by destination)
                  </p>
                  <p className="text-body text-gray-700 leading-relaxed">
                    <strong>Cost Effective:</strong> Best rates for large wholesale orders
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Shipping Costs</h2>
              <p className="text-body text-gray-700 leading-relaxed mb-4">
                Shipping costs are calculated based on:
              </p>
              <ul className="list-disc list-inside space-y-2 text-body text-gray-700 ml-4 mb-4">
                <li>Order weight and dimensions</li>
                <li>Destination country and zone</li>
                <li>Selected shipping method</li>
                <li>Declared customs value</li>
              </ul>
              <p className="text-body text-gray-700 leading-relaxed mb-4">
                Final shipping costs will be calculated at checkout. For bulk orders, please contact our sales team for customized shipping quotes.
              </p>
              <div className="bg-green-50 border border-green-200 p-4 rounded">
                <p className="text-body text-green-800">
                  <strong>Free Shipping:</strong> Available for orders over $5,000 (select countries only)
                </p>
              </div>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <FiGlobe className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-semibold text-gray-900">International Shipping Zones</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Zone 1 (3-5 days)</h3>
                  <p className="text-question text-gray-700">
                    USA, Canada, UK, Europe (EU), Australia, New Zealand
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Zone 2 (5-7 days)</h3>
                  <p className="text-question text-gray-700">
                    Middle East, Southeast Asia, Japan, South Korea, Latin America
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Zone 3 (7-10 days)</h3>
                  <p className="text-question text-gray-700">
                    Africa, Eastern Europe, Central Asia, Pacific Islands
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Domestic India</h3>
                  <p className="text-question text-gray-700">
                    2-4 business days via courier partners
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Customs and Duties</h2>
              <p className="text-body text-gray-700 leading-relaxed mb-4">
                <strong>Important:</strong> International shipments may be subject to customs duties, taxes, and fees imposed by the destination country. These charges are the responsibility of the recipient.
              </p>
              <ul className="list-disc list-inside space-y-2 text-body text-gray-700 ml-4 mb-4">
                <li>We declare accurate values on all customs forms as required by law</li>
                <li>Customers are responsible for all import duties and taxes</li>
                <li>We provide necessary commercial invoices and documentation</li>
                <li>Delays due to customs clearance are beyond our control</li>
              </ul>
              <p className="text-body text-gray-700 leading-relaxed">
                For questions about customs regulations in your country, please consult your local customs office.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Order Tracking</h2>
              <p className="text-body text-gray-700 leading-relaxed mb-4">
                Once your order ships, you'll receive:
              </p>
              <ul className="list-disc list-inside space-y-2 text-body text-gray-700 ml-4">
                <li>Shipping confirmation email with tracking number</li>
                <li>Carrier information and estimated delivery date</li>
                <li>Link to track your package in real-time</li>
                <li>Updates on delivery status via email notifications</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Packaging and Insurance</h2>
              <p className="text-body text-gray-700 leading-relaxed mb-4">
                We take special care in packaging your valuable jewelry orders:
              </p>
              <ul className="list-disc list-inside space-y-2 text-body text-gray-700 ml-4 mb-4">
                <li>Secure, tamper-evident packaging materials</li>
                <li>Individual product protection and cushioning</li>
                <li>Discreet packaging for high-value shipments</li>
                <li>Full insurance coverage included for all shipments</li>
              </ul>
              <p className="text-body text-gray-700 leading-relaxed">
                All packages are insured for their full declared value at no additional cost.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Delivery Issues</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Lost or Damaged Shipments</h3>
              <p className="text-body text-gray-700 leading-relaxed mb-4">
                In the rare event of a lost or damaged shipment:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-body text-gray-700 ml-4 mb-4">
                <li>Contact us immediately with your order number and tracking information</li>
                <li>Provide photos of any damaged packaging or products</li>
                <li>We'll file an insurance claim with the carrier</li>
                <li>Replacement or refund will be processed within 10-15 business days</li>
              </ol>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Delivery Delays</h3>
              <p className="text-body text-gray-700 leading-relaxed mb-4">
                While we strive for timely delivery, delays may occur due to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-body text-gray-700 ml-4">
                <li>Customs clearance procedures</li>
                <li>Weather conditions or natural disasters</li>
                <li>Peak season shipping volumes</li>
                <li>Public holidays in origin or destination countries</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-body text-gray-700 leading-relaxed mb-4">
                For shipping inquiries or support:
              </p>
              <div className="bg-gray-50 p-6 rounded">
                <p className="text-body text-gray-700">
                  <strong>Shipping Department</strong><br />
                  Email: shipping@bhavanjewellery.com<br />
                  Phone: +91 81072 87333<br />
                  WhatsApp: +91 81072 87333<br />
                  Business Hours: Monday-Saturday, 9:00 AM - 6:00 PM IST
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;
