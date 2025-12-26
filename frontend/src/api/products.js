import apiClient from "./client";

export const fetchProducts = async (params = {}) => {
  try {
    // Adjust '/products' if your base URL already includes the endpoint path
    const response = await apiClient.get("/products", { params });

    // Return the array of products. The API returns { success: true, data: [...] }
    return response.data.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const fetchCategories = async () => {
  try {
    const response = await apiClient.get("/categories");
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
