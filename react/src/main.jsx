import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css' // Import for use of Bootstrap CSS 
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import for use of Bootstrap JS
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
