"use client";

import React, { useState } from "react";
import axios from "axios";

const AddTransactionPage = () => {
    const [formData, setFormData] = useState({
        userId: "",
        amount: "",
        vendorName: "",
        transactionDate: "",
        category: "",
        paymentMethod: "",
        cardLastFourDigits: "",
        place: "",
        notes: "",
    });

    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Validate form data
    const validateForm = () => {
        if (!formData.userId || !formData.amount || !formData.transactionDate) {
            return "User ID, Amount, and Transaction Date are required.";
        }
        if (Number(formData.amount) <= 0) {
            return "Amount must be a positive number.";
        }
        return null; // No errors
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Perform validation
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            setMessage(null);
            return;
        }

        try {
            const response = await axios.post("/transactions", formData);
            setMessage("Transaction added successfully!");
            setError(null);
            // Reset form
            setFormData({
                userId: "",
                amount: "",
                vendorName: "",
                transactionDate: "",
                category: "",
                paymentMethod: "",
                cardLastFourDigits: "",
                place: "",
                notes: "",
            });
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add transaction.");
            setMessage(null);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Add Transaction</h1>

            {message && <p className="text-green-500">{message}</p>}
            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
                {Object.keys(formData).map((field) => (
                    <div key={field}>
                        <label className="block text-sm font-medium capitalize">
                            {field.replace(/([A-Z])/g, " $1")}
                        </label>
                        {field === "notes" ? (
                            <textarea
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                placeholder={`Enter ${field}`}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                        ) : (
                            <input
                                type={field === "transactionDate" ? "date" : "text"}
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                placeholder={`Enter ${field}`}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                        )}
                    </div>
                ))}

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                    Add Transaction
                </button>
            </form>
        </div>
    );
};

export default AddTransactionPage;
