import apiClient from './client';


export const fetchProducts = async () => {
    try {
        // Adjust '/products' if your base URL already includes the endpoint path
        const response = await apiClient.get('/products');

        // Log data to verify structure (check console)
        console.log("API Response:", response.data);

        // Return the array of products. The API returns { success: true, data: [...] }
        return response.data.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};