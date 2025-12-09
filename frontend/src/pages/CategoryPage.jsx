import { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Breadcrumb, FilterSidebar } from '../components/common';
import { ProductGrid } from '../components/product';
import { getProductsByCategoryAndStone } from '../utils/productData';
import { fetchProducts } from '../api/products';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const PRODUCTS_PER_PAGE = 12;

/**
 * Category/Archive Page Component
 * Displays products with filters, sorting, and infinite scroll
 */
const CategoryPage = () => {
  const { category, stone, collection } = useParams();

  // Refs for animations
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const filterRef = useRef(null);
  const gridRef = useRef(null);
  const loadMoreRef = useRef(null);

  // State management
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    collections: [],
  });
  const [sortBy, setSortBy] = useState('new-to-old');
  const [displayedCount, setDisplayedCount] = useState(PRODUCTS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);

  // Get products based on category, stone, or collection from URL params
  // const allProducts = useMemo(() => {
  //   return getProductsByCategoryAndStone(category, stone, collection);
  // }, [category, stone, collection]);

  const [apiData, setApiData] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const data = await fetchProducts();

      // Transform API data to match frontend model
      const transformedData = data.map(product => ({
        ...product,
        // Map ID to ensure it's a string if needed, or keep as number
        id: product.id,
        // Map price to priceRange object
        priceRange: {
          min: parseFloat(product.price || 0),
          max: parseFloat(product.max_price || product.price || 0)
        },
        // Flatten category object to slug or name
        category: product.category?.slug || product.category?.name || '',
        // Flatten stone object to slug or name
        stone: product.stone?.slug || product.stone?.name || '',
        // Map images array of objects to array of URL strings
        images: Array.isArray(product.images)
          ? product.images.map(img => img.url.replace('http://127.0.0.1:8000', '/api'))
          : (product.image ? [product.image.replace('http://127.0.0.1:8000', '/api')] : []),
        // Ensure image field also exists for backward compatibility if needed
        image: Array.isArray(product.images) && product.images.length > 0
          ? product.images[0].url.replace('http://127.0.0.1:8000', '/api')
          : (product.image ? product.image.replace('http://127.0.0.1:8000', '/api') : '')
      }));

      console.log("Transformed API Data:", transformedData);
      setApiData(transformedData);
      setIsLoading(false);
    };
    loadData();
    // Removed console.log(apiData) as it would log the empty state initial value due to closure
  }, []);

  // Filter the fetched API data matches the current category/stone
  const allProducts = useMemo(() => {
    console.log("Filtering products. Total:", apiData.length, "Category param:", category);
    if (apiData.length === 0) return [];

    let products = apiData;

    if (category && category !== 'gold-jewelry' && category !== 'silver-jewelry' && category !== 'fashion-jewelry') {
      // Case-insensitive comparison for category
      products = products.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
    }

    if (stone) {
      products = products.filter(p =>
        (p.subcategory && p.subcategory.toLowerCase() === stone.toLowerCase()) ||
        (p.stone && p.stone.toLowerCase() === stone.toLowerCase())
      );
    }

    if (collection) {
      products = products.filter(p => p.collection === collection);
    }

    return products;
  }, [apiData, category, stone, collection]);


  // Filter products based on filters
  const filteredProducts = allProducts.filter(product => {
    // Price filter
    if (filters.priceMin && product.priceRange.min < parseFloat(filters.priceMin)) {
      return false;
    }
    if (filters.priceMax && product.priceRange.max > parseFloat(filters.priceMax)) {
      return false;
    }

    // Collection filter - only apply if collections are selected
    if (filters.collections && Array.isArray(filters.collections) && filters.collections.length > 0) {
      if (!product.collection || !filters.collections.includes(product.collection)) {
        return false;
      }
    }

    return true;
  });

  // Sort products
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case 'price-low-high':
          return a.priceRange.min - b.priceRange.min;
        case 'price-high-low':
          return b.priceRange.min - a.priceRange.min;
        case 'name-a-z':
          return a.name.localeCompare(b.name);
        case 'name-z-a':
          return b.name.localeCompare(a.name);
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

    setIsLoading(true);
    setTimeout(() => {
      setDisplayedCount(prev => Math.min(prev + PRODUCTS_PER_PAGE, sortedProducts.length));
      setIsLoading(false);
    }, 300);
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

  // Reset displayed count when filters, sort, or params change
  useEffect(() => {
    setDisplayedCount(PRODUCTS_PER_PAGE);
  }, [filters, sortBy, category, stone, collection]);

  // Handle filter change
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Handle filter reset
  const handleFilterReset = () => {
    setFilters({
      priceMin: '',
      priceMax: '',
      collections: [],
    });
  };

  // Get page title
  const pageTitle = useMemo(() => {
    if (collection) {
      return `${collection.replace('-', ' ').toUpperCase()} COLLECTION`;
    }
    if (stone) {
      return `ALL ${stone.replace('-', ' ').toUpperCase()}`;
    }
    if (category) {
      return category.replace('-', ' ').toUpperCase();
    }
    return 'ALL PRODUCTS';
  }, [category, stone, collection]);

  // Generate breadcrumb items
  const breadcrumbItems = useMemo(() => {
    const items = [{ label: 'HOME', link: '/' }];

    if (collection) {
      items.push({
        label: collection.replace('-', ' ').toUpperCase(),
        active: true
      });
    } else {
      if (category) {
        items.push({
          label: category.replace('-', ' ').toUpperCase(),
          link: stone ? `/category/${category}` : undefined,
          active: !stone
        });
      }
      if (stone) {
        items.push({
          label: stone.replace('-', ' ').toUpperCase(),
          active: true
        });
      }
    }

    return items;
  }, [category, stone, collection]);

  // GSAP scroll animations
  useGSAP(() => {
    // Animate title
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animate filter sidebar
    gsap.fromTo(
      filterRef.current,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: filterRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animate product grid
    gsap.fromTo(
      gridRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="category-page py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Page Title */}
        <h1 ref={titleRef} className="section-heading mb-8 md:mb-12">
          {pageTitle}
        </h1>

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
                Showing {displayedProducts.length} of {sortedProducts.length} products
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
                  <option value="price-low-high">PRICE: LOW TO HIGH</option>
                  <option value="price-high-low">PRICE: HIGH TO LOW</option>
                  <option value="name-a-z">NAME: A TO Z</option>
                  <option value="name-z-a">NAME: Z TO A</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            <ProductGrid products={displayedProducts} columns={3} gap={6} />

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
            {!hasMore && sortedProducts.length > 0 && (
              <div className="text-center py-8 border-t border-gray-200 mt-8">
                <p className="text-gray-600">You've viewed all {sortedProducts.length} products</p>
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

export default CategoryPage;
