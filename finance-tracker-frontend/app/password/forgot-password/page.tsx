"use client";

import React, { useState } from "react";
import { forgotPassword } from "../../../src/services/passwordService";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSuccessMessage("");
        setErrorMessage("");

        try {
            const response = await forgotPassword(email);
            setSuccessMessage(response.message || "Reset link sent to your email.");
        } catch (error) {
            setErrorMessage((error as Error).message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 text-black">

        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-4">Forgot Password</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Enter your email:
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    placeholder="example@example.com"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                >
                    Send Reset Email
                </button>
            </form>

            {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
            {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
        </div>

        </div>
    );
};

export default ForgotPassword;
