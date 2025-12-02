import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { FiHeart, FiShoppingCart, FiX, FiCalendar } from 'react-icons/fi';

/**
 * Wishlist Item Card Component
 * Individual wishlist item with actions
 */
const WishlistItemCard = ({ item, onRemove, onAddToCart }) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const cardRef = useRef(null);

  const handleRemove = () => {
    setIsRemoving(true);
    
    // Animate out before removing
    gsap.to(cardRef.current, {
      opacity: 0,
      x: 50,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        onRemove(item.id);
      }
    });
  };

  const handleAddToCart = () => {
    onAddToCart(item.product);
  };

  if (!item.product) return null;

  const { product } = item;

  return (
    <div
      ref={cardRef}
      className="wishlist-item-card bg-white shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
    >
      <div className="flex flex-col md:flex-row gap-4 p-4">
        {/* Product Image */}
        <Link to={`/product/${product.id}`} className="flex-shrink-0">
          <div className="w-full md:w-32 h-32 overflow-hidden bg-gray-100">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
          </div>
        </Link>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <Link to={`/product/${product.id}`}>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors mb-2 line-clamp-2">
              {product.name}
            </h3>
          </Link>

          <div className="space-y-2 mb-3">
            <p className="text-question text-gray-600">
              SKU: <span className="font-medium">{product.id}</span>
            </p>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">
                ${product.priceRange.min.toFixed(2)}
              </span>
              {product.priceRange.max > product.priceRange.min && (
                <span className="text-body text-gray-500">
                  - ${product.priceRange.max.toFixed(2)}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-question text-gray-500">
              <span className="capitalize">{product.material}</span>
              {product.stone && (
                <>
                  <span>•</span>
                  <span className="capitalize">{product.stone.replace('-', ' ')}</span>
                </>
              )}
            </div>
          </div>

          {/* Stock Status */}
          {product.inStock ? (
            <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-question font-medium">
              In Stock
            </span>
          ) : (
            <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-question font-medium">
              Out of Stock
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex md:flex-col gap-2 md:gap-3 justify-between md:justify-start">
          {/* Added Date */}
          <div className="hidden md:flex items-center gap-2 text-question text-gray-500 mb-auto">
            <FiCalendar className="w-4 h-4" />
            <span>
              {new Date(item.addedDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex md:flex-col gap-2 mt-auto">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`flex items-center justify-center gap-2 px-4 py-2 text-question font-semibold uppercase tracking-wide transition-all duration-300 ${
                product.inStock
                  ? 'bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <FiShoppingCart className="w-4 h-4" />
              <span className="hidden md:inline">Add to Cart</span>
            </button>

            <button
              onClick={handleRemove}
              disabled={isRemoving}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white text-question font-semibold uppercase tracking-wide hover:bg-red-700 transition-all duration-300 disabled:opacity-50"
            >
              <FiX className="w-4 h-4" />
              <span className="hidden md:inline">Remove</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

WishlistItemCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    addedDate: PropTypes.string.isRequired,
    product: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      images: PropTypes.arrayOf(PropTypes.string).isRequired,
      priceRange: PropTypes.shape({
        min: PropTypes.number.isRequired,
        max: PropTypes.number.isRequired
      }).isRequired,
      material: PropTypes.string.isRequired,
      stone: PropTypes.string,
      inStock: PropTypes.bool.isRequired
    }).isRequired
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired
};

/**
 * Wishlist Section Component
 * Main wishlist display with grid layout
 */
const WishlistSection = ({ wishlistItems, onRemove, onAddToCart }) => {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useGSAP(() => {
    itemsRef.current.forEach((item, index) => {
      if (item) {
        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            delay: index * 0.1
          }
        );
      }
    });
  }, { scope: sectionRef, dependencies: [wishlistItems.length] });

  return (
    <section ref={sectionRef} className="wishlist-section">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-gray-200">
        <div>
          <h2 className="text-2xl md:text-3xl font-section font-bold text-gray-900 mb-2">
            My Wishlist
          </h2>
          <p className="text-body text-gray-600">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>
        <FiHeart className="w-8 h-8 text-primary" />
      </div>

      {/* Wishlist Items */}
      {wishlistItems.length > 0 ? (
        <div className="space-y-4">
          {wishlistItems.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => (itemsRef.current[index] = el)}
            >
              <WishlistItemCard
                item={item}
                onRemove={onRemove}
                onAddToCart={onAddToCart}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded">
          <FiHeart className="w-20 h-20 mx-auto text-gray-300 mb-6" />
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">
            Your Wishlist is Empty
          </h3>
          <p className="text-body text-gray-600 mb-8 max-w-md mx-auto">
            Start adding your favorite jewelry pieces to your wishlist and find them easily later!
          </p>
          <Link
            to="/category/gold-jewelry"
            className="inline-block px-8 py-3 bg-primary text-white text-body font-semibold uppercase tracking-wider hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg"
          >
            Browse Collections
          </Link>
        </div>
      )}
    </section>
  );
};

WishlistSection.propTypes = {
  wishlistItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      addedDate: PropTypes.string.isRequired,
      product: PropTypes.object.isRequired
    })
  ).isRequired,
  onRemove: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired
};

export default WishlistSection;
