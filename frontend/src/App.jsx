import { lazy, Suspense, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/common/ScrollToTop";
import { Toaster } from "react-hot-toast";
import "./App.css";

// Lazy load pages for better performance
const HomePage = lazy(() => import("./pages/HomePage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const SearchResultsPage = lazy(() => import("./pages/SearchResultsPage"));
const ShopPage = lazy(() => import("./pages/ShopPage"));
const AboutUsPage = lazy(() => import("./pages/AboutUsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const FaqPage = lazy(() => import("./pages/FaqPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const AccountSettings = lazy(() => import("./pages/AccountSettings"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const ShippingPage = lazy(() => import("./pages/ShippingPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const SitemapPage = lazy(() => import("./pages/SitemapPage"));
const StoneStoriesPage = lazy(() => import("./pages/StoneStoriesPage"));
const RecentlyViewedPage = lazy(() => import("./pages/RecentlyViewedPage"));
const CustomOrdersPage = lazy(() => import("./pages/CustomOrdersPage"));

// Auth Pages
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const DebugApiPage = lazy(() => import("./pages/DebugApiPage"));
const ProductDebugPage = lazy(() => import("./pages/ProductDebugPage"));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600 font-semibold">Loading...</p>
    </div>
  </div>
);
const Account = () => (
  <div style={{ padding: "40px", textAlign: "center" }}>
    <h1>My Account</h1>
    <p>Manage your account and orders.</p>
  </div>
);
const Wishlist = () => (
  <div style={{ padding: "40px", textAlign: "center" }}>
    <h1>My Wishlist</h1>
    <p>Your favorite items saved for later.</p>
  </div>
);

function App() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const { fetchCategories } = await import("./api/products");
        const data = await fetchCategories();
        if (Array.isArray(data)) {
          setCategories(data);
        }
      } catch (error) {
        console.error("Failed to load categories for routing", error);
      }
    };
    loadCategories();
  }, []);

  // Fix toast container positioning to viewport
  useEffect(() => {
    let isPositioning = false; // Prevent infinite loops

    const fixToastPosition = () => {
      if (isPositioning) return;
      isPositioning = true;

      // Try multiple selectors
      const selectors = [
        ".toast-container-fixed",
        "[data-hot-toast-container]",
        ".react-hot-toast",
        '[role="region"]',
      ];

      let toastContainer = null;

      for (const selector of selectors) {
        toastContainer = document.querySelector(selector);
        if (toastContainer) {
          break;
        }
      }

      if (toastContainer) {
        // Calculate position from viewport
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        const bottomPosition = 20;
        const rightPosition = 20;

        toastContainer.style.cssText = `
          position: fixed !important;
          bottom: ${bottomPosition}px !important;
          right: ${rightPosition}px !important;
          top: auto !important;
          left: auto !important;
          z-index: 9999 !important;
        `;

        console.log(
          `Toast positioned at: bottom=${bottomPosition}px, right=${rightPosition}px (viewport: ${viewportWidth}x${viewportHeight})`
        );
      }

      isPositioning = false;
    };

    // Run immediately
    fixToastPosition();

    // Run after delays to catch dynamic creation
    const timer1 = setTimeout(fixToastPosition, 100);
    const timer2 = setTimeout(fixToastPosition, 500);
    const timer3 = setTimeout(fixToastPosition, 1000);

    // Watch for DOM changes - ONLY childList, NOT attributes
    const observer = new MutationObserver((mutations) => {
      // Only fix position when new nodes are added
      const hasNewNodes = mutations.some((m) => m.addedNodes.length > 0);
      if (hasNewNodes) {
        fixToastPosition();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false, // Don't watch attribute changes to prevent infinite loop
    });

    // Also run on window resize
    const handleResize = () => {
      fixToastPosition();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Toaster
        position="bottom-right"
        containerClassName="toast-container-fixed"
        containerStyle={{
          bottom: "20px",
          right: "20px",
        }}
        toastOptions={{
          duration: 3000,
          style: {
            padding: "16px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "500",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          },
          success: {
            style: {
              background: "#10B981",
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#10B981",
            },
          },
          error: {
            style: {
              background: "#EF4444",
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#EF4444",
            },
          },
          loading: {
            style: {
              background: "#3B82F6",
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#3B82F6",
            },
          },
        }}
      />
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/product/:slug" element={<ProductPage />} />

          {/* Dynamic Category Routes */}
          {categories.map((category) => (
            <Route
              key={category.id || category.slug}
              path={`/${category.slug}`}
              element={
                <CategoryPage
                  fixedCategory={category.slug}
                  categoryId={category.id}
                />
              }
            />
          ))}

          {/* Child category routes - simplified for now, assuming slug uniqueness or flattened structure */}
          {categories
            .flatMap((cat) => cat.children || [])
            .map((child) => (
              <Route
                key={child.id || child.slug}
                path={`/${child.slug}`} // Assuming flattened top-level access for subcats or nested? User just said "match navbar api data".
                // Usually subcats might be /parent/child, but if slug is unique, /child works.
                // Let's stick to the top level loop for now as the API data dump seems flat (level 0 and level 1 in same list).
                element={
                  <CategoryPage
                    fixedCategory={child.slug}
                    categoryId={child.id}
                  />
                }
              />
            ))}

          {/* Fallback pattern routes */}
          <Route path="/collection/:collection" element={<CategoryPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/category/:category/:stone" element={<CategoryPage />} />

          <Route path="/shop" element={<ShopPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faqs" element={<FaqPage />} />
          <Route path="/account" element={<DashboardPage />} />
          <Route path="/account/settings" element={<AccountSettings />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/recently-viewed" element={<RecentlyViewedPage />} />
          <Route path="/custom-orders" element={<CustomOrdersPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/sitemap" element={<SitemapPage />} />
          <Route path="/stone-stories" element={<StoneStoriesPage />} />
          <Route path="/debug-api" element={<DebugApiPage />} />
          <Route path="/debug-product/:slug" element={<ProductDebugPage />} />
          <Route
            path="/stone-stories/:stoneName"
            element={<StoneStoriesPage />}
          />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
