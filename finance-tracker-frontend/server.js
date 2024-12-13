import express from 'express';
import cors  from 'cors';
import dotenv from 'dotenv';
import { login , register , logout , validateToken } from './src/services/authService.js';
import './db-config.js';

dotenv.config();

const app = express();

// CORS Configuration
app.use(
  cors({
    origin: ['http://localhost:3000' , 'https://authorizationmicroservice-production.up.railway.app'], // Adjust this if your frontend runs elsewhere
    credentials: true,
  })
);

// Middleware to parse JSON
app.use(express.json());

// Handle Login Route
app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await login(email, password);

        if (result?.token) {
            res.cookie("auth_token", result.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'None',
            });
            return res.status(200).json({ message: "Logged in successfully" });
        }

        return res.status(401).json({ message: "Invalid credentials" });
    } catch (error) {
        console.error("Login failed:", error.message);
        return res.status(401).json({ message: "Invalid credentials" });
    }
});

// Handle Register Route
app.post('/auth/register', async (req, res) => {
    console.log('Register request body:', req.body);
  
    try {
      const { data } = req.body;
  
      // Simulate email existence check
      const userExists = false; // Replace this logic with actual DB lookup
  
      if (userExists) {
        return res.status(409).json({ message: 'Email already registered' });
      }
  
      const result = await register(data);
      return res.status(200).json(result);
    } catch (error) {
      console.error('Error during registration:', error.message);
      return res.status(500).json({ message: error.message });
    }
  });
  

// Server Listening
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));