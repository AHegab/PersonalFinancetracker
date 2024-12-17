"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { findById, updateUser } from "../../src/services/profileService";

Modal.setAppElement("body");

const ProfilePage = () => {
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        phoneNumber: "",
        birthDay: "",
        budgets: "",
    });

    const router = useRouter();

    // Fetch user profile
    const fetchProfile = async () => {
        const token = Cookies.get("auth_token");
        try {
            const userData = await findById(token);
            setProfile(userData);
            setFormData({
                firstName: userData.firstName || "",
                middleName: userData.middleName || "",
                lastName: userData.lastName || "",
                phoneNumber: userData.phoneNumber || "",
                birthDay: userData.birthDay?.split("T")[0] || "",
                budgets: JSON.stringify(userData.budgets, null, 2) || "{}",
            });
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

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = Cookies.get("auth_token");
        try {
            const updatedData = {
                ...formData,
                budgets: JSON.parse(formData.budgets),
                phoneNumber:null // Parse budgets before sending
            };
            await updateUser(updatedData, token);
            toast.success("Profile updated successfully!");
            fetchProfile(); // Refresh data
            closeModal();
        } catch (err) {
            console.error("Error updating profile:", err);
            toast.error("Failed to update profile.");
        }
    };

    if (loading) return <div className="text-center mt-8">Loading...</div>;

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <ToastContainer />
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    Your Profile
                </h1>

                {/* Profile Table */}
                <table className="w-full border-collapse border border-gray-300 mb-6">
                    <tbody>
                        <tr>
                            <td className="border p-2 font-semibold">First Name</td>
                            <td className="border p-2">{profile.firstName || "N/A"}</td>
                        </tr>
                        <tr>
                            <td className="border p-2 font-semibold">Middle Name</td>
                            <td className="border p-2">{profile.middleName || "N/A"}</td>
                        </tr>
                        <tr>
                            <td className="border p-2 font-semibold">Last Name</td>
                            <td className="border p-2">{profile.lastName || "N/A"}</td>
                        </tr>
                        <tr>
                            <td className="border p-2 font-semibold">Birthday</td>
                            <td className="border p-2">
                                {profile.birthDay
                                    ? new Date(profile.birthDay).toLocaleDateString()
                                    : "N/A"}
                            </td>
                        </tr>
                        <tr>
                            <td className="border p-2 font-semibold">Email</td>
                            <td className="border p-2">{profile.email || "N/A"}</td>
                        </tr>
                        <tr>
                            <td className="border p-2 font-semibold">Budgets</td>
                            <td className="border p-2">
                                <pre className="text-sm text-gray-600">
                                    {JSON.stringify(profile.budgets, null, 2) || "N/A"}
                                </pre>
                            </td>
                        </tr>
                        <tr>
                            <td className="border p-2 font-semibold">Two-Factor Enabled</td>
                            <td className="border p-2">
                                {profile.isTwoFactorEnabled ? "Yes" : "No"}
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* Edit Profile Button */}
                <div className="text-right">
                    <button
                        onClick={openModal}
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        Edit Profile
                    </button>
                </div>

                {/* Modal for Editing */}
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    className="bg-white rounded-lg p-8 max-w-md mx-auto shadow-lg"
                    overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                >
                    <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                        <input
                            type="text"
                            name="middleName"
                            placeholder="Middle Name"
                            value={formData.middleName}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                        <input
                            type="date"
                            name="birthDay"
                            value={formData.birthDay}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                        <textarea
                            name="budgets"
                            placeholder="Budgets (JSON format)"
                            value={formData.budgets}
                            onChange={handleChange}
                            rows={4}
                            className="w-full p-2 border rounded"
                        ></textarea>
                        <button
                            type="submit"
                            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                        >
                            Save Changes
                        </button>
                    </form>
                </Modal>
            </div>
        </div>
    );
};

export default ProfilePage;
