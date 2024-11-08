import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './rewards.css';
import axios from 'axios';

const RewardsPage = ({points,setPoints}) => {
    const user = useAuth();
   // const [points, setPoints] = useState(0);

    useEffect(() => {
        const fetchPoints = async () => {
            if (user) {
                try {
                    const response = await axios.get(`http://localhost:8000/api/points/${user.id}`);
                    setPoints(response.data.points);
                } catch (error) {
                    console.error('Error fetching points:', error);
                }
            }
        };
        fetchPoints();
    }, [user]);
    const handleCompleteAssignment = async () => {
        try {
            const response = await axios.post(`http://localhost:8000/api/complete-assignment`, { userId: user.id });
            setPoints(response.data.updatedPoints); // Update points with the response from the server
        } catch (error) {
            console.error('Error completing assignment:', error);
        }
    };
    const handleRedeem = async (rewardCost) => {
        if (points >= rewardCost) {
            try {
                const response = await axios.post(`http://localhost:8000/api/redeem`, { userId: user.id, cost: rewardCost });
                setPoints(response.data.updatedPoints);  // assuming backend returns the updated points
            } catch (error) {
                console.error('Error redeeming reward:', error);
            }
        } else {
            alert("Not enough points to redeem this reward.");
        }
    };

    return (
        <div className="rewards-container">
            <h1>Your Rewards</h1>
            <p>You currently have {points} points!</p>

            <div className="points-display">
                <div className="points-circle">
                    <span>{points}</span>
                </div>
            </div>
            <button onClick={handleCompleteAssignment}>Complete Assignment (Add 10 Points)</button>

            <h2>Available Rewards</h2>
            <div className="rewards-list">
                {[
                    { id: 1, name: 'Free Coffee', cost: 100 },
                    { id: 2, name: 'Discount Voucher', cost: 200 },
                    { id: 3, name: 'Gift Card', cost: 300 },
                ].map(reward => (
                    <div key={reward.id} className="reward-card">
                        <h3>{reward.name}</h3>
                        <p>Cost: {reward.cost} points</p>
                        <button className="redeem-button" onClick={() => handleRedeem(reward.cost)}>
                            Redeem
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RewardsPage;
