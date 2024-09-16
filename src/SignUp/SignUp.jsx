import { useState } from "react";
import React from "react";
import './SignUp.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../Assets/logo.png";



export default function SignUp() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePhoneNumberChange = (e) => {
    const { value } = e.target;
    // Only allow numbers
    const filteredValue = value.replace(/\D/g, "");
    setPhoneNumber(filteredValue);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };


  return (
    <div className="SignUp_body">
      <div className="SignUp_main">
        <div className="SignUp_header">
          <img src={logo} alt="" />

          <div className="SignUp_text_main">Face Liveness </div>
          <div className="SignUp_text">Sign Up</div>

        </div>
        <div className="SignUp_inputs">
          <div className="SignUp_input">
            <input placeholder="Enter Your Name" type="text" />
          </div>
          <div className="SignUp_input">
            <input type="tel" placeholder="Enter Your Phone Number" value={phoneNumber}
              onChange={handlePhoneNumberChange} />
          </div>
          <div className="SignUp_input">
            <input placeholder="Enter Your Email" type="email" />
          </div>
          <div className="SignUp_input">
            <input placeholder="Enter Your Password" type={showPassword ? "text" : "password"} />
            <span onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="SignUp_input">
            <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Your Password" />
            <span onClick={toggleConfirmPasswordVisibility}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <div className="SignUp_submit_container">
          <button className="SignUp_submit">SIGN UP</button>
          {/* <button className="SignUp_submit">LOG IN</button> */}
        </div>
        <div className="login_div">
          <p>
            <Link to="/" className="login_link">Already have an account?</Link>
          </p>
        </div>
      </div>
    </div>
  );
}