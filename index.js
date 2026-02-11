const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const noteRoutes = require('./routes/noteRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const letterRoutes = require('./routes/letterRoutes');
const missionRoutes = require('./routes/missionRoutes');

app.use('/api/notes', noteRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/letter', letterRoutes);
app.use('/api/mission', missionRoutes);

// Health check
app.get('/', (req, res) => {
    res.send('KSpace Backend API is running');
});

// Database connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });
