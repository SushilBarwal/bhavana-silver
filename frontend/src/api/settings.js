import apiClient from './client';

export const fetchHeaderSettings = async () => {
    try {
        const response = await apiClient.get('/site-settings/header');
        return response.data;
    } catch (error) {
        console.error('Error fetching header settings:', error);
        return null;
    }
};
