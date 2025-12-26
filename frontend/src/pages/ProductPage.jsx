import { useState, useRef, useEffect, useMemo } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiTruck, FiShield } from "react-icons/fi";
import { getProductById, getRelatedProducts } from "../utils/productData";
import { addRecentlyViewed } from "../utils/recentlyViewedData";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

import { Offcanvas, Breadcrumb } from "../components/common";
import { LeadForm } from "../components/forms";
import {
  ProductGallery,
  ProductInfo,
  RelatedProducts,
  CertificationGrid,
} from "../components/product";

// Import gemstone images
import amethystImg from "../assets/gemstones/Amethyst.png";
import blueTopazImg from "../assets/gemstones/Blue-Topaz.png";
import citrineImg from "../assets/gemstones/Citrine.png";
import ethiopianOpalImg from "../assets/gemstones/Ethiopian-Opal.png";
import garnetImg from "../assets/gemstones/Garnet.png";
import labradoriteImg from "../assets/gemstones/Labradorite.png";
import malachiteImg from "../assets/gemstones/Malachite.png";
import peridotImg from "../assets/gemstones/Peridot.png";
import tanzaniteImg from "../assets/gemstones/Tanzanite.png";

// Import certificate images
import rjcCert from "../assets/certificates/responsible-jewellery-council.png";
import sgjiaCert from "../assets/certificates/sgjia.png";
import gjepcCert from "../assets/certificates/gjepc.png";
import jaipurCert from "../assets/certificates/jaiput-jewellary-show.png";
import starExportCert from "../assets/certificates/star-export.png";
import fieoCert from "../assets/certificates/fieo.png";

// Import API function
import { fetchProductBySlug } from "../api/products";
import {
  fetchWishlist,
  addToWishlist,
  removeFromWishlist,
  isProductInWishlist,
} from "../api/wishlist";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const ProductPage = () => {
  const { slug } = useParams();
  const sectionRef = useRef(null);
  const { isAuthenticated } = useAuth();

  // ALL STATE HOOKS MUST BE DECLARED BEFORE ANY CONDITIONAL RETURNS
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [activeAccordion, setActiveAccordion] = useState("details");
  const [detailsTab, setDetailsTab] = useState("stone");
  const [selectedStone, setSelectedStone] = useState(null);
  const [gemstoneQuantities, setGemstoneQuantities] = useState({});

  useEffect(() => {
    // ... (existing loadProduct logic stays same, removed for brevity in replacement if not touched)
    const loadProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchProductBySlug(slug);

        if (!data) {
          setError("Product not found");
          setLoading(false);
          return;
        }

        // Extract category information
        const categoryData = data.category;
        const categoryName = categoryData?.name || "Jewelry";
        const categorySlug = categoryData?.slug || "";
        const fullPath = categoryData?.full_path || "";
        const pathParts = fullPath.split(" > ").filter(Boolean);

        const mainCategory = pathParts.length > 0 ? pathParts[0] : categoryName;
        const subCategory = pathParts.length > 1 ? pathParts[1] : "";

        // Extract stone information
        const stoneData = data.stone;
        const stoneName = stoneData?.name || "N/A";

        // Process images - handle both array of image objects and direct URLs
        let productImages = [];
        if (Array.isArray(data.images) && data.images.length > 0) {
          productImages = data.images
            .map((img) => {
              // If img is an object with url property
              if (typeof img === "object" && img.url) {
                return img.url;
              }
              // If img is already a string URL
              if (typeof img === "string") {
                return img;
              }
              return null;
            })
            .filter(Boolean);
        }

        // Fallback to main image if no images array
        if (productImages.length === 0 && data.image) {
          productImages = [data.image];
        }

        // Ensure we have at least one image
        if (productImages.length === 0) {
          productImages = ["/placeholder-image.jpg"]; // Add a placeholder
        }

        // Transform the API data to match component expectations
        const transformedProduct = {
          // Core product data
          id: data.id,
          slug: data.slug,
          name: data.name || `Product ${data.code || data.sku}`,
          sku: data.sku || data.code || "N/A",
          code: data.code,

          // Pricing
          price: Number(data.price) || 0,
          sale_price: data.sale_price ? Number(data.sale_price) : null,
          max_price: data.max_price ? Number(data.max_price) : null,

          // Content
          description:
            data.description ||
            data.short_description ||
            "No description available.",
          short_description: data.short_description || "",
          details: data.details || "",

          // Images
          images: productImages,
          image: productImages[0], // Main image

          // Category information
          category: mainCategory,
          subcategory: subCategory,
          categorySlug: categorySlug,
          fullPath: fullPath,

          // Product specifications
          style: data.style || "Classic",
          weight: data.weight || "N/A",
          material: data.plating || "925 Sterling Silver",
          gemstone: stoneName,
          stone_size: data.stone_size || "N/A",
          dimensions: data.dimensions || "N/A",
          plating: data.plating || "N/A",

          // Additional data
          shop_now: data.shop_now || false,
          rating: 4.5, // Placeholder - update if API provides ratings
          reviews: 0, // Placeholder

          // Features - use API data if available, otherwise defaults
          features: data.features || [
            "Authentic 925 Sterling Silver",
            "Natural Gemstones",
            "Handcrafted Excellence",
          ],

          // Stone details - parse if available
          stoneDetails: [], // Will be populated if API provides this data

          // Minimum order quantities
          minOrderQuantity: data.min_order_quantity || 5,
          minGemstonePieces: data.min_gemstone_pieces || 10,

          // Price range for display
          priceRange: {
            min: Number(data.price) || 0,
            max: data.max_price
              ? Number(data.max_price)
              : Number(data.price) || 0,
          },

          // Timestamps
          created_at: data.created_at,
          updated_at: data.updated_at,
        };

        setProduct(transformedProduct);
      } catch (err) {
        setError("Failed to load product. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadProduct();
    } else {
      setError("No product slug provided");
      setLoading(false);
    }
  }, [slug]);

  // Track product view in recently viewed
  useEffect(() => {
    if (product && product.id) {
      addRecentlyViewed(product.id);
    }
  }, [product]);

  // Fetch wishlist to check if current product is wishlisted
  useEffect(() => {
    const loadWishlist = async () => {
      if (!isAuthenticated || !product) return;

      try {
        const data = await fetchWishlist();
        setWishlistItems(data);
        setIsWishlisted(isProductInWishlist(product.id, data));
      } catch (error) {
        console.error("Failed to load wishlist:", error);
      }
    };

    loadWishlist();
  }, [isAuthenticated, product]);

  // Helper to open offcanvas and capture scroll position
  const handleOpenOffcanvas = () => {
    setScrollPosition(window.scrollY);
    setShowOffcanvas(true);
  };

  // Show offcanvas after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      handleOpenOffcanvas();
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  // Debug: Log viewport top value on scroll
  useEffect(() => {
    const handleScroll = () => {
      console.log("Viewport Top (scrollY):", window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prepare data that doesn't depend on product (can be called even if product is null)
  const certifications = [
    { name: "Responsible Jewellery Council", image: rjcCert },
    { name: "SGJIA", image: sgjiaCert },
    { name: "GJEPC", image: gjepcCert },
    { name: "Jaipur Jewellery Show", image: jaipurCert },
    { name: "Star Export", image: starExportCert },
    { name: "FIEO", image: fieoCert },
  ];

  // Get related products dynamically with safe image access (only if product exists)
  const relatedProducts = product
    ? getRelatedProducts(product.id, product.category, 4).map((p) => ({
        ...p,
        image: p.images && p.images.length > 0 ? p.images[0] : p.image || "",
      }))
    : [];

  // Generate breadcrumb items (only if product exists)
  const breadcrumbItems = useMemo(() => {
    if (!product) return [{ label: "HOME", link: "/" }];

    const items = [{ label: "HOME", link: "/" }];

    if (product.category) {
      items.push({
        label: product.category.replace("-", " ").toUpperCase(),
        link: `/category/${product.category}`,
      });
    }

    if (product.subcategory) {
      items.push({
        label: product.subcategory.toUpperCase(),
        link: `/category/${
          product.category
        }/${product.subcategory.toLowerCase()}`,
      });
    }

    if (product.stone) {
      items.push({
        label: product.stone.replace("-", " ").toUpperCase(),
        link: `/category/${product.category}/${product.stone}`,
      });
    }

    items.push({
      label: product.name.toUpperCase(),
      active: true,
    });

    return items;
  }, [product]);

  // GSAP scroll animations
  useGSAP(
    () => {
      if (!product) return; // Don't run animations if no product

      // Animate product sections on scroll
      const sections =
        sectionRef.current?.querySelectorAll(".animate-on-scroll");

      sections?.forEach((section, index) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.1,
          }
        );
      });
    },
    { scope: sectionRef, dependencies: [product] }
  );

  // NOW we can do conditional returns AFTER all hooks are called
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-4 text-gray-600">
          {error || "The product you are looking for does not exist."}
        </p>
        <p className="mb-4 text-sm text-gray-500">Slug/ID: {slug}</p>
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Event handlers
  const handleFormSubmit = (formData) => {
    toast.success("Appointment request submitted successfully!");
    setShowOffcanvas(false);
  };

  const handleWishlistToggle = async () => {
    if (!isAuthenticated) {
      // Show error message but don't redirect
      toast.error("Please log in to add items to your wishlist");
      return;
    }

    if (!product) return;

    try {
      if (isWishlisted) {
        // Remove from wishlist
        await removeFromWishlist(product.id);
        setIsWishlisted(false);
        toast.success("Removed from wishlist");
        // Update wishlist items
        const data = await fetchWishlist();
        setWishlistItems(data);
      } else {
        // Add to wishlist
        await addToWishlist(product.id);
        setIsWishlisted(true);
        toast.success("Added to wishlist");
        // Update wishlist items
        const data = await fetchWishlist();
        setWishlistItems(data);
      }
    } catch (error) {
      console.error("Failed to toggle wishlist:", error);
      toast.error("Failed to update wishlist. Please try again.");
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      alert("Share functionality not supported on this browser");
    }
  };

  return (
    <section ref={sectionRef} className="product-page py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12 animate-on-scroll">
          {/* Image Gallery Component */}
          <ProductGallery
            images={product.images}
            productName={product.name}
            onWishlistToggle={handleWishlistToggle}
            isWishlisted={isWishlisted}
          />

          {/* Product Info Component */}
          <div className="space-y-6">
            <ProductInfo
              sku={product.sku}
              name={product.name}
              category={product.category}
              subcategory={product.subcategory}
              style={product.style}
              weight={product.weight}
              priceRange={product.priceRange}
              rating={product.rating}
              reviewCount={product.reviews}
              onShare={handleShare}
            />

            {/* Details Collapsible Section */}
            <div className="border border-gray-200">
              <button
                onClick={() =>
                  setActiveAccordion(
                    activeAccordion === "details" ? "" : "details"
                  )
                }
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-body font-semibold text-gray-900 uppercase tracking-wider">
                  DETAILS
                </span>
                <span className="text-2xl text-gray-600">
                  {activeAccordion === "details" ? "-" : "+"}
                </span>
              </button>

              {activeAccordion === "details" && (
                <div className="px-6 pb-6 space-y-6">
                  {/* Stone/Product Tabs */}
                  <div className="flex gap-4 border-b">
                    <button
                      onClick={() => setDetailsTab("stone")}
                      className={`px-4 py-2 text-[13px] font-semibold uppercase transition-colors ${
                        detailsTab === "stone"
                          ? "text-gray-900 border-b-2 border-gray-900"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      STONE
                    </button>
                    <button
                      onClick={() => setDetailsTab("product")}
                      className={`px-4 py-2 text-[13px] font-semibold uppercase transition-colors ${
                        detailsTab === "product"
                          ? "text-gray-900 border-b-2 border-gray-900"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      PRODUCT
                    </button>
                  </div>

                  {/* Stone Tab Content */}
                  {detailsTab === "stone" && (
                    <>
                      {/* Stone Details Label */}
                      <p className="text-[13px] text-gray-600">
                        approx stone weight
                      </p>

                      {/* Stone Details Table */}
                      <div className="space-y-3">
                        {product.stoneDetails.map((stone, index) => (
                          <div
                            key={index}
                            className="grid grid-cols-8 gap-2 text-[12px] leading-relaxed"
                          >
                            <div className="col-span-2">
                              <p className="font-medium text-gray-900">
                                {stone.name}
                              </p>
                            </div>
                            <div className="col-span-1 text-gray-700">
                              {stone.shape}
                            </div>
                            <div className="col-span-1 text-gray-700">
                              {stone.size}
                            </div>
                            <div className="col-span-1 text-gray-700">
                              {stone.pieces}
                            </div>
                            <div className="col-span-1 text-gray-700">
                              {stone.weight}
                            </div>
                            <div className="col-span-1 text-gray-700">
                              {stone.setting}
                            </div>
                            <div className="col-span-1 text-gray-700">
                              {stone.quality}
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {/* Product Tab Content */}
                  {detailsTab === "product" && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 py-2">
                        <span className="text-[13px] font-medium text-gray-900">
                          SKU:
                        </span>
                        <span className="text-[13px] text-gray-700">
                          {product.sku}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 py-2">
                        <span className="text-[13px] font-medium text-gray-900">
                          Material:
                        </span>
                        <span className="text-[13px] text-gray-700">
                          {product.material}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 py-2">
                        <span className="text-[13px] font-medium text-gray-900">
                          Weight:
                        </span>
                        <span className="text-[13px] text-gray-700">
                          {product.weight}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 py-2">
                        <span className="text-[13px] font-medium text-gray-900">
                          Gemstone:
                        </span>
                        <span className="text-[13px] text-gray-700">
                          {product.gemstone}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 py-2">
                        <span className="text-[13px] font-medium text-gray-900">
                          Category:
                        </span>
                        <span className="text-[13px] text-gray-700">
                          {product.category}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 py-2">
                        <span className="text-[13px] font-medium text-gray-900">
                          Style:
                        </span>
                        <span className="text-[13px] text-gray-700">
                          {product.style}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Minimum Order Info */}
                  <div className="space-y-2 pt-4 border-t">
                    <div className="flex items-start gap-2">
                      <span className="text-primary text-lg">✓</span>
                      <p className="text-[13px] text-gray-700">
                        Minimum Order Quantity {product.minOrderQuantity} pieces
                        per design
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-primary text-lg">✓</span>
                      <p className="text-[13px] text-gray-700">
                        Minimum {product.minGemstonePieces} pieces per gemstone
                        variation
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Description Accordion */}
            <div className="border border-gray-200">
              <button
                onClick={() =>
                  setActiveAccordion(
                    activeAccordion === "description" ? "" : "description"
                  )
                }
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-body font-semibold text-gray-900 uppercase tracking-wider">
                  DESCRIPTION
                </span>
                <span className="text-2xl text-gray-600">
                  {activeAccordion === "description" ? "-" : "+"}
                </span>
              </button>

              {activeAccordion === "description" && (
                <div className="px-6 pb-6 space-y-4">
                  <p className="text-body text-gray-700 leading-relaxed">
                    {product.description}
                  </p>
                  <h3 className="font-sans text-[16px] font-semibold text-gray-900 mt-6 mb-3">
                    Features:
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-body text-gray-700">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleOpenOffcanvas}
                className="flex-1 bg-[#A67C7C] hover:bg-[#956D6D] text-white font-sans font-medium text-[13px] px-8 py-4 transition-all duration-300 uppercase tracking-wider"
              >
                BOOK APPOINTMENT
              </button>
              <button className="flex-1 bg-[#A67C7C] hover:bg-[#956D6D] text-white font-sans font-medium text-[13px] px-8 py-4 transition-all duration-300 uppercase tracking-wider">
                ALL STONE CUSTOMIZATION
              </button>
            </div>
          </div>
        </div>

        {/* Related Products Component */}
        <RelatedProducts products={relatedProducts} title="YOU MAY ALSO LIKE" />

        {/* Certifications Component */}
        <CertificationGrid certifications={certifications} />
      </div>

      {/* Lead Form Offcanvas */}
      <Offcanvas
        isOpen={showOffcanvas}
        onClose={() => setShowOffcanvas(false)}
        title="BOOK AN APPOINTMENT"
        position="right"
        scrollPosition={scrollPosition}
      >
        <LeadForm onSubmit={handleFormSubmit} />
      </Offcanvas>
    </section>
  );
};

export default ProductPage;
