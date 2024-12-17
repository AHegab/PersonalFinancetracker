"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { verify2FA } from "../../services/mfaService";

const Verify2FA = () => {
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const response = await verify2FA(otp); // Replace with actual API call
            setMessage("2FA verification successful!");

            setTimeout(() => {
                router.push("/profile"); // Redirect to home after verification
            }, 1000);
        } catch (err) {
            setError(err.message || "Failed to verify OTP.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-200">
            <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-lg transform transition duration-300 hover:scale-105">
                <div className="text-center mb-6">
                    <h1 className="text-4xl font-extrabold text-gray-800">2FA Verification</h1>
                    <p className="text-gray-500 mt-2">
                        Enter the one-time password (OTP) sent to your device
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {message && (
                        <div className="text-green-600 text-sm font-medium text-center bg-green-100 p-2 rounded">
                            {message}
                        </div>
                    )}
                    {error && (
                        <div className="text-red-600 text-sm font-medium text-center bg-red-100 p-2 rounded">
                            {error}
                        </div>
                    )}

                    <div>
                        <label
                            htmlFor="otp"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            One-Time Password (OTP)
                        </label>
                        <input
                            id="otp"
                            type="text"
                            placeholder="Enter your OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
                    >
                        Verify OTP
                    </button>
                </form>

                <div className="text-center mt-6 text-gray-600 text-sm">
                    Didn’t receive the OTP?{" "}
                    <a
                        href="/resend-otp"
                        className="text-blue-600 hover:underline font-semibold"
                    >
                        Resend OTP
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Verify2FA;
