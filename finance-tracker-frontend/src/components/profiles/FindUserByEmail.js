"use client";

import { useState } from "react";
import { findById } from "../../services/profileService"; // Adjust the import path if needed

const UserByIdPage = () => {
    const [id, setId] = useState("");
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            setLoading(true);
            try {
                const fetchedUser = await findById(id);
                setUser(fetchedUser);
                setError("");
            } catch (err) {
                setError("User not found.");
            } finally {
                setLoading(false);
            }
        }
    };

    // Handle loading and error states
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>User by ID</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="id">Enter ID:</label>
                    <input
                        type="text" // Changed from "id" to "text"
                        id="id"
                        value={id}
                        onChange={(e) => setId(e.target.value)} // Changed from setEmail to setId
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