// src/components/Dashboard.js

import React, { useEffect, useState } from 'react';
import { getUserDashboard, requestDeposit, requestWithdrawal } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [usdtAddress, setUsdtAddress] = useState('');
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

  const handleDeposit = async () => {
    try {
      const response = await requestDeposit(token, { amount: depositAmount });
      alert(`Deposit request successful: ${response.data.amount}`);
      const dashboardResponse = await getUserDashboard(token);
      setDashboardData(dashboardResponse.data);
      setDepositAmount(''); // Clear the input field
    } catch (error) {
      console.error(error);
    }
  };

  const handleDepositRedirect = () => {
    const amount = prompt('Enter the amount of USDT to deposit');
    if (amount) {
      const depositUrl = `https://www.binance.com/en/my/wallet/account/main/withdrawal/crypto/USDT?address=0x61b99741fb1599f99aa3515627980875655d408f&amount=${amount}`;
      window.location.href = depositUrl;
    }
  };

  const handleWithdrawal = async () => {
    try {
      const response = await requestWithdrawal(token, { amount: withdrawalAmount, usdt_address: usdtAddress });
      alert(`Withdrawal request successful: ${response.data.amount}`);
      const dashboardResponse = await getUserDashboard(token);
      setDashboardData(dashboardResponse.data);
      setWithdrawalAmount(''); // Clear the input field
      setUsdtAddress(''); // Clear the input field
    } catch (error) {
      console.error(error);
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
          
          <div className="input-group">
            <button className="dashboard-button" onClick={handleDepositRedirect}>Deposit USDT</button>
          </div>
          
          <div className="input-group">
            <input 
              className="dashboard-input"
              type="number" 
              value={withdrawalAmount}
              onChange={(e) => setWithdrawalAmount(e.target.value)}
              placeholder="Withdrawal Amount" 
            />
            <input 
              className="dashboard-input"
              type="text" 
              value={usdtAddress}
              onChange={(e) => setUsdtAddress(e.target.value)}
              placeholder="USDT Address" 
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
