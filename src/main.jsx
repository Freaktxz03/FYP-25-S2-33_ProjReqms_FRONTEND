import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'


import 'bootstrap/dist/css/bootstrap.min.css' // Import for use of Bootstrap CSS 
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import for use of Bootstrap JS

import { BrowserRouter } from 'react-router-dom';


createRoot(document.getElementById('root')).render(
  /*StrictMode, development tool to help highlight potential problems*/
  <React.StrictMode>
      {/*BrowserRouter to handle routing within the website.*/}
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </React.StrictMode>
);
