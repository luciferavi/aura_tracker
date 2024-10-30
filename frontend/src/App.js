import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home'; // Corrected case
import Login from './Login';
import Signup from './Signup';
import Arena from './arena';
import Time_table from './timetable';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/arena" element={<Arena />} />
                <Route path="/timetable" element={<Time_table/>}/>
            </Routes>
        </Router>
    );
}

export default App;
