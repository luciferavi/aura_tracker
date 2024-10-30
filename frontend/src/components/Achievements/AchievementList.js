// components/Achievements/AchievementList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AchievementList = () => {
    const [achievements, setAchievements] = useState([]);

    useEffect(() => {
        const fetchAchievements = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/achievements', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAchievements(response.data);
        };

        fetchAchievements();
    }, []);

    return (
        <div>
            <h1>Your Achievements</h1>
            <ul>
                {achievements.map(achievement => (
                    <li key={achievement._id}>{achievement.title} - {achievement.description}</li>
                ))}
            </ul>
        </div>
    );
};

export default AchievementList;
