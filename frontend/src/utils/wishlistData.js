import wishlistData from '../data/wishlist.json';
import { getProductById } from './productData';

/**
 * Get all wishlist items for a user
 */
export const getWishlistItems = (userId = 'user-001') => {
  return wishlistData.wishlist.filter(item => item.userId === userId);
};

/**
 * Get wishlist items with full product details
 */
export const getWishlistWithProducts = (userId = 'user-001') => {
  const wishlistItems = getWishlistItems(userId);
  
  return wishlistItems.map(item => {
    const product = getProductById(item.productId);
    return {
      ...item,
      product
    };
  }).filter(item => item.product !== undefined);
};

/**
 * Check if a product is in wishlist
 */
export const isInWishlist = (productId, userId = 'user-001') => {
  return wishlistData.wishlist.some(
    item => item.productId === productId && item.userId === userId
  );
};

/**
 * Add product to wishlist
 */
export const addToWishlist = (productId, userId = 'user-001') => {
  const newItem = {
    id: `wish-${Date.now()}`,
    userId,
    productId,
    addedDate: new Date().toISOString()
  };
  
  // In a real application, this would make an API call
  console.log('Added to wishlist:', newItem);
  return newItem;
};

/**
 * Remove product from wishlist
 */
export const removeFromWishlist = (wishlistId) => {
  // In a real application, this would make an API call
  console.log('Removed from wishlist:', wishlistId);
  return wishlistId;
};

/**
 * Get wishlist count
 */
export const getWishlistCount = (userId = 'user-001') => {
  return getWishlistItems(userId).length;
};
