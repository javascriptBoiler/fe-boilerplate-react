import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRoles }:{ allowedRoles: string[] }) => {
    const userData:any = JSON.parse(localStorage.getItem("UserAttributes"));
    const location = useLocation();

    return (
        userData?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : userData?.accessToken
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;