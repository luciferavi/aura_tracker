// src/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    return (
        <div className="container">
            <h1>Welcome to Aura Tracker</h1>
            <p>Track your studies and reach your goals effectively.</p>
            <div>
                <Link to="/login">
                    <button>Sign In</button>
                </Link>
                <Link to="/signup">
                    <button>Sign Up</button>
                </Link>
            </div>
        </div>
    );
}

export default Home;
