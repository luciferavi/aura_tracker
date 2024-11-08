import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Leaderboard.css'
const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(null);

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/leaderboard');
      setLeaderboard(response.data);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
      setError('Failed to load leaderboard. Please try again later.');
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {leaderboard.map((user, index) => (
            <li key={user._id}>
              {index + 1}. {user.name} - {user.coins} coins
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Leaderboard;
