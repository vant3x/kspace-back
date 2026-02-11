const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// GET all appointments (history)
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ createdAt: -1 });
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST an appointment response
router.post('/', async (req, res) => {
    const appointment = new Appointment(req.body);
    try {
        const newAppointment = await appointment.save();
        res.status(201).json(newAppointment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE all appointments (Reset history)
router.delete('/clear', async (req, res) => {
    try {
        await Appointment.deleteMany({});
        res.json({ message: 'Mission history cleared' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
