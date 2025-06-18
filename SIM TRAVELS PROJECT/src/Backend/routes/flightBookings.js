// src/Backend/routes/flightBookings.js
import express from 'express';
import db from '../db.js';

const router = express.Router();

// POST /api/bookings/
router.post('/', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Unauthorized: Please log in.' });
  }

  const userId = req.session.user.id;
  const { id: flightId, from, to, date, time, duration } = req.body;

  if (!flightId || !from || !to || !date || !time || !duration) {
    return res.status(400).json({ message: 'Missing flight data.' });
  }

  const insertQuery = `
    INSERT INTO flight_bookings 
    (user_id, flight_id, flight_from, flight_to, date, time, duration)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(insertQuery, [userId, flightId, from, to, date, time, duration], (err, result) => {
    if (err) {
      console.error('❌ Booking error:', err);
      return res.status(500).json({ message: 'Failed to book flight.' });
    }

    res.status(200).json({ message: 'Flight booked successfully.' });
  });
});

// GET /api/bookings/
router.get('/', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const userId = req.session.user.id;

  const selectQuery = `
    SELECT flight_id, flight_from, flight_to, date, time, duration
    FROM flight_bookings
    WHERE user_id = ?
    ORDER BY date, time
  `;

  db.query(selectQuery, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching bookings:', err);
      return res.status(500).json({ message: 'Failed to fetch bookings' });
    }

    res.status(200).json(results);
  });
});

export default router;
