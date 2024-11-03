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


//module.exports=upload;
module.exports = router;
