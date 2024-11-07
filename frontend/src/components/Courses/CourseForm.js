import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import CompletedAssignmentsPage from './CompletedAssignmentPage';
import RewardsPage from '../Achievements/rewards';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [completedAssignments, setCompletedAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [points, setPoints] = useState(120); // Initialize points here

  // Fetch courses from the backend
  const fetchCourses = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/courses');
      console.log('Fetched courses:', response.data); // Check the response

      setCourses(response.data);

      // Filter and set completed assignments for CompletedAssignmentsPage
      const completedAssignments = response.data
        .flatMap(course => course.assignments)
        .filter(assignment => assignment.completed);
      setCompletedAssignments(completedAssignments);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  // Fetch courses on page load
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  // Add a new course
  const addCourse = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/courses/add', {
        name: courseName,
        description: courseDescription,
      });

      setCourses([...courses, response.data]); 
      setCourseName('');
      setCourseDescription('');
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

  // Update assignment completion status and move to CompletedAssignmentsPage if completed
  const updateAssignmentStatus = async (courseId, assignmentId, completed) => {
    try {
      const response = await axios.patch(`http://localhost:8000/api/courses/${courseId}/assignment/${assignmentId}`, { completed });
      const updatedCourse = response.data;

      setCourses(courses.map(c => (c._id === courseId ? updatedCourse : c)));

      const completedAssignment = updatedCourse.assignments.find(a => a._id === assignmentId);
      if (completed) {
        setCompletedAssignments([...completedAssignments, completedAssignment]);
        setCourses(prevCourses =>
          prevCourses.map(course =>
            course._id === courseId
              ? { ...course, assignments: course.assignments.filter(a => a._id !== assignmentId) }
              : course
          )
        );

        // Increase points by 10 for completed assignment
        setPoints(prevPoints => prevPoints + 10);
      }
    } catch (error) {
      console.error('Error updating assignment status:', error);
    }
  };

  return (
    <div>
      <h1>Courses</h1>

      {/* Integrated CourseForm */}
      <form onSubmit={addCourse}>
        <input
          type="text"
          placeholder="Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={courseDescription}
          onChange={(e) => setCourseDescription(e.target.value)}
        ></textarea>
        <button type="submit">Add Course</button>
      </form>

      {courses.length > 0 ? (
        courses.map(course => (
          <div key={course._id}>
            <h2>{course.name}</h2>
            <p>{course.description}</p>
            <h3>Assignments</h3>

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
        ))
      ) : (
        <p>No courses available.</p>
      )}

      {loading && <p>Loading courses...</p>}

      {/* Render CompletedAssignmentsPage with completed assignments */}
      <CompletedAssignmentsPage completedAssignments={completedAssignments} />

      {/* Pass points to RewardsPage */}
      <RewardsPage points={points} />
    </div>
  );
};

export default CoursesPage;
