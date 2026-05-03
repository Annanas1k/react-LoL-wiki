import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { UserContext } from "../../context/createContext";

export const ProtectedRoute = () => {
    const { user, loading } = useContext(UserContext);

    if (loading) return <div className="vh-100 bg-black text-white d-flex align-items-center justify-content-center">LOADING...</div>;

    return user ? <Outlet /> : <Navigate to="/auth/login" replace />;
};