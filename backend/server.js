require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const timetableRoutes = require('./routes/timetable');
const taskRoutes = require('./routes/tasks');
const session = require('express-session');
const passport = require('passport');
const cookieSession = require('cookie-session');
const courseRoutes = require('./routes/course');
const app = express();
const pointsRoutes = require('./routes/points');

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/tasks', taskRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/achievements', require('./routes/achievement'));
app.use('/api/timetable', timetableRoutes); // Add the timetable route
app.use('/api', pointsRoutes);

app.use('/api', authRoutes); // Authentication routes

// Set up session middleware
app.use(session({
  secret: process.env.SESSION_SECRET, // Use a strong secret in production
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' } // Make sure it's `true` if you're using HTTPS in production
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
connectDB();

// Configure Google login (if you're using Google OAuth)
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Google login routes (if Google OAuth is needed)
// Uncomment this part if you're enabling Google OAuth authentication
/*
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
  // You can save the user to your database here
  return done(null, profile);
}));

// Route to initiate Google login
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Route to handle Google callback
app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    successRedirect: '/arena', // After successful login, redirect to arena page
  })
);
*/

app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send('Error logging out');
    }
    res.redirect('/');
  });
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
