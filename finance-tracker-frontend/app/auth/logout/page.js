"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "../../../src/services/authService";

const LogoutPage = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Indicates if the logout process is ongoing
    const [message, setMessage] = useState(""); // Stores the success message
    const router = useRouter();

    useEffect(() => {
        const performLogout = async () => {
          try {
            await logout();
            sessionStorage.clear();
            setMessage("You have been logged out successfully.");
          } catch (error) {
            setError(error.message || "Failed to logout.");
          } finally {
            setLoading(false);
            setTimeout(() => {
              router.push("/auth/login"); // Redirect after delay
            }, 1000); // 1-second delay
          }
        };
      
        performLogout();
      }, [router]);      

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
                {loading ? (
                    <>
                        <h1 className="text-3xl font-bold mb-4 text-gray-800">Logging Out</h1>
                        <p className="text-gray-600">Please wait while we log you out...</p>
                    </>
                ) : error ? (
                    <>
                        <h1 className="text-3xl font-bold mb-4 text-gray-800">Logout Failed</h1>
                        <p className="text-red-500">{error}</p>
                        <button
                            onClick={() => router.push("/auth/login")}
                            className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
                        >
                            Go to Login
                        </button>
                    </>
                ) : (
                    <>
                        <h1 className="text-3xl font-bold mb-4 text-gray-800">Logged Out</h1>
                        <p className="text-green-500">{message}</p>
                        <button
                            onClick={() => router.push("/auth/login")}
                            className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
                        >
                            Go to Login
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default LogoutPage;