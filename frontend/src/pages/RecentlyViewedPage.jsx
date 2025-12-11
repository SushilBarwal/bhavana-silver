import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Breadcrumb } from '../components/common';
import { ProductCard } from '../components/product';
import { getRecentlyViewedWithProducts, clearRecentlyViewed } from '../utils/recentlyViewedData';

const PRODUCTS_PER_PAGE = 12;

/**
 * Recently Viewed Products Page
 * Displays all products the user has recently viewed with infinite scroll
 */
const RecentlyViewedPage = () => {
  const pageRef = useRef(null);
  const loadMoreRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [displayedCount, setDisplayedCount] = useState(PRODUCTS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);

  // Load recently viewed products
  useEffect(() => {
    const recentProducts = getRecentlyViewedWithProducts();
    setProducts(recentProducts);
  }, []);

  // Get products to display (with pagination)
  const displayedProducts = useMemo(() => {
    return products.slice(0, displayedCount);
  }, [products, displayedCount]);

  const hasMore = displayedCount < products.length;

  // Load more products
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    setTimeout(() => {
      setDisplayedCount(prev => Math.min(prev + PRODUCTS_PER_PAGE, products.length));
      setIsLoading(false);
    }, 300);
  }, [isLoading, hasMore, products.length]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasMore, isLoading, loadMore]);

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'HOME', link: '/' },
    { label: 'RECENTLY VIEWED', active: true }
  ];

  // Handle clear history
  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your recently viewed history?')) {
      clearRecentlyViewed();
      setProducts([]);
      setDisplayedCount(PRODUCTS_PER_PAGE);
    }
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
    <div ref={pageRef} className="recently-viewed-page bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Recently Viewed
            </h1>
            <p className="text-gray-600">
              {products.length} {products.length === 1 ? 'product' : 'products'} you've recently viewed
            </p>
          </div>

          {products.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="px-6 py-3 bg-red-50 text-red-600 hover:bg-red-100 font-semibold text-sm uppercase tracking-wide transition-colors duration-300"
            >
              Clear History
            </button>
          )}
        </div>

        {/* Products Grid or Empty State */}
        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  image={product.images[0]}
                  priceRange={product.priceRange}
                  rating={product.rating}
                  reviews={product.reviews}
                  inStock={product.inStock}
                />
              ))}
            </div>

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-center items-center py-8">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {/* Infinite Scroll Trigger */}
            {hasMore && !isLoading && (
              <div ref={loadMoreRef} className="h-20 flex items-center justify-center">
                <p className="text-sm text-gray-500">Scroll for more products...</p>
              </div>
            )}

            {/* End of Results */}
            {!hasMore && products.length > 0 && (
              <div className="text-center py-8 border-t border-gray-200 mt-8">
                <p className="text-gray-600">You've viewed all {products.length} products</p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 bg-white shadow-md">
            <div className="max-w-md mx-auto">
              <svg
                className="w-24 h-24 mx-auto mb-6 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                No Recently Viewed Products
              </h2>
              <p className="text-gray-600 mb-8">
                Start browsing our collection to see your recently viewed products here.
              </p>
              <Link
                to="/"
                className="inline-block px-8 py-3 bg-primary text-white font-semibold hover:bg-primary/90 transition-colors duration-300 uppercase tracking-wide"
              >
                Browse Products
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentlyViewedPage;
