// File: app/password/reset-password/page.js
"use client";

import React, { Suspense } from "react";
import ResetPasswordForm from "../reset-password/ResetPasswordForm";

const ResetPasswordPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResetPasswordForm />
        </Suspense>
    );
};

export default ResetPasswordPage;
