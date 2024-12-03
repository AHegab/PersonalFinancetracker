"use client";

import React, { useState } from "react";
import { enable2FA } from "../../services/mfaService";

export default function Enable2FA() {
    const [qrCodeUrl, setQrCodeUrl] = useState(null);
    const [error, setError] = useState("");

    const handleEnable2FA = async () => {
        try {
            const response = await enable2FA(); // Call API for enabling 2FA
            setQrCodeUrl(response.qrCodeUrl); // Set the QR code URL for display
        } catch (err) {
            setError("Failed to enable 2FA. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Enable 2FA</h1>
                {error && <p className="text-red-500">{error}</p>}
                <button
                    onClick={handleEnable2FA}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    Enable 2FA
                </button>
                {qrCodeUrl && (
                    <div className="mt-4 text-center">
                        <p>Scan this QR code with your authenticator app:</p>
                        <img src={qrCodeUrl} alt="QR Code for 2FA" className="mx-auto" />
                    </div>
                )}
            </div>
        </div>
    );
}
