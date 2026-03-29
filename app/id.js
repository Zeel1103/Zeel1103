import pool from './db.js';

const getUsers = async () => {
  try {
    const res = await pool.query('SELECT * FROM users');
    console.log(res.rows);
  } catch (err) {
    console.error('Database error:', err);
  }
};

getUsers();
