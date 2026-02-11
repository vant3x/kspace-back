const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['text', 'image', 'video', 'special', 'mixed'], // added 'mixed' for text + media
        default: 'text'
    },
    content: {
        type: String // Text portion
    },
    src: {
        type: String // URL of image/video
    },
    mediaType: {
        type: String, // 'image' or 'video' to help frontend rendering
        enum: ['image', 'video', null]
    },
    title: {
        type: String
    },
    size: {
        type: String,
        enum: ['small', 'medium', 'tall', 'wide'],
        default: 'medium'
    },
    highlight: {
        type: Boolean,
        default: false
    },
    caption: {
        type: String
    },
    author: {
        type: String // Optional field for poems, quotes, etc.
    },
    isQuote: {
        type: Boolean,
        default: false
    },
    quoteSource: {
        type: String
    },
    order: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Note', NoteSchema);
