import axios from "axios";

const sanitizedAuthURL = process.env.AUTH_URL?.replace(/^"|"$/g, '');

console.log("URL: " , sanitizedAuthURL)

const API = axios.create({
    baseURL: sanitizedAuthURL, // Use environment variable for backend URL
    withCredentials: true, // Allow cookies if needed
    timeout: 5000
});

// Register Logic: Check for duplicate emails
export const register = async (formData) => {
    try {
        console.log("Register request payload:", formData);
        
        // Simulate checking if email exists (replace with actual DB check)
        const emailExists = formData.emailExists; // Replace with DB query e.g. using a User model
        if (emailExists) {
            throw new Error("Email already registered.");
        }

        const response = await API.post("/auth/register", formData);
        return response.data;
    } catch (error) {
        console.error("Error during registration:", error.message);
        throw new Error(error.response?.data?.message || "Failed to register.");
    }
};

// Login API
export const login = async (email, password) => {    
    try {
      console.log("Payload being sent to server:", { email, password });
      const response = await API.post("/auth/login", { email, password });
      
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
