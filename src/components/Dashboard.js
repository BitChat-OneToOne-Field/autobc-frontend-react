import React, { useState, useEffect } from 'react';
import { getUserDashboard } from '../services/api';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await getUserDashboard(token);
          setDashboardData(response.data);
        } catch (error) {
          console.error(error.response.data);
        }
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {dashboardData && (
        <div>
          <p>Total Deposited: {dashboardData.user_total_deposited}</p>
          <p>Total Transactions: {dashboardData.total_transactions}</p>
          <p>Profit Percentage: {dashboardData.user_profit_percentage}%</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
