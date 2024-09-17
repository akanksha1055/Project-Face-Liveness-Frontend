import React from 'react';
import Mini from "../Assets/minion.png";
import "./ErrorPage.css";
import { FaHouseUser } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="Error_page">
      <div className="minion-image">
        <img src={Mini} alt="Minions on a Scooter" />
      </div>
      <div className='text_div'>
        <h1>404</h1>
        <p>Page not found</p>
          
          <button className="buttons" onClick={() => window.location.href = '/'}>
             <span className='home_icon'><FaHouseUser /></span>
             Home
          </button>
        
      </div>
    </div>
  )
}

export default ErrorPage