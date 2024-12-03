import ProtectedRoute from "../../src/components/ProtectedRoute";

const TestProtected = () => {
    return (
        <ProtectedRoute>
            <h1>Protected Content</h1>
            <p>You can only see this content if authenticated.</p>
        </ProtectedRoute>
    );
};

export default TestProtected;
