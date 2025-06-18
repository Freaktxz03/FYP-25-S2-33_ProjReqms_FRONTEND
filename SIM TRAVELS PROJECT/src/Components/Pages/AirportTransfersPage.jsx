// AirportTransfersPage.jsx
import React, { useState, useMemo } from 'react';

//Transfer Data
const transferData = [
  { id: 1, country: 'Singapore', fromAirport: 'Singapore', toHotel: 'Fullerton Hotel', availablePickup: '2025-06-20', time: '12:00PM', pax: '1' },
  { id: 2, country: 'Singapore', fromAirport: 'Singapore', toHotel: 'Hilton Hotel Singapore', availablePickup: '2025-06-22', time: '10:00AM', pax: '2' },

  { id: 3, country: 'Malaysia', fromAirport: 'Kuala Lumpur', toHotel: 'Hilton Hotel Kuala Lumpur', availablePickup: '2025-06-20', time: '02:00PM', pax: '2' },
  { id: 4, country: 'Malaysia', fromAirport: 'Kuala Lumpur', toHotel: 'Sunway Putra Hotel', availablePickup: '2025-06-21', time: '06:00PM', pax: '4' },

  { id: 5, country: 'Thailand', fromAirport: 'Bangkok', toHotel: 'Berkelely Hotel Pratunam', availablePickup: '2025-06-20', time: '07:00AM', pax: '2' },
  { id: 6, country: 'Thailand', fromAirport: 'Bangkok', toHotel: 'Carlton Hotel Bangkok Sukhumvit', availablePickup: '2025-06-22', time: '07:00PM', pax: '2' },
];

//Utility: Convert 12h time to 24h integer hour
const convertTimeTo24h = (timeStr) => {
  const [match, hourStr, minuteStr, period] = timeStr.match(/(\d{1,2}):(\d{2})(AM|PM)/);
  let hour = parseInt(hourStr);
  if (period === 'PM' && hour !== 12) hour += 12;
  if (period === 'AM' && hour === 12) hour = 0;
  return hour;
};

// Utility: Generate time options (00:00AM - 10:00PM)
const generateTimeOptions = () => {
  return Array.from({ length: 23 }, (_, i) => {
    const hour = i % 12 || 12;
    const ampm = i < 12 ? 'AM' : 'PM';
    return `${hour.toString().padStart(2, '0')}:00${ampm}`;
  });
};

const AirportTransfersPage = () => {
  //State to keep input
  const [country, setCountry] = useState('');
  const [hotel, setHotel] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [pax, setPax] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  //Memoized unique values
  const countries = useMemo(() => [...new Set(transferData.map(t => t.country))], []);
  const hotels = useMemo(() => {
    if (!country) return [];
    return [...new Set(transferData.filter(t => t.country === country).map(t => t.toHotel))];
  }, [country]);

  const timeOptions = useMemo(() => generateTimeOptions(), []);

  /*Main Search Logic
    Input pickup for airport first, depending on which country, the hotel that appears will be based on the country
    Then choose the pick up date, time and no. of pax. 
    *If pickup date and time is earlier than what's available the display result will show what's the closest, however,
    if it's later than what's available, no result will show

    *No. of pax also affects the display

    If nothing is selected, displays all available 
  */
  const handleSearch = () => {
    let results = transferData;

    if (country) results = results.filter(t => t.country === country);
    if (hotel) results = results.filter(t => t.toHotel === hotel);
    if (pickupDate) results = results.filter(t => t.availablePickup >= pickupDate);
    if (pickupTime) {
      const selectedTime24h = convertTimeTo24h(pickupTime);
      results = results.filter(t => convertTimeTo24h(t.time) >= selectedTime24h);
    }
    if (pax) results = results.filter(t => t.pax === pax);

    setSearchResults(results);
  };

  //Clear fields button
  const handleClear = () => {
    setCountry('');
    setHotel('');
    setPickupDate('');
    setPickupTime('');
    setPax('');
    setSearchResults([]);
  };

  //Form for input
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Airport Transfers Search</h1>

      <div className="card p-4 mb-4 shadow">
        <div className="row mb-3">
          {/*Select Country*/}
          <div className="col-md-4">
            <label>Pick-up Airport (Country)</label>
            <select className="form-control" value={country} onChange={e => setCountry(e.target.value)}>
              <option value="">Select Airport</option>
              {countries.map((c, i) => (
                <option key={i} value={c}>{c} Airport</option>
              ))}
            </select>
          </div>

          {/*Select Hotel*/}
          <div className="col-md-4">
            <label>Destination Hotel</label>
            <select className="form-control" value={hotel} onChange={e => setHotel(e.target.value)} disabled={!country}>
              <option value="">Select Hotel</option>
              {hotels.map((h, i) => (
                <option key={i} value={h}>{h}</option>
              ))}
            </select>
          </div>

          {/*Select Pickup Date*/}
          <div className="col-md-4">
            <label>Pickup Date</label>
            <input type="date" className="form-control" value={pickupDate} onChange={e => setPickupDate(e.target.value)} disabled={!hotel} />
          </div>
        </div>

        <div className="row mb-3">
          {/*Select Pickup Time */}
          <div className="col-md-4">
            <label>Pickup Time</label>
            <select className="form-control" value={pickupTime} onChange={e => setPickupTime(e.target.value)} disabled={!pickupDate}>
              <option value="">Select Time</option>
              {timeOptions.map((t, i) => (
                <option key={i} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/*Select no. of Pax*/}
          <div className="col-md-4">
            <label>Number of Pax</label>
            <select className="form-control" value={pax} onChange={e => setPax(e.target.value)}>
              <option value="">Select Pax</option>
              {[1, 2, 3, 4].map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/*Buttons*/}
          <div className="col-md-4 d-flex align-items-end justify-content-center">
            <button className="btn btn-primary mx-2" onClick={handleSearch}>Search</button>
            <button className="btn btn-secondary mx-2" onClick={handleClear}>Clear</button>
          </div>
        </div>
      </div>

      {/*Display Search Results*/}
      {searchResults.length > 0 && (
        <div className="mt-4">
          <table className="table table-bordered text-center">
            <thead>
              <tr>
                <th>Country</th>
                <th>From Airport</th>
                <th>To Hotel</th>
                <th>Available Pickup</th>
                <th>Time</th>
                <th>Pax</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((t, i) => (
                <tr key={i}>
                  <td>{t.country}</td>
                  <td>{t.fromAirport}</td>
                  <td>{t.toHotel}</td>
                  <td>{t.availablePickup}</td>
                  <td>{t.time}</td>
                  <td>{t.pax}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AirportTransfersPage;
