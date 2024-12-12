"use client";

import React, { useState } from "react";
import { getTransactionById } from "../../services/transactionService";

const TransactionByIdPage = () => {
    const [id, setId] = useState("");
    const [transaction, setTransaction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTransaction = async () => {
        if (!id) return;

        setLoading(true);
        setError(null); // Reset error on new fetch attempt
        try {
            const data = await getTransactionById(id);
            setTransaction(data);
        } catch (err) {
            setError("Transaction not found.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Get Transaction by ID</h1>

            <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="Enter transaction ID"
                className="block w-full p-2 border border-gray-300 rounded mt-1"
            />
            <button
                onClick={fetchTransaction}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
                Fetch Transaction
            </button>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {transaction && (
                <div className="mt-4 w-full max-w-md">
                    <p><strong>ID:</strong> {transaction.id}</p>
                    <p><strong>Amount:</strong> {transaction.amount}</p>
                    <p><strong>Vendor Name:</strong> {transaction.vendorName}</p>
                    <p><strong>Transaction Date:</strong> {transaction.transactionDate}</p>
                    <p><strong>Category:</strong> {transaction.category}</p>
                    <p><strong>Payment Method:</strong> {transaction.paymentMethod}</p>
                    <p><strong>Place:</strong> {transaction.place}</p>
                </div>
            )}
        </div>
    );
};

export default TransactionByIdPage;