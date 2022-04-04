import React from 'react'
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    return (localStorage.getItem('token')&&localStorage.getItem('role')!=='3') ? <Outlet/> : <Navigate to="/login" />;
};

export default ProtectedRoute
