// components/common/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, ...rest }) => {
    const isAuthenticated = !!localStorage.getItem('token');

    // If authenticated, render the passed Component; otherwise, redirect to login
    return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
//in new version ,we have to return as a element 