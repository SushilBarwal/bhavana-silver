import apiClient from "./client";

/**
 * Fetch data for the About Us page
 * Endpoint: /about-us
 */
export const fetchAboutData = async () => {
  try {
    const response = await apiClient.get("/about-us");
    // Supporting both { data: { ... } } and { success: true, data: { ... } } formats
    return response.data.data || response.data;
  } catch (error) {
    console.error("Error fetching about data:", error);
    return null;
  }
};
