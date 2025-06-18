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
import RegisterPage from './Components/Pages/RegisterPage'
import LoginPage from './Components/Pages/LoginPage'
import AccountPage from './Components/Pages/AccountPage'



function App() {

  return (
    // Main App Component
    // Using BrowserRouter to handle routing 
    <>
    <Router>
      <Navbar/>
      <div className="container mt-5 pt-5">
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/flights" element={<FlightsPage/>}/>
          <Route path="/hotels" element={<HotelsPage/>}/>
          <Route path="/airport-transfers" element={<AirportTransfersPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/account" element={<AccountPage/>}/>
        </Routes>
      </div>
      <Footer/>
    </Router>
    </>
  );
};

export default App;
