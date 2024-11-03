import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [file, setFile] = useState(null);
    const [photoPath, setPhotoPath] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8000/api/user', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(response.data.user);
                if (response.data.user.photo) {
                    setPhotoPath(response.data.user.photo); // Set photo path from the user data
                }
            } catch (err) {
                setError('Failed to load user profile');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('photo', file);

        try {
            const response = await axios.post('http://localhost:8000/api/upload-photo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            alert(response.data.message);
            setPhotoPath(response.data.user.photo); // Update photo path after upload
        } catch (error) {
            alert('Error uploading photo');
            console.error('Error uploading photo:', error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>User Profile</h1>
            {user && (
                <div>
                    <img src={`http://localhost:8000/${photoPath}`} alt="Profile" style={{ maxWidth: '300px', maxHeight: '300px' }} />
                    <h2>{user.name}</h2>
                    <p>Email: {user.email}</p>
                    {/* Display additional user info */}
                </div>
            )}
            <form onSubmit={handleUpload}>
                <label>Upload your photo:</label>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default Profile;
