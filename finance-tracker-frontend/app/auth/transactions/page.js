"use client";

import React from "react";
import Link from "next/link";

const TransactionsPage = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Transactions</h1>
                <p className="text-lg text-gray-600 mb-6">
                    This is the Transactions page. You can manage your Transactions here.
                </p>
                <div className="space-y-4">
                    <Link href="/transactions/add-transaction" className="block text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
                        AddTransactions
                    </Link>
                    <Link href="/transactions/verify-2fa" className="block text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
                        Verify 2FA
                    </Link>
                    <Link href="/transactions/request-password-reset" className="block text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
                        Request password reset
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TransactionsPage;