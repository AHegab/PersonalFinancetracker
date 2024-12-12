"use client";

import React, { useState } from 'react';
import axios from 'axios';

const AddTransactions = () => {
    const [formData, setFormData] = useState({
        userId: '',
        amount: '',
        vendorName: '',
        transactionDate: '',
        category: '',
        paymentMethod: '',
        cardLastFourDigits: '',
        place: '',
        notes: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/transactions', formData);
            console.log('Transaction added:', response.data);
            // Reset form data after successful submission
            setFormData({
                userId: '',
                amount: '',
                vendorName: '',
                transactionDate: '',
                category: '',
                paymentMethod: '',
                cardLastFourDigits: '',
                place: '',
                notes: '',
            });
        } catch (error) {
            console.error('Error adding transaction:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                name="userId"
                placeholder="User ID"
                onChange={handleChange}
                value={formData.userId}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <input
                type="number"
                name="amount"
                placeholder="Amount"
                onChange={handleChange}
                value={formData.amount}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <input
                type="text"
                name="vendorName"
                placeholder="Vendor Name"
                onChange={handleChange}
                value={formData.vendorName}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <input
                type="date"
                name="transactionDate"
                onChange={handleChange}
                value={formData.transactionDate}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <input
                type="text"
                name="category"
                placeholder="Category"
                onChange={handleChange}
                value={formData.category}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <input
                type="text"
                name="paymentMethod"
                placeholder="Payment Method"
                onChange={handleChange}
                value={formData.paymentMethod}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <input
                type="text"
                name="cardLastFourDigits"
                placeholder="Card Last Four Digits"
                onChange={handleChange}
                value={formData.cardLastFourDigits}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <input
                type="text"
                name="place"
                placeholder="Place"
                onChange={handleChange}
                value={formData.place}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <textarea
                name="notes"
                placeholder="Notes"
                onChange={handleChange}
                value={formData.notes}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
                Add Transaction
            </button>
        </form>
    );
};

export default AddTransactions;