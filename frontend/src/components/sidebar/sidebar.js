// Sidebar.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './sidebar.css'; // Add styles for Sidebar here
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="toggle-icon" onClick={toggleSidebar}>
        ⋮
      </div>
      {isOpen && (
        <div className="menu">
          <button onClick={() => navigate('/course')}>Course</button>
          <button onClick={() => navigate('/rewards')}>Rewards</button>
          <button onClick={() => navigate('/challenges')}>Challenges</button>
          <button onClick={() => navigate('/leaderboard')}>Leaderboards</button>
          <button onClick={() => navigate('/timetable')}>Timetable</button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
//          <button onClick={() => navigate('/profile')}>Profile</button>
