"use client";

import React from "react";
import Link from "next/link";

const TransactionsPage = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center text-black">Transactions</h1>
                <p className="text-lg text-gray-600 mb-6">
                    This is the Transactions page. You can manage your Transactions here.
                </p>
                <div className="space-y-4">
                    <Link href="/transactions/add-transaction" className="block text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
                        Add Transaction
                    </Link>
                    <Link href="/transactions/delete-transaction" className="block text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
                        Delete Transaction
                    </Link>
                    <Link href="/transactions/get-all-transactions" className="block text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
                        Get All Transactions
                    </Link>
                    <Link href="/transactions/get-id-transaction" className="block text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
                        Get ID Transaction
                    </Link>
                    <Link href="/transactions/get-user-transactions" className="block text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
                        Get Users Transactions
                    </Link>
                    <Link href="/transactions/update-transaction" className="block text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
                        Update Transactions
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TransactionsPage;