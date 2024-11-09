const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const Course = require('../models/Course'); // Ensure Course model is imported
const authenticateToken =require('../middleware/authMiddleware');
// Route to get all courses for a specific user
router.get('/', authenticateToken,async (req, res) => {
    const { userId } = req.query; // Retrieve userId from query params
    try {
        const courses = await Course.find({ userId }); // Fetch courses for the specified user
        res.json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ message: 'Server error while fetching courses.' });
    }
});

// Route to add a new course for a specific user
router.post('/',authenticateToken, courseController.addCourse);

// Route to add a new assignment to a specific course
router.post('/:courseId/assignment',authenticateToken, courseController.addAssignment);

// Route to update assignment completion status
router.patch('/:courseId/assignment/:assignmentId',authenticateToken, courseController.updateAssignmentStatus);

// Route to delete a course by ID for a specific user
router.delete('/:courseId',authenticateToken, async (req, res) => {
    const { courseId } = req.params;
    const { userId } = req.query;

    try {
        const deletedCourse = await Course.findOneAndDelete({ _id: courseId, userId }); // Ensure the course belongs to the user

        if (!deletedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json({ message: 'Course deleted successfully', deletedCourse });
    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
