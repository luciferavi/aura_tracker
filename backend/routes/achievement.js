// routes/achievement.js
const express = require('express');
const Achievement = require('../models/Achievement');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

// Get All Achievements
router.get('/', authenticateToken, async (req, res) => {
    try {
        const achievements = await Achievement.find();
        res.json(achievements);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch achievements' });
    }
});

// Create New Achievement
router.post('/', authenticateToken, async (req, res) => {
    const { title, description } = req.body;

    const newAchievement = new Achievement({ title, description });
    try {
        await newAchievement.save();
        res.status(201).json({ message: 'Achievement created successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create achievement' });
    }
});

module.exports = router;
