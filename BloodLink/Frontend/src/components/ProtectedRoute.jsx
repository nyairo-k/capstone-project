import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {

    const user = JSON.parse(
        localStorage.getItem("currentUser")
    );

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (user.role !== role) {
        return <Navigate to="/" />;
    }

    return children;
}