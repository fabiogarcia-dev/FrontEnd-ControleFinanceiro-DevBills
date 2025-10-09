import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router";

const PrivateRoutes = () => {
    const { authState } =  useAuth();

    if(!authState.user){
        return <Navigate to="/login" replace/>
    }
    return <Outlet />
};

export default PrivateRoutes;