import axios from "axios";

const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ANALYSIS_URL, 
    withCredentials: true,
});

// Analyze Budget API
export const analyzeBudget = async (userId, budgets) => {
    try {
        const response = await API.post("/services/analysis", { userId, budgets }); // Send userId and budgets as JSON
        return response.data; // Return the parsed response data
    } catch (error) {
        console.error("Analyze Budget Error:", error.response?.data || error.message);
        throw new Error(
            error.response?.data?.error || "Failed to analyze budget. Check your inputs."
        );
    }
};
