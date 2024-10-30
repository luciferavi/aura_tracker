// components/Dashboard/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/auth/user', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(response.data);
        };

        fetchUserProfile();
    }, []);

    return (
        <div>
            <h1>Welcome to your Dashboard!</h1>
            {user && (
                <div>
                    <h2>{user.name}'s Profile</h2>
                    <p>Email: {user.email}</p>
                    <h3>Academic Goals:</h3>
                    <ul>
                        {user.academicGoals && user.academicGoals.map(goal => (
                            <li key={goal}>{goal}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
