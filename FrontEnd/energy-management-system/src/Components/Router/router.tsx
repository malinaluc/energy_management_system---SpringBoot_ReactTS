import { createBrowserRouter, RouteObject } from "react-router-dom";
import { ACCESS_DENIED_NAVIGATION_PATH, ADMIN_NAVIGATION_PATH, CLIENT_NAVIGATION_PATH, EDIT_DEVICES_NAVIGATION_PATH } from "../../Library/Constants/constants";
import { AccessDeniedPage } from "../AccessDeniedPage/accessDeniedPage";
import { AdminPage } from "../AdminPage/adminPage";
import { ClientPage } from "../ClientPage/clientPage";
import { EditUsersPage } from "../EditUsersPage/editDevicesPage";
import { LogIn } from "../LogInPage/logIn";
import ProtectedRoute from "../ProtectedRoute/protectedRoute";
import Root from "../Root/root";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <Root />
    },
    {
        path: "/login",
        element: <LogIn />
    },
    {
        path: ADMIN_NAVIGATION_PATH,
        element: <ProtectedRoute requiredRole="admin" />,
        children: [
            { path: ADMIN_NAVIGATION_PATH, element: <AdminPage /> }
        ]
    },
    {
        path: CLIENT_NAVIGATION_PATH,
        element: <ProtectedRoute requiredRole="client" />,
        children: [
            { path: CLIENT_NAVIGATION_PATH, element: <ClientPage /> }
        ]
    },
    {
        path: EDIT_DEVICES_NAVIGATION_PATH,
        element: <ProtectedRoute requiredRole="admin" />,
        children: [
            { path: EDIT_DEVICES_NAVIGATION_PATH, element: <EditUsersPage /> }
        ]
    },
    {
        path: ACCESS_DENIED_NAVIGATION_PATH,
        element: <AccessDeniedPage />
    }

];

export const router = createBrowserRouter(routes);