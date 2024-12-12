"use client";

import React, { useState } from "react";
import { updateUser } from "../../services/profileService";

const UserProfile = ({ userId }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleUpdate = async () => {
        try {
            const updatedUser = await updateUser(userId, {
                firstName,
                lastName,
                phoneNumber,
                birthDate,
            });
            setMessage("User updated successfully!");
        } catch (err) {
            setError("Failed to update user.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold">Update Profile</h1>
            
            {message && <p className="text-green-500 mt-4">{message}</p>}
            {error && <p className="text-red-500 mt-4">{error}</p>}

            <div className="mt-4 w-full max-w-md">
                <label className="block text-sm font-medium">First Name</label>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your first name"
                    className="block w-full p-2 border border-gray-300 rounded mt-1"
                />
            </div>

            <div className="mt-4 w-full max-w-md">
                <label className="block text-sm font-medium">Last Name</label>
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter your last name"
                    className="block w-full p-2 border border-gray-300 rounded mt-1"
                />
            </div>

            <div className="mt-4 w-full max-w-md">
                <label className="block text-sm font-medium">Phone Number</label>
                <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter your phone number"
                    className="block w-full p-2 border border-gray-300 rounded mt-1"
                />
            </div>

            <div className="mt-4 w-full max-w-md">
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
        </div>
    );
};

export default UserProfile;