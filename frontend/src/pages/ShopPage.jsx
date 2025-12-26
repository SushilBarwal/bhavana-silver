import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Breadcrumb, FilterSidebar } from "../components/common";
import { ProductGrid } from "../components/product";
import { fetchProducts } from "../api/products";
import SkeletonLoader from "../components/common/SkeletonLoader";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const PRODUCTS_PER_PAGE = 12;

/**
 * Shop Page Component
 * Displays all products with filters, sorting, and infinite scroll
 */
const ShopPage = () => {
  // Refs for animations
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const filterRef = useRef(null);
  const gridRef = useRef(null);
  const loadMoreRef = useRef(null);

  // State management
  const [allProducts, setAllProducts] = useState([]); // Changed to state
  const [filters, setFilters] = useState({
    priceMin: "",
    priceMax: "",
    collections: [],
  });
  const [sortBy, setSortBy] = useState("new-to-old");
  const [displayedCount, setDisplayedCount] = useState(PRODUCTS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(true); // Start as true

  // Fetch products from API
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        // Fetch a large number of products to support client-side filtering
        // Adjust per_page as needed (e.g., 100 or 200)
        const fetchedProducts = await fetchProducts({ per_page: 100 });
        console.log("ShopPage products fetched:", fetchedProducts);

        // Transform API data to match component expectations
        const transformedProducts = (fetchedProducts || []).map((p) => ({
          ...p,
          id: p.id,
          slug: p.slug,
          name: p.name,
          priceRange: {
            min: parseFloat(p.price || 0),
            max: parseFloat(p.max_price || p.price || 0),
          },
          // Ensure category is string for Card, and store raw object if needed?
          // ProductCard expects category string.
          category: p.category?.name || "Collection",
          collection: p.category?.name || "Collection", // For filter
          image:
            p.image ||
            (p.images && p.images.length > 0 ? p.images[0].url : "") ||
            "",
          onSale:
            parseFloat(p.sale_price) > 0 ||
            (p.max_price && p.max_price > p.price),
          // Maintain other props
        }));

        setAllProducts(transformedProducts);
      } catch (error) {
        console.error("Failed to load products:", error);
        setAllProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Filter products based on filters
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Price filter
      // Ensure product.priceRange is handled safely or use product.price
      const productPrice = product.price || 0;
      // The API might return simple price or a computed range object.
      // Existing code expects product.priceRange.min/max.
      // We need to adapt if API returns flat price.
      // Let's assume standard object, but fallback to direct price if range missing.
      const minPrice = product.priceRange?.min ?? productPrice;
      const maxPrice = product.priceRange?.max ?? productPrice;

      if (filters.priceMin && minPrice < parseFloat(filters.priceMin)) {
        return false;
      }
      if (filters.priceMax && maxPrice > parseFloat(filters.priceMax)) {
        return false;
      }

      // Collection filter - only apply if collections are selected
      if (
        filters.collections &&
        Array.isArray(filters.collections) &&
        filters.collections.length > 0
      ) {
        // Check if collection matches. API might return 'category' or 'collection'
        const collectionName = product.collection || product.category?.name;
        if (!collectionName || !filters.collections.includes(collectionName)) {
          return false;
        }
      }

      return true;
    });
  }, [allProducts, filters]);

  // Sort products
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      const getPrice = (p) => p.priceRange?.min ?? p.price ?? 0;

      switch (sortBy) {
        case "old-to-new":
          return new Date(a.created_at || 0) - new Date(b.created_at || 0);
        case "new-to-old":
          return new Date(b.created_at || 0) - new Date(a.created_at || 0);
        case "price-low-high":
          return getPrice(a) - getPrice(b);
        case "price-high-low":
          return getPrice(b) - getPrice(a);
        case "best-selling":
          // API might not have reviews count easily, use review_count if exists
          return (b.reviews_count || 0) - (a.reviews_count || 0);
        default: // new-to-old
          return 0;
      }
    });
  }, [filteredProducts, sortBy]);

  // Get products to display (with pagination)
  const displayedProducts = useMemo(() => {
    return sortedProducts.slice(0, displayedCount);
  }, [sortedProducts, displayedCount]);

  const hasMore = displayedCount < sortedProducts.length;

  // Load more products
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    // Simply increase count, no network call needed for client-side pagination
    setDisplayedCount((prev) =>
      Math.min(prev + PRODUCTS_PER_PAGE, sortedProducts.length)
    );
  }, [isLoading, hasMore, sortedProducts.length]);

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

  // Reset displayed count when filters or sort changes
  useEffect(() => {
    setDisplayedCount(PRODUCTS_PER_PAGE);
  }, [filters, sortBy]);

  // Handle filter change
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Handle filter reset
  const handleFilterReset = () => {
    setFilters({
      priceMin: "",
      priceMax: "",
      collections: [],
    });
  };

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "HOME", link: "/" },
    { label: "SHOP", active: true },
  ];

  // GSAP scroll animations
  useGSAP(
    () => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        filterRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        gridRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="shop-page py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Page Header */}
        <div ref={titleRef} className="text-center mb-8 md:mb-12">
          <h1 className="section-heading mb-4">SHOP</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our complete jewelry collection.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Filter Sidebar */}
          <div ref={filterRef} className="lg:col-span-1">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleFilterReset}
              productCount={sortedProducts.length}
              availableProducts={allProducts}
            />
          </div>

          {/* Products Grid */}
          <div ref={gridRef} className="lg:col-span-3">
            {/* Sort Bar */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
              <p className="text-[14px] text-gray-600">
                Showing {displayedProducts.length} of {sortedProducts.length}{" "}
                products
              </p>
              <div className="flex items-center gap-3">
                <label className="text-[13px] text-gray-600 uppercase tracking-wide">
                  SORT BY
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 text-[13px] uppercase tracking-wide focus:border-primary focus:outline-none cursor-pointer"
                >
                  <option value="new-to-old">NEW TO OLD</option>
                  <option value="old-to-new">OLD TO NEW</option>
                  <option value="price-low-high">PRICE: LOW TO HIGH</option>
                  <option value="price-high-low">PRICE: HIGH TO LOW</option>
                  <option value="best-selling">BEST SELLING</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            {isLoading && displayedProducts.length === 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <SkeletonLoader type="product" count={6} />
              </div>
            ) : (
              <ProductGrid products={displayedProducts} columns={3} gap={6} />
            )}

            {/* Loading Indicator for Infinite Scroll */}
            {isLoading && displayedProducts.length > 0 && (
              <div className="flex justify-center items-center py-8">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {/* Infinite Scroll Trigger */}
            {hasMore && !isLoading && (
              <div
                ref={loadMoreRef}
                className="h-20 flex items-center justify-center"
              >
                <p className="text-sm text-gray-500">
                  Scroll for more products...
                </p>
              </div>
            )}

            {/* End of Results */}
            {!hasMore && sortedProducts.length > 0 && (
              <div className="text-center py-8 border-t border-gray-200 mt-8">
                <p className="text-gray-600">
                  You've viewed all {sortedProducts.length} products
                </p>
              </div>
            )}

            {/* No Results */}
            {sortedProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-xl text-gray-600 mb-4">No products found</p>
                <p className="text-gray-500 mb-6">Try adjusting your filters</p>
                <button
                  onClick={handleFilterReset}
                  className="px-6 py-3 bg-primary text-white hover:bg-primary/90 transition-colors duration-300 uppercase tracking-wide text-sm font-semibold"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopPage;
