import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { findById } from "../../services/profileService";

const UserByIdPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        if (id) {
            const fetchUser = async () => {
                try {
                    const fetchedUser = await findById(id);
                    setUser(fetchedUser);
                } catch (err) {
                    setError("User not found.");
                }
            };
            fetchUser();
        }
    }, [id]);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>User Details</h1>
            {user ? (
                <div>
                    <p><strong>ID:</strong> {user.id}</p>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    {/* Add other user fields as necessary */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default UserByIdPage;
