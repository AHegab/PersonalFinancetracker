"use client";

import React, { useState } from "react";
import { deleteTransaction } from "../../services/transactionService";

const DeleteTransactionPage = () => {
    const [id, setId] = useState("");
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        try {
            await deleteTransaction(id);
            setMessage("Transaction deleted successfully!");
        } catch (err) {
            setError("Failed to delete transaction.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold">Delete Transaction</h1>
            <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="Enter transaction ID"
                className="block w-full p-2 border border-gray-300 rounded mt-1"
            />
            <button
                onClick={handleDelete}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md"
            >
                Delete Transaction
            </button>
            {message && <p className="text-green-500 mt-4">{message}</p>}
            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    );
};

export default DeleteTransactionPage;
