import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2'; 


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LeetCodeProfile = ({ username }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    if (username) {  
      axios
        .get(`http://127.0.0.1:5000/leetcode/${username}`)
        .then((response) => {
          setUserData(response.data.data.matchedUser);  
          setLoading(false);
        })
        .catch((err) => {
          setError('Error fetching user data');
          setLoading(false);
        });
    }

   
  }, [username]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!userData) {
    return <p>Invalid or missing data.</p>;
  }

  
  const stats = userData.submitStats.acSubmissionNum;
  const difficultyLabels = stats.map(stat => stat.difficulty);
  const difficultyCount = stats.map(stat => stat.count);

  const chartData = {
    labels: difficultyLabels,
    datasets: [
      {
        label: 'Problems Solved',
        data: difficultyCount,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      }
    ]
  };

  return (
    <div className="profile-info">
      <h2>LeetCode Profile of {userData.username}</h2>
      <p><strong>Real Name:</strong> {userData.profile.realName}</p>
      <p><strong>Ranking:</strong> {userData.profile.ranking}</p>

      <h3>Submission Stats</h3>
      {stats.map((stat, index) => (
        <div key={index}>
          <p><strong>Difficulty:</strong> {stat.difficulty}</p>
          <p><strong>Count:</strong> {stat.count}</p>
        </div>
      ))}

      {}
      <div className="chart-container">
        <h3>Problem Solving Stats</h3>
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default LeetCodeProfile;
