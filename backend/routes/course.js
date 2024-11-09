const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const Course = require('../models/Course'); // Ensure Course model is imported
const authenticateToken =require('../middleware/authMiddleware');
// Route to get all courses for a specific user
router.get('/', authenticateToken,async (req, res) => {
    const  {userId} = req.user; // Retrieve userId from query params
    try {
        const courses = await Course.find({ userId }); // Fetch courses for the specified user
        res.json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ message: 'Server error while fetching courses.' });
    }
});
router.post('/', authenticateToken, async (req, res) => {
  // console.log(req.user)
  const { userId } = req.user; // Get userId directly from req
  const { name, description } = req.body;
  console.log(name,userId,description);

  try {
      const course = new Course({ name, description, userId }); // Create course associated with userId
      await course.save();
      console.log("Course added")
      res.json(course);
  } catch (error) {
      console.error('Error creating course:', error);
      res.status(500).json({ message: 'Server error while creating course.' });
  }
});
// Route to add a new course for a specific user
router.post('/',authenticateToken, courseController.addCourse);

// Route to add a new assignment to a specific course
router.post('/:courseId/assignment',authenticateToken, courseController.addAssignment);

// Route to update assignment completion status
router.patch('/:courseId/assignment/:assignmentId',authenticateToken, courseController.updateAssignmentStatus);
//router.patch('/:rewardId', authenticateToken, redeemReward);

// Route to delete a course by ID for a specific user
router.delete('/:id',authenticateToken, async (req, res) => {
  const { userId } = req.user; // Get userId directly from req
  const { id } = req.params; // Get course ID from route parameters

  try {
    // Find the course by ID and userId to ensure it belongs to the authenticated user
    const course = await Course.findOne({ _id: id, userId });

    if (!course) {
      console.warn("Course not found or unauthorized delete attempt.");

      return res.status(404).json({ message: 'Course not found or you do not have permission to delete this course.' });
    }

    // Delete the course
    await Course.deleteOne({ _id: id });
    res.json({ message: 'Course deleted successfully.' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ message: 'Server error while deleting course.' });
  }
});

module.exports = router;
