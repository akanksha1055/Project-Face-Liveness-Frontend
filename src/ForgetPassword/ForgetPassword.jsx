import React, { useState } from 'react';
import main_logo from '../Assets/logo.png';
import './ForgetPassword.css';

const ForgetPassword = () => {
  const [Mail, setMail] = useState({ mail: '' });
  
  const forgetPasswordEmail = () => {
    if (Mail.mail) {
      alert("Otp send successfully")
    } else {
     alert("Otp not sent")
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
            
              <div className='password-input-wrapper'>
                <input
                  type="email"
                  value={Mail.mail}
                  onChange={(e) => setMail({ ...Mail, mail: e.target.value })}
                  placeholder="Email address"
                  className="input-field"
                />
              </div>
              <div>
                <button
                  onClick={forgetPasswordEmail}
                  type="submit"
                  className="forget-submit-button"
                >
                  SUBMIT
                </button>
              </div>
            
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
