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
export const fetchFooterSettings = async () => {
    try {
        const response = await apiClient.get('/site-settings/footer');
        return response.data;
    } catch (error) {
        console.error('Error fetching footer settings:', error);
        return null;
    }
};
