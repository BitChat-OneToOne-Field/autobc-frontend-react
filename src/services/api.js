// src/services/api.js

// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000/api/',
// });

// // const userapi = axios.create({
// //   userbaseurl: 'http://127.0.0.1:8000/api/user/'
// // });

// export const registerUser = async (data) => {
//   return api.post('user/register/', data);
// };

// export const loginUser = async (data) => {
//   return api.post('user/login/', data);
// };

// export const getUserAccount = async (token) => {
//   return api.get('account/', {
//     headers: { Authorization: `Bearer ${token}` }
//   });
// };

// export const getUserDashboard = async (token) => {
//   return api.get('dashboard/', {
//     headers: { Authorization: `Bearer ${token}` }
//   });
// };

// export const requestDeposit = async (token, data) => {
//   return api.get('deposit/', {
//     headers: {Authorization: `Bearer ${token}`}
//   });
// };

// export const requestWithdrawal = async (token, data) => {
//   return api.post('withdraw/', data, {
//     headers: { Authorization: `Bearer ${token}` }
//   });
// };

//////////////////////////////////////////////////////////////////////////////////////

// // src/services/api.js
// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000/api/',
// });

// export const registerUser = async (data) => api.post('user/register/', data);
// export const loginUser = async (data) => api.post('user/login/', data);
// export const getUserAccount = async (token) => api.get('account/', {
//   headers: { Authorization: `Bearer ${token}` }
// });
// export const getUserDashboard = async (token) => api.get('dashboard/', {
//   headers: { Authorization: `Bearer ${token}` }
// });




/////////////////// generate-address router ///////////////////////////
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

const token = localStorage.getItem('token');

export const getUserAccount = async (token) => {
  return await axios.get(`${API_URL}account/`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

const registerUser = async (data) => {
  return await axios.post(`${API_URL}user/register/`, data);
};

const loginUser = async (data) => {
  return await axios.post(`${API_URL}user/login/`, data);
};

const getUserDashboard = async () => {
  return await axios.get(`${API_URL}dashboard/`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
};

const generateDepositAddress = async (amount) => {
  return await axios.post(`${API_URL}generate-deposit-address/`, { amount }, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
};

const checkDeposits = async () => {
  return await axios.get(`${API_URL}check-deposits/`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
};

const requestWithdrawal = async (amount, usdt_address) => {
  return await axios.post(`${API_URL}withdraw/`, { amount, usdt_address }, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
};

export { registerUser, loginUser, getUserDashboard, generateDepositAddress, checkDeposits, requestWithdrawal };
