"use client";

import React from "react";
import Link from "next/link"; // Import Link for navigation

const Authorization = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center text-black">Authorization</h1>
                <p className="text-lg text-gray-600 mb-6">
                    This is the Authorization page. You can manage your authorization settings here.
                </p>
                <div className="space-y-4">
                    <Link href="/mfa/enable-2fa" className="block text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
                        Enable 2FA
                    </Link>
                    <Link href="/mfa/verify-2fa" className="block text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
                        Verify 2FA
                    </Link>
                    <Link href="/password/forgot-password" className="block text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
                        Forgot password
                    </Link>
                    <Link href="/profiles/findall-profiles" className="block text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
                        Find All Users
                    </Link>
                    <Link href="/profiles/find-profile-email" className="block text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
                        Find User By Email
                    </Link>
                    <Link href="/profiles/find-profile-id" className="block text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
                        Find User By Id
                    </Link>
                    <Link href="/profiles/update-profile" className="block text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
                        Update User
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Authorization;

//I dont know if we use this link as the front end for the link sent
{/* <Link href="/password/reset-password" className="block text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
Reset password
</Link> */}