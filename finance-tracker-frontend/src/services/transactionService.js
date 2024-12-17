import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_TRANSACTIONS_URL, // Use the deployed microservice URL
    withCredentials: true, // If your microservice requires cookies
});



// Add a transaction
export const addTransaction = async (createDto, token) => {
    try {
        const response = await API.post(
            "/transactions/create",
            createDto,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Add Transaction Error:", error.response?.data || error.message);
        throw new Error(
            error.response?.data?.message || "Failed to add transaction."
        );
    }
};

// Get all transactions for the authenticated user

// Fetch logged-in user transactions
export const getUserTransactions = async () => {
    try {
        const token = Cookies.get("auth_token"); // Retrieve token from cookies

        if (!token) {
            throw new Error("Authorization token is missing. Please log in.");
        }

        const response = await API.get("/transactions/user", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (err) {
        console.error("Get User Transactions Error:", err.message);
        throw new Error("Failed to fetch user transactions.");
    }
};


// Get a specific transaction by ID
export const getTransactionById = async (id, token) => {
    try {
        const response = await API.get(
            `/transactions/${id}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Get Transaction by ID Error:", error.response?.data || error.message);
        throw new Error(
            error.response?.data?.message || "Failed to fetch transaction."
        );
    }
};

// Delete a transaction by ID
export const deleteTransaction = async (id, token) => {
    try {
        const response = await API.delete(
            `/transactions/delete/${id}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Delete Transaction Error:", error.response?.data || error.message);
        throw new Error(
            error.response?.data?.message || "Failed to delete transaction."
        );
    }
};

// Update a transaction by ID
export const updateTransaction = async (id, updateDto, token) => {
    try {
        const response = await API.patch(
            `/transactions/update/${id}`,
            updateDto,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Update Transaction Error:", error.response?.data || error.message);
        throw new Error(
            error.response?.data?.message || "Failed to update transaction."
        );
    }
};

// // Export user transactions to CSV
// export const exportUserTransactionsToCSV = async (token) => {
//     try {
//         const response = await API.get("/transactions/export", {
//             headers: { Authorization: `Bearer ${token}` },
//         });
//         return response.data;
//     } catch (error) {
//         console.error("Export Transactions Error:", error.response?.data || error.message);
//         throw new Error(
//             error.response?.data?.message || "Failed to export transactions."
//         );
//     }
// };
