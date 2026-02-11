const mongoose = require('mongoose');

const MissionSchema = new mongoose.Schema({
    title: { type: String, default: 'MISSION: REACTION DATE' },
    targetDate: { type: Date, default: '2026-02-14T20:00:00' },
    stages: [{
        symbol: String,
        label: String,
        title: String,
        formula: String,
        description: String,
        isLocked: { type: Boolean, default: true }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Mission', MissionSchema);
