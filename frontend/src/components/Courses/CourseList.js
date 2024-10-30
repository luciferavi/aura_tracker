// components/Courses/CourseList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CourseList = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/courses', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCourses(response.data);
        };

        fetchCourses();
    }, []);

    return (
        <div>
            <h1>Course List</h1>
            <ul>
                {courses.map(course => (
                    <li key={course._id}>{course.name} - {course.description}</li>
                ))}
            </ul>
        </div>
    );
};

export default CourseList;
