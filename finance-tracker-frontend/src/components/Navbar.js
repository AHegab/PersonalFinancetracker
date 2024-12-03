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
        <nav style={{ padding: "1rem", backgroundColor: "#f8f9fa" }}>
            <ul style={{ display: "flex", gap: "1rem", listStyle: "none" ,color:"black"}}>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                <Link href="/auth/login">Login</Link>

                </li>
            <li> <Link href="/mfa/enable-2fa">Enable 2FA</Link> </li>
                    
                    <li><Link href="/mfa/verify-2fa">Verify 2FA</Link> </li>

                    


                <li>
                    <Link href="/auth/register">Register</Link>
                </li>
                <li>
                    <Link href="/transactions">Transactions</Link>
                </li>
                <li>
                    <Link href="/analysis">Analysis</Link>
                </li>
                <li>
                    <button onClick={handleLogout} style={{ cursor: "pointer" }}>
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
