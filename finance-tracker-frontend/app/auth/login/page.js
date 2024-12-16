"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../../src/services/authService";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Attempting to log in with:", { email, password });
      
        try {
          const data = await login(email, password);
          console.log("Server response:", data);
      
          if (data?.token) {
            sessionStorage.setItem("PersonalFinanceTracker" , data.token)
            router.push("/auth/transactions");
          } else {
            setError("Invalid credentials.");
          }
        } catch (error) {
          console.error("Error during login:", error.response?.data);
          setError(error.response?.data?.message || "Failed to login.");
        }
      };                         

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-black"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-black"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account? <a href="/auth/register" className="text-blue-600 hover:underline">Register here</a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;