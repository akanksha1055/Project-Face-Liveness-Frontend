import React from 'react';
import ErrorRobo from "../Assets/error.png";
import "./ErrorPage.css";

const ErrorPage = () => {
  return (
    <div className='errorPage'>
       <div className='error_txt_div'>
            <h1>404</h1>
            <h4>oops....</h4>
            <h4>page not found</h4>
       </div>
       <div className='error_img_div'>
            <img src={ErrorRobo} alt="errorrobo" />
       </div>
    </div>
  )
}

export default ErrorPage 