// FlightsPage.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { Tab, Tabs } from 'react-bootstrap';

// Hardcoded flight data for prototyping
const flightData = [
  { id: 1, from: 'Singapore', to: 'Kuala Lumpur', date: '2025-06-15', time: '10:00', duration: '1h 0m' },
  { id: 2, from: 'Singapore', to: 'Kuala Lumpur', date: '2025-06-15', time: '11:00', duration: '1h 0m' },
  { id: 3, from: 'Singapore', to: 'Kuala Lumpur', date: '2025-06-16', time: '10:00', duration: '1h 0m' },
  { id: 4, from: 'Singapore', to: 'Kuala Lumpur', date: '2025-06-17', time: '10:00', duration: '1h 0m' },

  { id: 5, from: 'Singapore', to: 'Bangkok', date: '2025-06-15', time: '10:30', duration: '2h 30m' },
  { id: 6, from: 'Singapore', to: 'Bangkok', date: '2025-06-15', time: '11:00', duration: '2h 30m' },
  { id: 7, from: 'Singapore', to: 'Bangkok', date: '2025-06-15', time: '11:30', duration: '2h 30m' },
  { id: 8, from: 'Singapore', to: 'Bangkok', date: '2025-06-15', time: '12:00', duration: '2h 30m' },

  { id: 9, from: 'Kuala Lumpur', to: 'Singapore', date: '2025-06-16', time: '10:30', duration: '1h 0m' },
  { id: 10, from: 'Kuala Lumpur', to: 'Singapore', date: '2025-06-17', time: '11:00', duration: '1h 0m' },
  { id: 11, from: 'Kuala Lumpur', to: 'Singapore', date: '2025-06-18', time: '11:30', duration: '1h 0m' },
  { id: 12, from: 'Kuala Lumpur', to: 'Singapore', date: '2025-06-18', time: '12:00', duration: '1h 0m' },

  { id: 13, from: 'Kuala Lumpur', to: 'Bangkok', date: '2025-06-15', time: '10:00', duration: '2h 15m' },
  { id: 14, from: 'Kuala Lumpur', to: 'Bangkok', date: '2025-06-16', time: '10:00', duration: '1h 0m' },
  { id: 15, from: 'Kuala Lumpur', to: 'Bangkok', date: '2025-06-16', time: '10:30', duration: '1h 0m' },
  { id: 16, from: 'Kuala Lumpur', to: 'Bangkok', date: '2025-06-16', time: '11:00', duration: '1h 0m' },

  { id: 17, from: 'Bangkok', to: 'Singapore', date: '2025-06-15', time: '10:00', duration: '2h 30m' },
  { id: 18, from: 'Bangkok', to: 'Singapore', date: '2025-06-15', time: '10:30', duration: '2h 30m' },
  { id: 19, from: 'Bangkok', to: 'Singapore', date: '2025-06-16', time: '10:00', duration: '2h 30m' },
  { id: 20, from: 'Bangkok', to: 'Singapore', date: '2025-06-16', time: '10:30', duration: '2h 30m' },

  { id: 21, from: 'Bangkok', to: 'Kuala Lumpur', date: '2025-06-15', time: '10:00', duration: '2h 15m' },
  { id: 22, from: 'Bangkok', to: 'Kuala Lumpur', date: '2025-06-15', time: '10:30', duration: '2h 15m' },
  { id: 23, from: 'Bangkok', to: 'Kuala Lumpur', date: '2025-06-17', time: '10:00', duration: '2h 15m' },
  { id: 24, from: 'Bangkok', to: 'Kuala Lumpur', date: '2025-06-17', time: '10:30', duration: '2h 15m' }
];

const airports = ['Singapore', 'Kuala Lumpur', 'Bangkok'];

const FlightsTable = ({ flights, type, onBook }) => {
  if (flights.length === 0) {
    return <p>No {type} flights found.</p>;
  }

  return (
    <table className="table table-bordered text-center">
      <thead>
        <tr>
          <th>{type === 'departure' ? 'Date' : 'Returning Date'}</th>
          <th>Time</th>
          <th>Duration</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {flights.map((flight, idx) => (
          <tr key={idx}>
            <td>{flight.date}</td>
            <td>{flight.time}</td>
            <td>{flight.duration}</td>
            <td>
              <button className="btn btn-success btn-sm" onClick={() => onBook(flight)}>
                Book
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const FlightsPage = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [searchResults, setSearchResults] = useState({ depart: [], return: [] });
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState('departure');

  const handleSearch = () => {
    if (!from || !to) {
      alert('Please select both From and To airports.');
      return;
    }

    const departFlights = flightData.filter(flight =>
      flight.from === from && flight.to === to && (departDate ? flight.date === departDate : true)
    );
    const returnFlights = flightData.filter(flight =>
      flight.from === to && flight.to === from && (returnDate ? flight.date === returnDate : true)
    );

    setSearchResults({ depart: departFlights, return: returnFlights });

    if (departDate && !returnDate) {
      setActiveTab('departure');
    } else if (!departDate && returnDate) {
      setActiveTab('return');
    } else {
      setActiveTab('departure');
    }

    setShowResults(true);
  };

  const handleClear = () => {
    setFrom('');
    setTo('');
    setDepartDate('');
    setReturnDate('');
    setSearchResults({ depart: [], return: [] });
    setShowResults(false);
  };

  const handleBooking = (flight) => {
    axios.post('http://localhost:5000/api/bookings/', flight, { withCredentials: true })
      .then(res => alert(res.data.message || 'Booking successful!'))
      .catch(err => {
        if (err.response?.status === 401) {
          alert('Please log in first.');
        } else {
          alert('Booking failed.');
        }
      });
  };

  const renderTabs = () => {
    const showDepartTab = departDate || (!departDate && !returnDate);
    const showReturnTab = returnDate || (!departDate && !returnDate);

    return (
      <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
        {showDepartTab && (
          <Tab eventKey="departure" title="Departure Flights">
            <FlightsTable flights={searchResults.depart} type="departure" onBook={handleBooking} />
          </Tab>
        )}
        {showReturnTab && (
          <Tab eventKey="return" title="Return Flights">
            <FlightsTable flights={searchResults.return} type="return" onBook={handleBooking} />
          </Tab>
        )}
      </Tabs>
    );
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Flight Schedule Search</h1>

      <div className="card p-4 mb-4 shadow">
        <div className="row mb-3">
          <div className="col-md-3">
            <label>From (Mandatory)</label>
            <select className="form-control" value={from} onChange={(e) => setFrom(e.target.value)}>
              <option value="">Select From</option>
              {airports.map(airport => (<option key={airport} value={airport}>{airport}</option>))}
            </select>
          </div>

          <div className="col-md-3">
            <label>To (Mandatory)</label>
            <select className="form-control" value={to} onChange={(e) => setTo(e.target.value)}>
              <option value="">Select To</option>
              {airports.map(airport => (<option key={airport} value={airport}>{airport}</option>))}
            </select>
          </div>

          <div className="col-md-3">
            <label>Departing Date (Optional)</label>
            <input type="date" className="form-control" value={departDate} onChange={(e) => setDepartDate(e.target.value)} />
          </div>

          <div className="col-md-3">
            <label>Returning Date (Optional)</label>
            <input type="date" className="form-control" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
          </div>
        </div>

        <div className="text-center">
          <button className="btn btn-primary mx-2" onClick={handleSearch}>Search</button>
          <button className="btn btn-secondary mx-2" onClick={handleClear}>Clear</button>
        </div>
      </div>

      {showResults && (
        <div className="mt-4">
          {renderTabs()}
        </div>
      )}
    </div>
  );
};

export default FlightsPage;
