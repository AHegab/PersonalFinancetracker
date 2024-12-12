"use client";

import Link from "next/link";
import { useRouter } from "next/navigation"; // For programmatic navigation
import Cookies from "js-cookie";
import React from "react";

const Navbar = () => {
    const router = useRouter();

    const handleLogout = () => {
        Cookies.remove("auth_token"); // Clear the authentication token
        router.push("/auth/login"); // Redirect to login page
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="text-2xl font-bold text-gray-800">
                        <Link href="/">Finance Tracker</Link>&nbsp;
                    </div>
                    <div className="hidden md:flex space-x-4">
                        <Link href="/auth/login" className="text-gray-600 hover:text-blue-600 transition duration-200">
                            Login
                        </Link>
                        <Link href="/auth/register" className="text-gray-600 hover:text-blue-600 transition duration-200">
                            Register
                        </Link>
                        <Link href="/auth/transactions" className="text-gray-600 hover:text-blue-600 transition duration-200">
                            Transactions
                        </Link>
                        <Link href="/auth/analysis" className="text-gray-600 hover:text-blue-600 transition duration-200">
                            Analysis
                        </Link>
                        <Link href="/auth/authorization" className="text-gray-600 hover:text-blue-600 transition duration-200">
                            Authorization
                        </Link>
                        <button onClick={handleLogout} className="text-gray-600 hover:text-red-600 transition duration-200">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;