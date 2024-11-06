require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
const connectDB = require('./config/db'); // Correct path to db.js
const authRoutes = require('./routes/auth'); // Adjust the import path if needed
const profileRoutes=require('./routes/profile');
const timetableRoutes = require('./routes/timetable'); // Import the timetable route
const taskRoutes = require('./routes/tasks');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cookieSession = require('cookie-session');
//const admin=require('firebase-admin');
const courseRoutes=require('./routes/course');

const app = express();
//admin.initializeApp({
  //  credential: admin.credential.cert(require('./path-to-service-account-key.json')),
//  });
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/tasks', taskRoutes);
//app.use((req, res, next) => {
//    res.removeHeader('Cross-Origin-Opener-Policy');
//    res.removeHeader('Cross-Origin-Embedder-Policy');
//    next();
//  });
  
//app.use('/api/auth', require('./routes/auth'));
app.use('/api/courses', require('./routes/course'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/achievements', require('./routes/achievement'));
// Connect to MongoDB
app.use('/api/timetable', timetableRoutes); // Add the timetable route
// Use the auth routes
app.use('/api', authRoutes);//carefull

//app.use(
   // cookieSession({
   //   name: 'session',
   //   keys: [process.env.COOKIE_KEY],
   //   maxAge: 24 * 60 * 60 * 1000, // 1 day
   // })
 // );
  
  // Initialize passport
  app.use(passport.initialize());
  app.use(passport.session());
  
  // Configure passport to use Google Strategy
  //passport.use(
  //  new GoogleStrategy(
  //    {
  //      clientID: process.env.GOOGLE_CLIENT_ID,
  //      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  //      callbackURL: '/auth/google/callback',
  //    },
  //    (accessToken, refreshToken, profile, done) => {
  //      // Here you could save the user to your database
  //      return done(null, profile);
    //  }
    //)
  ////);
  
  // Serialize and deserialize user
 // passport.serializeUser((user, done) => done(null, user));
 // passport.deserializeUser((user, done) => done(null, user));
  
  // Route to initiate Google login
 // app.get(
  //  '/auth/google',
 //   passport.authenticate('google', { scope: ['profile', 'email'] })
 // );
  
  // Route to handle Google callback
 // app.get(
 //   '/auth/google/callback',
 //   passport.authenticate('google', {
 //     failureRedirect: '/',
 //     successRedirect: '/arena', // Change this to the path you want after login
 //   })
 // );



  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });








connectDB();

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
