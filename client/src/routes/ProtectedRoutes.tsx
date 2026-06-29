import { Navigate } from "react-router-dom";

interface props {
  children: React.ReactNode;
}

const ProtectedRoutes = ({ children }: props) => {

    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};



export default ProtectedRoutes;