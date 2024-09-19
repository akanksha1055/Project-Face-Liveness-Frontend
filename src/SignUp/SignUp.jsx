import { useState } from "react";
import React from "react";
import './SignUp.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Assets/logo.png";
import axios from 'axios';

export default function SignUp() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate= useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

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

  const handleSignUp = () => {
    axios.post("http://localhost:5000/admin/signup", {
      name: formData.name,
      email: formData.email,
      mobileNumber: phoneNumber,
      password: formData.password,

    })
      .then(response => {
        console.log(response.data);
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: ""
        });
        setPhoneNumber("");
        alert("Account created successfully!");
        
        navigate("/IHavePassword");
      })
      .catch(error => {
        console.error(error);
        alert("Error signing up.");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
   
    handleSignUp();
    
  };

  return (
    <div className="SignUp_body">
      <div className="SignUp_main">
        <div className="SignUp_header">
          <img src={logo} alt="logo" />
          <div className="SignUp_text_main">Face Liveness</div>
          <div className="SignUp_text">Sign Up</div>
        </div>

        
          <div className="SignUp_inputs">
            <div className="SignUp_input">
              <input
                name="name"
                placeholder="Enter Your Name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="SignUp_input">
              <input
                type="tel"
                placeholder="Enter Your Phone Number"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
            </div>

            <div className="SignUp_input">
              <input
                name="email"
                placeholder="Enter Your Email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="SignUp_input">
              <input
                name="password"
                placeholder="Enter Your Password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
              />
              <span onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="SignUp_input">
              <input
                name="confirmPassword"
                placeholder="Confirm Your Password"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              <span onClick={toggleConfirmPasswordVisibility}>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="SignUp_submit_container">
            <button className="SignUp_submit" onClick={handleSubmit}>SIGN UP</button>
          </div>

          <div className="signupnavigate_div">
            <p>
              <Link to="/" className="login_link">Already have an account?</Link>
            </p>
          </div>
       
      </div>
    </div>
  );
}
