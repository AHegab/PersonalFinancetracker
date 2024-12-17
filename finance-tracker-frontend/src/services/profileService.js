import axios from 'axios';

const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_AUTH_URL, // Use environment variable for backend URL
    withCredentials: true, // Allow cookies if needed
});

// Fetch User Profile API
export const findById = async (token) => {
    try {
        const response = await API.get(`/profile`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Find User Error:", error.response?.data || error.message);
        throw new Error(
            error.response?.data?.message || "Failed to fetch user profile."
        );
    }
};

// Update User Budgets API
export const updateBudgets = async (budgets, token) => {
    try {
        const response = await API.patch(`/profile/budgets`, budgets, {
            headers: { Authorization: `Bearer ${token}` },
        });
        
        return response.data;
    } catch (error) {
        console.error("Update Budgets Error:", error.response?.data || error.message);
        throw new Error(
            error.response?.data?.message || "Failed to update user budgets."
        );
    }
};

// Update User API
export const updateUser = async (formData, token) => {
    try {
        const response = await API.patch(`/profile/update`, formData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Update Budgets Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Update User Error:", error.response?.data || error.message);
        throw new Error(
            error.response?.data?.message || "Failed to update user details."
        );
    }
};
