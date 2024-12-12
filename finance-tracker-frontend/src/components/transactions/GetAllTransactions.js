"use client";

import React, { useState, useEffect } from "react";
import { getAllTransactions } from "../../services/transactionService";

const GetAllTransactionsPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchAllTransactions = async () => {
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

    useEffect(() => {
        fetchAllTransactions();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold">All Transactions</h1>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {transactions.length > 0 ? (
                <ul className="mt-4">
                    {transactions.map((transaction) => (
                        <li key={transaction.id} className="p-2 border-b">
                            <p><strong>ID:</strong> {transaction.id}</p>
                            <p><strong>Amount:</strong> {transaction.amount}</p>
                            <p><strong>Vendor Name:</strong> {transaction.vendorName}</p>
                            <p><strong>Transaction Date:</strong> {transaction.transactionDate}</p>
                            <p><strong>Category:</strong> {transaction.category}</p>
                            <p><strong>Payment Method:</strong> {transaction.paymentMethod}</p>
                            <p><strong>Place:</strong> {transaction.place}</p>
                            <p><strong>User ID:</strong> {transaction.userId}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No transactions found.</p>
            )}
        </div>
    );
};

export default GetAllTransactionsPage;