import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import { auth, provider } from '../src/firebase';
import { signInWithPopup } from 'firebase/auth';

// Set up Axios to include JWT token in headers for all future requests
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    console.log("Attaching Token:", token); // Debugging
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

  

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
    
        try {
            const response = await axios.post('http://localhost:8000/api/login', { email, password });
    
            console.log("Received Token:", response.data.token); // Debugging step
            console.log("User ID:", response.data.userId);
    
            if (response.data.token) {
                localStorage.setItem('token', response.data.token); 
                localStorage.setItem('userId', response.data.userId);
                alert('Login successful!');
                navigate('/arena');
            } else {
                setError("Token not received from backend");
            }
        } catch (error) {
            setError('Invalid email or password');
        }
    };
    

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Send Firebase ID token to your backend to generate your own JWT
            const firebaseToken = await user.getIdToken();
            const response = await axios.post('http://localhost:8000/api/google-signup', { token: firebaseToken });

            // Save the token FROM YOUR BACKEND (not the Firebase token)
            localStorage.setItem('token', response.data.token); 
            localStorage.setItem('userId', response.data.userId);

            alert('Google login successful!');
            navigate('/arena');
        } catch (error) {
            console.error('Google login error:', error);
            setError('Google login failed. Please try again.');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="container">
            <h2>Login Page</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="password-field">
                    <label>Password:</label>
                    <div className="input-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span onClick={togglePasswordVisibility} className="eye-icon">
                            {showPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                        </span>
                    </div>
                </div>
                <button type="submit">Login</button>
            </form>
            <button onClick={handleGoogleSignIn} className="google-signin-button">Login with Google</button>

            <p>
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
            <p>BACK TO PAVILION <Link to="/">Home</Link></p>
        </div>
    );
}

export default Login;