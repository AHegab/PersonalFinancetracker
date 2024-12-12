"use client";

import React, { useState, useEffect } from "react";
import { getAllTransactions } from "../../services/transactionService";

const AllTransactionsPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            setLoading(true);
            try {
                const data = await getAllTransactions();
                setTransactions(data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch transactions.");
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    if (loading) return <p>Loading transactions...</p>;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">All Transactions</h1>

            {error && <p className="text-red-500">{error}</p>}

            <div className="w-full max-w-md">
                {transactions.length === 0 ? (
                    <p>No transactions found.</p>
                ) : (
                    <ul>
                        {transactions.map((transaction) => (
                            <li key={transaction.id} className="p-4 border-b">
                                <p><strong>ID:</strong> {transaction.id}</p>
                                <p><strong>Amount:</strong> {transaction.amount}</p>
                                <p><strong>Vendor Name:</strong> {transaction.vendorName}</p>
                                <p><strong>Transaction Date:</strong> {transaction.transactionDate}</p>
                                <p><strong>Category:</strong> {transaction.category}</p>
                                <p><strong>Payment Method:</strong> {transaction.paymentMethod}</p>
                                <p><strong>Place:</strong> {transaction.place}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AllTransactionsPage;
