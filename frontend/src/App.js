import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home'; 
import { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import Arena from './arena';
//import Timetable from './timetable';
import Dashboard from './components/Dashboard/Dashboard';
import CourseForm from './components/Courses/CourseForm';
import CoursesPage from './components/Courses/CoursePage';
import Profile from './components/Profile/Profile';
import RewardsPage from './components/Achievements/rewards';
import PrivateRoute from './components/common/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import Timetable from './timetable';
import Calendar from './components/Calender';
import TaskManager from './components/tasks';
function App() {
 //                <Route path="/courses" element={<PrivateRoute element={<CourseForm/>} />} />


    return (
<AuthProvider>
        <Router>
        
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/arena" element={<Arena />} />
                <Route path="/Calender" element={<PrivateRoute element ={<Calendar />}/>} />
                <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
                <Route path="/courses" element={<PrivateRoute element={<CoursesPage/>} />} />
                <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
                <Route path="/rewards" element={<RewardsPage />} />
                <Route path="/tasks" element={<PrivateRoute element={<TaskManager />}/>} />

            </Routes>
        </Router>
        </AuthProvider>
    );
}

export default App;
//Router is the main provider component for routing in React apps. It enables all child components to access routing-related functionalities, like navigating between pages, reading the current URL, and updating the browser history.
//Routes is a container component that groups all of your route definitions. It replaces the older Switch component (used in earlier versions of react-router-dom) and automatically renders only the first matching <Route>.

//Each <Route> component inside <Routes> specifies a unique path and the component to render when that path matches the URL. This setup allows for conditional rendering based on the URL.