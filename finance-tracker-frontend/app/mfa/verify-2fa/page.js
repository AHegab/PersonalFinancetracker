"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { verify2FA } from "../../../src/services/mfaService";

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
            await verify2FA(otp); // Replace with actual API call
            setMessage("2FA verification successful!");

            setTimeout(() => {
                router.push("/profile"); // Redirect to profile after verification
            }, 1000);
        } catch (err) {
            setError(err.message || "Failed to verify OTP.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 p-4 overflow-hidden relative">
            {/* Floating decorative circles in background */}
            <div className="absolute w-72 h-72 bg-blue-300 rounded-full top-[-100px] right-[-100px] filter blur-2xl opacity-40 animate-pulse" />
            <div className="absolute w-72 h-72 bg-indigo-300 rounded-full bottom-[-100px] left-[-100px] filter blur-2xl opacity-40 animate-ping" />

            <div className="relative bg-white shadow-2xl rounded-xl p-8 w-full max-w-md 
                            transform transition duration-300 hover:scale-105 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-4xl font-extrabold text-gray-800">
                        2FA Verification
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Enter the one-time password (OTP) sent to your device
                    </p>
                </div>

                {/* Alerts */}
                {message && (
                    <div className="mb-4 text-green-700 bg-green-100 border border-green-200 p-3 rounded text-sm font-medium">
                        {message}
                    </div>
                )}
                {error && (
                    <div className="mb-4 text-red-700 bg-red-100 border border-red-200 p-3 rounded text-sm font-medium">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="otp"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            One-Time Password (OTP)
                        </label>
                        <input
                            id="otp"
                            type="text"
                            placeholder="Enter your OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="block w-full px-4 py-3 text-gray-700 bg-white 
                                       border border-gray-300 rounded-lg shadow-sm 
                                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                                       focus:border-blue-500 transition duration-200"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 text-lg font-semibold text-white 
                                   bg-blue-600 rounded-lg hover:bg-blue-700 transition 
                                   duration-300 shadow-md"
                    >
                        Verify OTP
                    </button>
                </form>

                {/* Resend Link */}
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
