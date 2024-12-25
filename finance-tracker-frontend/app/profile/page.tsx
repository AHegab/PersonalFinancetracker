"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { findById, updateUser } from "../../src/services/profileService";

// Optional currency formatter
const formatCurrency = (value: number) => `$${value.toLocaleString()}`;

Modal.setAppElement("body");

const ProfilePage = () => {
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Basic user data
    const [formData, setFormData] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        phoneNumber: "",
        birthDay: "",
    });

    // Store budgets as array of { category, amount }
    const [budgetItems, setBudgetItems] = useState<Array<{ category: string; amount: number }>>([]);

    const router = useRouter();

    // Fetch user profile
    const fetchProfile = async () => {
        const token = Cookies.get("auth_token");
        try {
            const userData = await findById(token);
            setProfile(userData);

            // Initialize form fields
            setFormData({
                firstName: userData.firstName || "",
                middleName: userData.middleName || "",
                lastName: userData.lastName || "",
                phoneNumber: userData.phoneNumber || "",
                birthDay: userData.birthDay?.split("T")[0] || "",
            });

            // Convert userData.budgets into array form
            const rawBudgets = userData.budgets?.budgets || {};
            const budgetsArray = Object.entries(rawBudgets).map(([key, value]) => ({
                category: key,
                amount: Number(value),
            }));
            setBudgetItems(budgetsArray);
        } catch (err) {
            console.error("Error fetching profile:", err);
            router.push("/auth/login");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    // Modal open/close
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Handle text inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle budget array changes
    const handleBudgetItemChange = (
        index: number,
        field: "category" | "amount",
        value: string
    ) => {
        setBudgetItems((prevItems) => {
            const updated = [...prevItems];
            if (field === "category") {
                updated[index].category = value;
            } else {
                updated[index].amount = Number(value);
            }
            return updated;
        });
    };

    // Add a blank budget row
    const handleAddBudgetItem = () => {
        setBudgetItems((prev) => [...prev, { category: "", amount: 0 }]);
    };

    // Remove a budget row
    const handleRemoveBudgetItem = (index: number) => {
        setBudgetItems((prev) => prev.filter((_, i) => i !== index));
    };

    // Save changes
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = Cookies.get("auth_token");

        // Convert array back to { budgets: { Car: 1000, ... } }
        const budgetsObject: Record<string, number> = {};
        budgetItems.forEach((item) => {
            if (item.category.trim() !== "") {
                budgetsObject[item.category] = item.amount;
            }
        });

        const updatedData = {
            ...formData,
            phoneNumber: formData.phoneNumber || null,
            budgets: {
                budgets: budgetsObject,
            },
        };

        try {
            await updateUser(updatedData, token);
            toast.success("Profile updated successfully!");
            fetchProfile();
            closeModal();
        } catch (err) {
            console.error("Error updating profile:", err);
            toast.error("Failed to update profile.");
        }
    };

    if (loading) {
        return <div className="text-center mt-8 text-black">Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-50 p-6 text-black">
            <ToastContainer />

            {/* Profile Card */}
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-md p-6 space-y-6 text-black">
                {/* Title */}
                <h1 className="text-4xl font-extrabold text-center text-black">
                    Your Profile
                </h1>

                {/* Grid for personal info & budgets */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Info Card */}
                    <div className="border-l-4 border-blue-600 rounded-r-md p-4 space-y-3 bg-blue-50">
                        <h2 className="text-xl font-semibold text-black">
                            Personal Information
                        </h2>

                        <div>
                            <span className="font-semibold text-black">First Name:</span>{" "}
                            {profile.firstName || "N/A"}
                        </div>
                        <div>
                            <span className="font-semibold text-black">Middle Name:</span>{" "}
                            {profile.middleName || "N/A"}
                        </div>
                        <div>
                            <span className="font-semibold text-black">Last Name:</span>{" "}
                            {profile.lastName || "N/A"}
                        </div>
                        <div>
                            <span className="font-semibold text-black">Birthday:</span>{" "}
                            {profile.birthDay
                                ? new Date(profile.birthDay).toLocaleDateString()
                                : "N/A"}
                        </div>
                        <div>
                            <span className="font-semibold text-black">Email:</span>{" "}
                            {profile.email || "N/A"}
                        </div>
                        <div>
                            <span className="font-semibold text-black">Two-Factor Enabled:</span>{" "}
                            {profile.isTwoFactorEnabled ? "Yes" : "No"}
                        </div>
                    </div>

                    {/* Budgets Card */}
                    <div className="border-l-4 border-green-600 rounded-r-md p-4 space-y-3 bg-green-50">
                        <h2 className="text-xl font-semibold text-black">Budgets</h2>

                        {budgetItems.length === 0 ? (
                            <p className="text-black">No budgets available.</p>
                        ) : (
                            <table className="w-full text-left border-collapse text-black">
                                <thead className="bg-green-100">
                                    <tr>
                                        <th className="p-2 border border-green-200">Category</th>
                                        <th className="p-2 border border-green-200">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {budgetItems.map((item, idx) => (
                                        <tr
                                            key={idx}
                                            className="odd:bg-green-50 hover:bg-green-100 transition"
                                        >
                                            <td className="p-2 border border-green-200">
                                                {item.category}
                                            </td>
                                            <td className="p-2 border border-green-200">
                                                {formatCurrency(item.amount)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                {/* Edit Button */}
                <div className="text-right">
                    <button
                        onClick={openModal}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Edit Profile
                    </button>
                </div>
            </div>

            {/* Modal for Editing */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                className="bg-white rounded-lg p-8 max-w-md mx-auto shadow-lg relative text-black"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            >
                <h2 className="text-2xl font-bold mb-6 text-black">Edit Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Standard fields */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-black">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full p-2 border rounded text-black"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-black">
                            Middle Name
                        </label>
                        <input
                            type="text"
                            name="middleName"
                            placeholder="Middle Name"
                            value={formData.middleName}
                            onChange={handleChange}
                            className="w-full p-2 border rounded text-black"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-black">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full p-2 border rounded text-black"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-black">
                            Birthday
                        </label>
                        <input
                            type="date"
                            name="birthDay"
                            value={formData.birthDay}
                            onChange={handleChange}
                            className="w-full p-2 border rounded text-black"
                        />
                    </div>

                    {/* Budgets Section */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-black">
                            Budgets
                        </label>
                        {budgetItems.map((item, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    placeholder="Category"
                                    value={item.category}
                                    onChange={(e) =>
                                        handleBudgetItemChange(index, "category", e.target.value)
                                    }
                                    className="p-1 border rounded w-1/2 text-black"
                                />
                                <input
                                    type="number"
                                    placeholder="Amount"
                                    value={item.amount}
                                    onChange={(e) =>
                                        handleBudgetItemChange(index, "amount", e.target.value)
                                    }
                                    className="p-1 border rounded w-1/3 text-black"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveBudgetItem(index)}
                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddBudgetItem}
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                            Add Budget
                        </button>
                    </div>

                    {/* Save Button */}
                    <div className="pt-4 text-right">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>

                {/* Close Modal Button */}
                <button
                    onClick={closeModal}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </Modal>
        </div>
    );
};

export default ProfilePage;
