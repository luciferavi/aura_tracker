// controllers/achievementController.js
const Achievement = require('../models/Achievement');

exports.createAchievement = async (req, res) => {
    try {
        const achievement = new Achievement({ ...req.body, user: req.user.userId });
        await achievement.save();
        res.status(201).json(achievement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUserAchievements = async (req, res) => {
    try {
        const achievements = await Achievement.find({ user: req.user.userId });
        res.json(achievements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
