"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "../../../src/services/authService";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",

    });

    const [error, setError] = useState(null); // Error state for backend messages
    const router = useRouter();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the payload
        const payload = {
            email: formData.email,
            plainPassword: formData.password, // Match backend expectations
            firstName: formData.firstName,
            lastName: formData.lastName,
     
        };

        try {
            console.log("Payload being sent:", payload); // Debugging log
            await register(payload); // Call the API with JSON payload
            router.push("/auth/login"); // Redirect to login on success
        } catch (err) {
            // Handle backend errors
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message); // Display backend error message
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        }
    };

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center text-black">Register</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Show Backend Error */}
                    {error && (
                        <p className="text-red-500 text-sm font-medium text-center">{error}</p>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
                            required
                        />
                    </div>
                    
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
