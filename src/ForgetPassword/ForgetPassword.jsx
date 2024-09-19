import React, { useState, useEffect } from 'react';
import main_logo from '../Assets/logo.png';
import './ForgetPassword.css';
import axios from "axios";
import AlertModal from "../AlertModel/AlertModel";

const ForgetPassword = () => {
  const [email, setEmail] = useState('');  
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    document.title = "Forgot Password";
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/admin/forgot-password", { email });
      console.log(response.status, response.data, response.headers);
      setMessage(response.data.message);
      setIsError(false);
      setModalIsOpen(true);
      setTimeout(() => {
        setModalIsOpen(false);
      }, 3000); 
    } catch (error) {
      setMessage(error.response?.data?.error || error.message || "Something went wrong. Please try again.");
      setIsError(true);
      setModalIsOpen(true);
    }
  };

  return (
    <>
      <div className='forget-password-container'>
        {loading ? (<p>Loading....</p>) : (
          <div className='forget-password-card'>
            <div className="logo">
              <img src={main_logo} alt="Logo" width={100} height={100} />
            </div>
            <div className="forget-heading">
              <p className='forget-main-heading'>Next Gen Face Authentication</p>
              <p className='forget-sub-heading'>Forget Password</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className='password-input-wrapper'>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}  // Update the email state
                  placeholder="Email address"
                  className="input-field"
                />
              </div>
              <div className='btn-div'>
                <button type="submit" className="forget-submit-button">SUBMIT</button>
              </div>
              <AlertModal
                isOpen={modalIsOpen}
                onClose={() => setModalIsOpen(false)}
                message={message}
                isError={isError}
              />
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default ForgetPassword;
