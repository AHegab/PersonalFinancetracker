import axios from "axios";

if (!process.env.NEXT_PUBLIC_ANALYSIS_URL) {
    console.warn("NEXT_PUBLIC_ANALYSIS_URL is not defined in your environment variables!");
}

const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ANALYSIS_URL, 
    withCredentials: true,
});

// Analyze Budget API
export const analyzeBudget = async (token) => {
    if (!token) {
        throw new Error("Authentication token is missing. Please log in again.");
    }

    try {
        const response = await API.get("/analysis", {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log("API Response:", response.data); // Verify the response format
        return response.data; // Should include 'data' and 'images'
    } catch (error) {
        console.error("Analyze Budget Error:", error.response?.data || error.message);
        throw new Error(
            error.response?.data?.error || "Failed to analyze budget. please make sure you have added more than 8 transactions."
        );
    }
};
