"use client";

import React, { useState, useEffect } from "react";
import { getUserTransactions } from "../../services/transactionService";

const UserTransactionsPage = () => {
    const [userId, setUserId] = useState("");
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchUserTransactions = async () => {
        setLoading(true);
        try {
            const data = await getUserTransactions(userId);
            setTransactions(data);
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch user transactions.");
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold">User Transactions</h1>
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
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {transactions.length > 0 ? (
                <ul className="mt-4">
                    {transactions.map((transaction) => (
                        <li key={transaction.id} className="p-2 border-b">
                            <p><strong>ID:</strong> {transaction.id}</p>
                            <p><strong>Amount:</strong> {transaction.amount}</p>
                            <p><strong>Vendor Name:</strong> {transaction.vendorName}</p>
                            <p><strong>Transaction Date:</strong> {transaction.transactionDate}</p>
                            <p><strong>Category:</strong> {transaction.category}</p>
                            <p><strong>Payment Method:</strong> {transaction.paymentMethod}</p>
                            <p><strong>Place:</strong> {transaction.place}</p>
                            <p><strong>User ID:</strong> {transaction.userId}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No transactions found.</p>
            )}
        </div>
    );
};

export default UserTransactionsPage;
