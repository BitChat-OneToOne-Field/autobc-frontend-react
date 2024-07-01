import React, { useEffect, useState } from 'react';
import { getUserDashboard, generateDepositAddress, checkDeposits, requestWithdrawal } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [depositAmount, setDepositAmount] = useState('');
  const [depositAddress, setDepositAddress] = useState('');
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [usdtAddress, setUsdtAddress] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await getUserDashboard();
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      }
    };

    fetchDashboardData();
  }, []);

  const handleGenerateDepositAddress = async () => {
    try {
      const response = await generateDepositAddress(depositAmount);
      setDepositAddress(response.data.address);
    } catch (error) {
      console.error('Error generating deposit address', error);
    }
  };

  const handleCheckDeposits = async () => {
    try {
      await checkDeposits();
      const response = await getUserDashboard();
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error checking deposits', error);
    }
  };

  const handleWithdrawal = async () => {
    try {
      const response = await requestWithdrawal(withdrawalAmount, usdtAddress);
      alert(`Withdrawal request successful: ${response.data.amount}`);
      const dashboardResponse = await getUserDashboard();
      setDashboardData(dashboardResponse.data);
      setWithdrawalAmount('');
      setUsdtAddress('');
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
          
          <div className="input-group">
            <input 
              className="dashboard-input"
              type="number" 
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              placeholder="Deposit Amount" 
            />
            <button className="dashboard-button" onClick={handleGenerateDepositAddress}>Generate Deposit Address</button>
          </div>
          {depositAddress && (
            <div>
              <p>Send your USDT to the following address:</p>
              <p>{depositAddress}</p>
            </div>
          )}
          <button className="dashboard-button" onClick={handleCheckDeposits}>Check Deposits</button>
          
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
