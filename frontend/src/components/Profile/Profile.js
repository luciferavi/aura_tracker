// Profile.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();

  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    progress: 75, 
    profilePhoto: "C:\Users\aggra\OneDrive\Pictures\Screenshots 1\IMG20230414195936.jpg", // Replace with the actual path
  };

  return (
    <div className="profile-container">
      {/* User Photo and Basic Info */}
      <div className="user-info">
        <img src={user.profilePhoto} alt="User Photo" className="profile-photo" />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>

      {/* Progress Bar */}
      <div className="progress-section">
        <label>Progress:</label>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${user.progress}%` }}></div>
        </div>
        <span>{user.progress}%</span>
      </div>

      {/* Badges Section */}
      <div className="badges-section">
        <h3>Badges</h3>
        <div className="badges">
          {/* Display badges here; currently, badges are placeholders */}
          <div className="badge">Badge 1</div>
          <div className="badge">Badge 2</div>
          <div className="badge">Badge 3</div>
        </div>
      </div>

      {/* Set Academic Goals Button */}
      <button className="set-goals-btn" onClick={() => navigate('/course')}>
        Set Academic Goals
      </button>
    </div>
  );
};

export default Profile;
