const mongoose = require('mongoose');
const Note = require('./models/Note');
require('dotenv').config();

const initialNotes = [
    { type: 'text', content: "In a universe full of stars, you shine the brightest.", size: 'small', order: 1 },
    { type: 'special', title: "The Sky When We Met", content: "Coordinates: 40.7128° N, 74.0060° W", src: "https://images.unsplash.com/photo-1519681393798-38e43269d877?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", size: 'tall', order: 2 },
    { type: 'text', content: "Love is the one thing we're capable of perceiving that transcends dimensions of time and space. - Interstellar", size: 'medium', highlight: true, order: 3 },
    { type: 'special', title: "NASA APOD: The Day", content: "Infinite Galaxy, just like us.", src: "https://apod.nasa.gov/apod/image/2312/OrionStars_Hubble_960.jpg", size: 'wide', order: 4 },
    { type: 'video', src: "https://www.w3schools.com/html/mov_bbb.mp4", size: 'wide', order: 5 },
    { type: 'image', src: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", size: 'small', caption: "Our Universe", order: 6 },
    { type: 'text', content: "Chemistry isn't just formulas. It's us.", size: 'small', order: 7 },
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        await Note.deleteMany({});
        await Note.insertMany(initialNotes);

        console.log('Seed successful');
        process.exit();
    } catch (err) {
        console.error('Seed failed:', err);
        process.exit(1);
    }
}

seed();
