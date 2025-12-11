import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Breadcrumb } from '../components/common';
import DashboardSidebar from '../components/common/DashboardSidebar';
import { WishlistSection, DashboardOverview } from '../components/sections/DashboardSections';
import { getWishlistWithProducts, removeFromWishlist } from '../utils/wishlistData';
import { getRecentlyViewedCount } from '../utils/recentlyViewedData';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * User Dashboard Page Component
 * Main dashboard with wishlist and overview
 */
const DashboardPage = () => {
  const pageRef = useRef(null);
  const [wishlistItems, setWishlistItems] = useState(getWishlistWithProducts());
  const [recentlyViewedCount, setRecentlyViewedCount] = useState(getRecentlyViewedCount());

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'HOME', link: '/' },
    { label: 'DASHBOARD', active: true }
  ];

  // Handle remove from wishlist
  const handleRemoveFromWishlist = (wishlistId) => {
    removeFromWishlist(wishlistId);
    setWishlistItems(prev => prev.filter(item => item.id !== wishlistId));
  };

  // Handle add to cart
  const handleAddToCart = (product) => {
    console.log('Adding to cart:', product);
    alert(`${product.name} added to cart!`);
  };

  // Page entrance animation
  useGSAP(() => {
    gsap.fromTo(
      pageRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out'
      }
    );
  }, { scope: pageRef });

  return (
    <div ref={pageRef} className="dashboard-page bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <DashboardSidebar activeSection="wishlist" />
          </div>

          {/* Main Content */}
          <div className="dashboard-content space-y-8">

            {/* Wishlist Section */}
            <WishlistSection
              wishlistItems={wishlistItems}
              onRemove={handleRemoveFromWishlist}
              onAddToCart={handleAddToCart}
            />

            {/* Quick Actions */}
            <section className="quick-actions bg-white p-6 md:p-8 shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Link
                  to="/recently-viewed"
                  className="px-6 py-4 bg-primary/10 text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-300 text-body uppercase tracking-wide text-center"
                >
                  Recently Viewed
                </Link>
                <Link
                  to="/support"
                  className="px-6 py-4 bg-primary/10 text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-300 text-body uppercase tracking-wide text-center"
                >
                  Contact Support
                </Link>
                <Link
                  to="/help"
                  className="px-6 py-4 bg-primary/10 text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-300 text-body uppercase tracking-wide text-center"
                >
                  FAQs / Help Center
                </Link>
                <Link
                  to="/returns"
                  className="px-6 py-4 bg-primary/10 text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-300 text-body uppercase tracking-wide text-center"
                >
                  Return & Refund Policy
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
