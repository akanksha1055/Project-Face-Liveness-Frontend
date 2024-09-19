import React, { useState } from 'react';
import main_logo from '../Assets/logo.png';
import './IHavePassword.css';

const IHavePassword = () => {
  const [Mail, setMail] = useState({ mail: '' });
  const [otp, setOtp] = useState({ otp: '' });
  
  const iHavePasswordEmail = () => {
    if (Mail.mail) {
      alert("request sent")
    } else {
     alert("request not sent")
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
            <p className='iHave-sub-heading'>Enter OTP</p>
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

              <div className='password-input-wrapper'>
                <input
                  type="otp"
                  value={otp.otp}
                  onChange={(e) => setOtp({ ...otp, otp: e.target.value })}
                  placeholder="OTP"
                  className="input-field"
                />
              </div>

              <div>
                <button
                  onClick={iHavePasswordEmail}
                  type="submit"
                  className="iHave-submit-button"
                >
                  SUBMIT
                </button>
              </div>
            
        </div>
      </div>
    </>
  );
};

export default IHavePassword;
