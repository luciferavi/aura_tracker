const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const Course = require('../models/Course'); // Ensure Course model is imported

// Route to get all courses with assignments
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find(); // Fetch courses with embedded assignments
        res.json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ message: 'Server error while fetching courses.' });
    }
});

// Route to add a new course
router.post('/add', courseController.addCourse);

// Route to add a new assignment to a specific course
router.post('/:courseId/assignment', courseController.addAssignment);

// Route to update assignment completion status
router.patch('/:courseId/assignment/:assignmentId', courseController.updateAssignmentStatus);

module.exports = router;
