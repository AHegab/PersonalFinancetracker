import axios from "axios";

const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL, // Use environment variable for backend URL
    withCredentials: true, // Allow cookies if needed
});

// Add a transaction
export const addTransaction = async (createDto, userId) => {
    try {
        const response = await API.post('/transactions/add-transaction', { ...createDto, userId });
        return response.data;
    } catch (error) {
        console.error("Add Transaction Error:", error.response?.data || error.message);
        throw new Error(
            error.response?.data?.message || "Failed to add transaction."
        );
    }
};

// Get all transactions
export const getAllTransactions = async () => {
    try {
        const response = await API.get('/transactions/get-all');
        return response.data; // Return all transactions
    } catch (error) {
        console.error("Get All Transactions Error:", error.response?.data || error.message);
        throw new Error(
            error.response?.data?.message || "Failed to fetch transactions."
        );
    }
};

// Get a specific transaction by ID
export const getTransactionById = async (id) => {
    try {
        const response = await API.get('/transactions/get-byId');
        return response.data; // Return transaction data
    } catch (error) {
        console.error("Get Transaction by ID Error:", error.response?.data || error.message);
        throw new Error(
            error.response?.data?.message || "Failed to fetch transaction."
        );
    }
};

// Get transactions for a specific user
export const getUserTransactions = async (userId) => {
    try {
        const response = await API.get('/transactions/get-by-UserId');
        return response.data; // Return user's transactions
    } catch (error) {
        console.error("Get User Transactions Error:", error.response?.data || error.message);
        throw new Error(
            error.response?.data?.message || "Failed to fetch user transactions."
        );
    }
};

// Delete a transaction by ID
export const deleteTransaction = async (id) => {
    try {
        const response = await API.delete('/transactions/delete-by-id');
        return response.data; // Return success message or data
    } catch (error) {
        console.error("Delete Transaction Error:", error.response?.data || error.message);
        throw new Error(
            error.response?.data?.message || "Failed to delete transaction."
        );
    }
};

// Update a transaction by ID
export const updateTransaction = async (id, updateDto) => {
    try {
        const response = await API.put('/transactions/delete-by-id', updateDto);
        return response.data; // Return updated transaction data
    } catch (error) {
        console.error("Update Transaction Error:", error.response?.data || error.message);
        throw new Error(
            error.response?.data?.message || "Failed to update transaction."
        );
    }
};