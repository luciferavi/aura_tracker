import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './components/sidebar/sidebar';
function Timetable() {
    const [file, setFile] = useState(null);
    const [photoPath, setPhotoPath] = useState('');

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

    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/user', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.user.photo) {
                setPhotoPath(response.data.user.photo); // Set photo path from the user data
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchUserData(); // Fetch user data when the component mounts
    }, []);

    return (
        <div>

            <h1>Your Timetable</h1>
            {photoPath && (
                <div>
                    <h2>Your Photo:</h2>
                    <img src={`http://localhost:8000/${photoPath}`} alt="User" style={{ maxWidth: '300px', maxHeight: '300px' }} />
                </div>
            )}
            <form onSubmit={handleUpload}>
                <label>Upload your photo:</label>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
}

export default Timetable;



//netstat -aon | findstr :8000
//taskkill /PID 26804 /F