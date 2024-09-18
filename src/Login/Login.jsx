import React, { useState } from "react";
import loginLogo from "../Assets/logo.png";
import "./Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  const [visible, setVisible] = useState(false); 
  const [showOtp , setOtp] =  useState(false);

  return (
    <div className="Login_Body">
      <div className="login_div">
        <div className="login_box">
          <img src={loginLogo} alt="Logo" />
          <h2>Next Gen Face Authentication</h2>
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

          <div className="forget_password_div">
          <p>
          <Link to="/ForgetPassword" className="forget_password_link">Forget Password?</Link>
          </p>
        </div>
        {/* add path to signup */}
        <div className="sign_up_div">
          <p>
          <Link to="/SignUp" className="sign_up_link">Want to signup?</Link>
          </p>
        </div>
        </div>
        
      </div>
    </div>
  );
};



export default Login;
