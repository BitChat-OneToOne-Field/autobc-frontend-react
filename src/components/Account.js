// src/components/Account.js

import React, { useEffect, useState } from 'react';
import { getUserAccount } from '../services/api';

const Account = () => {
  const [accountData, setAccountData] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserAccount(token);
        setAccountData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div>
      <h2>Account</h2>
      {accountData ? (
        <div>
          <p>Email: {accountData.email}</p>
          {/* Display other account information here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Account;
