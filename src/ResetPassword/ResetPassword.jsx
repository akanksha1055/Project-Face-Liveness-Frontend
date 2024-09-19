import React, { useState, useEffect } from 'react';
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
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      setIsError(true);
      setModalIsOpen(true);
      return;
    }

    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get("token");
    const email = urlParams.get("email");

    try {
      const response = await axios.post('http://localhost:5000/admin/reset-password', {
        token,
        email,
        newPassword: newPassword,
      });
      console.log(response.status, response.data, response.headers)
      setMessage(response.data.message);
      setIsError(false);
      setModalIsOpen(true);

      setTimeout(() => {
        setModalIsOpen(false);
        navigate("/");
      }, 3000);

    } catch (error) {
      setMessage(
        error.response?.data?.error || "Can not reset password. Please try again."
      );
      setIsError(true);
      setModalIsOpen(true);
    }
  }

  return (
    <>
      <div className='reset-password-container'>
        {loading ?
          (<><p>Loading..</p></>) :
          (
            <>
              <div className='reset-password-card'>
                <div className="logo">
                  <img src={main_logo} alt="Logo" width={100} height={100} />
                </div>
                <div className="heading">
                  <p className='reset-main-heading'>Next Gen Face Authentication</p>
                </div>
                <h1 className='reset-heading'>Reset Password</h1>

                <form onSubmit={handleSubmit}>
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
                      type="submit"
                      className="reset-submit-btn"
                    >
                      SUBMIT
                    </button>
                  </div>
                </form>

                <AlertModal
                  isOpen={modalIsOpen}
                  onClose={() => setModalIsOpen(false)}
                  message={message}
                  isError={isError}
                />

              </div>
            </>)}
      </div>

    </>
  );
};

export default ResetPassword;
