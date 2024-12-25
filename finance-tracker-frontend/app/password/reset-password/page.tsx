"use client";

import { useSearchParams } from "next/navigation";
// import router from "next/router";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { resetPassword } from "../../../src/services/passwordService";

const ResetPassword = () => {
    const searchParams = useSearchParams();
    const token = searchParams ? searchParams.get("token") : null; // Get the token from query params

    const [newPassword, setNewPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSuccessMessage("");
        setErrorMessage("");

        try {
            const response = await resetPassword(token, newPassword);
            setSuccessMessage(response.message || "Password reset successfully.");
            router.push("/auth/login");
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("An unknown error occurred.");
            }
        }
    };

    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500">Invalid or missing reset token.</p>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 text-black">

        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-4">Reset Password</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <label htmlFor="newPassword" className="block text-sm font-medium mb-2">
                    Enter New Password:
                </label>
                <input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    placeholder="New Password"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
                >
                    Reset Password
                </button>
            </form>

            {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
            {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
        </div>

        </div>
    );
};

export default ResetPassword;
