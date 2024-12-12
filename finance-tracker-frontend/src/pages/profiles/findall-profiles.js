"use client";

import { useState, useEffect } from "react";
import { findAll } from "../../services/profileService";

const AllUsersPage = () => {
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
        <div>
            <h1>All Users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <strong>{user.name}</strong> - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AllUsersPage;
