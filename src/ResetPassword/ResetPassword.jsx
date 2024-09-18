import React, { useState } from 'react';
import main_logo from '../Assets/logo.png';
import './ResetPassword.css';
import { IoEye, IoEyeOff } from "react-icons/io5";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const checkPassword = () => {
    if (newPassword === confirmPassword) {
        alert("Password updated")
      setNewPassword('');
      setConfirmPassword('');
    } else {
      alert("Password not updated")
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

          {/* New Password Input */}
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

          {/* Confirm Password Input */}
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

          <div>
            <button
              onClick={checkPassword}
              type="submit"
              className="reset-submit-btn"
            >
              SUBMIT
            </button>
          </div>
        </div>
      </div>

    </>
  );
};

export default ResetPassword;
