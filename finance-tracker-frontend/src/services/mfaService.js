import axios from "axios";
import Cookies from 'js-cookie';



// Create an Axios instance
const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_AUTH_URL, // Base URL from environment variables
    withCredentials: true, // Allow sending cookies if needed
});

// Enable 2FA: Fetch QR code and secret
export const enable2FA = async () => {
    const token = localStorage.getItem("PersonalFinanceTracker");
  
    if (!token) {
      alert("You must log in before enabling 2FA.");
      console.error("No token found in localStorage.");
      return;
    }
  
    try {
      const response = await axios.post('/mfa/enable', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log("Response from server:", response.data);
      return response.data;
    } catch (error) {
      console.error("Server response error:", error.response);
      throw new Error(error.response?.data?.message || "Failed to enable 2FA");
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