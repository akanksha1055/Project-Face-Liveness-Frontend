import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login/Login';
import ErrorPage from './ErrorPage/ErrorPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Error" element={<ErrorPage />} />
       
      </Routes>
    </Router>
  );
}

export default App;
