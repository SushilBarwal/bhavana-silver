import cartData from '../data/cart.json';
import { getProductById } from './productData';

/**
 * Get all cart items for a user
 */
export const getCartItems = (userId = 'user-001') => {
  return cartData.cart.filter(item => item.userId === userId);
};

/**
 * Get cart items with full product details
 */
export const getCartWithProducts = (userId = 'user-001') => {
  const cartItems = getCartItems(userId);
  
  return cartItems.map(item => {
    const product = getProductById(item.productId);
    return {
      ...item,
      product
    };
  }).filter(item => item.product !== undefined);
};

/**
 * Calculate cart subtotal
 */
export const getCartSubtotal = (userId = 'user-001') => {
  const cartItems = getCartWithProducts(userId);
  
  return cartItems.reduce((total, item) => {
    return total + (item.product.priceRange.min * item.quantity);
  }, 0);
};

/**
 * Calculate cart total with shipping and tax
 */
export const getCartTotal = (userId = 'user-001', shippingCost = 0, taxRate = 0) => {
  const subtotal = getCartSubtotal(userId);
  const tax = subtotal * taxRate;
  return subtotal + shippingCost + tax;
};

/**
 * Get cart item count
 */
export const getCartCount = (userId = 'user-001') => {
  const cartItems = getCartItems(userId);
  return cartItems.reduce((total, item) => total + item.quantity, 0);
};

/**
 * Add product to cart
 */
export const addToCart = (productId, quantity = 1, selectedStone = null, userId = 'user-001') => {
  const newItem = {
    id: `cart-${Date.now()}`,
    userId,
    productId,
    quantity,
    selectedStone,
    addedDate: new Date().toISOString()
  };
  
  console.log('Added to cart:', newItem);
  return newItem;
};

/**
 * Update cart item quantity
 */
export const updateCartQuantity = (cartId, quantity) => {
  console.log('Updated cart quantity:', cartId, quantity);
  return { cartId, quantity };
};

/**
 * Remove from cart
 */
export const removeFromCart = (cartId) => {
  console.log('Removed from cart:', cartId);
  return cartId;
};

/**
 * Clear cart
 */
export const clearCart = (userId = 'user-001') => {
  console.log('Cleared cart for user:', userId);
  return userId;
};
