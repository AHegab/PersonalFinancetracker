"use client";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { findById, updateUser } from "../../services/profileService";

const UpdateUserPage = () => {
    const router = useRouter();
    const [id, setId] = useState(""); // State for the input ID
    const [user, setUser] = useState(null);
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPhoneNumber, setNewPhoneNumber] = useState("");
    const [newBirthDate, setNewBirthDate] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFetchUser = async () => {
        if (!id) return; // If there's no ID, we don't proceed

        setLoading(true);
        try {
            const fetchedUser = await findById(id);
            setUser(fetchedUser);
            setNewName(fetchedUser.name);
            setNewEmail(fetchedUser.email);
            setNewPhoneNumber(fetchedUser.phoneNumber);
            setNewBirthDate(fetchedUser.birthDate);
            setError("");
            setLoading(false);
        } catch (err) {
            setError("User not found.");
            setLoading(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = await updateUser(id, {
                name: newName,
                email: newEmail,
                phoneNumber: newPhoneNumber,
                birthDate: newBirthDate,
            });
            setMessage("User updated successfully!");
            setUser(updatedUser); // Update the user data with the updated details
        } catch (err) {
            setError("Failed to update user.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Update User</h1>

            {message && <p className="text-green-500 mt-4">{message}</p>}
            {error && <p className="text-red-500 mt-4">{error}</p>}

            {/* Input for user ID to fetch user data */}
            <div className="w-full max-w-md mb-4">
                <label htmlFor="id" className="block text-sm font-medium">Enter User ID</label>
                <input
                    type="text"
                    id="id"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className="block w-full p-2 border border-gray-300 rounded mt-1"
                    required
                />
                <button
                    onClick={handleFetchUser}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    Fetch User
                </button>
            </div>

            {/* Form to update user data */}
            {user && (
                <form onSubmit={handleUpdate} className="w-full max-w-md mt-6">
                    <div className="mt-4">
                        <label htmlFor="name" className="block text-sm font-medium">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded mt-1"
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="email" className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded mt-1"
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="phoneNumber" className="block text-sm font-medium">Phone Number</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            value={newPhoneNumber}
                            onChange={(e) => setNewPhoneNumber(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded mt-1"
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="birthDate" className="block text-sm font-medium">Birth Date</label>
                        <input
                            type="date"
                            id="birthDate"
                            value={newBirthDate}
                            onChange={(e) => setNewBirthDate(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded mt-1"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Update Profile
                    </button>
                </form>
            )}

            {/* Loading state */}
            {loading && <p>Loading user data...</p>}
        </div>
    );
};

export default UpdateUserPage;