import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiFacebook,
  FiInstagram,
  FiMail,
  FiTwitter,
  FiYoutube,
} from "react-icons/fi";
import { FaPinterest, FaYoutube } from "react-icons/fa";
import whiteLogo from "../../assets/logos/white-logo.png";
import SkeletonLoader from "../common/SkeletonLoader";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [footerData, setFooterData] = useState({
    footer_logo: "",
    description: "",
    know_more_text: "",
    know_more_url: "",
    copyright_text: "",
    newsletter_title: "",
    newsletter_description: "",
    contact_title: "",
    contact_business_name: "",
    contact_address: "",
    contact_email: "",
    contact_phone: "",
    columns: [],
    social_links: [],
  });

  useEffect(() => {
    const loadFooterSettings = async () => {
      try {
        const { fetchFooterSettings } = await import("../../api/settings");
        const data = await fetchFooterSettings();

        if (data && data.success && data.data) {
          setFooterData({
            footer_logo: data.data.footer_logo || "",
            description: data.data.description || "",
            know_more_text: data.data.know_more_text || "",
            know_more_url: data.data.know_more_url || "",
            copyright_text: data.data.copyright_text || "",
            newsletter_title: data.data.newsletter_title || "",
            newsletter_description: data.data.newsletter_description || "",
            contact_title: data.data.contact_title || "",
            contact_business_name: data.data.contact_business_name || "",
            contact_address: data.data.contact_address || "",
            contact_email: data.data.contact_email || "",
            contact_phone: data.data.contact_phone || "",
            columns: data.data.columns || [],
            social_links: data.data.social_links || [],
          });
        }
      } catch (error) {
        console.error("Failed to load footer settings", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadFooterSettings();
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      console.log("Subscribed:", email);
      alert("Thank you for subscribing to our newsletter!");
      setEmail("");
    }
  };

  const handleLinkClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant", // Updated to instant to match ScrollToTop behavior
    });
  };

  if (isLoading) {
    return <SkeletonLoader type="footer" />;
  }

  return (
    <footer className="footer bg-white">
      {/* Top Section with Links */}
      <div className="border-t border-gray-200 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {/* Dynamic Columns */}
            {footerData.columns.map((column, colIndex) => (
              <div key={colIndex}>
                <h3 className="font-sans text-body font-semibold text-gray-900 mb-4 uppercase tracking-wider">
                  {column.title}
                </h3>
                <ul className="space-y-3">
                  {column.links &&
                    Object.values(column.links).map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          to={link.url || "#"}
                          onClick={handleLinkClick}
                          className="text-question text-gray-600 hover:text-primary transition-colors duration-300"
                        >
                          {link.text}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-50 py-10 md:py-12 border-t border-gray-200">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h3 className="font-sans text-[18px] font-semibold text-gray-900 mb-3 uppercase tracking-wider">
              {footerData.newsletter_title}
            </h3>
            <p className="text-question text-gray-600 mb-6">
              {footerData.newsletter_description}
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
              {footerData.footer_logo && (
                <img
                  src={footerData.footer_logo}
                  alt="Bhavana Silver Jewelry"
                  className="h-12 w-auto mx-auto lg:mx-0 mb-6 object-contain brightness-0 invert"
                />
              )}
              {footerData.description && (
                <p className="text-white/80 text-body leading-relaxed max-w-xl mx-auto lg:mx-0 mb-4">
                  {footerData.description}
                </p>
              )}
              {footerData.know_more_text && footerData.know_more_url && (
                <Link
                  to={footerData.know_more_url}
                  onClick={handleLinkClick}
                  className="text-white hover:text-white/80 text-body font-medium underline transition-colors duration-300"
                >
                  {footerData.know_more_text}
                </Link>
              )}

              {/* Social Links */}
              {footerData.social_links &&
                footerData.social_links.length > 0 && (
                  <div className="flex gap-4 justify-center lg:justify-start mt-6">
                    {footerData.social_links.map((social) => (
                      <a
                        key={social.id}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-opacity duration-300 hover:opacity-80"
                      >
                        <img
                          src={social.icon}
                          alt="Social Media"
                          className="w-6 h-6 object-contain brightness-0 invert"
                        />
                      </a>
                    ))}
                  </div>
                )}
            </div>

            {/* Contact Information */}
            <div className="text-center lg:text-right">
              <h3 className="font-sans text-[18px] font-semibold text-white mb-4 uppercase tracking-wider">
                {footerData.contact_title}
              </h3>
              <div className="text-white/90 text-body space-y-2">
                <p className="font-medium">
                  {footerData.contact_business_name}
                </p>
                <div className="text-white/80 leading-relaxed whitespace-pre-line">
                  {footerData.contact_address}
                </div>
                <div className="pt-4 space-y-1">
                  <p>
                    Email:{" "}
                    <a
                      href={`mailto:${footerData.contact_email}`}
                      className="text-white hover:text-white/80 underline transition-colors duration-300"
                    >
                      {footerData.contact_email}
                    </a>
                  </p>
                  <p>
                    Phone:{" "}
                    <a
                      href={`tel:${footerData.contact_phone}`}
                      className="text-white hover:text-white/80 transition-colors duration-300"
                    >
                      {footerData.contact_phone}
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
            {footerData.copyright_text}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
