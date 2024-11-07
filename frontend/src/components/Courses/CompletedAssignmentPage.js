// CompletedAssignmentsPage.js
import React from 'react';

const CompletedAssignmentsPage = ({ completedAssignments = [] }) => (
  <div>
    <h1>Completed Assignments</h1>
    {completedAssignments.length === 0 ? (
      <p>No completed assignments yet.</p>
    ) : (
      <ul>
        {completedAssignments.map((assignment, index) => (
          <li key={`${assignment._id}-${index}`}>
            <h3>{assignment.title}</h3>
            <p>Completed on: {new Date(assignment.completedDate).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    )}
  </div>
);


export default CompletedAssignmentsPage;
