"use client";

import React, { useState } from "react";
import { addTransaction } from "../../services/transactionService";

const AddTransactionPage = () => {
    const [userId, setUserId] = useState("");
    const [amount, setAmount] = useState("");
    const [vendorName, setVendorName] = useState("");
    const [transactionDate, setTransactionDate] = useState("");
    const [category, setCategory] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [place, setPlace] = useState("");
    const [description, setDescription] = useState(""); // Added description state
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {

        // Validate form inputs
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            setMessage(null); // Clear success message if validation fails
            return;
        }

        try {
            const createDto = { amount, description, vendorName, transactionDate, category, paymentMethod, place };
            await addTransaction(createDto, userId);
            setMessage("Transaction added successfully!");
            setError(null); // Clear any previous errors
        } catch (err) {
            setError(err.message || "Failed to add transaction.");
            setMessage(null); // Clear success message if there's an error
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Add Transaction</h1>

            {message && <p className="text-green-500">{message}</p>}
            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={handleSubmit} className="mt-4 w-full max-w-md">
                <div>
                    <label className="block text-sm font-medium">User ID</label>
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="Enter user ID"
                        className="block w-full p-2 border border-gray-300 rounded mt-1"
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium">Amount</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter transaction amount"
                        className="block w-full p-2 border border-gray-300 rounded mt-1"
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium">Vendor Name</label>
                    <input
                        type="text"
                        value={vendorName}
                        onChange={(e) => setVendorName(e.target.value)}
                        placeholder="Enter vendor name"
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
                        placeholder="Enter transaction category"
                        className="block w-full p-2 border border-gray-300 rounded mt-1"
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium">Payment Method</label>
                    <input
                        type="text"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        placeholder="Enter payment method"
                        className="block w-full p-2 border border-gray-300 rounded mt-1"
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium">Place</label>
                    <input
                        type="text"
                        value={place}
                        onChange={(e) => setPlace(e.target.value)}
                        placeholder="Enter place"
                        className="block w-full p-2 border border-gray-300 rounded mt-1"
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter transaction description"
                        className="block w-full p-2 border border-gray-300 rounded mt-1"
                    />
                </div>

                <button
                    type="submit"
                    className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    Add Transaction
                </button>
            </form>
        </div>
    );
};

export default AddTransactionPage;