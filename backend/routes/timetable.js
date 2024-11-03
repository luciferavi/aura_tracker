const express = require('express');
const router = express.Router();
const Timetable = require('../models/Timetable'); // Import the Timetable model
/*
// Route to create a new timetable event
router.post('/', async (req, res) => {
    try {
        const { title, start, end, userId } = req.body;
        
        // Create a new timetable event
        const newEvent = new Timetable({ title, start, end, userId });
        
        // Save the event to the database
        await newEvent.save();
        
        res.status(201).json({ message: 'Event saved successfully', event: newEvent });
    } catch (error) {
        console.error('Error saving event:', error);
        res.status(500).json({ error: 'Failed to save event' });
    }
});

// Route to get all timetable events for a specific user
router.get('/', async (req, res) => {
    try {
        const { userId } = req.query;
        
        // Find events for the given user ID
        const events = await Timetable.find({ userId });
        
        res.json({ events });
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});
*/
router.put('/timetable/:id', async (req, res) => {
    try {
        const { title, start, end } = req.body;
        const updatedEvent = await Timetable.findByIdAndUpdate(req.params.id, { title, start, end }, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json({ message: 'Event updated successfully', event: updatedEvent });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update event' });
    }
});

module.exports = router;
