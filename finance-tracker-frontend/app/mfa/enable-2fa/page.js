// File: app/mfa/enable-2fa/page.js
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { enable2FA } from "../../../src/services/mfaService";

const Enable2FA = () => {
    const [qrCodeUrl, setQrCodeUrl] = useState(null);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleEnable2FA = async () => {
        try {
            const response = await enable2FA();
            setQrCodeUrl(response.qrCodeUrl);
        } catch {
            setError("Failed to enable 2FA. Please try again.");
        }
    };

    const handleNavigateToProfile = () => {
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
                        Click <span className="font-bold">&quot;Enable 2FA&quot;</span> to generate

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
                        <Image
                            src={qrCodeUrl}
                            alt="QR Code for 2FA"
                            width={300}
                            height={300}
                            className="mx-auto border p-2 rounded-md shadow-md"
                        />
                        <p className="text-sm mt-4 text-gray-600">
                            After scanning, proceed to verification.
                        </p>
                        <button
                            onClick={handleNavigateToProfile}
                            className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-green-700 transition"
                        >
                            Verify
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Enable2FA;
