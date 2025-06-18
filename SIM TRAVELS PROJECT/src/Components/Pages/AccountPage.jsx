// src/Components/Pages/AccountPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useSession } from '../../Services/SessionContext';

function AccountPage() {
  const [userInfo, setUserInfo] = useState(null);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  const { user, setUser } = useSession();

  useEffect(() => {
    //Fetch session user info
    axios.get('http://localhost:5000/api/users/session', { withCredentials: true })
      .then(res => {
        setUserInfo(res.data);
        fetchBookings(); // Fetch bookings after user info is confirmed
      })
      .catch(() => navigate('/login'));
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/bookings/', { withCredentials: true });
      setBookings(res.data); // Expecting array of bookings
    } catch (err) {
      console.error('Failed to load bookings:', err);
    }
  };

  const handleLogout = async () => {
    await axios.post('http://localhost:5000/api/users/logout', {}, { withCredentials: true })
    .then(() => setUser(null));
    alert('You have been logged out successfully');
    navigate('/login');
  };

  return (
    <div>
      <h2>Account Page</h2>
      {userInfo ? (
        <>
          <p>Welcome {userInfo.username}</p>
          <p>Your session ID is: {userInfo.sessionID}</p>
          <p>Your User ID is: {userInfo.id}</p>

          {bookings.length > 0 ? (
            <>
              <h4 className="mt-4">Your Booked Flights</h4>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>From</th>
                    <th>To</th>
                    <th>Departure Date</th>
                    <th>Departure Time</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {/*Converts the raw UTC time into readable String */}
                  {bookings.map((booking, index) => {
                    const departure = new Date(booking.date);
                    const departureDate = departure.toLocaleDateString();
                    const departureTime = departure.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                    return (
                      <tr key={index}>
                        <td>{booking.flight_from}</td>
                        <td>{booking.flight_to}</td>
                        <td>{departureDate}</td>
                        <td>{booking.time}</td>
                        <td>{booking.duration}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          ) : (
            <p className="mt-4">You have no booked flights.</p>
          )}

          <button className="btn btn-danger mt-3" onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default AccountPage;
