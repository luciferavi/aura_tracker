// backend/models/Course.js
const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
  title: String,
  deadline: Date,
  completed: { type: Boolean, default: false },
});

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  assignments: [AssignmentSchema], // Embedded array of assignments
});

module.exports = mongoose.model('Course', CourseSchema);