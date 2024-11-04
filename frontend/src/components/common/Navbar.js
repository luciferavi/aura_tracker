// components/Common/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    // Logout handler
    const handleLogout = () => {
        // Remove the token from localStorage
        localStorage.removeItem('token');
        
        // Redirect to the Home page
        navigate('/');
    };

    return (
        <nav>
            <ul>
            <li><a href="/profile">Profile</a></li>
            
                        <li><a href="/courses">Courses</a></li>
                        <li><a href="/rewards">Rewards</a></li>
                        <li><a href="/challenges">Challenges</a></li>
                        <li><a href="/leaderboards">Leaderboards</a></li>
                        <li><a href="/Calender">Calendar</a></li>
                        <li><a href='/tasks'>task</a></li>
                        <li><a href="/">Logout</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;
