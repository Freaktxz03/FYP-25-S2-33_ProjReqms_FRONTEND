import React from 'react'
import { Link } from 'react-router-dom';

import brandlogo from '../../assets/brandlogo.png'; 
//import './Navbar.css'; //CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={brandlogo} alt="SIM TRAVELS" width="250" height="50" className="d-inline-block align-top" />
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className='nav-link' to='/flights'>Flights</Link>
            </li>
            <li className="nav-item">
              <Link className='nav-link' to='/hotels'>Hotels</Link>
            </li>
            <li className="nav-item">
              <Link className='nav-link' to='/airport-transfers'>Airport Transfers</Link>
            </li>
            <li className="nav-item">
              <Link className='nav-link' to='/login'>Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
