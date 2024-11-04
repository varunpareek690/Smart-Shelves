// const express = require('express');
// const bodyParser = require('body-parser');
// const { Pool } = require('pg');
// require('dotenv').config();
// const app = express();

// app.use(bodyParser.json());

// const pool = new Pool({
//   user: process.env.PGUSER,        // Load from .env
//   host: process.env.PGHOST,        // Load from .env
//   database: process.env.PGDATABASE, // Load from .env
//   password: process.env.PGPASSWORD, // Load from .env
//   port: process.env.PGPORT,    
//   ssl: {
//   rejectUnauthorized: false  
//   }                  
// });

// app.post('/api/sensor-data', async (req, res) => {
//   try {
//     const { distance } = req.body;
    
//     const result = await pool.query('INSERT INTO ultrasonic_data (distance) VALUES ($1)', [distance]);

//     res.status(200).json({ message: 'Data saved successfully' });
//   } catch (err) {
//     console.error('Error saving data:', err);
//     res.status(500).json({ error: 'Failed to save data' });
//   }
// });

// // Start the server
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const app = express();
// const port = 8000;
// app.use(bodyParser.json());
// app.use(cors());
// let sensorData = {
//     weight: null,
//     distance: null,
// };

// // Middleware to parse JSON request bodies
// // Endpoint to handle sensor data
// app.post('/api/sensor-data', (req, res) => {
//     const { weight, distance } = req.body;
//     sensorData.weight = weight;
//     sensorData.distance = distance;
//     if (weight !== undefined && distance !== undefined) {
//         console.log(`Received sensor data - Weight: ${weight} grams, Distance: ${distance} cm`);
//         res.status(200).send({ message: 'Sensor data received successfully' });
//     } else {
//         res.status(400).send({ error: 'Invalid sensor data' });
//     }
// });
// app.get('/api/sensor-data', (req, res) => {
//     res.status(200).json(sensorData);
// }); 

// // Start the server
// app.listen(port, () => {
//     console.log(`Server running on Port:${port}`);
// });
