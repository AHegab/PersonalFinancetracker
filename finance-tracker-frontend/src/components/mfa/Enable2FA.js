"use client";

import React, { useState } from "react";
import { enable2FA } from "../../services/mfaService";



const Enable2FA = () => {
    const [qrCodeUrl, setQrCodeUrl] = useState(null);
    const [secret, setSecret] = useState(null);
    const [error, setError] = useState(null);

    const handleEnable2FA = async () => {
        try {
            const token = localStorage.getItem("auth_token"); // Retrieve auth token
            const data = await enable2FA(token);
            setQrCodeUrl(data.qrCodeUrl);
            setSecret(data.secret);
        } catch (err) {
            setError("Failed to enable 2FA. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold">Enable Two-Factor Authentication</h1>
            <button
                onClick={handleEnable2FA}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
                Enable 2FA
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {qrCodeUrl && (
                <div className="mt-4">
                    <h2 className="text-lg">Scan this QR Code:</h2>
                    <img src={qrCodeUrl} alt="QR Code" />
                    <p className="mt-2">Secret Key: {secret}</p>
                </div>
            )}
        </div>
    );
};

export default Enable2FA;
