import axios from "axios";

console.log("URL: " , process.env.NEXT_PUBLIC_AUTH_URL)

const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_AUTH_URL , // Use environment variable for backend URL
    withCredentials: true, // Allow cookies if needed
    timeout: 5000
});

// Register Logic: Check for duplicate emails
export const register = async (formData) => {
  try {
      console.log("Sending request to server:", `${process.env.NEXT_PUBLIC_AUTH_URL}/auth/register`);
      const response = await API.post('/auth/register' , formData);
      console.log("Response: ", response.data);
      return response.data;
  } catch (error) {
      console.error('Error during registration:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Failed to register.");
  }
};

// Login API
export const login = async (email, password) => {   
    try {
      console.log("Payload being sent to server:", { email, plainPassword: password });
      const response = await API.post("/auth/login", { email, plainPassword: password });
      
      console.log("Login API Response:", response); // Log the full response
  
      return response.data; // Ensure you return only the token data
    } catch (error) {
      console.error("Error during login:", error.response?.data || error.message);
      throw error;
    }
  };

// Logout API
export const logout = () => API.post("/auth/logout");

// Validate Token API
export const validateToken = (token) =>
    API.post("/auth/validateToken", { token });
