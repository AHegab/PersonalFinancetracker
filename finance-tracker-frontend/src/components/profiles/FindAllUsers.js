"use client";

import React, { useState, useEffect } from "react";
import { findAll } from "../../services/profileService"; 

const FindAllUsers = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await findAll();
                setUsers(fetchedUsers);
            } catch (err) {
                setError("Failed to load users.");
            }
        };
        fetchUsers();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold">All Users</h1>
            {users.length > 0 ? (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            <strong>{user.firstName}</strong> - {user.email}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No users found.</p>
            )}
        </div>
    );
};

export default FindAllUsers;
