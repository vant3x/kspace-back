const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { upload } = require('../config/cloudinary');

// GET all notes
router.get('/', async (req, res) => {
    try {
        const notes = await Note.find().sort({ order: 1, createdAt: -1 });
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new note (Support File Upload)
router.post('/', upload.single('media'), async (req, res) => {
    try {
        const { type, content, title, size, highlight, caption, order, author, isQuote, quoteSource } = req.body;

        const noteData = {
            content,
            title,
            size: size || 'medium',
            highlight: highlight === 'true' || highlight === true, // handle both string and boolean
            caption,
            author,
            isQuote: isQuote === 'true' || isQuote === true,
            quoteSource,
            order: parseInt(order) || 0
        };

        if (req.file) {
            noteData.src = req.file.path;
            noteData.mediaType = req.file.mimetype.startsWith('video') ? 'video' : 'image';

            if (content) {
                noteData.type = 'mixed';
            } else {
                noteData.type = noteData.mediaType;
            }
        } else {
            noteData.type = 'text';
            noteData.mediaType = null;
        }

        const note = new Note(noteData);
        const newNote = await note.save();
        res.status(201).json(newNote);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PATCH a note
router.patch('/:id', async (req, res) => {
    try {
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedNote);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a note
router.delete('/:id', async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.json({ message: 'Note deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
