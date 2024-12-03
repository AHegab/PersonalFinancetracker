"use client";

import React, { useState } from "react";
import { verify2FA } from "../../services/mfaService";

const Verify2FA = () => {
    const [otp, setOtp] = useState("");
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleVerify2FA = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("auth_token"); // Retrieve auth token
            await verify2FA(otp, token);
            setSuccess("2FA Verified Successfully!");
            setError(null);
        } catch (err) {
            setError("Invalid OTP. Please try again.");
            setSuccess(null);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold">Verify Two-Factor Authentication</h1>
            <form onSubmit={handleVerify2FA} className="mt-4">
                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md"
                    required
                />
                <button
                    type="submit"
                    className="ml-2 px-4 py-2 bg-green-500 text-white rounded-md"
                >
                    Verify
                </button>
            </form>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {success && <p className="text-green-500 mt-2">{success}</p>}
        </div>
    );
};

export default Verify2FA;
