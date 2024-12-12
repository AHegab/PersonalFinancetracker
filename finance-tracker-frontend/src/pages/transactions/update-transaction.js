"use client";

import React, { useState } from "react";
import { updateTransaction } from "../../services/transactionService";

const UpdateTransactionPage = () => {
    const [id, setId] = useState("");
    const [amount, setAmount] = useState("");
    const [vendorName, setVendorName] = useState("");
    const [transactionDate, setTransactionDate] = useState("");
    const [category, setCategory] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [place, setPlace] = useState("");
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleUpdate = async () => {
        try {
            const updateDto = { amount, vendorName, transactionDate, category, paymentMethod, place };
            await updateTransaction(id, updateDto);
            setMessage("Transaction updated successfully!");
        } catch (err) {
            setError("Failed to update transaction.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Update Transaction</h1>

            <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="Enter transaction ID"
                className="block w-full p-2 border border-gray-300 rounded mt-1"
            />
            <div className="mt-4">
                <label className="block text-sm font-medium">Amount</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter updated amount"
                    className="block w-full p-2 border border-gray-300 rounded mt-1"
                />
            </div>

            <div className="mt-4">
                <label className="block text-sm font-medium">Vendor Name</label>
                <input
                    type="text"
                    value={vendorName}
                    onChange={(e) => setVendorName(e.target.value)}
                    placeholder="Enter updated vendor name"
                    className="block w-full p-2 border border-gray-300 rounded mt-1"
                />
            </div>

            <div className="mt-4">
                <label className="block text-sm font-medium">Transaction Date</label>
                <input
                    type="date"
                    value={transactionDate}
                    onChange={(e) => setTransactionDate(e.target.value)}
                    className="block w-full p-2 border border-gray-300 rounded mt-1"
                />
            </div>

            <div className="mt-4">
                <label className="block text-sm font-medium">Category</label>
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Enter updated category"
                    className="block w-full p-2 border border-gray-300 rounded mt-1"
                />
            </div>

            <div className="mt-4">
                <label className="block text-sm font-medium">Payment Method</label>
                <input
                    type="text"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    placeholder="Enter updated payment method"
                    className="block w-full p-2 border border-gray-300 rounded mt-1"
                />
            </div>

            <div className="mt-4">
                <label className="block text-sm font-medium">Place</label>
                <input
                    type="text"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                    placeholder="Enter updated place"
                    className="block w-full p-2 border border-gray-300 rounded mt-1"
                />
            </div>

            <button
                onClick={handleUpdate}
                className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
                Update Transaction
            </button>

            {message && <p className="text-green-500 mt-4">{message}</p>}
            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    );
};

export default UpdateTransactionPage;
