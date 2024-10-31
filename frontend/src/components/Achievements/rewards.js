import React from 'react';
import './rewards.css';

const RewardsPage = () => {
    const points = 120; // Replace with actual points from user data
    const rewards = [
        { id: 1, name: 'Free Coffee', cost: 100 },
        { id: 2, name: 'Discount Voucher', cost: 200 },
        { id: 3, name: 'Gift Card', cost: 300 },
    ];

    return (
        <div className="rewards-container">
            <h1>Your Rewards</h1>
            <p>You currently have {points} points!</p>

            <div className="points-display">
                <div className="points-circle">
                    <span>{points}</span>
                </div>
            </div>

            <h2>Available Rewards</h2>
            <div className="rewards-list">
                {rewards.map(reward => (
                    <div key={reward.id} className="reward-card">
                        <h3>{reward.name}</h3>
                        <p>Cost: {reward.cost} points</p>
                        <button className="redeem-button">Redeem</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RewardsPage;
