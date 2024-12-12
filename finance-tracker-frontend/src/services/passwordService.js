import axios from "axios";

// Create an Axios instance
const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_AUTH_URL, // Use environment variable for backend URL
    withCredentials: true, // Allow cookies if needed
});

// Forgot Password: Send Email
export const forgetPassword = async (email) => {
    if (!email || !email.trim()) {
        throw new Error("Email is required");
    }
    try {
        const response = await API.post("/auth/forget-password", { email });
        return response.data; // Return response data
    } catch (error) {
        console.error("Forget Password Error:", error.response?.data || error.message);
        throw new Error(
            error.response?.data?.message || "Failed to send reset email. Please try again."
        );
    }
};

// Reset Password: Take new password and update
export const resetPassword = async (token, newPassword) => {
    if (!token || !newPassword) {
        throw new Error("Token and new password are required");
    }
    try {
        const response = await API.post("/auth/reset-password", { token, newPassword });
        return response.data; // Return response data
    } catch (error) {
        console.error("Reset Password Error:", error.response?.data || error.message);
        throw new Error(
            error.response?.data?.message || "Failed to reset password. Please try again."
        );
    }
};
