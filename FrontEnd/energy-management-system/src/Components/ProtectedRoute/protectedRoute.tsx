import { Navigate, Outlet } from "react-router-dom";
import { useUserRole } from "../../Library/Services/Hooks/useUserRole";
import { ProtectedRouteProps } from "./protectedRoute.types";
import { ACCESS_DENIED_NAVIGATION_PATH } from "../../Library/Constants/constants";

const ProtectedRoute = ({ requiredRole }: ProtectedRouteProps) => {
    const userRole = sessionStorage.getItem("userRole");
    console.log("User role:", userRole, "Required role:", requiredRole);
    return userRole === requiredRole ? <Outlet /> : <Navigate to={ACCESS_DENIED_NAVIGATION_PATH} replace />;
};

export default ProtectedRoute;