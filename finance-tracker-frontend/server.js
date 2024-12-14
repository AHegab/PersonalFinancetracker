import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();

// CORS Configuration
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://authorizationmicroservice-production.up.railway.app'], // Frontend origin
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Include cookies if needed
  })
);

app.options('*', cors()); // Handle preflight requests

// Middleware to parse JSON
app.use(express.json());

// Direct API call to login
app.post('/auth/login', async (req, res) => {
  console.log("Received payload from frontend:", req.body);

  try {
    const { email, plainPassword } = req.body;
    const password = plainPassword;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing email or password" });
    }

    console.log("Parsed credentials:", { email, password });

    const response = await API.post(
      'https://authorizationmicroservice-production.up.railway.app/auth/login',
      { email, password },
      { withCredentials: true }
    );

    console.log("Response from auth microservice:", response.data);

    if (response.data?.token) {
      return res.status(200).json(response.data);
    }

    console.log("No token returned, forwarding the response error.");
    return res.status(401).json({ message: "Invalid credentials" });
  } catch (error) {
    console.error("Error communicating with auth microservice:", error.response?.data || error.message);
    return res.status(500).json({ message: "Failed to authenticate" });
  }
});

// Direct API call to register
app.post('/auth/register', async (req, res) => {
  try {
    const formData = req.body;

    // Forward the request to the external microservice
    const response = await API.post(
      'https://authorizationmicroservice-production.up.railway.app/auth/register',
      formData,
      { withCredentials: true } // Include cookies if necessary
    );

    // Forward the response back to the client
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Register error:", error.message);
    const status = error.response?.status || 500;
    res.status(status).json(error.response?.data || { message: "An error occurred" });
  }
});

// Server Listening
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));