import React, { useState } from 'react';
import main_logo from '../Assets/logo.png';
import './ResetPassword.css';
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import AlertModal from "../AlertModel/AlertModel";
import { IoEye, IoEyeOff } from "react-icons/io5";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state for button
  const [shouldNavigate, setShouldNavigate] = useState(false); // Handle navigation on success
  const navigate = useNavigate();
  const location = useLocation();

  // Function to validate password strength
  const validatePasswordStrength = (password) => {
    // Check for at least one uppercase letter, one lowercase letter, one digit, one special character, and a minimum length of 8
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      setIsError(true);
      setModalIsOpen(true);
      return;
    }

    if (!validatePasswordStrength(newPassword)) {
      setMessage("Password must be at least 8 characters long, include uppercase, lowercase, numbers, and special characters.");
      setIsError(true);
      setModalIsOpen(true);
      return;
    }

    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get("token");
    const email = urlParams.get("email");

    try {
      setIsLoading(true); // Start loading
      const response = await axios.post('http://localhost:5000/admin/reset-password', {
        token,
        email,
        newPassword,
      });

      setMessage(response.data.message);
      setIsError(false);
      setModalIsOpen(true);
      setShouldNavigate(true); // Set to true to allow navigation after modal closes

    } catch (error) {
      setMessage(
        error.response?.data?.error || "Cannot reset password. Please try again."
      );
      setIsError(true);
      setModalIsOpen(true);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    if (shouldNavigate && !isError) {
      navigate("/"); // Navigate to homepage after success
    }
  };

  return (
    <>
      <div className='reset-password-container'>
        <div className='reset-password-card'>
          <div className="logo">
            <img src={main_logo} alt="Logo" width={100} height={100} />
          </div>
          <div className="heading">
            <p className='reset-main-heading'>Next Gen Face Authentication</p>
          </div>
          <h1 className='reset-heading'>Reset Password</h1>

          <div className="password-input-wrapper">
            <input
              type={showNewPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter New Password"
              className="reset-input"
            />
            <span className="toggle-password-icon" onClick={() => setShowNewPassword(!showNewPassword)}>
              {showNewPassword ? <IoEyeOff /> : <IoEye />}
            </span>
          </div>

          <div className="password-input-wrapper">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm New Password"
              className="reset-input"
            />
            <span className="toggle-password-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <IoEyeOff /> : <IoEye />}
            </span>
          </div>

          <div className='btn-div'>
            <button
              onClick={handleResetPassword}
              className="reset-submit-btn"
              disabled={isLoading} // Disable button during loading
            >
              {isLoading ? 'SUBMITING...' : 'SUBMIT'}
            </button>
          </div>

          <AlertModal
            isOpen={modalIsOpen}
            onClose={closeModal} // Close modal and potentially navigate
            message={message}
            isError={isError}
          />
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
