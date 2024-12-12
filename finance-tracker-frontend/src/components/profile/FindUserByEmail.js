"use client";

import React, { useState, useEffect } from "react";
import { findByEmail } from "../../services/profileService";

const FindUserByEmail = ({ email }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUserByEmail = async () => {
            try {
                const fetchedUser = await findByEmail(email);
                setUser(fetchedUser);
            } catch (err) {
                setError("User not found.");
            }
        };
        fetchUserByEmail();
    }, [email]);

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

export default FindUserByEmail;
