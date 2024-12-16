"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { addTransaction } from "../../../src/services/transactionService";
import { jwtDecode } from "jwt-decode";

const TransactionsPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("PersonalFinanceTracker");
    if (!token) {
      alert("Log in to access the Transactions Page");
      router.push("/auth/login");
    }
  }, [router]);

  const handleAddTransaction = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const token = sessionStorage.getItem("PersonalFinanceTracker");
      console.log(token);
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      const userEmail = decodedToken?.email;

      if (!userEmail) throw new Error("Invalid user token.");

      const payload = {
        ...formData,
        userEmail,
      };

      await addTransaction(payload);
      alert("Transaction added successfully!");
      setShowTransactionForm(false);
    } catch (error) {
      console.error(error);
      setError(error.message);
      alert("Failed to add transaction.");
    } finally {
      setLoading(false);
    }
  };

  const toggleTransactionForm = () => {
    setShowTransactionForm((prev) => !prev);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-black">Transactions</h1>
        <p className="text-lg text-gray-600 mb-6">
          This is the Transactions page. You can manage your Transactions here.
        </p>
        <div className="space-y-4">
          {/* Navigation Links */}
          <Link
            href="#"
            className="block text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
            onClick={toggleTransactionForm}
          >
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

        {showTransactionForm && (
          <div className="mt-4 bg-gray-100 p-4 rounded-md border shadow-md">
            <h2 className="text-xl font-bold mb-4 text-center">Add Transaction</h2>
            <TransactionForm onSubmit={handleAddTransaction} onCancel={toggleTransactionForm} />
          </div>
        )}

        {error && <p className="text-red-500 text-center mt-2">Error: {error}</p>}
      </div>
    </div>
  );
};

const TransactionForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    amount: "",
    vendorName: "",
    transactionDate: "",
    category: "",
    paymentMethod: "",
    cardLastFourDigits: "",
    place: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Amount */}
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      {/* Vendor Name */}
      <input
        type="text"
        name="vendorName"
        placeholder="Vendor Name"
        value={formData.vendorName}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      {/* Transaction Date */}
      <input
        type="date"
        name="transactionDate"
        value={formData.transactionDate}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      {/* Category */}
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      {/* Payment Method */}
      <select
        name="paymentMethod"
        value={formData.paymentMethod}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      >
        <option value="">Select Payment Method</option>
        <option value="cash">Cash</option>
        <option value="credit_card">Credit Card</option>
        <option value="debit_card">Debit Card</option>
        <option value="other">Other</option>
      </select>

      {/* Card Last Four Digits */}
      <input
        type="text"
        name="cardLastFourDigits"
        placeholder="Card Last 4 Digits"
        value={formData.cardLastFourDigits}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      {/* Place */}
      <input
        type="text"
        name="place"
        placeholder="Place"
        value={formData.place}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      {/* Notes */}
      <textarea
        name="notes"
        placeholder="Notes"
        value={formData.notes}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        rows={2}
      />

      <div className="flex justify-between space-x-2">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>
        <button
          type="button"
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TransactionsPage;