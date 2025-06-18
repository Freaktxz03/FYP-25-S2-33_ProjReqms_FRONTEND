// src/Backend/db.js
import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'p@ssw0rd',  // Adjust to your MySQL password
  database: 'sim_travels_database',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Database connected successfully');
});

export default db;
