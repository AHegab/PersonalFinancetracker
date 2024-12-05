import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL; // Ensure this is set in your .env file

export const emailService = {
    async sendPasswordResetEmail(email) {
        try {
            const response = await axios.post(`${API_URL}/auth/forget-password`, { email });
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'An error occurred while sending the password reset email.';
        }
    },
};