const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
    title: String,
    start: Date,
    end: Date,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Timetable = mongoose.model('Timetable', timetableSchema);
module.exports = Timetable;
