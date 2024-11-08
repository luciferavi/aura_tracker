import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Make sure you have the corresponding CSS file

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu toggle
    const navigate = useNavigate();

    // Logout handler
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    // Function to toggle mobile menu visibility
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className={`navbar ${isMenuOpen ? 'open' : ''}`}>
            <div className="navbar-container">
                <Link to="" className="logo">AURA TRACKER</Link>
                <button className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <span className="line"></span>
                    <span className="line"></span>
                    <span className="line"></span>
                </button>
                <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
                    <li><Link to="/profile" className="navbar-link">Profile</Link></li>
                    <li><Link to="/courses" className="navbar-link">Courses</Link></li>
                    <li><Link to="/challenges" className="navbar-link">Challenges</Link></li>
                    <li><Link to="/leaderboards" className="navbar-link">Leaderboard</Link></li>
                    <li><a href="/" onClick={handleLogout} className="navbar-link logout">Logout</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
