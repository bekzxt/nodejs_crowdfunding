const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import Routes
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/project');
const userRoutes = require('./routes/user');
const donationRoutes = require('./routes/donations');

// Initialize Express App
const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors({
    origin: 'http://localhost:5000', // Adjust if needed
    credentials: true
}));

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/users', userRoutes);

app.use(express.static(path.join(__dirname, '../frontend')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

app.use('/api/*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
