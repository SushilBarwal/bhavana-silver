import apiClient from "./client";

/**
 * Fetch data for the Stone Stories page
 * Endpoint: /stone-story
 */
export const fetchStoneStoriesData = async () => {
  try {
    const response = await apiClient.get("/stone-story");
    return response.data.data || response.data;
  } catch (error) {
    console.error("Error fetching stone stories data:", error);
    return null;
  }
};
