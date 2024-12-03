"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for redirection
import { verify2FA } from "../../services/mfaService";

const Verify2FA = () => {
    const [otp, setOtp] = useState(""); // OTP input state
    const [message, setMessage] = useState(""); // Success message
    const [error, setError] = useState(""); // Error state
    const router = useRouter(); // Router instance for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(""); // Reset messages
        setError("");

        try {
            const response = await verify2FA(otp); // Call verify service
            setMessage("2FA verification successful!");

            // Redirect to the home page after a short delay
            setTimeout(() => {
                router.push("/"); // Redirect to home
            }, 1000); // Optional delay for user feedback
        } catch (err) {
            setError(err.message || "Failed to verify OTP.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Verify 2FA</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {message && (
                        <p className="text-green-500 text-sm font-medium text-center">
                            {message}
                        </p>
                    )}
                    {error && (
                        <p className="text-red-500 text-sm font-medium text-center">
                            {error}
                        </p>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            OTP
                        </label>
                        <input
                            type="text"
                            name="otp"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                        Verify 2FA
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Verify2FA;
