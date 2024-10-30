// controllers/courseController.js
const Course = require('../models/Course');

exports.addCourse = async (req, res) => {
    try {
        const course = new Course({ ...req.body, user: req.user.userId });
        await course.save();
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find({ user: req.user.userId });
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
