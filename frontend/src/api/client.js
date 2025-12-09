import axios from 'axios';

// Initialize Axios with your environment variables
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        // Remove 'Bearer ' if your API expects just the token value
        'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        // Bypass Ngrok browser warning
        'ngrok-skip-browser-warning': 'true'
    }
});

export default apiClient;
