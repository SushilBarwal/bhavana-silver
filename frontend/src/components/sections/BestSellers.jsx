import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fetchProducts } from "../../api/products";
import SkeletonLoader from "../common/SkeletonLoader";

gsap.registerPlugin(ScrollTrigger);

const BestSellers = ({ bestSellersData = [], loading: parentLoading }) => {
  const [activeTab, setActiveTab] = useState(null);
  const [productsMap, setProductsMap] = useState({});
  const [loading, setLoading] = useState(false);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const tabsRef = useRef(null);
  const productsRef = useRef([]);

  // Clear refs on each render to ensure we only have valid elements
  productsRef.current = [];

  // Initialize active tab when data loads
  useEffect(() => {
    if (bestSellersData && bestSellersData.length > 0 && !activeTab) {
      setActiveTab(bestSellersData[0].id);
    }
  }, [bestSellersData, activeTab]);

  // Fetch products when activeTab changes
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      if (!activeTab || !bestSellersData) return;

      const currentCategory = bestSellersData.find(
        (cat) => cat.id === activeTab
      );
      if (!currentCategory) return;

      // If we already have products for this tab (and it's not empty), don't re-fetch
      // unless we want to force refresh. For now, caching is fine.
      if (productsMap[activeTab]) {
        return;
      }

      // Dynamic fetching using collection_id
      if (currentCategory.collection_id) {
        setLoading(true);
        try {
          const params = {
            collection_id: currentCategory.collection_id,
            per_page: 8, // Fetch enough for the grid
          };

          console.log("Fetching products with params:", params);

          const fetchedProducts = await fetchProducts(params);

          setProductsMap((prev) => ({
            ...prev,
            [activeTab]: fetchedProducts,
          }));
        } catch (error) {
          console.error(
            `Failed to fetch products for category ${activeTab}`,
            error
          );
          setProductsMap((prev) => ({
            ...prev,
            [activeTab]: [],
          }));
        } finally {
          setLoading(false);
        }
      } else {
        // No collection ID and no embedded products
        setProductsMap((prev) => ({
          ...prev,
          [activeTab]: [],
        }));
      }
    };

    fetchCategoryProducts();
  }, [activeTab, bestSellersData, productsMap]);

  // Scroll-triggered animations
  useGSAP(
    () => {
      if (titleRef.current) {
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
      }

      if (tabsRef.current) {
        gsap.fromTo(
          tabsRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    },
    { scope: sectionRef, dependencies: [bestSellersData] }
  );

  // Animate products when tab changes
  useGSAP(
    () => {
      const validProducts = productsRef.current.filter((el) => el !== null);
      if (validProducts.length > 0) {
        gsap.fromTo(
          validProducts,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.1,
          }
        );
      }
    },
    { scope: sectionRef, dependencies: [activeTab, productsMap] }
  );

  // If no data and not loading, return null (or handle as empty)
  // But if loading (which might be true if parent passed it, though here we use local loading), we want to show skeleton.
  // Actually, bestSellersData comes from parent. If parent is loading, this might be empty.
  // We'll trust the parent to pass data or we'll handle empty state in render.

  if ((!bestSellersData || bestSellersData.length === 0) && !loading)
    return null;

  // Get current products from map
  const currentProducts = productsMap[activeTab] || [];

  return (
    <section
      ref={sectionRef}
      className="best-sellers-section py-16 md:py-20 lg:py-24 bg-white"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Title */}
        <h2 ref={titleRef} className="section-heading mb-8 md:mb-12">
          {bestSellersData[0]?.main_title || "BEST SELLERS"}
        </h2>

        {/* Tabs */}
        <div
          ref={tabsRef}
          className="flex justify-center gap-6 md:gap-12 mb-12 md:mb-16 flex-wrap"
        >
          {bestSellersData.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`font-sans text-body font-semibold tracking-wider transition-all duration-300 pb-2 ${
                activeTab === category.id
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 min-h-[300px]">
          {loading || parentLoading ? (
            <SkeletonLoader type="product" count={5} />
          ) : currentProducts.length > 0 ? (
            currentProducts.slice(0, 5).map((product, index) => (
              <Link
                key={product.id}
                to={`/product/${product.slug || product.id}`}
                ref={(el) => (productsRef.current[index] = el)}
                className="product-card group cursor-pointer block"
              >
                {/* Product Image */}
                <div className="relative overflow-hidden bg-gray-50 aspect-square mb-4 shadow-md hover:shadow-xl transition-shadow duration-500">
                  <img
                    src={
                      product.image ||
                      (product.images && product.images[0]
                        ? product.images[0]
                        : "") ||
                      ""
                    }
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                </div>

                {/* Product Info */}
                <div className="space-y-2">
                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span className="text-body font-bold text-gray-900">
                      {product.sale_price
                        ? `$${Number(product.sale_price).toFixed(2)}`
                        : product.price
                        ? `$${Number(product.price).toFixed(2)}`
                        : "Price On Request"}
                    </span>
                    {product.sale_price &&
                      product.price &&
                      Number(product.price) > Number(product.sale_price) && (
                        <span className="text-question text-gray-400 line-through text-xs">
                          ${Number(product.price).toFixed(2)}
                        </span>
                      )}
                  </div>

                  {/* Product Code */}
                  <p className="text-question text-gray-600 tracking-wide">
                    {product.code || product.sku || product.id}
                  </p>

                  {/* Product Name */}
                  <h3 className="text-body font-medium text-gray-800 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {product.name}
                  </h3>

                  {/* Category & Stone */}
                  <div className="flex items-center gap-2 text-question text-gray-500">
                    <span className="capitalize">
                      {(product.collections &&
                        product.collections[0]?.name?.split(" ")[1]) ||
                        "Jewelry"}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500">
              No products found in this category.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
