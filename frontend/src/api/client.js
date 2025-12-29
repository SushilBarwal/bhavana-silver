import axios from "axios";

// Create a custom axios instance
const apiClient = axios.create({
  // Use relative URL in development to go through Vite proxy
  // In production, this will be the full URL from env variable
  baseURL: import.meta.env.DEV ? "/api/v1" : import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add a request interceptor to automatically attach the token
apiClient.interceptors.request.use(
  (config) => {
    // Check if user has a personal auth token (logged in)
    const userToken = localStorage.getItem("auth_token");

    if (userToken) {
      // User is logged in - use their personal token
      config.headers.Authorization = `Bearer ${userToken}`;
    } else {
      // User is not logged in - use system token for guest access
      const systemToken = import.meta.env.VITE_API_TOKEN;
      if (systemToken) {
        config.headers.Authorization = `Bearer ${systemToken}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
