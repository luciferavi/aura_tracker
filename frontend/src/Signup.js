// src/Signup.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';

function Signup() {
    return (
        <div className="container">
            <h2>Signup Page</h2>
            <form>
                <div>
                    <label>Name:</label>
                    <input type="text" required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" required />
                </div>
                <button type="submit">Sign Up</button>
            </form>
            <p>
                Already have an account? <Link to="/">Login</Link>
            </p>
        </div>
    );
}

export default Signup;
