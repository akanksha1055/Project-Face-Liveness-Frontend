import { useState } from "react";
import React from "react";
import './SignUp.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Assets/logo.png";
import axios from 'axios';
import AlertModal from "../AlertModel/AlertModel"; // Import your AlertModal component

export default function SignUp() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false); // Control modal visibility
  const [message, setMessage] = useState(""); // Store success/error message
  const [isError, setIsError] = useState(false); // Control error or success state
  const [shouldNavigate, setShouldNavigate] = useState(false); // Control navigation
  const [isLoading, setIsLoading] = useState(false); // Loading state for sign up button
  const navigate = useNavigate();

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

  const validatePhoneNumber = (phone) => {
    return phone.length === 10;
  };

  const validatePasswordStrength = (password) => {
    // Check for at least one uppercase letter, one lowercase letter, one digit, one special character, and a minimum length of 8
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignUp = () => {
    setIsLoading(true); // Set loading to true when request starts
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
        setMessage(response.data.message);
        setIsError(false); // Success
        setModalIsOpen(true); // Open modal
        setShouldNavigate(true); // Allow navigation after modal is closed
      })
      .catch(error => {
        console.error(error);
        setMessage("Error signing up.");
        setIsError(true); // Error
        setModalIsOpen(true); // Open modal
      })
      .finally(() => {
        setIsLoading(false); // Set loading to false when request completes
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if phone number is valid
    if (!validatePhoneNumber(phoneNumber)) {
      setMessage("Phone number must be exactly 10 digits!");
      setIsError(true);
      setModalIsOpen(true);
      return;
    }

    // Check if password matches the strength criteria
    if (!validatePasswordStrength(formData.password)) {
      setMessage("Password must be at least 8 characters long, contain 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.");
      setIsError(true);
      setModalIsOpen(true);
      return;
    }

    // Check if password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      setIsError(true);
      setModalIsOpen(true);
      return;
    }

    handleSignUp();
  };

  const closeModal = () => {
    setModalIsOpen(false);
    if (shouldNavigate && !isError) {
      navigate("/IHavePassword"); // Navigate to the desired page only on success
    }
  };

  return (
    <div className="SignUp_body">
      <div className="SignUp_main">
        <div className="SignUp_header">
          <img src={logo} alt="logo" />
          <div className="SignUp_text_main">Face Liveness</div>
          <div className="SignUp_text">Sign Up</div>
        </div>

        <form className="signup_form" onSubmit={handleSubmit}>
          <div className="SignUp_inputs">
            <div className="SignUp_input">
              <input
                name="name"
                placeholder="Enter Your Name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="SignUp_input">
              <input
                type="tel"
                placeholder="Enter Your Phone Number"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                required
              />
            </div>

            <div className="SignUp_input">
              <input
                name="email"
                placeholder="Enter Your Email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="SignUp_input">
              <input
                name="password"
                placeholder="Enter Your Password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                required
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
                required
              />
              <span onClick={toggleConfirmPasswordVisibility}>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="SignUp_submit_container">
            <button className="SignUp_submit" type="submit" disabled={isLoading}>
              {isLoading ? "Signing Up..." : "SIGN UP"}
            </button>
          </div>

          <div className="signupnavigate_div">
            <p>
              <Link to="/" className="login_link">Already have an account?</Link>
            </p>
            <p>
              <Link to="/IHavePassword" className="login_link">Have a Passcode?</Link>
            </p>
          </div>
        </form>

        {/* Alert Modal */}
        <AlertModal
          isOpen={modalIsOpen}
          onClose={closeModal} // Close modal and navigate if needed
          message={message}
          isError={isError}
        />
      </div>
    </div>
  );
}
