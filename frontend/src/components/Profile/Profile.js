// components/Profile/Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
//change get->fetch
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.fetch('http://localhost:5000/api/user', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(response.data);
            } catch (err) {
                setError('Failed to load user profile');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>User Profile</h1>
            {user && (
                <div>
                    <img src={user.photo} alt="Profile" />
                    <h2>{user.name}</h2>
                    <p>Email: {user.email}</p>
                    {/* Display additional user info */}
                </div>
            )}
        </div>
    );
};

export default Profile;
