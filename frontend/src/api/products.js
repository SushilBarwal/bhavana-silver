import apiClient from "./client";

export const fetchProducts = async (params = {}) => {
  try {
    // Adjust '/products' if your base URL already includes the endpoint path
    const response = await apiClient.get("/products", { params });
    console.log("fetchProducts response:", response.data);

    // Return the array of products. The API returns { success: true, data: [...] }
    return response.data.data;
  } catch (error) {
    console.error("fetchProducts error:", error);
    return [];
  }
};

export const fetchCategories = async () => {
  try {
    const response = await apiClient.get("/categories");
    return response.data.data || [];
  } catch (error) {
    return [];
  }
};

/**
 * Fetch a single product by its slug or ID
 * Automatically detects if the parameter is a numeric ID or slug
 * Tries multiple strategies to find the product
 */
export const fetchProductBySlug = async (slugOrId) => {
  if (!slugOrId) {
    return null;
  }

  // Check if it's a numeric ID
  const isNumericId = /^\d+$/.test(String(slugOrId));

  try {
    // Strategy 1: Use appropriate filter parameter (slug or id) - SAFER FIRST CHOICE
    // We try this first to avoid 500 errors from the direct endpoint if it doesn't exist
    const filterParam = isNumericId ? { id: slugOrId } : { slug: slugOrId };
    try {
      const response = await apiClient.get("/products", {
        params: {
          ...filterParam,
          per_page: 1, // Only need one result if filtering works
        },
      });

      if (
        response.data &&
        response.data.data &&
        response.data.data.length > 0
      ) {
        const product = response.data.data[0];
        // Verify it's an exact match
        const matches = isNumericId
          ? product.id === parseInt(slugOrId)
          : product.slug === slugOrId;

        if (matches) {
          return product;
        }
      }
    } catch (filterError) {
      // Filter failed, continue to next strategy
    }

    // Strategy 2: Direct API endpoint /products/{id} or /products/{slug}
    // Only tried if filter didn't return an exact match
    try {
      const directResponse = await apiClient.get(`/products/${slugOrId}`);

      // Handle both response formats: { data: {...} } or { success: true, data: {...} }
      const productData = directResponse.data.data || directResponse.data;

      if (productData && (productData.id || productData.slug)) {
        return productData;
      }
    } catch (directError) {
      // Direct endpoint might not exist, continue to next strategy
    }

    // Strategy 3: Fetch multiple pages and search (last resort)
    let currentPage = 1;
    const maxPages = 5; // Limit search to avoid too many requests

    while (currentPage <= maxPages) {
      const searchResponse = await apiClient.get("/products", {
        params: {
          page: currentPage,
          per_page: 50,
        },
      });

      const products = searchResponse.data.data;
      if (!products || products.length === 0) {
        break; // No more products
      }

      // Search for exact match (by slug or ID)
      const match = products.find((p) =>
        isNumericId ? p.id === parseInt(slugOrId) : p.slug === slugOrId
      );

      if (match) {
        return match;
      }

      // Check if there are more pages
      const meta = searchResponse.data.meta;
      if (!meta || currentPage >= meta.last_page) {
        break;
      }

      currentPage++;
    }

    return null;
  } catch (error) {
    return null;
  }
};
