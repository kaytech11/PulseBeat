import { Navigate } from "react-router-dom";

interface props {
  children: React.ReactNode;
}

const ProtectedRoutes = ({ children }: props) => {

    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }
 // prevent users from navigating back to a protected page after logging out.
    return <>{children}</>;
};



export default ProtectedRoutes;