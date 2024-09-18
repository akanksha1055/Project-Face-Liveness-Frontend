import React, { useState } from "react";
import loginLogo from "../Assets/logo.png";
import "./Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [visible, setVisible] = useState(false); 
  const [showOtp , setOtp] =  useState(false);

  return (
    <div className="Login_Body">
      <div className="login_div">
        <div className="login_box">
          <img src={loginLogo} alt="Logo" />
          <h2>Face Liveness</h2>
          <h3>Login</h3>
          <form action="" className="login_form">
            <input
              className="Login_input"
              type="text"
              placeholder="Enter Username or Email"
              required
            />
            <div className="eyeImg">
              <input
                className="Login_input"
                type={visible ? "text" : "password"}
                placeholder="Enter Your Password"
                required
              />
              {visible ? (
                <span
                  onClick={() => setVisible(false)}
                  className="Login_passIcon"
                >
                  <FaEyeSlash />
                </span>
              ) : (
                <span
                  onClick={() => setVisible(true)}
                  className="Login_passIcon"
                >
                  <FaEye />
                </span>
              )}
            </div>
            {showOtp && (
              <input
              className="login_otp"
              type="text"
              placeholder="Enter OTP"
              required
            />
            ) }


            {showOtp ? ( <button 
               type="submit">
                login </button>
            ) : (           
               <button onClick={() => setOtp(true)}
                type="submit">
                send OTP</button>
            )}

          </form>
        </div>
      </div>
    </div>
  );
};



export default Login;
