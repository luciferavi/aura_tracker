import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import axios from 'axios';
import { useAuth } from './context/AuthContext';

function Signup() {
    const { login } = useAuth(); // Using login from useAuth to log in after signup
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // API request to register the user
            const response = await axios.post('http://localhost:8000/api/signup', { name, email, password });
            alert('Signup successful!');
            
            // Log in the user after signup
            //await login(email, password);
            navigate('/arena'); // Redirect to arena page
        } catch (error) {
            setError(error.response?.data?.message || 'Error creating account');
        }
    };

    return (
        <div className="container">
            <h2>Signup Page</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
            <p>BACK TO PAVILION <Link to="/">Home</Link></p>
        </div>
    );
}

export default Signup;
