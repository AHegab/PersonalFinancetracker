import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();

// CORS Configuration
app.use(
  cors({
    origin: ['http://localhost:3000'], // Frontend origin
    methods: ['GET', 'POST' , 'PUT'],
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

app.post('/auth/logout' , async (req, res) => {
  try{
    const response = await API.post(
      'https://authorizationmicroservice-production.up.railway.app/auth/logout',
      {},
      {withCredentials: true}
    );

    res.status(response.data).json(response.data);
  } catch(error){
    console.error("Logout error:", error.response?.data || error.message);
    const status = error.response?.status || 500;
    res.status(status).json(error.response?.data || { message: "An error occurred during logout" });
  }
});

// Enable 2FA route
app.post('/mfa/enable', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Missing or invalid token" });
    }

    const token = authHeader.split(" ")[1];
    console.log("Token received from frontend:", token);

    // Forward request to the actual microservice endpoint
    const response = await axios.post(
      'https://authorizationmicroservice-production.up.railway.app/mfa/enable',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error during MFA enable:", error.response?.data || error.message);
    const status = error.response?.status || 500;
    res.status(status).json({ message: "Error enabling 2FA" });
  }
});

// Fetch User by ID
app.get("/profile/:id", validateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const response = await API.get(
      `https://authorizationmicroservice-production.up.railway.app/profile/${id}`, 
      {
      headers: { Authorization: req.headers.authorization },
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: "Error fetching user by ID" });
  }
});

// Update User
app.put("/profile/update/:id", validateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const formData = req.body;
    const response = await API.put(
      `https://authorizationmicroservice-production.up.railway.app/profile/update/${id}`,
       formData, 
       {
      headers: { Authorization: req.headers.authorization },
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: "Error updating user" });
  }
});

// Server Listening
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));