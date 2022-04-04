import React from 'react'
import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = ({children}) => {
    return (localStorage.getItem('token')&&localStorage.getItem('role')==='3') ? <Outlet/> : <Navigate to="/admin/login" />;
}

export default AdminProtectedRoute
