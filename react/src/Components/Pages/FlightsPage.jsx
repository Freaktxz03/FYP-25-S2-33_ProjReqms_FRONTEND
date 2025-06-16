//Flights Page Component
import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';

//Hardcoded flight data for prototyping
const flightData = [
  { id: 1, from: 'Singapore', to: 'Kuala Lumpur', date: '2025-06-15', time: '10:00', duration: '1h 0m' },
  { id: 2, from: 'Singapore', to: 'Kuala Lumpur', date: '2025-06-15', time: '11:00', duration: '1h 0m' },
  { id: 3, from: 'Singapore', to: 'Kuala Lumpur', date: '2025-06-16', time: '10:00', duration: '1h 0m' },
  { id: 4, from: 'Singapore', to: 'Kuala Lumpur', date: '2025-06-17', time: '10:00', duration: '1h 0m' },

  { id: 5, from: 'Singapore', to: 'Bangkok', date: '2025-06-15', time: '10:30', duration: '2h 30m' },
  { id: 6, from: 'Singapore', to: 'Bangkok', date: '2025-06-15', time: '11:00', duration: '2h 30m' },
  { id: 7, from: 'Singapore', to: 'Bangkok', date: '2025-06-15', time: '11:30', duration: '2h 30m' },
  { id: 8, from: 'Singapore', to: 'Bangkok', date: '2025-06-15', time: '12:00', duration: '2h 30m' },

  { id: 3, from: 'Kuala Lumpur', to: 'Singapore', date: '2025-06-16', time: '10:30', duration: '1h 0m' },
  { id: 3, from: 'Kuala Lumpur', to: 'Singapore', date: '2025-06-17', time: '11:00', duration: '1h 0m' },
  { id: 3, from: 'Kuala Lumpur', to: 'Singapore', date: '2025-06-18', time: '11:30', duration: '1h 0m' },
  { id: 3, from: 'Kuala Lumpur', to: 'Singapore', date: '2025-06-18', time: '12:00', duration: '1h 0m' },

  { id: 4, from: 'Kuala Lumpur', to: 'Bangkok', date: '2025-06-15', time: '10:00', duration: '2h 15m' },
  { id: 3, from: 'Kuala Lumpur', to: 'Bangkok', date: '2025-06-16', time: '10:00', duration: '1h 0m' },
  { id: 3, from: 'Kuala Lumpur', to: 'Bangkok', date: '2025-06-16', time: '10:30', duration: '1h 0m' },
  { id: 3, from: 'Kuala Lumpur', to: 'Bangkok', date: '2025-06-16', time: '11:00', duration: '1h 0m' },

  { id: 5, from: 'Bangkok', to: 'Singapore', date: '2025-06-15', time: '10:00', duration: '2h 30m' },
  { id: 5, from: 'Bangkok', to: 'Singapore', date: '2025-06-15', time: '10:30', duration: '2h 30m' },
  { id: 5, from: 'Bangkok', to: 'Singapore', date: '2025-06-16', time: '10:00', duration: '2h 30m' },
  { id: 5, from: 'Bangkok', to: 'Singapore', date: '2025-06-16', time: '10:30', duration: '2h 30m' },

  { id: 6, from: 'Bangkok', to: 'Kuala Lumpur', date: '2025-06-15', time: '10:00', duration: '2h 15m' },
  { id: 6, from: 'Bangkok', to: 'Kuala Lumpur', date: '2025-06-15', time: '10:30', duration: '2h 15m' },
  { id: 6, from: 'Bangkok', to: 'Kuala Lumpur', date: '2025-06-17', time: '10:00', duration: '2h 15m' },
  { id: 6, from: 'Bangkok', to: 'Kuala Lumpur', date: '2025-06-17', time: '10:30', duration: '2h 15m' }
];

//Const dropdown airport options
const airports = ['Singapore', 'Kuala Lumpur', 'Bangkok'];

//Reusable Table Component for displaying flights
const FlightsTable = ({ flights, type }) => {
  if (flights.length === 0) {
    return <p>No {type} flights found.</p>;
  }

  //Function to display flight data
  return (
    <table className="table table-bordered text-center">
      <thead>
        <tr>
          {/*Table heading and flight data*/}
          <th>{type === 'departure' ? 'Date' : 'Returning Date'}</th>
          <th>Time</th>
          <th>Duration</th>
        </tr>
      </thead>
      <tbody>
        {/*Flight data*/}
        {flights.map((flight, idx) => (
          <tr key={idx}>
            <td>{flight.date}</td>
            <td>{flight.time}</td>
            <td>{flight.duration}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

//Main component for page
const FlightsPage = () => {
  //Form input states
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  // Search results & UI state
  const [searchResults, setSearchResults] = useState({ depart: [], return: [] });
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState('departure');

  //Form validation 
  const handleSearch = () => {
    if (!from || !to) {
      alert('Please select both From and To airports.');
      return;
    }

    //Filter flights dynamically based on provided dates 
    /*How it works: 
      checks "flight.from === from" (this matches user's selected departure airport) 
      "flight.to === to" (this matches user's selected arrival airport)
      IF departDate is provided, checks flight.date === departDate otherwise all dates for the flight are included vice versa for return

      *In return = just reverse the logic
    */
    const departFlights = flightData.filter(flight => flight.from === from && flight.to === to && (departDate ? flight.date === departDate : true));
    const returnFlights = flightData.filter(flight => flight.from === to && flight.to === from && (returnDate ? flight.date === returnDate : true));

    setSearchResults({ depart: departFlights, return: returnFlights });

    //Dynamically determine which tab to display first based on search criteria
    if (departDate && !returnDate) {
      setActiveTab('departure');
    } else if (!departDate && returnDate) {
      setActiveTab('return');
    } else {
      setActiveTab('departure');
    }

    setShowResults(true);
  };

  //Clear fields button
  const handleClear = () => {
    setFrom('');
    setTo('');
    setDepartDate('');
    setReturnDate('');
    setSearchResults({ depart: [], return: [] });
    setShowResults(false);
  };

  //Dynamically render tabs depending on search inputs
  //So that it shows which tab is active depending on user input (if input departure date == show departure tab vice versa)
  const renderTabs = () => {
    const showDepartTab = departDate || (!departDate && !returnDate);
    const showReturnTab = returnDate || (!departDate && !returnDate);

    return (
      <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">

        {showDepartTab && (
          <Tab eventKey="departure" title="Departure Flights">
            <FlightsTable flights={searchResults.depart} type="departure" />
          </Tab>
        )}

        {showReturnTab && (
          <Tab eventKey="return" title="Return Flights">
            <FlightsTable flights={searchResults.return} type="return" />
          </Tab>
        )}

      </Tabs>
    );
  };

  //Component
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Flight Schedule Search</h1>

      {/*Search Form*/}
      <div className="card p-4 mb-4 shadow">
        <div className="row mb-3">
          {/*From Airport*/}
          <div className="col-md-3">
            <label>From (Mandatory)</label>
            {/*Gets the airport value from the const*/}
            <select className="form-control" value={from} onChange={(e) => setFrom(e.target.value)}>
              <option value="">Select From</option>
              {airports.map(airport => (<option key={airport} value={airport}>{airport}</option>))}
            </select>
          </div>

          {/*To Airport*/}
          <div className="col-md-3">
            <label>To (Mandatory)</label>
            {/*Gets the airport value from the const*/}
            <select className="form-control" value={to} onChange={(e) => setTo(e.target.value)}>
              <option value="">Select To</option>
              {airports.map(airport => (<option key={airport} value={airport}>{airport}</option>))}
            </select>
          </div>

          {/*Departing Date Selection*/}
          <div className="col-md-3">
            <label>Departing Date (Optional)</label>
            <input type="date" className="form-control" value={departDate} onChange={(e) => setDepartDate(e.target.value)} />
          </div>

          {/*Returning Date Selection*/}
          <div className="col-md-3">
            <label>Returning Date (Optional)</label>
            <input type="date" className="form-control" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
          </div>
        </div>

        {/*Buttons*/}
        <div className="text-center">
          <button className="btn btn-primary mx-2" onClick={handleSearch}>Search</button>
          <button className="btn btn-secondary mx-2" onClick={handleClear}>Clear</button>
        </div>

      </div>

      {/*Displays the search result and dynamically renders the tab*/}
      {showResults && (
        <div className="mt-4">
          {renderTabs()}
        </div>
      )}
    </div>
  );
};

export default FlightsPage;
