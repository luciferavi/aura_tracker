// src/Arena.js
import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './components/sidebar/sidebar';
import Profile from './components/Profile/Profile';
function Arena() {
   
    return (

        <div>
                  <Sidebar />


            <h1>Welcome to the Arena</h1>
            <p>This is your main page after login or signup.</p>
            <Link to="/Profile">
                    <button>Profile</button>
                </Link>                </div>

    );
}

export default Arena;
