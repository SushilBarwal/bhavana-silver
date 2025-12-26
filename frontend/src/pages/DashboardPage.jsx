import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Breadcrumb } from "../components/common";
import DashboardSidebar from "../components/common/DashboardSidebar";
import { WishlistSection } from "../components/sections/DashboardSections";
import {
  fetchWishlist,
  removeFromWishlist as removeFromWishlistAPI,
} from "../api/wishlist";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * User Dashboard Page Component
 * Main dashboard with wishlist and overview
 */
const DashboardPage = () => {
  const pageRef = useRef(null);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoadingWishlist, setIsLoadingWishlist] = useState(true);
  const [wishlistError, setWishlistError] = useState(null);

  // Protect Route
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Fetch wishlist data
  useEffect(() => {
    const loadWishlist = async () => {
      if (!isAuthenticated) return;

      try {
        setIsLoadingWishlist(true);
        setWishlistError(null);
        const data = await fetchWishlist();

        // Transform API data to match component expectations
        const transformedWishlist = Array.isArray(data)
          ? data.map((item) => ({
              id: item.id,
              addedDate: item.created_at || new Date().toISOString(),
              product: {
                id: item.product?.id || item.product_id,
                slug: item.product?.slug,
                name: item.product?.name || "Product",
                images:
                  item.product?.images?.map((img) => img.url || img) || [
                    item.product?.image,
                  ] ||
                  [],
                priceRange: {
                  min: parseFloat(item.product?.price || 0),
                  max: parseFloat(
                    item.product?.max_price || item.product?.price || 0
                  ),
                },
                material:
                  item.product?.plating ||
                  item.product?.material ||
                  "925 Sterling Silver",
                stone: item.product?.stone?.name || item.product?.stone,
                inStock: item.product?.in_stock !== false,
              },
            }))
          : [];

        setWishlistItems(transformedWishlist);
      } catch (error) {
        console.error("Failed to load wishlist:", error);
        setWishlistError("Failed to load wishlist. Please try again.");
      } finally {
        setIsLoadingWishlist(false);
      }
    };

    loadWishlist();
  }, [isAuthenticated]);

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "HOME", link: "/" },
    { label: "account", active: true },
  ];

  // Handle remove from wishlist
  const handleRemoveFromWishlist = async (wishlistId) => {
    try {
      // Find the product ID from the wishlist item
      const wishlistItem = wishlistItems.find((item) => item.id === wishlistId);
      if (!wishlistItem) return;

      const productId = wishlistItem.product.id;

      // Optimistically update UI
      setWishlistItems((prev) => prev.filter((item) => item.id !== wishlistId));

      // Call API to remove from wishlist
      await removeFromWishlistAPI(productId);
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
      // Revert optimistic update on error
      const data = await fetchWishlist();
      const transformedWishlist = Array.isArray(data)
        ? data.map((item) => ({
            id: item.id,
            addedDate: item.created_at || new Date().toISOString(),
            product: {
              id: item.product?.id || item.product_id,
              slug: item.product?.slug,
              name: item.product?.name || "Product",
              images:
                item.product?.images?.map((img) => img.url || img) || [
                  item.product?.image,
                ] ||
                [],
              priceRange: {
                min: parseFloat(item.product?.price || 0),
                max: parseFloat(
                  item.product?.max_price || item.product?.price || 0
                ),
              },
              material:
                item.product?.plating ||
                item.product?.material ||
                "925 Sterling Silver",
              stone: item.product?.stone?.name || item.product?.stone,
              inStock: item.product?.in_stock !== false,
            },
          }))
        : [];
      setWishlistItems(transformedWishlist);
      toast.error("Failed to remove item from wishlist. Please try again.");
    }
  };

  // Handle add to cart
  const handleAddToCart = (product) => {
    console.log("Adding to cart:", product);
    alert(`${product.name} added to cart!`);
  };

  // Page entrance animation
  useGSAP(
    () => {
      gsap.fromTo(
        pageRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        }
      );
    },
    { scope: pageRef }
  );

  if (!user) return null; // Or a loader

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
            <div className="bg-white p-6 md:p-8 shadow-md">
              <h1 className="text-2xl font-serif text-gray-900 mb-2">
                Hello, {user.name}!
              </h1>
              <p className="text-gray-600">
                From your account dashboard you can view your recent orders,
                manage your shipping and billing addresses, and edit your
                password and account details.
              </p>
            </div>

            {/* Wishlist Section */}
            {isLoadingWishlist ? (
              <div className="bg-white p-8 shadow-md">
                <div className="flex items-center justify-center py-12">
                  <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              </div>
            ) : wishlistError ? (
              <div className="bg-white p-8 shadow-md">
                <div className="text-center py-12">
                  <p className="text-red-600 mb-4">{wishlistError}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-primary text-white hover:bg-primary/90 transition-colors"
                  >
                    Retry
                  </button>
                </div>
              </div>
            ) : (
              <WishlistSection
                wishlistItems={wishlistItems}
                onRemove={handleRemoveFromWishlist}
                onAddToCart={handleAddToCart}
              />
            )}

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
                  to="/contact"
                  className="px-6 py-4 bg-primary/10 text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-300 text-body uppercase tracking-wide text-center"
                >
                  Contact Support
                </Link>
                <Link
                  to="/faqs"
                  className="px-6 py-4 bg-primary/10 text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-300 text-body uppercase tracking-wide text-center"
                >
                  FAQs / Help Center
                </Link>
                <Link
                  to="/shipping"
                  className="px-6 py-4 bg-primary/10 text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-300 text-body uppercase tracking-wide text-center"
                >
                  Shipping Policy
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
