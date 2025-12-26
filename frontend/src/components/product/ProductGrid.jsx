import PropTypes from "prop-types";
import ProductCard from "./ProductCard";

/**
 * Reusable Product Grid Component for listings
 */
const ProductGrid = ({
  products = [],
  columns = 3,
  gap = 6,
  wishlistItems = [],
  onWishlistToggle = null,
}) => {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  const gapClass = `gap-${gap}`;

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No products found</p>
      </div>
    );
  }

  // Helper to check if product is in wishlist
  const isInWishlist = (productId) => {
    if (!Array.isArray(wishlistItems)) return false;
    return wishlistItems.some(
      (item) =>
        item.product_id === productId ||
        item.product?.id === productId ||
        item.id === productId
    );
  };

  return (
    <div className={`grid ${gridCols[columns]} ${gapClass}`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
          image={product.images?.[0] || product.image} // Use first image if images array exists
          isInWishlist={isInWishlist(product.id)}
          onWishlistToggle={onWishlistToggle}
        />
      ))}
    </div>
  );
};

ProductGrid.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      priceRange: PropTypes.shape({
        min: PropTypes.number.isRequired,
        max: PropTypes.number.isRequired,
      }).isRequired,
    })
  ).isRequired,
  columns: PropTypes.oneOf([2, 3, 4]),
  gap: PropTypes.number,
  wishlistItems: PropTypes.array,
  onWishlistToggle: PropTypes.func,
};

export default ProductGrid;
