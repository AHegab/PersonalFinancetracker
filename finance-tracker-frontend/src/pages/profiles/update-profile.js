import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { updateUser } from "../../../services/profileService";

const UpdateUserPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [user, setUser] = useState(null);
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = await updateUser(id, {
                name: newName,
                email: newEmail,
            });
            setMessage("User updated successfully");
            setUser(updatedUser);
        } catch (err) {
            setError("Failed to update user.");
        }
    };

    return (
        <div>
            <h1>Update User</h1>
            {message && <p>{message}</p>}
            {error && <p>{error}</p>}
            {user ? (
                <form onSubmit={handleUpdate}>
                    <div>
                        <label>Name</label>
                        <input
                            type="text"
                            value={newName || user.name}
                            onChange={(e) => setNewName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            value={newEmail || user.email}
                            onChange={(e) => setNewEmail(e.target.value)}
                        />
                    </div>
                    <button type="submit">Update</button>
                </form>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default UpdateUserPage;
