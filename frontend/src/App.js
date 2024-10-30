import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home'; 
import Login from './Login';
import Signup from './Signup';
import Arena from './arena';
import TimeTable from './timetable'; // Adjusted to PascalCase
import Navbar from './components/common/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import CourseList from './components/Courses/CourseList';
import CourseDetail from './components/Courses/CourseDetail';
import Profile from './components/Profile/Profile';
import AchievementList from './components/Achievements/AchievementList';
import PrivateRoute from './components/common/PrivateRoute';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/arena" element={<Arena />} />
                <Route path="/timetable" element={<TimeTable />} />
                <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
                <Route path="/courses" element={<PrivateRoute component={CourseList} />} />
                <Route path="/courses/:id" element={<PrivateRoute component={CourseDetail} />} />
                <Route path="/profile" element={<PrivateRoute component={Profile} />} />
                <Route path="/achievements" element={<PrivateRoute component={AchievementList} />} />
            </Routes>
        </Router>
    );
}

export default App;
