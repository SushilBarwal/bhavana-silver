import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiFacebook, FiInstagram, FiMail } from "react-icons/fi";
import whiteLogo from "../../assets/logos/white-logo.png";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [footerData, setFooterData] = useState({
    logo: whiteLogo,
    contact_info: {
      address: "",
      phone: "",
      email: "",
    },
    social_links: {
      facebook: "",
      instagram: "",
      twitter: "",
      pinterest: "",
      youtube: "",
    },
    copyright: "",
    columns: [],
  });

  useEffect(() => {
    const loadFooterSettings = async () => {
      try {
        const { fetchFooterSettings } = await import("../../api/settings");
        const data = await fetchFooterSettings();

        if (data && data.success && data.data) {
          setFooterData((prev) => ({
            ...prev,
            logo: data.data.logo || prev.logo,
            contact_info: {
              address:
                data.data.contact_info?.address || prev.contact_info.address,
              phone: data.data.contact_info?.phone || prev.contact_info.phone,
              email: data.data.contact_info?.email || prev.contact_info.email,
            },
            social_links: {
              ...prev.social_links,
              ...data.data.social_links,
            },
            copyright: data.data.copyright || prev.copyright,
            columns:
              data.data.columns && data.data.columns.length >= 4
                ? data.data.columns
                : prev.columns,
          }));
        }
      } catch (error) {
        console.error("Failed to load footer settings", error);
      }
    };
    loadFooterSettings();
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // Newsletter subscription logic (will be replaced with API call)
      console.log("Subscribed:", email);
      alert("Thank you for subscribing to our newsletter!");
      setEmail("");
    }
  };

  // Scroll to top when footer link is clicked
  const handleLinkClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer bg-white">
      {/* Top Section with Links */}
      <div className="border-t border-gray-200 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {/* Column 1: Customer Care */}
            <div>
              <h3 className="font-sans text-body font-semibold text-gray-900 mb-4 uppercase tracking-wider">
                {footerData.columns[1]?.title || "CUSTOMER CARE"}
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/contact"
                    onClick={handleLinkClick}
                    className="text-question text-gray-600 hover:text-primary transition-colors duration-300"
                  >
                    CONTACT US
                  </Link>
                </li>
                <li>
                  <Link
                    to="/custom-orders"
                    onClick={handleLinkClick}
                    className="text-question text-gray-600 hover:text-primary transition-colors duration-300"
                  >
                    CUSTOM ORDERS
                  </Link>
                </li>

                <li>
                  <Link
                    to="/client-services"
                    onClick={handleLinkClick}
                    className="text-question text-gray-600 hover:text-primary transition-colors duration-300"
                  >
                    CLIENT SERVICES
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Information */}
            <div>
              <h3 className="font-sans text-body font-semibold text-gray-900 mb-4 uppercase tracking-wider">
                {footerData.columns[0]?.title || "INFORMATION"}
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/about-us"
                    onClick={handleLinkClick}
                    className="text-question text-gray-600 hover:text-primary transition-colors duration-300"
                  >
                    ABOUT US
                  </Link>
                </li>
                <li>
                  <Link
                    to="/zed-certificate"
                    onClick={handleLinkClick}
                    className="text-question text-gray-600 hover:text-primary transition-colors duration-300"
                  >
                    ZED-CERTIFICATE
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sitemap"
                    onClick={handleLinkClick}
                    className="text-question text-gray-600 hover:text-primary transition-colors duration-300"
                  >
                    SITEMAP
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Policies */}
            <div>
              <h3 className="font-sans text-body font-semibold text-gray-900 mb-4 uppercase tracking-wider">
                {footerData.columns[2]?.title || "POLICIES"}
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/terms"
                    onClick={handleLinkClick}
                    className="text-question text-gray-600 hover:text-primary transition-colors duration-300"
                  >
                    TERMS & CONDITIONS
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shipping"
                    onClick={handleLinkClick}
                    className="text-question text-gray-600 hover:text-primary transition-colors duration-300"
                  >
                    SHIPPING & DELIVERY
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    onClick={handleLinkClick}
                    className="text-question text-gray-600 hover:text-primary transition-colors duration-300"
                  >
                    PRIVACY POLICY
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Resources */}
            <div>
              <h3 className="font-sans text-body font-semibold text-gray-900 mb-4 uppercase tracking-wider">
                {footerData.columns[3]?.title || "RESOURCES"}
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/faqs"
                    onClick={handleLinkClick}
                    className="text-question text-gray-600 hover:text-primary transition-colors duration-300"
                  >
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/stone-stories"
                    onClick={handleLinkClick}
                    className="text-question text-gray-600 hover:text-primary transition-colors duration-300"
                  >
                    STONE STORIES
                  </Link>
                </li>
              </ul>

              {/* Social Media */}
              <div className="mt-6">
                <h4 className="font-sans text-body font-semibold text-gray-900 mb-4 uppercase tracking-wider">
                  CONNECT US
                </h4>
                <div className="flex gap-4">
                  {footerData.social_links.facebook && (
                    <a
                      href={footerData.social_links.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-primary transition-colors duration-300"
                      aria-label="Facebook"
                    >
                      <FiFacebook className="w-5 h-5" />
                    </a>
                  )}
                  {footerData.social_links.instagram && (
                    <a
                      href={footerData.social_links.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-primary transition-colors duration-300"
                      aria-label="Instagram"
                    >
                      <FiInstagram className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-50 py-10 md:py-12 border-t border-gray-200">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h3 className="font-sans text-[18px] font-semibold text-gray-900 mb-3 uppercase tracking-wider">
              NEWSLETTER
            </h3>
            <p className="text-question text-gray-600 mb-6">
              Subscribe here to receive updates, access to exclusive deals,
              discounts, and more.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-4 max-w-2xl"
            >
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-4 py-3 text-body text-gray-900 bg-white border-2 border-gray-300 focus:border-gray-900 focus:outline-none transition-colors duration-300 placeholder-gray-500"
                />
                <FiMail className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary w-5 h-5" />
              </div>
              <button
                type="submit"
                className="bg-white hover:bg-gray-900 text-gray-900 hover:text-white font-sans font-medium text-body px-8 py-3 border-2 border-gray-900 transition-all duration-300 uppercase tracking-wider"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Section - Company Info */}
      <div className="bg-primary py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Company Description */}
            <div className="text-center lg:text-left">
              <img
                src={footerData.logo}
                alt="Bhavan Silver Jewellery"
                className="h-12 w-auto mx-auto lg:mx-0 mb-6"
              />
              <p className="text-white/80 text-body leading-relaxed max-w-xl mx-auto lg:mx-0 mb-4">
                A legacy of refined craftsmanship in silver jewellery. Bhavan
                Silver Jewellery brings exquisite designs and quality gemstone
                jewelry to wholesale buyers worldwide.
              </p>
              <Link
                to="/about-us"
                onClick={handleLinkClick}
                className="text-white hover:text-white/80 text-body font-medium underline transition-colors duration-300"
              >
                Know more about Bhavan Silver Jewellery
              </Link>
            </div>

            {/* Contact Information */}
            <div className="text-center lg:text-right">
              <h3 className="font-sans text-[18px] font-semibold text-white mb-4 uppercase tracking-wider">
                CONTACT
              </h3>
              <div className="text-white/90 text-body space-y-2">
                <p className="font-medium">Bhavan Silver Jewellery</p>
                <div className="text-white/80 leading-relaxed whitespace-pre-line">
                  {footerData.contact_info.address}
                </div>
                <div className="pt-4 space-y-1">
                  <p>
                    Email:{" "}
                    <a
                      href={`mailto:${footerData.contact_info.email}`}
                      className="text-white hover:text-white/80 underline transition-colors duration-300"
                    >
                      {footerData.contact_info.email}
                    </a>
                  </p>
                  <p>
                    Phone:{" "}
                    <a
                      href={`tel:${footerData.contact_info.phone}`}
                      className="text-white hover:text-white/80 transition-colors duration-300"
                    >
                      {footerData.contact_info.phone}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-900 py-6">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <p className="text-center text-question text-gray-400">
            {footerData.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
