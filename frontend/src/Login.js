import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
    return (
        <div className="container">
            <h2>Login Page</h2>
            <form>
                <div>
                    <label>Email:</label>
                    <input type="email" required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" required />
                </div>
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
        </div>
    );
}

export default Login;
