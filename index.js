const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 8000;
app.use(bodyParser.json());
app.use(cors());
let sensorData = {
    weight: null,
    distance: null,
};

// Middleware to parse JSON request bodies
// Endpoint to handle sensor data
app.post('/api/sensor-data', (req, res) => {
    const { weight, distance } = req.body;
    sensorData.weight = weight;
    sensorData.distance = distance;
    if (weight !== undefined && distance !== undefined) {
        console.log(`Received sensor data - Weight: ${weight} grams, Distance: ${distance} cm`);
        res.status(200).send({ message: 'Sensor data received successfully' });
    } else {
        res.status(400).send({ error: 'Invalid sensor data' });
    }
});
app.get('/api/sensor-data', (req, res) => {
    res.status(200).json(sensorData);
}); 

// Start the server
app.listen(port, () => {
    console.log(`Server running on Port:${port}`);
});
