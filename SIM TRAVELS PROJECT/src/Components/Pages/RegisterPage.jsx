//Component for Register page
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const { username, password } = formData;

    // Form validations
    if (!username || !password) {
      setError('Please fill in both username and password.');
      return;
    }

    try {
      // Send registration request
      const res = await axios.post('http://localhost:5000/api/users/register', { username, password });

      if (res.status === 201) {
        setSuccess('User registered successfully. Redirecting...');
        setTimeout(() => {
          navigate('/login');  //redirect to login page after 1.5s
        }, 1500);
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError('Username already exists.');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register new User</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Username:</label><br />
          <input type="text" className="form-control" name="username" value={formData.username} onChange={handleChange} autoComplete="username"/>
        </div>
        <div className="mb-3">
          <label>Password:</label><br />
          <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} autoComplete="new-password"/>
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
        <p className="mt-3">Already have an account? <Link to="/login">Login here</Link></p>
      </form>
    </div>
  );
};

export default RegisterPage;
