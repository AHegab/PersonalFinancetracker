import { useState, useEffect } from "react";
import { findByEmail } from "../../services/profileService"; // Adjust the import path if needed

const UserByEmailPage = () => {
    const [email, setEmail] = useState("");
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email) {
            setLoading(true);
            try {
                const fetchedUser = await findByEmail(email);
                setUser(fetchedUser);
                setError("");
            } catch (err) {
                setError("User not found.");
            } finally {
                setLoading(false);
            }
        }
    };

    // Handle loading and error states
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>User by Email</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Enter Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit">Search</button>
                </div>
            </form>
            {error && <div>{error}</div>}
            {user && (
                <div>
                    <p><strong>ID:</strong> {user.id}</p>
                    <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
                    <p><strong>Birth Date:</strong> {user.birthDate}</p>
                </div>
            )}
        </div>
    );
};

export default UserByEmailPage;