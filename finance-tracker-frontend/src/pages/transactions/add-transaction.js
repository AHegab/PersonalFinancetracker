"use client";

import React from 'react';
import AddTransactions from '/src/components/transactions/AddTransactions';

const AddTransactionPage = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Add Transaction</h1>
                <AddTransactions />
            </div>
        </div>
    );
};

export default AddTransactionPage;