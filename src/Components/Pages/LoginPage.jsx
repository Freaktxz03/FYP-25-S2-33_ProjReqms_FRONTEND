// src/Components/Pages/LoginPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useSession } from '../../Services/SessionContext';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const { setUser } = useSession();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username || !password) {
      return setErrorMsg('Please enter both username and password.');
    }

    try {
      const res = await axios.post('http://localhost:5000/api/users/login', {
        username,
        password
      }, { withCredentials: true }); // enable cookies for session

      if (res.data.success) {
        setUser(res.data);
        setTimeout(() => {
          navigate('/account');
        }, 10); // Let React finish re-rendering context
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setErrorMsg('Invalid username or password.');
      } else {
        setErrorMsg('Server error. Please try again later.');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      <form onSubmit={handleLogin}>
        <input type="text" className="form-control" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} /><br />
        <input type="password" className="form-control" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /><br />
        <button type="submit" className="btn btn-primary me-2">Login</button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/register')}>Create Account</button>
      </form>
    </div>
  );
}

export default LoginPage;
