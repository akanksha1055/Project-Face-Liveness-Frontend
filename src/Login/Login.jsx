import React, { useState,useEffect } from "react";
import loginLogo from "../Assets/logo.png";
import "./Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import AlertModal from '../AlertModel/AlertModel'; 

const Login = () => {
  const [visible, setVisible] = useState(false);
  const [showOtp, setOtp] = useState(false);
  const [usrEmail, setusrEmail] = useState("");
  const [usrPass, setusrPass] = useState("");
  const [usrOTP, setusrOTP] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for button
  const [modalOpen, setModalOpen] = useState(false); // Modal open state
  const [modalMessage, setModalMessage] = useState(""); // Modal message
  const [isError, setIsError] = useState(false); // Modal error state
  const [shouldNavigate, setShouldNavigate] = useState(false); // Whether to navigate after modal close

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("sessionId"); // Remove session ID from local storage
    navigate("/"); // Redirect back to login page
  };

  useEffect(() => {
    document.title = "Admin:login";

    // Check if session ID exists in local storage and is still valid
    const sessionId = localStorage.getItem("sessionId");
    if (sessionId) {
      // Verify the session ID with the backend
      axios
        .post("http://localhost:5000/admin/verify-session", { sessionId })
        .then((response) => {
          if (response.data.valid) {
            navigate("/Dashboard"); // Navigate to dashboard if session is valid
          } else {
            handleLogout();
          }
        })
        .catch(() => handleLogout());
    }
  }, [navigate]);
  
  const closeModal = () => {
    setModalOpen(false);
    if (shouldNavigate) {
      navigate('/Dashboard'); 
    }
  };

  const handleLogin = (e) => {
    e.preventDefault(); 
    setLoading(true); 

    // Send login request to get OTP
    axios.post('http://localhost:5000/admin/login', {
        email: usrEmail,
        password: usrPass
      })
      .then((response) => {
        setModalMessage(response.data.message);
        setModalOpen(true); // Open modal
        setIsError(false); // It's a success
        setOtp(true); // Show OTP input field
      })
      .catch((error) => {
        console.error(error);
        setModalMessage("please check your email or password");
        setIsError(true); // It's an error
        setModalOpen(true); // Open modal
      })
      .finally(() => {
        setLoading(false); // Set loading to false to enable the button
      });
  };

  const handleOTP = (e) => {
    e.preventDefault(); // Prevent form submission
    setLoading(true); // Set loading to true

    // Send OTP verification request
    axios.post('http://localhost:5000/admin/verify-otp', {
        email: usrEmail,
        otp: usrOTP
      })
      .then((response) => {
        setModalMessage(response.data.message);
        setIsError(false); 
        setModalOpen(true); 
        setShouldNavigate(true); 

      
        localStorage.setItem("adminId", response.data.adminId);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("mobileNumber", response.data.mobileNumber);
        localStorage.setItem("sessionId", response.data.sessionId);
      })
      .catch((error) => {
        console.error(error);
        setModalMessage("Error in logging");
        setIsError(true); 
        setModalOpen(true); 
      })
      .finally(() => {
        setLoading(false); 
      });
  };

  return (
    <div className="Login_Body">
      <div className="login_div">
        <div className="login_box">
          <img src={loginLogo} alt="Logo" />
          <h2>Next Gen Face Authentication</h2>
          <h3>Login</h3>
          <form onSubmit={showOtp ? handleOTP : handleLogin} className="login_form">
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

            <button type="submit" disabled={loading}>
              {loading ? "Please wait..." : showOtp ? "Login" : "Send OTP"}
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

      {/* Alert Modal */}
      <AlertModal
        isOpen={modalOpen}
        onClose={closeModal}
        message={modalMessage}
        isError={isError}
      />
    </div>
  );
};

export default Login;
