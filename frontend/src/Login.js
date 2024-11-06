import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import {auth,provider} from '../src/firebase';
import {signInWithPopup} from 'firebase/auth';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:8000/api/login', { email, password });
            localStorage.setItem('token', response.data.token); // Save token in local storage
            alert('Login successful!');
            navigate('/arena'); // Redirect to user profile
        } catch (error) {
            setError('Invalid email or password');
        }
    };

   const handleGoogleSignIn = async () => {
      try {
           const result = await signInWithPopup(auth, provider);
           const user = result.user;

           // Optional: Send the user’s Google token to your backend if needed
           const token = await user.getIdToken();
           console.log('Firebase ID Token:', token); // Check if token is correctly retrieved

           const response = await axios.post('http://localhost:8000/api/google-login', { token });

           localStorage.setItem('token', response.data.token); // Save token in local storage
           alert('Google login successful!');
           //navigate('/arena'); // Redirect to arena or other authenticated page
           navigate('/arena');
       } catch (error) {
           console.error('Google login error:', error);
           setError('Google login failed. Please try again.');
       }
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
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
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
