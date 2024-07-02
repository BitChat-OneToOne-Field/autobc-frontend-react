import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [usdtAddress, setUsdtAddress] = useState('');
  const [binanceId, setBinanceId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    try {
      const response = await axios.post('http://localhost:8000/api/user/register/', {
        email,
        usdt_address: usdtAddress,
        binance_id: binanceId,
        password
      });
      localStorage.setItem('token', response.data.access);
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration failed', error);
      alert('Registration failed. Please check your input.');
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-header">Register</h2>
      <form onSubmit={handleRegister}>
        <div className="input-group">
          <input
            type="email"
            className="register-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            className="register-input"
            placeholder="USDT Address"
            value={usdtAddress}
            onChange={(e) => setUsdtAddress(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            className="register-input"
            placeholder="Binance ID"
            value={binanceId}
            onChange={(e) => setBinanceId(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            className="register-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            className="register-input"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
};

export default Register;
