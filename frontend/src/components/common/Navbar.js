// components/Common/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Profile from '../Profile/Profile';
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
                <li><Link to="/">Home</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/courses">Courses</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/achievements">Achievements</Link></li>
                <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
        </nav>
    );
};

export default Navbar;
