// src/components/Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  console.log("this is a home page");
  return (
    <div className="home-container">
      <h1>Welcome to AutoBC</h1>
      <div className="button-container">
        <Link to="/login" className="home-button">Login</Link>
        <Link to="/register" className="home-button">Register</Link>
      </div>
    </div>
  );
};

export default Home;
