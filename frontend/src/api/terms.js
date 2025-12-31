import apiClient from "./client";

/**
 * Fetch data for the Terms and Conditions page
 * Endpoint: /terms
 */
export const fetchTermsData = async () => {
  try {
    const response = await apiClient.get("/terms");
    return response.data.data || response.data;
  } catch (error) {
    console.error("Error fetching terms data:", error);
    return null;
  }
};
