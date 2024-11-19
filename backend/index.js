const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('./models/User');
const Order = require('./models/Order');
const GodownProducts = require('../front-end/src/GodownProducts.json');
const app = express();
const { PythonShell } = require("python-shell");

const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Sensor data object
let sensorData = {
    weight: null,
    distanceone: null,
    distancetwo: null,
    ir1: null, // Added IR sensor 1
    ir2: null, // Added IR sensor 2
    ir3: null, // Added IR sensor 3
};

// MongoDB connection
mongoose
    .connect('mongodb://localhost:27017/smart-shelves', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Endpoint to predict stock status
app.post("/api/predict-stock", (req, res) => {
    const { weight, distanceone, distancetwo, daily_usage_rate } = req.body;

    // Check if the required data is available
    if (weight === undefined || distanceone === undefined || distancetwo === undefined) {
        return res.status(400).json({ error: 'Missing required sensor data (weight, distanceone, distancetwo)' });
    }

    // Define Python script and options
    let options = {
        mode: "json",
        pythonOptions: ["-u"],
        scriptPath: "./", // Path to the Python script
        args: [weight, distanceone, distancetwo, daily_usage_rate],
    };

    PythonShell.run("predict_stock.py", options, function (err, result) {
        if (err) return res.status(500).send(err);
        res.status(200).send({ prediction: result[0].prediction });
    });
});

// User Registration
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// User Login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Sensor Data Handling
app.post('/api/sensor-data', (req, res) => {
    const { weight, distanceone, distancetwo, ir1, ir2, ir3 } = req.body;

    sensorData.weight = weight;
    sensorData.distanceone = distanceone;
    sensorData.distancetwo = distancetwo;
    sensorData.ir1 = ir1; // Update IR sensor 1
    sensorData.ir2 = ir2; // Update IR sensor 2
    sensorData.ir3 = ir3; // Update IR sensor 3

    if (weight !== undefined && distanceone !== undefined && distancetwo !== undefined && ir1 !== undefined && ir2 !== undefined && ir3 !== undefined) {
        console.log(`Received sensor data - Weight: ${weight} grams, Distance 1: ${distanceone} cm, Distance 2: ${distancetwo}, IR1: ${ir1}, IR2: ${ir2}, IR3: ${ir3}`);
        res.status(200).send({ message: 'Sensor data received successfully' });
    } else {
        res.status(400).send({ error: 'Invalid sensor data' });
    }
});

app.get('/api/sensor-data', (req, res) => {
    res.status(200).json(sensorData);
});

app.get('/api/product-available', (req, res) => {
    res.status(200).json(GodownProducts);
});

// Order Placement
app.post('/api/place-order', async (req, res) => {
    const { productName, quantity, retailerEmail } = req.body;

    if (!productName || !quantity || !retailerEmail) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const order = new Order({ productName, quantity, retailerEmail });
        await order.save();
        // Send receipt via email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'varunpareek690@gmail.com', // Replace with your email
                pass: 'your_password',      // Replace with your email password
            },
        });

        const mailOptions = {
            from: 'varunpareek690@gmail.com',
            to: retailerEmail,
            subject: 'Order Confirmation',
            text: `Thank you for your order!\n\nProduct ID: ${productName}\nQuantity: ${quantity}\n\nYour order is being processed.`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Order placed and receipt sent successfully' });
    } catch (err) {
        console.error('Error placing order:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get Order History
app.get('/api/order-history', async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch order history." });
    }
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
