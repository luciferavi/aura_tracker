// routes/profile.js
const express = require('express');
const User = require('../models/User');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

// Get User Profile
// router.get('/user', authenticateToken, async (req, res) => {
//     try {
//         const userId = req.user.userId;
//         const user = await User.findById(userId).select('name email photo academicGoals courses');
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.json(user);
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to retrieve user profile' });
//     }
// });

// Update User Profile
// router.put('/', authenticateToken, async (req, res) => {
//    try {
//        const userId = req.user.userId;
//        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
//         if (!updatedUser) {
//            return res.status(404).json({ message: 'User not found' });
//         }
//         res.json(updatedUser);
//     } catch (err) {
//        res.status(500).json({ error: 'Failed to update user profile' });
//     }
// });

module.exports = router;
