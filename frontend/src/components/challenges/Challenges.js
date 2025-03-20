import React, { useState } from 'react';
import './Challenges.css';

const Challenges = () => {
  const [challenges, setChallenges] = useState([
    { id: 1, name: 'Complete 5 assignments', status: 'Incomplete' },
    { id: 2, name: 'Attend 3 study groups', status: 'Incomplete' },
    { id: 3, name: 'Score above 90% on a test', status: 'Incomplete' },
  ]);

  const updateStatus = (id) => {
    setChallenges(challenges.map(challenge => 
      challenge.id === id ? { ...challenge, status: 'Complete' } : challenge
    ));
  };

  return (
    <div className="challenges-container">
      <h2 className="challenges-header">Your Challenges</h2>
      {challenges.map((challenge) => (
        <div key={challenge.id} className="challenge-item">
          <div className="challenge-ribbon">Challenge</div>
          <div className="challenge-icon">🔥</div>
          <div className="challenge-name">{challenge.name}</div>
          <div className="challenge-status">{challenge.status}</div>
          {challenge.status === 'Incomplete' && (
            <button
              className="status-button status-incomplete"
              onClick={() => updateStatus(challenge.id)}
            >
              Mark Complete
            </button>
          )}
          {challenge.status === 'Complete' && (
            <button className="status-button status-complete">
              Completed
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Challenges;
//now i am workin on it