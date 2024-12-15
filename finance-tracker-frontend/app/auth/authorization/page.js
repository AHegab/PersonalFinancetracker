"use client";

import React, { useState } from "react";
import { enable2FA } from "../../../src/services/mfaService";
import { findById, updateUser } from "../../../src/services/profileService";

const Authorization = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleEnable2FA = async () => {
    setLoading(true);
    setError(null);

    try {
      const { qrCodeUrl, secret } = await enable2FA();
      console.log("QR Code URL:", qrCodeUrl);
      console.log("Secret:", secret);

      alert("2FA setup started! Scan the QR code to proceed.");
    } catch (error) {
      console.error("Error enabling 2FA:", error.message);
      setError(error.message);
      alert("Failed to enable 2FA. Please check permissions or try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFetchUserById = async () => {
    setLoading(true);
    setError(null);

    try {
      const userId = prompt("Enter User ID:");
      if (!userId) throw new Error("User ID is required!");

      const data = await findById(userId);
      setResult(data);
      alert(`User fetched successfully: ${JSON.stringify(data, null, 2)}`);
    } catch (err) {
      console.error("Error fetching user by ID:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async () => {
    setLoading(true);
    setError(null);

    try {
      const userId = prompt("Enter User ID to update:");
      if (!userId) throw new Error("User ID is required!");

      const name = prompt("Enter new name:");
      if (!name) throw new Error("Name is required!");

      const formData = { name }; // Add other fields as necessary
      const data = await updateUser(userId, formData);
      setResult(data);
      alert(`User updated successfully: ${JSON.stringify(data, null, 2)}`);
    } catch (err) {
      console.error("Error updating user:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-black">Authorization</h1>
        <p className="text-lg text-gray-600 mb-6">
          This is the Authorization page. You can manage your authorization settings here.
        </p>
        <div className="space-y-4">
          {/* Enable 2FA */}
          <button
            onClick={handleEnable2FA}
            className="block text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
            disabled={loading}
          >
            {loading ? "Enabling 2FA..." : "Enable 2FA"}
          </button>

          {/* Fetch User by ID */}
          <button
            onClick={handleFetchUserById}
            className="block text-center bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200"
            disabled={loading}
          >
            {loading ? "Fetching User..." : "Fetch User by ID"}
          </button>

          {/* Update User */}
          <button
            onClick={handleUpdateUser}
            className="block text-center bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition duration-200"
            disabled={loading}
          >
            {loading ? "Updating User..." : "Update User"}
          </button>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-center mt-2">
              Error: {error}
            </p>
          )}

          {/* Result Display */}
          {result && (
            <pre className="bg-gray-200 p-4 rounded text-sm overflow-x-auto mt-4">
              {JSON.stringify(result, null, 2)}
            </pre>
          )}

          {/* Other navigation links */}
          <a
            href="/mfa/verify-2fa"
            className="block text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Verify 2FA
          </a>
          <a
            href="/password/forgot-password"
            className="block text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Forgot password
          </a>
        </div>
      </div>
    </div>
  );
};

export default Authorization;