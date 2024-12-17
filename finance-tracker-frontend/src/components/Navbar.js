"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const Navbar = () => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const authToken = Cookies.get("auth_token");
        setIsLoggedIn(!!authToken);
    }, []);

    const handleLogout = () => {
        Cookies.remove("auth_token");
        router.push("/auth/login");
    };

    if (!isClient) {
        return null; // Prevent SSR issues
    }

    return (
        <nav className="bg-black shadow-md">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="text-3xl font-bold text-white hover:text-gray-300 transition duration-300">
                        <Link href="/">Finance Tracker</Link>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        {isLoggedIn ? (
                            <>
                                <Link
                                    href="/transactions"
                                    className="text-gray-300 hover:text-blue-400 transition duration-300"
                                >
                                    Transactions
                                </Link>
                                <Link
                                    href="/analysis"
                                    className="text-gray-300 hover:text-blue-400 transition duration-300"
                                >
                                    Analysis
                                </Link>
                                <Link
                                    href="/profile"
                                    className="text-gray-300 hover:text-blue-400 transition duration-300"
                                >
                                    Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded-full transition duration-300"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                href="/auth/login"
                                className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-full transition duration-300"
                            >
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-white focus:outline-none"
                        >
                            <svg
                                className="w-8 h-8"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-gray-800">
                    <div className="px-4 py-4 space-y-3">
                        {isLoggedIn ? (
                            <>
                                <Link
                                    href="/transactions"
                                    className="block text-gray-300 hover:text-blue-400 transition duration-300"
                                >
                                    Transactions
                                </Link>
                                <Link
                                    href="/analysis"
                                    className="block text-gray-300 hover:text-blue-400 transition duration-300"
                                >
                                    Analysis
                                </Link>
                                <Link
                                    href="/profile"
                                    className="block text-gray-300 hover:text-blue-400 transition duration-300"
                                >
                                    Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-center text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded-full transition duration-300"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                href="/auth/login"
                                className="block w-full text-center text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-full transition duration-300"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
