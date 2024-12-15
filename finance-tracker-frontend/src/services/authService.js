import axios from "axios";

const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_AUTH_URL, // Use environment variable for backend URL
    withCredentials: true, // Allow cookies if needed
});

export const register = async (formData) => {
    try {
        const response = await API.post("/auth/register", formData); // Send JSON data
        return response.data; // Return response data
    } catch (error) {
        console.error("Register Error:", error.response?.data  , error.message);
        throw new Error(
            error.response?.data?.message("Failed to register")
        );
    }
};

// Login API
export const login = async (email, password) => {
    try {
    const response = await API.post("/auth/login", { email, password });

    return response.data
    } catch(error) {
        console.error("Login Error:", error.response?.data  , error.message);
        throw new Error(
            error.response?.data?.message("Failed to login")
        );
    }
};

// Logout API
export const logout = async () => { 
    try {
        const response = await API.post('/auth/logout');
        return response.data;
    } catch(error) {
        console.error("Logout Error:", error.response?.data || error.message);
        throw new Error(
            error.response?.data?.message || "Failed to logout"
        );
    }
};

// Validate Token API
export const validateToken = (token) =>
    API.post("/auth/validateToken", { token });