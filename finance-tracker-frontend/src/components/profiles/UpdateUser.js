"use client";

import React, { useState, useEffect } from "react";
import { updateUser, findById } from "../../services/profileService"; // Assuming these services are available

const UserProfile = () => {
    const [userId, setUserId] = useState(""); // User ID input state
    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch user data based on the userId
    useEffect(() => {
        if (!userId) return;

        const fetchUserData = async () => {
            setLoading(true);
            try {
                const fetchedUser = await findById(userId); // Fetch user by ID
                setUser(fetchedUser);
                setFirstName(fetchedUser.firstName || "");
                setLastName(fetchedUser.lastName || "");
                setPhoneNumber(fetchedUser.phoneNumber || "");
                setBirthDate(fetchedUser.birthDate || "");
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch user data.");
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleUpdate = async () => {
        try {
            const updatedUser = await updateUser(userId, {
                firstName,
                lastName,
                phoneNumber,
                birthDate,
            });
            setMessage("User updated successfully!");
            setUser(updatedUser);
        } catch (err) {
            setError("Failed to update user.");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!userId) {
            setError("Please enter a valid user ID.");
            return;
        }
        setLoading(true);
        setError(null);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Update User Profile</h1>

            {/* Input for User ID */}
            <div className="mb-4">
                <label htmlFor="userId" className="block text-sm font-medium">Enter User ID</label>
                <input
                    type="text"
                    id="userId"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Enter user ID"
                    className="block w-full p-2 border border-gray-300 rounded mt-1"
                />
                <button
                    onClick={handleSubmit}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    Fetch User
                </button>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {user && (
                <div className="mt-4 w-full max-w-md">
                    {message && <p className="text-green-500">{message}</p>}

                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="mt-4">
                            <label className="block text-sm font-medium">First Name</label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="Enter your first name"
                                className="block w-full p-2 border border-gray-300 rounded mt-1"
                            />
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium">Last Name</label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Enter your last name"
                                className="block w-full p-2 border border-gray-300 rounded mt-1"
                            />
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium">Phone Number</label>
                            <input
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="Enter your phone number"
                                className="block w-full p-2 border border-gray-300 rounded mt-1"
                            />
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium">Birth Date</label>
                            <input
                                type="date"
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                                className="block w-full p-2 border border-gray-300 rounded mt-1"
                            />
                        </div>

                        <button
                            onClick={handleUpdate}
                            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md"
                        >
                            Update Profile
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default UserProfile;