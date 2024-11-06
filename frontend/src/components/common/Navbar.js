// components/Common/Navbar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Make sure you have this file for the styling

const Navbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to toggle sidebar
    const navigate = useNavigate();

    // Logout handler
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    // Function to toggle sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div>
            <button className="sidebar-toggle" onClick={toggleSidebar}>
                <span className={`hamburger-icon ${isSidebarOpen ? 'open' : ''}`}></span>
            </button>

            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h2>Dashboard</h2>
                </div>
                <ul className="sidebar-list">
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/courses">Courses</Link></li>
                    <li><Link to="/rewards">Rewards</Link></li>
                    <li><Link to="/challenges">Challenges</Link></li>
                    <li><Link to="/leaderboards">Leaderboards</Link></li>
                    <li><Link to="/calendar">Calendar</Link></li>
                    <li><Link to="/tasks">Tasks</Link></li>
                    <li><a href="/" onClick={handleLogout}>Logout</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
