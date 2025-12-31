import apiClient from "./client";

/**
 * Fetch data for the Privacy Policy page
 * Endpoint: /privacy
 */
export const fetchPrivacyData = async () => {
  try {
    const response = await apiClient.get("/privacy");
    return response.data.data || response.data;
  } catch (error) {
    console.error("Error fetching privacy data:", error);
    return null;
  }
};
