import React, { useEffect, useState } from 'react';
import { getUserDashboard, checkDeposits, requestWithdrawal } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await getUserDashboard(token);
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      }
    };

    fetchDashboardData();
  }, [token]);

  const handleCheckDeposits = async () => {
    try {
      await checkDeposits(token);
      const response = await getUserDashboard(token);
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error checking deposits', error);
    }
  };

  const handleWithdrawal = async () => {
    try {
      const response = await requestWithdrawal(token, { amount: withdrawalAmount });
      alert(`Withdrawal request successful: ${response.data.amount}`);
      const dashboardResponse = await getUserDashboard(token);
      setDashboardData(dashboardResponse.data);
      setWithdrawalAmount('');
    } catch (error) {
      console.error('Error requesting withdrawal', error);
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-header">Dashboard</h2>
      {dashboardData ? (
        <div className="dashboard-content">
          <p>Total Deposited: {dashboardData.total_deposited}</p>
          <p>Total Withdrawn: {dashboardData.total_withdrawn}</p>
          <p>Current Balance: {dashboardData.current_balance}</p>
          <p>Profit Percentage: {dashboardData.profit_percentage}%</p>
          <button className="dashboard-button" onClick={handleCheckDeposits}>Check Deposits</button>
          <div className="input-group">
            <input 
              className="dashboard-input"
              type="number" 
              value={withdrawalAmount}
              onChange={(e) => setWithdrawalAmount(e.target.value)}
              placeholder="Withdrawal Amount" 
            />
            <button className="dashboard-button" onClick={handleWithdrawal}>Request Withdrawal</button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
