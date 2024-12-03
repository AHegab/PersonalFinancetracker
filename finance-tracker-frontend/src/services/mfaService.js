import axios from "axios";
import Cookies from 'js-cookie';



// Create an Axios instance
const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_AUTH_URL, // Base URL from environment variables
    withCredentials: true, // Allow sending cookies if needed
});

// Enable 2FA: Fetch QR code and secret
export const enable2FA = async () => {
    try {
        // Retrieve the token from cookies
        const token = Cookies.get("auth_token");
        if (!token) {
            throw new Error("Authentication token is missing.");
        }

        console.log("Token being sent:", token); // Log token for debugging

        // Make the POST request
        const response = await API.post(
            "/mfa/enable",
            {}, // No payload is required for enabling 2FA
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Pass token in headers
                },
            }
        );

        console.log("Enable 2FA response:", response.data); // Log the response for debugging
        return response.data; // Contains qrCodeUrl and secret
    } catch (error) {
        // Log detailed error information
        console.error("Enable 2FA Error:", error.response?.data || error.message);

        // Show more helpful error details for debugging
        console.error("Full error details:", error);

        // Rethrow the error with a descriptive message
        throw new Error(
            error.response?.data?.message || "Failed to enable 2FA. Check your request."
        );
    }
};


// Verify 2FA: Verify OTP
export const verify2FA = async (otp) => {
    try {
        // Retrieve token from cookies
        const token = Cookies.get("auth_token");
        if (!token) {
            throw new Error("Authentication token is missing.");
        }

        console.log("Token being sent:", token); // Debug token
        console.log("OTP being sent:", otp); // Debug OTP

        // Send the POST request
        const response = await API.post(
            "/mfa/verify",
            { otp }, // Send OTP in the payload
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Include token in headers
                },
            }
        );

        console.log("Verify 2FA response:", response.data); // Debug response
        return response.data; // Contains verification status
    } catch (error) {
        console.error("Verify 2FA Error:", error.response?.data || error.message);
        throw new Error(
            error.response?.data?.message || "Failed to verify OTP. Please try again."
        );
    }
};

// Disable 2FA

