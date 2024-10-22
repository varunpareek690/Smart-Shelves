import React from 'react';
import { Navigate } from 'react-router-dom';

// Protects routes from unauthenticated access
const ProtectedRoute = ({ element }) => {
    const isAuthenticated = localStorage.getItem("auth");

    return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
