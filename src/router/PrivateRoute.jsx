import React from 'react'
import useAuth from '../hooks/useAuth'
import { Navigate, useLocation } from 'react-router-dom'
import Loading from '../components/loading/Loading';

const PrivateRoute = ({ children }) => {

    const location = useLocation();
    console.log(location)


    const { user, loading } = useAuth()
    if (loading) return <Loading />
    if (user) return  children 
    return <Navigate to={"/login"} state={location.pathname} />
}

export default PrivateRoute