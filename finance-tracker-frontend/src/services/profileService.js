import axios from 'axios';

const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_AUTH_URL, // Use environment variable for backend URL
    withCredentials: true, // Allow cookies if needed
});

// Fetch User by ID API
export const findById = async (id) => {
    try {
        const response = await API.get(`/profile/${id}`);
        return response.data;
    } catch (error) {
        console.error("Find User by ID Error:", error.response?.data || error.message);
        throw new Error(
            error.response?.data?.message || "Failed to fetch user details by ID."
        );
    }
};

// Update User API
export const updateUser = async (id, formData) => {
    try {
        const response = await API.put(`/profile/update/${id}`, formData); // Assuming ID-based update
        return response.data;
    } catch (error) {
        console.error("Update User Error:", error.response?.data || error.message);
        throw new Error(
            error.response?.data?.message || "Failed to update user details."
        );
    }
};