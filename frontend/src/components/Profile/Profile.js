import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const Profile = () => {
    const { user } = useAuth(); // Get the user data from context
    const [academicGoals, setAcademicGoals] = useState('');
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Fetch the user's profile data (goals, progress, etc.) from your backend
        const fetchProfileData = async () => {
            try {
                const response = await axios.get(`/api/profile/${user.userId}`);
                setAcademicGoals(response.data.academicGoals);
                setProgress(response.data.progress);
            } catch (error) {
                console.error("Error fetching profile data", error);
            }
        };

        if (user) {
            fetchProfileData();
        }
    }, [user]);

    const handleGoalChange = (e) => {
        setAcademicGoals(e.target.value);
    };

    const handleProgressChange = (e) => {
        setProgress(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/profile/${user.userId}`, {
                academicGoals,
                progress,
            });
            alert('Profile updated successfully!');
        } catch (error) {
            console.error("Error updating profile", error);
        }
    };

    return (
        <div className="profile-container">
            <h1>Your Profile</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Academic Goals:</label>
                    <textarea
                        value={academicGoals}
                        onChange={handleGoalChange}
                        placeholder="Set your academic goals here"
                        required
                    />
                </div>
                <div>
                    <label>Progress (%):</label>
                    <input
                        type="number"
                        value={progress}
                        onChange={handleProgressChange}
                        min="0"
                        max="100"
                        required
                    />
                </div>
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default Profile;
