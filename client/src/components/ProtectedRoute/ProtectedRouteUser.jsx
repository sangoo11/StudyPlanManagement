import React from 'react';
import { Navigate, Outlet } from 'react-router';

function ProtectedRouteUser(props) {
    const isLoggedIn = localStorage.getItem('loggedIn');
    const userType = localStorage.getItem('userType');

    return isLoggedIn ? <Outlet /> : <Navigate to='signin' />
}

export default ProtectedRouteUser;