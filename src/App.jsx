import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

//Navbar and Footer components
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Navbar/Footer'

//Web Pages
import HomePage from './Components/Pages/HomePage'
import FlightsPage from './Components/Pages/FlightsPage'
import HotelsPage from './Components/Pages/HotelsPage'
import AirportTransfersPage from './Components/Pages/AirportTransfersPage'
import LoginPage from './Components/Pages/LoginPage'
import AccountPage from './Components/Pages/AccountPage'
import CreateAccountPage from './Components/Pages/CreateAccountPage'
import PrivateRoute from './Components/Pages/PrivateRoute'

//import images
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'


function App() {

  //Testing for clearing localStorage.clear(); for account data related prototyping
  useEffect(() => {
    const clearLocalStorageOnClose = () => {
      localStorage.clear();
      console.log("Local storage cleared.");
    };

    window.addEventListener('beforeunload', clearLocalStorageOnClose);
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('beforeunload', clearLocalStorageOnClose);
    };
  }, []);

  return (
    // Main App Component
    // Using BrowserRouter to handle routing 
    <Router>
      <Navbar/>
      <div className="container mt-5 pt-5">
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/flights" element={<FlightsPage/>}/>
          <Route path="/hotels" element={<HotelsPage/>}/>
          <Route path="/airport-transfers" element={<AirportTransfersPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/create-account" element={<CreateAccountPage/>}/>
          {/* PrivateRoute is used to protect the account page in the event there is no user logged in */}
          <Route path="/account" element={<PrivateRoute><AccountPage/></PrivateRoute>}/>
          {/* Add more routes as needed */}
        </Routes>
      </div>
      <Footer/>
    </Router>
  );
};

export default App;
