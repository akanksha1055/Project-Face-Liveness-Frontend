import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Login from './Login/Login';

import ErrorPage from './ErrorPage/ErrorPage';

import ForgetPassword from './ForgetPassword/ForgetPassword';
import ResetPassword from './ResetPassword/ResetPassword';
import SignUp from './SignUp/SignUp';
import Dashboard from './Dashboard/Dashboard';
import IHavePassword from './IHavePassword/IHavePassword';

import ErrorPage from './ErrorPage/ErrorPage';


function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/Error" element={<ErrorPage />} />
       

        <Route path="/signup" element={< SignUp/>} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/reset_password" element={<ResetPassword />} />
        <Route path="/Dashboard" element={< Dashboard/>} />
        <Route path="/IHavePassword" element={< IHavePassword/>} />

        <Route path="/Error" element={<ErrorPage />} />
       
      </Routes>
    </Router>
  );
}

export default App;
