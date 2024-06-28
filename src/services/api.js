// src/services/api.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

// const userapi = axios.create({
//   userbaseurl: 'http://127.0.0.1:8000/api/user/'
// });

export const registerUser = async (data) => {
  return api.post('user/register/', data);
};

export const loginUser = async (data) => {
  return api.post('user/login/', data);
};

export const getUserAccount = async (token) => {
  return api.get('account/', {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getUserDashboard = async (token) => {
  return api.get('dashboard/', {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const requestWithdrawal = async (token, data) => {
  return api.post('withdraw/', data, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

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
