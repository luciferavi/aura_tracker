import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css'; // Importing the CSS file for styling

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
        <div className="profile-container">
            <h1>Student Profile</h1>

            {/* Profile Overview */}
            <div className="profile-overview">
                <div className="profile-photo-container">
                    <img
                        src={photoPath ? `http://localhost:8000/${photoPath}` : 'default-avatar.jpg'}
                        alt="Profile"
                        className="profile-photo"
                    />
                    {photoPath ? (
                        <div className="update-photo-container">
                            <h3>Update Profile Photo</h3>
                            <form onSubmit={handleUpload}>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                />
                                <button type="submit">Update</button>
                            </form>
                        </div>
                    ) : (
                        <div className="upload-photo-container">
                            <h3>Upload Profile Photo</h3>
                            <form onSubmit={handleUpload}>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    required
                                />
                                <button type="submit">Upload</button>
                            </form>
                        </div>
                    )}
                </div>
                <div className="user-details">
                    <h2>{user.name}</h2>
                    <p>Email: {user.email}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
