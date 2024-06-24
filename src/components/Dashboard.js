// src/components/Dashboard.js

import React, { useEffect, useState } from 'react';
import { getUserDashboard } from '../services/api';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
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

  return (
    <div>
      <h2>Dashboard</h2>
      {dashboardData ? (
        <div>
          <p>Total Deposited: {dashboardData.user_total_deposited}</p>
          <p>Total Transactions: {dashboardData.total_transactions}</p>
          <p>Profit Percentage: {dashboardData.user_profit_percentage}%</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
