import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import CompletedAssignmentsPage from './CompletedAssignmentPage';
import RewardsPage from '../Achievements/rewards';
import './CourseForm.css';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [completedAssignments, setCompletedAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [points, setPoints] = useState(0);
  const [activeTab, setActiveTab] = useState('courses');
const token =localStorage.getItem('token');
  const getPointsKey = (userId) => `points_${userId}`;

  const fetchCourses = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/courses', {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in headers
        },
      });
      setCourses(response.data);
      const completedAssignments = response.data
        .flatMap(course => course.assignments)
        .filter(assignment => assignment.completed);
      setCompletedAssignments(completedAssignments);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  }, [loading,token]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const addCourse = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/api/courses',
        { name: courseName, description: courseDescription },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        }
      );
      setCourses([...courses, response.data]);
      setCourseName('');
      setCourseDescription('');
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  const deleteCourse = async (courseId) => {
    try {
      await axios.delete(`http://localhost:8000/api/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in headers
        },
      });
      setCourses(courses.filter(course => course._id !== courseId));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const addAssignment = async (courseId, assignmentData) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/courses/${courseId}/assignment`,
        assignmentData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        }
      );
      setCourses(courses.map(c => (c._id === courseId ? response.data : c)));
    } catch (error) {
      console.error('Error adding assignment:', error.response?.data || error.message, error);
    }
  };

  const updateAssignmentStatus = async (courseId, assignmentId, completed) => {
    try {
        const response = await axios.patch(
            `http://localhost:8000/api/courses/${courseId}/assignment/${assignmentId}`,
            { completed },
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Include token in headers
                },
            }
        );

        const updatedCourse = response.data.course; // Get updated course
        const updatedPoints = response.data.updatedPoints; // Get updated points

        // Update the course data in state
        setCourses(courses.map(c => (c._id === courseId ? updatedCourse : c)));

        // Update completed assignments list
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
        }

        // Update the points state with the new points
        updatePoints(updatedPoints); // Update points with the response from the server

    } catch (error) {
        console.error('Error updating assignment status:', error.response?.data || error.message, error);
    }
};


  return (
    <div className="courses-page">
      <nav className="navbar">
        <button
          className={activeTab === 'courses' ? 'active' : ''}
          onClick={() => setActiveTab('courses')}
        >
          Courses
        </button>
        <button
          className={activeTab === 'completedAssignments' ? 'active' : ''}
          onClick={() => setActiveTab('completedAssignments')}
        >
          Completed Assignments
        </button>
        <button
          className={activeTab === 'rewards' ? 'active' : ''}
          onClick={() => setActiveTab('rewards')}
        >
          Rewards
        </button>
      </nav>

      <main className="content">
        {activeTab === 'courses' && (
          <div>
            <h2>Courses</h2>
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
                <div key={course._id} className="course-item">
                  <h3>{course.name}</h3>
                  <p>{course.description}</p>
                  <button onClick={() => deleteCourse(course._id)}>Delete Course</button>
                  <h4>Assignments</h4>

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

                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const title = e.target.title.value;
                    const deadline = e.target.deadline.value;
                    addAssignment(course._id, { title, deadline });
                    e.target.reset();
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
          </div>
        )}

        {activeTab === 'completedAssignments' && (
          <CompletedAssignmentsPage completedAssignments={completedAssignments} />
        )}

        {activeTab === 'rewards' && (
          <RewardsPage points={points} />
        )}
      </main>
    </div>
  );
};

export default CoursesPage;
