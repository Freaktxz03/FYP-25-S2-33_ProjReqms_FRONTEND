//For use to prevent access to /account page if no user is not logged in
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../../Services/Auth';

//Component to protect routes that require authentication
const PrivateRoute = ({ children }) => {
    // Check if the user is logged in, if not, redirect to login page
  return isLoggedIn() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;