import React from 'react'
import useAuth from '../../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const UserAuth = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (user) return children;
    if (loading) return <div>loading...</div>
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
}

export default UserAuth