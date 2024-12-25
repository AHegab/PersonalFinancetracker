"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { enable2FA } from "../../../src/services/mfaService";

export default function Enable2FA() {
    // Just remove <string | null>
    const [qrCodeUrl, setQrCodeUrl] = useState(null);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleEnable2FA = async () => {
        try {
            const response = await enable2FA();
            setQrCodeUrl(response.qrCodeUrl);
        } catch (err) {
            setError("Failed to enable 2FA. Please try again.");
        }
    };

    const handleProceedToVerify = () => {
        router.push("/mfa/verify-2fa");
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-4">
            <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md border-t-4 border-blue-600">
                <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-4">
                    Enable Two-Factor Authentication
                </h1>

                {error && (
                    <p className="text-red-600 text-center mb-4 font-semibold">
                        {error}
                    </p>
                )}

                {/* Instructions before QR code is generated */}
                {!qrCodeUrl && (
                    <div className="mb-4 text-gray-700">
                        <p className="mb-2">
                            Protect your account by adding a second layer of security.
                        </p>
                        <p>
                            Click <span className="font-bold">"Enable 2FA"</span> to generate
                            a unique QR code. Then scan it with your authenticator app.
                        </p>
                    </div>
                )}

                {/* Enable 2FA button (only shown if QR is not yet generated) */}
                {!qrCodeUrl && (
                    <button
                        onClick={handleEnable2FA}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700 transition"
                    >
                        Enable 2FA
                    </button>
                )}

                {/* Display the QR code once generated */}
                {qrCodeUrl && (
                    <div className="mt-6 text-center">
                        <p className="mb-2 font-medium text-gray-700">
                            Scan this QR code with your authenticator app:
                        </p>
                        <img
                            src={qrCodeUrl}
                            alt="QR Code for 2FA"
                            className="mx-auto border p-2 rounded-md shadow-md"
                        />
                        <p className="text-sm mt-4 text-gray-600">
                            After scanning, click below to verify your code.
                        </p>

                        <button
                            onClick={handleProceedToVerify}
                            className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-green-700 transition"
                        >
                            Proceed to Verify
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
