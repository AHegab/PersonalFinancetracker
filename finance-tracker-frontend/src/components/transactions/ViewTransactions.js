"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewTransactions = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('/transactions');
                setTransactions(response.data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, []);

    return (
        <div>
            <h2>Transactions</h2>
            <ul>
                {transactions.map(transaction => (
                    <li key={transaction.id}>
                        {transaction.vendorName} - {transaction.amount} - {transaction.transactionDate}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewTransactions;