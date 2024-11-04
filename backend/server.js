require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
const connectDB = require('./config/db'); // Correct path to db.js
const authRoutes = require('./routes/auth'); // Adjust the import path if needed
const profileRoutes=require('./routes/profile');
const timetableRoutes = require('./routes/timetable'); // Import the timetable route
const taskRoutes = require('./routes/tasks');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/tasks', taskRoutes);

//app.use('/api/auth', require('./routes/auth'));
app.use('/api/courses', require('./routes/course'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/achievements', require('./routes/achievement'));
// Connect to MongoDB
app.use('/api/timetable', timetableRoutes); // Add the timetable route



// Use the auth routes
app.use('/api', authRoutes);//carefull
connectDB();

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
