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
        console.error("Register Error:", error.response?.data || error.message);
        throw new Error(
            error.response?.data?.message || "Failed to register. Check your inputs."
        );
    }
};

// Login API
export const login = (email, password) =>
    API.post("/auth/login", { email, password });


// Logout API
export const logout = () => API.post("/auth/logout");

// Validate Token API
export const validateToken = (token) =>
    API.post("/auth/validateToken", { token });
