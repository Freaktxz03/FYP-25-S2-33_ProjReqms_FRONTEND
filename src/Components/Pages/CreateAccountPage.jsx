//Create Account Page Component
import React, { use } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { registerUser } from '../../Services/Auth';

const CreateAccountPage = () => {

    //State hooks to store username and password input values
    const [username , setUsername] = React.useState('');
    const [password , setPassword] = React.useState('');
    const navigate = useNavigate();

    //Function to handle account creation
    const handleRegister = () => {

        try {
            //Add new user to localStorage
            registerUser(username, password);            // Call the registerUser function to add new user
            alert("Account created successfully!");       // Alert user on successful account creation
            console.log("Account created", "Username: ", username, "Password: ",password);     //Debugging purpose
            navigate('/login');     // Navigate to the login page after successful account creation
        } catch (error) {           // Catch any errors thrown by the registerUser function
            alert(error.message);   // Alert user with the error message
        }
    };

  return (
    <div>
      <div className="container text-center mt-5">
        <h2>Create Account</h2>
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
        <button className="btn btn-success" onClick={handleRegister}>Create Account</button>
        <p className="mt-3">Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  );
};

export default CreateAccountPage
