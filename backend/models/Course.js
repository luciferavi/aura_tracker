// models/Course.js

const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: String,
  description: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  assignments: [
    {
      title: String,
      deadline: Date,
      completed: Boolean,
    },
  ],
});

module.exports = mongoose.model('Course', courseSchema);
