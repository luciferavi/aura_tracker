const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    description: String,
    progress: { type: Number, default: 0 }, // percentage
    dueDate: Date,
    completed: { type: Boolean, default: false }
});

module.exports = mongoose.model('Goal', goalSchema);
