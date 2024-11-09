const Course = require('../models/Course');

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
    const { title, deadline, userId } = req.body;

    try {
        const course = await Course.findOne({ _id: courseId, userId }); // Ensure the course belongs to the user
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const newAssignment = { title, deadline, completed: false };
        course.assignments.push(newAssignment);
        await course.save();

        res.status(201).json(course);
    } catch (error) {
        console.error('Error adding assignment:', error);
        res.status(500).json({ message: 'Server error while adding assignment.' });
    }
};

// Update assignment completion status for a specific course and user
exports.updateAssignmentStatus = async (req, res) => {
    const { courseId, assignmentId } = req.params;
    const { completed, userId } = req.body;

    try {
        const course = await Course.findOne({ _id: courseId, userId });
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const assignment = course.assignments.id(assignmentId);
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }

        assignment.completed = completed;
        await course.save();

        res.status(200).json(course);
    } catch (error) {
        console.error('Error updating assignment status:', error);
        res.status(500).json({ message: 'Server error while updating assignment status.' });
    }
};
