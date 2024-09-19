import React, { useState } from 'react';
import main_logo from '../Assets/logo.png';
import './IHavePassword.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AlertModal from '../AlertModel/AlertModel'; // Import the AlertModal component

const IHavePassword = () => {
  const [Mail, setMail] = useState('');
  const [otp, setOtp] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false); // Modal visibility state
  const [message, setMessage] = useState(''); // Modal message state
  const [isError, setIsError] = useState(false); // Track if it's an error or success
  const [shouldNavigate, setShouldNavigate] = useState(false); // Navigation control state
  const [isLoading, setIsLoading] = useState(false); // Loading state for button

  const navigate = useNavigate();

  const postRequestIHavePassword = async () => {
    if (!Mail) {
      setMessage("Email is not valid");
      setIsError(true);
      setModalIsOpen(true);
      return;
    }

    setIsLoading(true); // Set loading to true when request starts

    try {
      const response = await axios.post('http://localhost:5000/admin/verifypasscode', {
        email: Mail,
        otp: otp,
      });

      if (response.status === 200) {
        setMessage("OTP verification successful!");
        setIsError(false); // Success
        setShouldNavigate(true); // Allow navigation after modal closes
        setModalIsOpen(true); // Show modal
      }

      console.log('response:', JSON.stringify(response));
    } catch (error) {
      setMessage("Error verifying OTP. Please try again.");
      setIsError(true); // Error
      setModalIsOpen(true); // Show modal
      console.log('error:', error);
    } finally {
      setIsLoading(false); // Set loading to false when request completes
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    if (shouldNavigate && !isError) {
      navigate("/");
    }
  };

  return (
    <>
      <div className='iHave-password-container'>
        <div className='iHave-password-card'>
          <div className="logo">
            <img src={main_logo} alt="Logo" width={100} height={100} />
          </div>
          <div className="iHave-heading">
            <p className='iHave-main-heading'>Next Gen Face Authentication</p>
            <p className='iHave-sub-heading'>Have A Passcode?</p>
          </div>

          <div className='password-input-wrapper'>
            <input
              type="email"
              value={Mail}
              onChange={(e) => setMail(e.target.value)}
              placeholder="Enter your Email address"
              className="input-field"
            />
          </div>

          <div className='password-input-wrapper'>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter your Passcode"
              className="input-field"
            />
          </div>

          <div>
            <button
              onClick={postRequestIHavePassword}
              type="submit"
              className="iHave-submit-button"
              disabled={isLoading} // Disable button during loading
            >
              {isLoading ? "Submitting..." : "SUBMIT"} {/* Show loading text */}
            </button>
          </div>
        </div>
      </div>

      {/* Alert Modal */}
      <AlertModal
        isOpen={modalIsOpen}
        onClose={closeModal} // Close modal and navigate if needed
        message={message}
        isError={isError}
      />
    </>
  );
};

export default IHavePassword;
