// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const multer = require('multer');
const path=require('path');
const authenticateToken = require('../middleware/authMiddleware'); // Import the auth middleware
const Timetable=require('../models/Timetable');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); // Make sure this is defined in your .env file
const Course=require('../models/Course');


// Define the storage configuration for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the folder where images will be saved
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Create a unique filename
    }
});

const upload = multer({ storage: storage });


// In your backend (e.g., routes/auth.js)
router.post('/google-signup', async (req, res) => {
    const { name, email } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        console.log(name);
        if (!user) {
            // Create a new user
            user = new User({ name, email });
            await user.save();
        }

        res.status(200).json({ message: 'Google signup successful', user });
    } catch (error) {
        res.status(500).json({ message: 'Error during Google signup' });
    }
});


router.post('/google-login', async (req, res) => {
    const { token } = req.body;

    try {
        // Verify Google token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const { name, email, picture } = ticket.getPayload();

        // Check if user exists or create a new user
        let user = await User.findOne({ email });
        if (!user) {
            user = new User({ name, email, photo: picture });
            await user.save();
        }

        // Generate a JWT token for the user
        const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Google login successful', token: jwtToken });
    } catch (error) {
        console.error('Google login error:', error);
        res.status(500).json({ error: 'Failed to log in with Google' });
    }
});

// Route to upload a photo
router.post('/upload-photo', authenticateToken, upload.single('photo'), async (req, res) => {
    try {
        const userId = req.user.userId; // User ID is obtained from authenticated token
        const photoPath = req.file.path;

        // Update user's photo path in database
       // await User.findByIdAndUpdate(userId, { photo: photoPath });
       const updatedUser = await User.findByIdAndUpdate(
        userId,
        { photo: photoPath },
        { new: true } // Return the updated document
    );

        res.json({ message: 'Photo uploaded successfully', user: updatedUser  });
    } catch (err) {
        res.status(500).json({ error: 'Failed to upload photo' });
    }
});

// Signup Route
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already registered. Please log in.' });
        }

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found. Please sign up first.' });
        }

        // Verify the password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Generate a JWT token for authenticated sessions
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// backend/routes/auth.js
router.get('/user', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await User.findById(userId).select('photo name email'); // Adjust fields as needed

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ user }); // Wrap user data in an object for more predictable structure
    } catch (err) {
        console.error('Error retrieving user data:', err); // Log the error for debugging
        res.status(500).json({ error: 'Failed to retrieve user data' });
    }
});






router.post('/timetable', async (req, res) => {
    try {
        const { title, start, end } = req.body;
        const newEvent = new Timetable({ title, start, end });
        await newEvent.save();
        res.status(201).json({ message: 'Event saved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save event' });
    }
});

router.get('/timetable', async (req, res) => {
    try {
        const events = await Timetable.find({});
        res.json({ events });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});





router.patch('/update-batch-year', async (req, res) => {
    const { batchYear } = req.body;
    const userId = req.userId; // Assuming you're using JWT to authenticate and get userId

    if (!batchYear) {
        return res.status(400).send({ message: 'Batch Year is required' });
    }

    try {
        const user = await User.findByIdAndUpdate(
            userId,
            { batchYear }, // Update the batchYear field
            { new: true }
        );
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({ message: 'Batch Year updated successfully', user });
    } catch (err) {
        console.error('Error updating batch year:', err);
        res.status(500).send({ message: 'Error updating Batch Year' });
    }
});

// Update Branch
router.patch('/update-branch', async (req, res) => {
    const { branch } = req.body;
    const userId = req.userId;

    if (!branch) {
        return res.status(400).send({ message: 'Branch is required' });
    }

    try {
        const user = await User.findByIdAndUpdate(
            userId,
            { branch }, // Update the branch field
            { new: true }
        );
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({ message: 'Branch updated successfully', user });
    } catch (err) {
        console.error('Error updating branch:', err);
        res.status(500).send({ message: 'Error updating Branch' });
    }
});
router.patch('/courses/:courseId/assignment/:assignmentId/complete', async (req, res) => {
    try {
      const { courseId, assignmentId } = req.params;
      const { completed } = req.body;
  
      // Find the course and assignment
      const course = await Course.findById(courseId);
      const assignment = course.assignments.id(assignmentId);
      
      // Update assignment completion status
      assignment.completed = completed;
      if (completed) {
        assignment.completedDate = new Date();
      } else {
        assignment.completedDate = null;
      }
  
      await course.save();
      res.json(course);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update assignment status' });
    }
  });

  router.get('/leaderboard', async (req, res) => {
    try {
        const leaderboard = await User.find({}).sort({ coins: -1 }).select('name coins');
        res.json(leaderboard);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});
  




router.get('/courses', async (req, res) => {
    const { userId } = req.query;
    try {
      const courses = await Course.find({ userId });
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching courses' });
    }
  });
  
  // Add a course for a specific user
  router.post('/courses/add', async (req, res) => {
    const { name, description, userId } = req.body;

    // Simple validation check
    if (!name || !description || !userId) {
        return res.status(400).json({ error: 'Missing required fields: name, description, or userId.' });
    }

    try {
        const course = new Course({ name, description, userId });
        await course.save();
        res.json(course);
    } catch (error) {
        console.error('Error adding course:', error);
        res.status(500).json({ error: 'Error adding course.' });
    }
});


  


// Fetch points for a user
router.get('/api/points/:userId', async (req, res) => {
    const user = await User.findById(req.params.userId);
    res.json({ points: user.points });
});

// Redeem reward
router.post('/api/redeem', async (req, res) => {
    const { userId, cost } = req.body;
    const user = await User.findById(userId);
    if (user.points >= cost) {
        user.points -= cost;
        await user.save();
        res.json({ updatedPoints: user.points });
    } else {
        res.status(400).send('Not enough points');
    }
});



//module.exports=upload;
module.exports = router;
