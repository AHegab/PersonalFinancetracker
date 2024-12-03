"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get("auth_token"); // Get token from cookies
        if (!token) {
            router.push("/auth/login"); // Redirect to login if not authenticated
        }
    }, [router]);

    return <>{children}</>;
};

export default ProtectedRoute;
