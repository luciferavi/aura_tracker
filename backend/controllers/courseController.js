// backend/controllers/courseController.js
const Course = require('../models/Course');

// Add new course
exports.addCourse = async (req, res) => {
  try {
    const { name, description } = req.body;
    const course = new Course({ name, description });
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error adding course' });
  }
};

// Add assignment to a course
exports.addAssignment = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, deadline } = req.body;
    const course = await Course.findById(courseId);
    course.assignments.push({ title, deadline });
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error adding assignment' });
  }
};

// Update assignment completion status
exports.updateAssignmentStatus = async (req, res) => {
  try {
    const { courseId, assignmentId } = req.params;
    const { completed } = req.body;
    const course = await Course.findById(courseId);
    const assignment = course.assignments.id(assignmentId);
    assignment.completed = completed;
    await course.save();
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error updating assignment status' });
  }
};