// src/Arena.js
import React from 'react';
import { Link } from 'react-router-dom';

function Arena() {
    return (
        <div>
            <h1>Welcome to the Arena</h1>
            <p>This is your main page after login or signup.</p>
            <Link to="/timetable">
                <p>Go to Timetable</p>
            </Link>    
                </div>
    );
}

export default Arena;