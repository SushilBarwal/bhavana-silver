import apiClient from "./client";

/**
 * Fetch all wishlist items for the authenticated user
 * @returns {Promise<Array>} Array of wishlist items with product details
 */
export const fetchWishlist = async () => {
  try {
    const response = await apiClient.get("/wishlist");
    console.log("fetchWishlist response:", response.data);

    // Return the wishlist data. API should return { success: true, data: [...] }
    return response.data.data || response.data || [];
  } catch (error) {
    console.error("fetchWishlist error:", error);
    throw error;
  }
};

/**
 * Add a product to the wishlist
 * @param {number|string} productId - The ID of the product to add
 * @returns {Promise<Object>} The created wishlist item
 */
export const addToWishlist = async (productId) => {
  try {
    const response = await apiClient.post("/wishlist", {
      product_id: productId,
    });
    console.log("addToWishlist response:", response.data);

    return response.data.data || response.data;
  } catch (error) {
    console.error("addToWishlist error:", error);
    throw error;
  }
};

/**
 * Remove a product from the wishlist
 * @param {number|string} productId - The ID of the product to remove
 * @returns {Promise<Object>} Success response
 */
export const removeFromWishlist = async (productId) => {
  try {
    const response = await apiClient.delete(`/wishlist/${productId}`);
    console.log("removeFromWishlist response:", response.data);

    return response.data;
  } catch (error) {
    console.error("removeFromWishlist error:", error);
    throw error;
  }
};

/**
 * Check if a product is in the wishlist
 * @param {number|string} productId - The ID of the product to check
 * @param {Array} wishlistItems - Array of wishlist items
 * @returns {boolean} True if product is in wishlist
 */
export const isProductInWishlist = (productId, wishlistItems) => {
  if (!Array.isArray(wishlistItems)) return false;

  return wishlistItems.some(
    (item) =>
      item.product_id === productId ||
      item.product?.id === productId ||
      item.id === productId
  );
};
