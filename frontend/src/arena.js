import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './components/sidebar/sidebar';
import './Arena.css';

function Arena() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(prevState => !prevState);
    };

    return (
        <div className="arena-container">
            <div className="arena-header">
                <button className="three-dot-button" onClick={toggleSidebar}>⋮</button>
                <h1 className="arena-title">Welcome to the Arena</h1>
                <Link to="/profile" className="profile-button">Profile</Link>
            </div>
            {isSidebarOpen && <Sidebar />}
            <p>This is your main page after login or signup.</p>
        </div>
    );
}

export default Arena;
