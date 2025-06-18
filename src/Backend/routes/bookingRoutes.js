// src/Backend/routes/bookingRoutes.js
import express from 'express';
import db from '../db.js'; // Make sure your db file is also ESM
const router = express.Router();

router.post('/', (req, res) => {
  const userId = req.session.user?.id;
  const { from, to, date, time, duration } = req.body;

  if (!userId) {
    return res.status(401).json({ success: false, error: 'User not authenticated' });
  }

  const query = `
    INSERT INTO bookings (user_id, flight_from, flight_to, date, time, duration)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [userId, from, to, date, time, duration], (err, result) => {
    if (err) {
      console.error('Error inserting booking:', err);
      return res.status(500).json({ success: false, error: 'DB Error' });
    }

    res.status(200).json({ success: true, bookingId: result.insertId });
  });
});

router.get('/:userId', (req, res) => {
  const query = `
    SELECT * FROM bookings
    WHERE user_id = ?
    ORDER BY created_at DESC
  `;

  db.query(query, [req.params.userId], (err, results) => {
    if (err) {
      console.error('Error fetching bookings:', err);
      return res.status(500).json({ success: false, error: 'DB Error' });
    }

    res.status(200).json(results);
  });
});

export default router;
