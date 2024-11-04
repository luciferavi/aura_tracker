const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware'); // Import the auth middleware
const Task = require('../models/Tasks');
// Get all tasks for a user
router.get('/', authenticateToken, async (req, res) => {
   // console.log('User ID:', req.user.id); // Log the user ID

  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Add a new task
router.post('/', authenticateToken, async (req, res) => {
  const { taskText } = req.body;
  try {
    const newTask = new Task({ taskText, userId: req.user.id });
    await newTask.save();
    res.json(newTask);
  } catch (err) {
    res.status(500).json({ message: 'Error creating task' });
  }
});

// Edit a task
router.put('/:id', authenticateToken, async (req, res) => {
  const { taskText, completed } = req.body;
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { taskText, completed },
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error updating task' });
  }
});

// Delete a task
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task' });
  }
});

module.exports = router;
