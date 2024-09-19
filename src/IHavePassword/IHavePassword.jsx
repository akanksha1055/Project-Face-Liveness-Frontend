import React, { useState } from 'react';
import main_logo from '../Assets/logo.png';
import './IHavePassword.css';
import axios from 'axios';

const IHavePassword = () => {
  const [Mail, setMail] = useState('');
  const [otp, setOtp] = useState('');
  
  

  const postRequestIHavePassword = async () => {

    if (!Mail) {
      alert("Email not valid");
      return;
    } 

    const requestPayload = {
      'email' : Mail,
      'otp'   : otp,
    }

    try {
      const url = 'http://localhost:5000/admin/verifypasscode';

      

      const response = await axios.post( url, requestPayload);
      

      if (response.status == 200) {
        alert('Success');
      }
      
      console.log('response:- ', JSON.stringify(response));
      
      
    } catch (error) {
      console.log('error:- ', error)
    }
    
  }

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
                  value={Mail}
                  onChange={(e) => setMail(e.target.value )}
                  placeholder="Email address"
                  className="input-field"
                />
              </div>

              <div className='password-input-wrapper'>
                <input
                  type="otp"
                  value={otp.otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="OTP"
                  className="input-field"
                />
              </div>

              <div>
                <button
                  onClick={postRequestIHavePassword}
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
