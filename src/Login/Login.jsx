import React from "react";
import loginLogo from "../Assets/logo.png";

import "./Login.css";
import { FaEye } from "react-icons/fa";

const Login = () => {
  return (
    <div className="Login_Body">
      <div className="login_div">
        <div className="login_box">
          <img src={loginLogo} alt="" />
          <h2>Face liveness </h2>
          <h3>Login </h3>
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
                type="password"
                placeholder="Enter Your Password"
                required
              />
              <span className="Login_passIcon">
                <FaEye />
              </span>
            </div>
            <button type="submit">Login</button>
          </form>
        
        </div>
      </div>
    </div>
  );
};

export default Login;
