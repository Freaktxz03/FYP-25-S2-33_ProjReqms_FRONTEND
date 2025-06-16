//Account Page Component

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, logoutUser } from '../../Services/Auth'


const AccountPage = () => {

  const navigate = useNavigate()
  const currentUser = getCurrentUser()

  //Function to handle user logout
  const handleLogout = () => {
    logoutUser();     // Call the logoutUser function to clear user data from localStorage
    alert("You have been logged out successfully."); // Alert user on successful logout
    navigate('/login');     // Navigate to the login page after logout
  }
  return (
    <div className="text-center mt-5">
      <h1>Welcome, {currentUser?.username}</h1>
      <h1>This is your account page.</h1>
      <h2>Your User ID: {currentUser?.id}</h2>
      <button type="button" className="btn btn-danger" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AccountPage
