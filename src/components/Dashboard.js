// src/components/Dashboard.js

import React, { useEffect, useState } from 'react';
import { getUserDashboard, requestWithdrawal } from '../services/api';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserDashboard(token);
        setDashboardData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [token]);

  const handleWithdrawal = async () => {
    try {
      const response = await requestWithdrawal(token, { amount: withdrawalAmount });
      alert(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      {dashboardData ? (
        <div>
          <p>Total Deposited: {dashboardData.user_total_deposited}</p>
          <p>Total Withdrawn: {dashboardData.total_withdrawn}</p>
          <p>Current Balance: {dashboardData.current_balance}</p>
          <p>Profit Percentage: {dashboardData.profit_percentage}%</p>
          <input 
            type="number" 
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(e.target.value)}
            placeholder="Withdrawal Amount" 
          />
          <button onClick={handleWithdrawal}>Request Withdrawal</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
