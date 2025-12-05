import { getProductById } from './productData';

const STORAGE_KEY = 'recentlyViewed';
const MAX_ITEMS = 12;

/**
 * Get recently viewed product IDs from localStorage
 */
export const getRecentlyViewed = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Error reading recently viewed:', error);
        return [];
    }
};

/**
 * Add a product to recently viewed list
 * @param {string} productId - Product ID to add
 */
export const addRecentlyViewed = (productId) => {
    try {
        if (!productId) return;

        let recentlyViewed = getRecentlyViewed();

        // Remove if already exists (to move to front)
        recentlyViewed = recentlyViewed.filter(id => id !== productId);

        // Add to beginning of array
        recentlyViewed.unshift(productId);

        // Limit to MAX_ITEMS
        if (recentlyViewed.length > MAX_ITEMS) {
            recentlyViewed = recentlyViewed.slice(0, MAX_ITEMS);
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(recentlyViewed));
    } catch (error) {
        console.error('Error adding to recently viewed:', error);
    }
};

/**
 * Get recently viewed products with full product details
 */
export const getRecentlyViewedWithProducts = () => {
    const productIds = getRecentlyViewed();

    return productIds
        .map(id => getProductById(id))
        .filter(product => product !== undefined);
};

/**
 * Get count of recently viewed products
 */
export const getRecentlyViewedCount = () => {
    return getRecentlyViewed().length;
};

/**
 * Clear all recently viewed products
 */
export const clearRecentlyViewed = () => {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Error clearing recently viewed:', error);
    }
};

/**
 * Check if a product is in recently viewed
 */
export const isRecentlyViewed = (productId) => {
    const recentlyViewed = getRecentlyViewed();
    return recentlyViewed.includes(productId);
};
