"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    getUserTransactions,
    deleteTransaction,
    addTransaction,
    updateTransaction,
} from "../../src/services/transactionService";

Modal.setAppElement("body");

const TransactionsPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentTransaction, setCurrentTransaction] = useState(null);

    const [formData, setFormData] = useState({
        amount: "",
        vendorName: "",
        transactionDate: "",
        category: "",
        paymentMethod: "",
        cardLastFourDigits: "",
        notes: "",
    });

    // Fetch transactions
    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const data = await getUserTransactions();
            setTransactions(data);
        } catch (err) {
            console.error("Error fetching transactions:", err.message);
            setError("Failed to fetch transactions.");
        } finally {
            setLoading(false);
        }
    };

    // Open modal
    const openModal = (transaction = null) => {
        setIsEditMode(!!transaction);
        setCurrentTransaction(transaction);
        setFormData({
            amount: transaction?.amount || "",
            vendorName: transaction?.vendorName || "",
            transactionDate: transaction?.transactionDate?.split("T")[0] || "",
            category: transaction?.category || "",
            paymentMethod: transaction?.paymentMethod || "",
            cardLastFourDigits: transaction?.cardLastFourDigits || "",
            notes: transaction?.notes || "",
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentTransaction(null);
        setFormData({
            amount: "",
            vendorName: "",
            transactionDate: "",
            category: "",
            paymentMethod: "",
            cardLastFourDigits: "",
            notes: "",
        });
    };

    const handleDelete = async (id) => {
        try {
            const token = Cookies.get("auth_token");
            await deleteTransaction(id, token);
            toast.success("Transaction deleted successfully!");
            setTransactions((prev) =>
                prev.filter((transaction) => transaction.id !== id)
            );
        } catch (err) {
            toast.error("Failed to delete transaction.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = Cookies.get("auth_token");

        try {
            const payload = {
                amount: parseFloat(formData.amount),
                vendorName: formData.vendorName,
                transactionDate: new Date(formData.transactionDate),
                category: formData.category || undefined,
                paymentMethod: formData.paymentMethod,
                cardLastFourDigits:
                    formData.paymentMethod === "cash" ||
                    formData.paymentMethod === "other"
                        ? undefined
                        : formData.cardLastFourDigits,
                notes: formData.notes || undefined,
            };

            if (isEditMode && currentTransaction) {
                await updateTransaction(currentTransaction.id, payload, token);
                toast.success("Transaction updated successfully!");
            } else {
                await addTransaction(payload, token);
                toast.success("Transaction added successfully!");
            }

            fetchTransactions();
            closeModal();
        } catch (err) {
            console.error("Transaction Error:", err.message);
            toast.error(err.message || "Failed to save transaction.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <ToastContainer />
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    Your Transactions
                </h1>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <div className="mb-4 text-right">
                    <button
                        onClick={() => openModal()}
                        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
                    >
                        Add Transaction
                    </button>
                </div>

                {loading ? (
                    <p className="text-center">Loading...</p>
                ) : transactions.length > 0 ? (
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 p-2">Amount</th>
                                <th className="border border-gray-300 p-2">Vendor</th>
                                <th className="border border-gray-300 p-2">Category</th>
                                <th className="border border-gray-300 p-2">Payment Method</th>
                                <th className="border border-gray-300 p-2">Date</th>
                                <th className="border border-gray-300 p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction) => (
                                <tr key={transaction.id} className="text-center">
                                    <td className="border border-gray-300 p-2">
                                        ${transaction.amount}
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        {transaction.vendorName}
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        {transaction.category || "N/A"}
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        {transaction.paymentMethod}
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        {new Date(
                                            transaction.transactionDate
                                        ).toLocaleDateString()}
                                    </td>
                                    <td className="border border-gray-300 p-2 space-x-2">
                                        <button
                                            onClick={() => openModal(transaction)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(transaction.id)
                                            }
                                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center text-gray-500">No transactions found.</p>
                )}
            </div>

            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                className="bg-white rounded-lg p-8 max-w-md mx-auto shadow-lg"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            >
                <h2 className="text-2xl font-bold mb-4">
                    {isEditMode ? "Update Transaction" : "Add Transaction"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="number"
                        name='amount'
                        placeholder="Amount"
                        value={formData.amount}
                        onChange={(e) =>
                            setFormData({ ...formData, amount: e.target.value })
                        }
                        required
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="text"
                        name='vendorName'
                        placeholder="Vendor Name"
                        value={formData.vendorName}
                        onChange={(e) =>
                            setFormData({ ...formData, vendorName: e.target.value })
                        }
                        required
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="text"
                        name='category'
                        placeholder="Category"
                        value={formData.category}
                        onChange={(e) =>
                            setFormData({ ...formData, category: e.target.value })
                        }
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="date"
                        name='transactionDate'
                        value={formData.transactionDate}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                transactionDate: e.target.value,
                            })
                        }
                        required
                        className="w-full p-2 border rounded"
                    />
                    <select
                        value={formData.paymentMethod}
                        name='paymentMethod'
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                paymentMethod: e.target.value,
                            })
                        }
                        className="w-full p-2 border rounded"
                        required
                    >
                        <option value="">Select Payment Method</option>
                        <option value="cash">Cash</option>
                        <option value="credit_card">Credit Card</option>
                        <option value="debit_card">Debit Card</option>
                    </select>
                    {["credit_card", "debit_card"].includes(
                        formData.paymentMethod
                    ) && (
                        <input
                            type="text"
                            name='cardLastFourDigits'
                            placeholder="Last 4 Digits"
                            maxLength="4"
                            value={formData.cardLastFourDigits}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    cardLastFourDigits: e.target.value,
                                })
                            }
                            className="w-full p-2 border rounded"
                        />
                    )}
                    <textarea
                        placeholder="Notes"
                        name='notes'
                        value={formData.notes}
                        onChange={(e) =>
                            setFormData({ ...formData, notes: e.target.value })
                        }
                        className="w-full p-2 border rounded"
                    ></textarea>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        {isEditMode ? "Update" : "Add"}
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default TransactionsPage;
