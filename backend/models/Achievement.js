// models/Achievement.js
const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
    title: String,
    description: String,
    points: Number,
    badge: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Achievement', achievementSchema);
