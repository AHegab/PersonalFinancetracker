"use client";

import { useRouter } from "next/router";
import { useState } from "react";
import { findById } from "../../services/profileService"; // Adjust the import path if needed

const UserByIdPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [inputId, setInputId] = useState(id || "");  // Add state to manage input value

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (inputId) {
            try {
                const fetchedUser = await findById(inputId);  // Use inputId for the API call
                setUser(fetchedUser);
                setError("");
            } catch (err) {
                setError("User not found.");
            }
        }
    };

    return (
        <div>
            <h1>User by ID</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="id">Enter Id:</label>
                    <input
                        type="text"  // Use type="text" for user input
                        id="id"
                        value={inputId}
                        onChange={(e) => setInputId(e.target.value)}  // Correctly set inputId state
                        required
                    />
                    <button type="submit">Search</button>
                </div>
            </form>
            {error && <div>{error}</div>}
            {user && (
                <div>
                    <p><strong>ID:</strong> {user.id}</p>
                    <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
                    <p><strong>Birth Date:</strong> {user.birthDate}</p>
                </div>
            )}
        </div>
    );
};

export default UserByIdPage;
