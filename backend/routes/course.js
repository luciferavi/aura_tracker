// routes/course.js
const express = require('express');
const Course = require('../models/Course');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

// Get All Courses
router.get('/', authenticateToken, async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch courses' });
    }
});

// Create New Course
router.post('/', authenticateToken, async (req, res) => {
    const { name, description, schedule } = req.body;

    const newCourse = new Course({ name, description, schedule });
    try {
        await newCourse.save();
        res.status(201).json({ message: 'Course created successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create course' });
    }
});

// Get Course by ID
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json(course);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve course' });
    }
});

module.exports = router;
