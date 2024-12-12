"use client";

import React, { useState, useEffect } from "react";
import { findById } from "../../services/profileService";

const FindUserById = ({ userId }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
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
        return <div>{error}</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold">User Details</h1>
            {user ? (
                <div>
                    <p><strong>ID:</strong> {user.id}</p>
                    <p><strong>firstName:</strong> {user.firstName}</p>
                    <p><strong>lastName:</strong> {user.lastName}</p>
                    <p><strong>phoneNumber:</strong> {user.phoneNumber}</p>
                    <p><strong>birthDate:</strong> {user.birthDate}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default FindUserById;
