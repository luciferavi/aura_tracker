// backend/routes/course.js
const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
router.get('/courses', async (req, res) => {
    try {
      const courses = await Course.find();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
router.post('/add', courseController.addCourse);
router.post('/:courseId/assignment', courseController.addAssignment);
router.patch('/:courseId/assignment/:assignmentId', courseController.updateAssignmentStatus);

module.exports = router;