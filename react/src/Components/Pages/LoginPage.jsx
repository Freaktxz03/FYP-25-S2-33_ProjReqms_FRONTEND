//Login page component for user authentication 

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../Services/Auth'


const LoginPage = () => {

  //State hooks to store username and password input values
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  //Function to handle login
  const handleLogin = () => {
    // Simulate a login action
    // In a real application, validate the credentials against a backend service
    
    try {
      loginUser(username, password);  // Call the loginUser function to validate credentials
      alert("Login sucessfully!");    // Alert user on successful login
      navigate('/account');           // Navigate to the account page after successful login
    } catch (error) {                 // Catch any errors thrown by the loginUser function
      alert(error.message);           // Alert user with the error message
    }
  };

  return (
    <div className="container text-center mt-5">
      <h2>Login</h2>
      <div className="mb-3">
        <input 
          type="text" placeholder="Username" className="form-control"
          value={username} onChange={(e) => setUsername(e.target.value)} 
        />
      </div>

      <div className="mb-3">
        <input 
          type="password" placeholder="Password" className="form-control"
          value={password} onChange={(e) => setPassword(e.target.value)} 
        />
      </div>
      <button className="btn btn-primary me-2" onClick={handleLogin}>Login</button>
      <button className="btn btn-secondary" onClick={() => navigate('/create-account')}>Create Account</button>
    </div>
  );
};

export default LoginPage;
