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
      const response = await axios.post(
        "/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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
    console.log("Frontend payload being sent to server:", {
      email,
      password,
    });

    const response = await axios.post(
      "/auth/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    console.log("Response from server:", response.data);
    return response.data;
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
