import React, { useEffect, useState } from 'react';
import axios from 'axios';

// CourseForm component to add new courses
const CourseForm = ({ addCourse }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addCourse({ name, description });
    setName('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Course Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button type="submit">Add Course</button>
    </form>
  );
};

// Main CoursesPage component
const CoursesPage = () => {
  const [courses, setCourses] = useState([]);

  // Fetch courses from the backend when the component mounts
  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/courses');
      setCourses(response.data); // Assign fetched courses to state
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  // Add a new course
  const addCourse = async (courseData) => {
    try {
      const response = await axios.post('http://localhost:8000/api/courses/add', courseData);
      setCourses([...courses, response.data]); // Update state with new course
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  // Add an assignment to a specific course
  const addAssignment = async (courseId, assignmentData) => {
    try {
      const response = await axios.post(`http://localhost:8000/api/courses/${courseId}/assignment`, assignmentData);
      setCourses(courses.map(c => (c._id === courseId ? response.data : c)));
    } catch (error) {
      console.error('Error adding assignment:', error);
    }
  };

  // Update assignment completion status
  const updateAssignmentStatus = async (courseId, assignmentId, completed) => {
    try {
      const response = await axios.patch(`http://localhost:8000/api/courses/${courseId}/assignment/${assignmentId}`, { completed });
      setCourses(courses.map(c => (c._id === courseId ? response.data : c)));
    } catch (error) {
      console.error('Error updating assignment status:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div>
      <h1>Courses</h1>
      <CourseForm addCourse={addCourse} />
      {courses.map(course => (
        <div key={course._id}>
          <h2>{course.name}</h2>
          <p>{course.description}</p>
          <h3>Assignments</h3>
          {course.assignments?.map(assignment => (
            <div key={assignment._id}>
              <span>{assignment.title} - Due: {new Date(assignment.deadline).toLocaleDateString()}</span>
              <input
                type="checkbox"
                checked={assignment.completed}
                onChange={() => updateAssignmentStatus(course._id, assignment._id, !assignment.completed)}
              />
            </div>
          ))}
          {/* Form to add assignments */}
          <form onSubmit={(e) => {
            e.preventDefault();
            const title = e.target.title.value;
            const deadline = e.target.deadline.value;
            addAssignment(course._id, { title, deadline });
            e.target.reset(); // Reset form after submission
          }}>
            <input type="text" name="title" placeholder="Assignment Title" required />
            <input type="date" name="deadline" required />
            <button type="submit">Add Assignment</button>
          </form>
        </div>
      ))}
    </div>
  );
};

export default CoursesPage;
