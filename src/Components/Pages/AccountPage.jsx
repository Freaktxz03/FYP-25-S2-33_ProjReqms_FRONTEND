// src/Components/Pages/AccountPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AccountPage() {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/users/session', { withCredentials: true })
      .then(res => setUserInfo(res.data))
      .catch(() => navigate('/login'));
  }, []);

  const handleLogout = async () => {
    await axios.post('http://localhost:5000/api/users/logout', {}, { withCredentials: true });
    alert('You have been logged out successfully');
    navigate('/login');
  };

  return (
    <div>
      <h2>Account Page</h2>
      {userInfo ? (
        <>
          <p>Welcome {userInfo.username}</p>
          <p>Your session ID is: {userInfo.sessionID}</p>
          <p>Your User ID is: {userInfo.id}</p>
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default AccountPage;
