const mongoose = require('mongoose');

const LetterSchema = new mongoose.Schema({
    title: { type: String, default: 'A MESSAGE FROM THE STARS' },
    content: { type: String, required: true },
    sender: { type: String, default: 'K' },
    recipient: { type: String, default: 'You' },
    date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Letter', LetterSchema);
