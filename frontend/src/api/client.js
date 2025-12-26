import axios from "axios";

// Initialize Axios with your environment variables
const apiClient = axios.create({
  // Use relative URL in development to go through Vite proxy
  // In production, this will be the full URL from env variable
  baseURL: import.meta.env.DEV ? "/api/v1" : import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // Authorization will be added by proxy in development
    ...(import.meta.env.PROD && {
      Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
      "ngrok-skip-browser-warning": "true",
    }),
  },
});

export default apiClient;
