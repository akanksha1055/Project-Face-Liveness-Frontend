import React, { useState } from "react";
import loginLogo from "../Assets/logo.png";
import "./Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
  const [visible, setVisible] = useState(false);
  const [showOtp, setOtp] = useState(false);
  const [usrEmail, setusrEmail] = useState("");
  const [usrPass, setusrPass] = useState("");
  const [usrOTP, setusrOTP] = useState("");
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form submission

    // Send login request to get OTP
    axios.post('http://localhost:5000/admin/login', {
        email: usrEmail,
        password: usrPass
      })
      .then((response) => {
        console.log(response.data.message);
        alert("OTP sent successfully");
        setOtp(true); // Show OTP input field
      })
      .catch((error) => {
        console.log(error);
        alert("Error sending OTP");
      });
  };
  const handleOTP = (e) => {
    e.preventDefault(); // Prevent form submission

    // Send login request to get OTP
    axios.post('http://localhost:5000/admin/verify-otp', {
        email: usrEmail,
        otp: usrOTP
      })
      .then((response) => {
        console.log(response.data);
        alert("login successfully");
        localStorage.setItem("adminId" , response.data.adminId);
        localStorage.setItem("email" , response.data.email);
        localStorage.setItem("name" , response.data.name);
        localStorage.setItem("mobileNumber" , response.data.mobileNumber);
        localStorage.setItem("sessionId" , response.data.sessionId);
        navigate('/Dashboard');
      })
      .catch((error) => {
        console.log(error);
        alert("Error in logging ");
      });
  };

  return (
    <div className="Login_Body">
      <div className="login_div">
        <div className="login_box">
          <img src={loginLogo} alt="Logo" />
          <h2>Next Gen Face Authentication</h2>
          <h3>Login</h3>
          <form onSubmit={ showOtp ? handleOTP : handleLogin} className="login_form">
            <input
              className="Login_input"
              type="text"
              placeholder="Enter Username or Email"
              required
              value={usrEmail}
              onChange={(e) => setusrEmail(e.target.value)}
            />
            <div className="eyeImg">
              <input
                className="Login_input"
                type={visible ? "text" : "password"}
                placeholder="Enter Your Password"
                required
                value={usrPass}
                onChange={(e) => setusrPass(e.target.value)}
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
                value={usrOTP}
                onChange={(e) => setusrOTP(e.target.value)}
              />
            )}

            <button type="submit">
              {showOtp ? "Login" : "Send OTP"}
            </button>
          </form>

          <div className="forget_password_div">
            <p>
              <Link to="/ForgetPassword" className="forget_password_link">
                Forget Password?
              </Link>
            </p>
          </div>

          <div className="sign_up_div">
            <p>
              <Link to="/SignUp" className="sign_up_link">
                Want to signup?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
