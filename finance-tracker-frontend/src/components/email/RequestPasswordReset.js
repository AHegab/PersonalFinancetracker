"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const RequestPasswordReset = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/request-password-reset`, { email });
            setMessage(response.data.message);
            setError("");
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred. Please try again.");
            setMessage("");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Request Password Reset</h1>
                {message && <p className="text-green-500 text-sm font-medium text-center">{message}</p>}
                {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                    >
                        Send Reset Link
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RequestPasswordReset;