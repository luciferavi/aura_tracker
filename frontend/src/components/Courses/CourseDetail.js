// components/Courses/CourseDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get(`/api/courses/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCourse(response.data);
        };

        fetchCourse();
    }, [id]);

    return (
        <div>
            {course ? (
                <div>
                    <h1>{course.name}</h1>
                    <p>{course.description}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default CourseDetail;
