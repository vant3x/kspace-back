const express = require('express');
const router = express.Router();
const Letter = require('../models/Letter');

// GET letter (the only one)
router.get('/', async (req, res) => {
    try {
        const letter = await Letter.findOne().sort({ createdAt: -1 });
        res.json(letter || { content: 'No cosmic message found yet...' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST/UPDATE letter
router.post('/', async (req, res) => {
    try {
        let letter = await Letter.findOne();
        if (letter) {
            Object.assign(letter, req.body);
            await letter.save();
        } else {
            letter = new Letter(req.body);
            await letter.save();
        }
        res.status(201).json(letter);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
