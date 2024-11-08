import React, { useState } from 'react';
import './sidebar.css'; // Create a CSS file for styling the sidebar

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button className="sidebar-toggle" onClick={toggleSidebar}>•••</button>
            {isOpen && (
                <div className="sidebar">
                    <ul>
                        <li><a href="/profile">Profile</a></li>
                        <li><a href="/courses">Courses</a></li>
                        <li><a href="/rewards">Rewards</a></li>
                        <li><a href="/Challenges">Challenges</a></li>
                        <li><a href="/leaderboards">Leaderboards</a></li>
                        <li><a href="/timetable">Timetable</a></li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
