import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
//import Home from './Home/Home';
import SignUp from './SignUp/SignUp';

import Login from './Login/Login';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
       
      </Routes>
    </Router>
  );
}

export default App;
