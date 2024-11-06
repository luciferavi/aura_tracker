import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import axios from 'axios';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:8000/api/signup', { name, email, password });
            alert('Signup successful!');
            navigate('/arena');
        } catch (error) {
            setError(error.response?.data?.message || 'Error creating account');
        }
    };

    const handleGoogleSignup = async () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            await axios.post('http://localhost:8000/api/google-signup', {
                name: user.displayName,
                email: user.email,
            });

            alert('Google Signup successful!');
            navigate('/arena');
        } catch (error) {
            setError('Google Signup failed. Please try again.');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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
                <button type="submit">Sign Up</button>
            </form>
            <button onClick={handleGoogleSignup} className="google-signup-btn">
                Sign Up with Google
            </button>
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
            <p>BACK TO PAVILION <Link to="/">Home</Link></p>
        </div>
    );
}

export default Signup;
