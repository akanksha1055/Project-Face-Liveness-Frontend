import React, { useState, useEffect } from 'react';
import main_logo from '../Assets/logo.png';
import './ForgetPassword.css';
import axios from "axios";
import AlertModal from "../AlertModel/AlertModel";
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [shouldNavigate, setShouldNavigate] = useState(false); // Control navigation
  const [isLoading, setIsLoading] = useState(false); // Loading state for button

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Forgot Password";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when request starts

    try {
      const response = await axios.post("http://localhost:5000/admin/forgot-password", { email });
      console.log(response.status, response.data, response.headers);
      setMessage(response.data.message + " Please check your mail");
      setIsError(false);
      setModalIsOpen(true);
      setShouldNavigate(true); // Allow navigation after the modal is closed
    } catch (error) {
      setMessage(error.response?.data?.error || error.message || "Something went wrong. Please try again.");
      setIsError(true);
      setModalIsOpen(true);
    } finally {
      setIsLoading(false); // Set loading to false when request completes
    }
  };

  // Function to close the modal and navigate if successful
  const closeModal = () => {
    setModalIsOpen(false);
    if (shouldNavigate && !isError) {
      navigate("/"); // Adjust the navigation target as needed
    }
  };

  return (
    <>
      <div className='forget-password-container'>
        <div className='forget-password-card'>
          <div className="logo">
            <img src={main_logo} alt="Logo" width={100} height={100} />
          </div>
          <div className="forget-heading">
            <p className='forget-main-heading'>Next Gen Face Authentication</p>
            <p className='forget-sub-heading'>Forget Password</p>
          </div>
          <form className='forget_form' onSubmit={handleSubmit}>
            <div className='password-input-wrapper'>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}  // Update the email state
                placeholder="Email address"
                className="input-field"
                required
              />
            </div>
            <div className='btn-div'>
              <button
                type="submit"
                className="forget-submit-button"
                disabled={isLoading} // Disable button during loading
              >
                {isLoading ? "Submitting..." : "SUBMIT"} {/* Show loading text */}
              </button>
            </div>
          </form>

          {/* Alert Modal */}
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

export default ForgetPassword;
