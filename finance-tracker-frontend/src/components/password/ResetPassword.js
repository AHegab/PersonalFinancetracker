"use client";

import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const ResetPassword = () => {
    const router = useRouter();
    const { token } = router.query; // Get the token from the URL
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, { token, newPassword });
            setMessage(response.data.message);
            setError("");
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred. Please try again.");
            setMessage("");
        }
    };

    return (
        <div>
            <h1>Reset Password</h1>
            {message && <p>{message}</p>}
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;