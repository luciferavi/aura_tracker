// routes/points.js
const express = require('express');
const authenticateToken =require('../middleware/authMiddleware');
const router = express.Router();
const { User } = require('../models/User'); // Assuming you have a User model

// Get current points for the user
router.get('/points', authenticateToken, async (req, res) => {
    const userId = req.user.id;  // Retrieve the userId from req.user populated by authenticateToken
    console.log(userId);  // Log to check if it's coming from req.user correctly

    try {
        const user = await User.findById(userId);  // Find the user using the userId
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the user's points
        res.json({ points: user.points });
    } catch (error) {
        console.error(error);  // Log the error for debugging
        res.status(500).json({ message: 'Error fetching points', error });
    }
});


// Complete assignment and add points
router.post('/complete-assignment', async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.points += 10; // Add points for completing an assignment
        await user.save();

        res.json({ updatedPoints: user.points });
    } catch (error) {
        res.status(500).json({ message: 'Error updating points', error });
    }
});

// Redeem reward and deduct points
router.post('/redeem', async (req, res) => {
    const { userId, cost } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (user.points >= cost) {
            user.points -= cost; // Deduct points for the reward
            await user.save();
            res.json({ updatedPoints: user.points });
        } else {
            res.status(400).json({ message: 'Not enough points to redeem this reward' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error redeeming reward', error });
    }
});

module.exports = router;
