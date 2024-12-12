"use client";

import React, { useState, useEffect } from "react";
import { findById } from "../../services/profileService";

const FindUserById = ({ userId }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            if (!userId) {
                setError("User ID is required.");
                return;
            }

            try {
                const fetchedUser = await findById(userId);
                setUser(fetchedUser);
            } catch (err) {
                setError("User not found.");
            }
        };

        fetchUser();
    }, [userId]);

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen text-red-500">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">User Details</h1>
            {user ? (
                <div className="text-lg">
                    <p><strong>ID:</strong> {user.id}</p>
                    <p><strong>First Name:</strong> {user.firstName}</p>
                    <p><strong>Last Name:</strong> {user.lastName}</p>
                    <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
                    <p><strong>Birth Date:</strong> {user.birthDate}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            ) : (
                <p>No user found with this ID.</p>
            )}
        </div>
    );
};

export default FindUserById;