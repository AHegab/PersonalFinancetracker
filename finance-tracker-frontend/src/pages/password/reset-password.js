"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation"; // For reading query parameters
import { resetPassword } from "../../services/passwordService";

const ResetPasswordPage = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token"); // Retrieve token from the query string

    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await resetPassword(token, newPassword);
            setMessage(response.message); // Display success message
            setError("");
        } catch (err) {
            setError(err.message || "An error occurred. Please try again.");
            setMessage("");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
                {message && <p className="text-green-500 text-center">{message}</p>}
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                        New Password
                    </label>
                    <input
                        type="password"
                        id="newPassword"
                        className="block w-full p-2 border border-gray-300 rounded mt-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordPage;