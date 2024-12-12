"use client";

import React, { useState } from "react";
import { getUserTransactions } from "../../services/transactionService";

const UserTransactionsPage = () => {
    const [userId, setUserId] = useState("");
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUserTransactions = async () => {
        if (!userId) return;

        setLoading(true);
        setError(null); // Reset error before a new fetch attempt
        try {
            const data = await getUserTransactions(userId);
            setTransactions(data);
        } catch (err) {
            setError("Failed to fetch user transactions.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Get User Transactions</h1>

            <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter user ID"
                className="block w-full p-2 border border-gray-300 rounded mt-1"
            />
            <button
                onClick={fetchUserTransactions}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
                Fetch User Transactions
            </button>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {transactions.length > 0 ? (
                <div className="mt-4 w-full max-w-md">
                    <ul>
                        {transactions.map((transaction) => (
                            <li key={transaction.id} className="border-b py-2">
                                <p><strong>Transaction ID:</strong> {transaction.id}</p>
                                <p><strong>Amount:</strong> {transaction.amount}</p>
                                <p><strong>Description:</strong> {transaction.description}</p>
                                <p><strong>Status:</strong> {transaction.status}</p>
                                <p><strong>Date:</strong> {transaction.date}</p>
                                <p><strong>Type:</strong> {transaction.type}</p>
                                <p><strong>Category:</strong> {transaction.category}</p>
                                {/* Add any other attributes that the transaction has */}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No transactions found for this user.</p>
            )}
        </div>
    );
};

export default UserTransactionsPage;