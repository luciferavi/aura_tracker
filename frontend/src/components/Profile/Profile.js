// components/Profile/Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
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
            <h1>Your Profile</h1>
            {user && (
                <div>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <h3>Academic Goals:</h3>
                    <ul>
                        {user.academicGoals && user.academicGoals.map((goal, index) => (
                            <li key={index}>{goal}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Profile;
