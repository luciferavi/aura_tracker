const Course = require('../models/Course');
const User=require('../models/User');
// Add a new course for a specific user
exports.addCourse = async (req, res) => {
    const { name, description, userId } = req.body;
    console.log('Received data:', req.body); // Log the received data

    if (!name || !description || !userId) {
      return res.status(400).json({ error: 'Missing required fields: name, description, or userId.' });
  }

    try {
        const course = new Course({ name, description, userId });
        await course.save();
        res.status(201).json(course);
    } catch (error) {
        console.error('Error adding course:', error);
        res.status(500).json({ message: 'Server error while adding course.' });
    }
};

// Add a new assignment to a course for a specific user
exports.addAssignment = async (req, res) => {
  const { courseId } = req.params;
  const { title, deadline } = req.body;
  const userId = req.user.userId; // Retrieve userId from authenticateToken middleware

  try {
      // Ensure the course exists and belongs to the authenticated user
      const course = await Course.findOne({ _id: courseId, userId });
      if (!course) {
          return res.status(404).json({ message: 'Course not found or access denied' });
      }

      // Create new assignment and add it to the course's assignments array
      const newAssignment = { title, deadline, completed: false };
      course.assignments.push(newAssignment);
      await course.save();

      res.status(201).json(course); // Return the updated course with the new assignment
  } catch (error) {
      console.error('Error adding assignment:', error);
      res.status(500).json({ message: 'Server error while adding assignment.' });
  }
};

// Update assignment completion status for a specific course and user
exports.updateAssignmentStatus = async (req, res) => {
  const { courseId, assignmentId } = req.params;
  const { completed } = req.body;
  const userId = req.user.userId; // Get userId from authenticateToken middleware
  const pointsToAdd = 10; // Points to add after completing an assignment

  try {
      // Find the course that matches the courseId and belongs to the authenticated user
      const course = await Course.findOne({ _id: courseId, userId });
      if (!course) {
          return res.status(404).json({ message: 'Course not found or access denied' });
      }

      // Find the specific assignment within the course
      const assignment = course.assignments.id(assignmentId);
      if (!assignment) {
          return res.status(404).json({ message: 'Assignment not found' });
      }

      // Update the assignment's completion status
      assignment.completed = completed;
      await course.save();

      // If the assignment was completed, update the user's points
      if (completed) {
          const user = await User.findById(userId);
          if (!user) {
              return res.status(404).json({ message: 'User not found' });
          }

          // Add points to the user
          user.points += pointsToAdd;
          await user.save(); // Save the updated points

          // Send the updated points and course data
          res.status(200).json({
              updatedPoints: user.points, // Send back the updated points
              course: course, // Send the updated course with modified assignment status
          });
      } else {
          res.status(200).json(course); // Just return the course if the assignment is not marked as completed
      }
  } catch (error) {
      console.error('Error updating assignment status:', error);
      res.status(500).json({ message: 'Server error while updating assignment status and points.' });
  }
};