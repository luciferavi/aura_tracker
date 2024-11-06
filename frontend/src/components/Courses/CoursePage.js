import React, { useEffect, useState, useCallback } from 'react';
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
  const [loading, setLoading] = useState(false); 

  // Fetch courses from the backend when the component mounts
  const fetchCourses = useCallback(async () => {
    if (loading) return; // Avoid multiple fetches simultaneously
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/courses');
      setCourses(response.data); // Set courses directly without pagination
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  // Trigger fetchCourses when the page mounts
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

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

  return (
    <div>
      <h1>Courses</h1>
      <CourseForm addCourse={addCourse} />

      {courses.map(course => (
        <div key={course._id}>
          <h2>{course.name}</h2>
          <p>{course.description}</p>
          <h3>Assignments</h3>
          
          {/* Table for displaying assignments */}
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Deadline</th>
                <th>Completed</th>
              </tr>
            </thead>
            <tbody>
              {course.assignments?.map(assignment => (
                <tr key={assignment._id}>
                  <td>{assignment.title}</td>
                  <td>{new Date(assignment.deadline).toLocaleDateString()}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={assignment.completed}
                      onChange={() => updateAssignmentStatus(course._id, assignment._id, !assignment.completed)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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

      {loading && <p>Loading courses...</p>} {/* Show loading indicator */}
    </div>
  );
};

export default CoursesPage;
