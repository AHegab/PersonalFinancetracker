import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { findByEmail } from "../../../services/profileService";

const UserByEmailPage = () => {
    const router = useRouter();
    const { email } = router.query;
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        if (email) {
            const fetchUserByEmail = async () => {
                try {
                    const fetchedUser = await findByEmail(email);
                    setUser(fetchedUser);
                } catch (err) {
                    setError("User not found.");
                }
            };
            fetchUserByEmail();
        }
    }, [email]);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>User by Email</h1>
            {user ? (
                <div>
                    <p><strong>ID:</strong> {user.id}</p>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default UserByEmailPage;
