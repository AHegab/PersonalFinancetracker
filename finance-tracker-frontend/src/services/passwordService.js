import axios from "axios";

// Create an Axios instance with the base URL
const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_AUTH_URL, // Backend base URL from environment variables
    withCredentials: true, // Enable cookies if needed
});

// Forgot Password: Send reset email
export const forgotPassword = async (email) => {
    if (!email || !email.trim()) {
        throw new Error("Email is required");
    }

    try {
        const response = await API.post("/password/forget", { email }); // Align with backend '/password/forget'
        return response.data; // Return backend response
    } catch (error) {
        console.error("Forgot Password Error:", error.response?.data || error.message);
        throw new Error(
            error.response?.data?.message || "Failed to send reset email. Please try again."
        );
    }
};

// Reset Password: Update password using token and new password
export const resetPassword = async (token, newPassword) => {
    if (!token || !newPassword) {
        throw new Error("Token and new password are required");
    }

    try {
        // Pass the token as a query parameter as required by the backend
        const response = await API.post(`/password/reset?token=${token}`, { newPassword });
        return response.data; // Return backend response
    } catch (error) {
        console.error("Reset Password Error:", error.response?.data || error.message);
        throw new Error(
            error.response?.data?.message || "Failed to reset password. Please try again."
        );
    }
};
