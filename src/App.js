import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import UserAccount from './components/UserAccount';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/userAccount" component={UserAccount} />
          <Route path="/dashboard" component={Dashboard} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
