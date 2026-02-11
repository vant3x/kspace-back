const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true,
        enum: ['accepted', 'declined', 'pending'],
        default: 'pending'
    },
    missionType: {
        type: String,
        default: 'Reaction Date'
    },
    userName: {
        type: String,
        default: 'Explorer'
    },
    message: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', AppointmentSchema);
