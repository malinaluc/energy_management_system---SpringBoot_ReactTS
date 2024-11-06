import { Navigate, Outlet } from "react-router-dom";
import { ACCESS_DENIED_NAVIGATION_PATH } from "../../Library/Constants/constants";
import { ProtectedRouteProps } from "./protectedRoute.types";

const ProtectedRoute = ({ requiredRole }: ProtectedRouteProps) => {
    const userRole = sessionStorage.getItem("userRole");

    return userRole === requiredRole ? <Outlet /> : <Navigate to={ACCESS_DENIED_NAVIGATION_PATH} replace />;
};

export default ProtectedRoute;