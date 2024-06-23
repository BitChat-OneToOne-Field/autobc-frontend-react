import React, { useState, useEffect } from 'react';
import { getUserAccount } from '../services/api';

const UserAccount = () => {
  const [accountData, setAccountData] = useState(null);

  useEffect(() => {
    const fetchAccountData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await getUserAccount(token);
          setAccountData(response.data);
        } catch (error) {
          console.error(error.response.data);
        }
      }
    };
    fetchAccountData();
  }, []);

  return (
    <div>
      <h2>User Account</h2>
      {accountData && (
        <div>
          <p>Email: {accountData.email}</p>
          <p>Total Deposited: {accountData.total_deposited}</p>
        </div>
      )}
    </div>
  );
};

export default UserAccount;
