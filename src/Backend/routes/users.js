// src/Backend/routes/users.js
import express from 'express';
import db from '../db.js';

const router = express.Router();

router.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Validation check
  if (!username || !password) {
    return res.status(400).send('Missing username or password');
  }

  const insertUserQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';

  db.query(insertUserQuery, [username, password], (err, result) => {
    if (err) {
      console.error('❌ Database error:', err);

      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).send('Username already exists.');
      }

      return res.status(500).send('Server error');
    }

    console.log('✅ New user registered:', username);
    return res.status(201).send('User registered successfully');
  });
});

// Login route
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT id, username FROM users WHERE username = ? AND password = ?';

  db.query(query, [username, password], (err, results) => {
    if (err) return res.status(500).send('Server error');

    if (results.length === 0) {
      return res.status(401).send('Invalid credentials');
    }

    req.session.user = {
      id: results[0].id,
      username: results[0].username,
      sessionID: req.sessionID
    };

    res.status(200).json({ success: true });
  });
});

// Get session info
router.get('/session', (req, res) => {
  if (!req.session.user) return res.status(401).send('Not logged in');

  res.json(req.session.user);
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send('Logout failed');
    res.clearCookie('connect.sid');
    res.json({ success: true });
  });
});

//For debugging to check if db connected
router.get('/', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).send('Database error');
    res.json(results);
  });
});

export default router;
