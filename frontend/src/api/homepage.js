import apiClient from './client';

export const fetchHomepageData = async () => {
    try {
        const response = await apiClient.get('/homepage/all');
        return response.data;
    } catch (error) {
        console.error('Error fetching homepage data:', error);
        return null;
    }
};
