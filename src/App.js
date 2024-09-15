import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
//import Home from './Home/Home';
import SignUp from './SignUp/SignUp';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
       
      </Routes>
    </Router>
  );
}

export default App;
