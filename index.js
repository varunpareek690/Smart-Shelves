const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
require('dotenv').config();
const app = express();

app.use(bodyParser.json());

const pool = new Pool({
  user: process.env.PGUSER,        // Load from .env
  host: process.env.PGHOST,        // Load from .env
  database: process.env.PGDATABASE, // Load from .env
  password: process.env.PGPASSWORD, // Load from .env
  port: process.env.PGPORT,    
  ssl: {
  rejectUnauthorized: false  
  }                  
});

app.post('/api/sensor-data', async (req, res) => {
  try {
    const { distance } = req.body;
    
    const result = await pool.query('INSERT INTO ultrasonic_data (distance) VALUES ($1)', [distance]);

    res.status(200).json({ message: 'Data saved successfully' });
  } catch (err) {
    console.error('Error saving data:', err);
    res.status(500).json({ error: 'Failed to save data' });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
