const express = require('express');
const router = express.Router();
const Mission = require('../models/Mission');

// Default initial data for a fresh start
const defaultMission = {
    title: 'MISSION: REACTION DATE',
    targetDate: new Date('2026-02-14T20:00:00'),
    stages: [
        {
            symbol: 'Rf',
            label: 'Refueling',
            title: 'Stage 01: The Catalyst',
            formula: 'Formula: C8H11NO2 (Dopamine) + Food',
            description: 'Beginning our reaction at the designated coordinates. Objective: Increase energy levels and establish covalent bonding.',
            isLocked: false
        },
        {
            symbol: 'Ac',
            label: 'Activity',
            title: 'Stage 02: Molecular Motion',
            formula: 'Formula: Kinetic Energy + Synapses',
            description: 'Classified activity to increase heart rate and shared momentum.',
            isLocked: true
        },
        {
            symbol: 'Fi',
            label: 'Finale',
            title: 'Stage 03: Equilibrium',
            formula: 'Formula: Serotonin + Starlight',
            description: 'The final phase of the experimental date. Data sync and emotional calibration.',
            isLocked: true
        }
    ]
};

// GET mission
router.get('/', async (req, res) => {
    try {
        let mission = await Mission.findOne();
        if (!mission) {
            return res.json(defaultMission);
        }
        res.json(mission);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST/UPDATE mission
router.post('/', async (req, res) => {
    try {
        let mission = await Mission.findOne();
        if (mission) {
            Object.assign(mission, req.body);
            await mission.save();
        } else {
            mission = new Mission(req.body);
            await mission.save();
        }
        res.status(201).json(mission);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE mission (Reset to defaults)
router.delete('/reset', async (req, res) => {
    try {
        await Mission.deleteMany({});
        const mission = new Mission(defaultMission);
        await mission.save();
        res.json(mission);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
