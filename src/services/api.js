import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/user/',
});

export const registerUser = async (data) => {
  return api.post('register/', data);
};

export const loginUser = async (data) => {
  return api.post('login/', data);
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
