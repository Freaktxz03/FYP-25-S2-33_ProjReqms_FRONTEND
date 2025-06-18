import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import brandlogo from '../../assets/brandlogo.png';

const Navbar = () => {

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/users/session', { withCredentials: true })
      .then(res => setUserInfo(res.data))
      .catch(() => setUserInfo(null));
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={brandlogo} alt="SIM TRAVELS" width="250" height="50" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/flights">Flights</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/hotels">Hotels</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/airport-transfers">Airport Transfers</Link></li>
            <li className="nav-item">
              {userInfo ? (
                <Link className="nav-link" to="/account">{userInfo.username}</Link>
              ) : (
                <Link className="nav-link" to="/login">Login</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
