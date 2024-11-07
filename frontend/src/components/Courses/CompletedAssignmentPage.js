import React from 'react';

const CompletedAssignmentsPage = ({ completedAssignments }) => (
  <div>
    <h1>Completed Assignments</h1>
    <ul>
      {completedAssignments.map((assignment) => (
        <li key={assignment._id}>
          <h3>{assignment.title}</h3>
          <p>Completed on: {new Date(assignment.completedDate).toLocaleDateString()}</p>
        </li>
      ))}
    </ul>
  </div>
);

export default CompletedAssignmentsPage;
