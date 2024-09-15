import React from "react";
import './SignUp.css';
import { FaEye } from "react-icons/fa";
//import email from "../Assets/email.png"
//import password from "../Assets/password.png"
//import call from "../Assets/call.png"
//import user from "../Assets/user.png"
import logo from "../Assets/SignUpLogo.jpg"

export default function SignUp(){
    return(
        <div className="SignUp_body">
            <div className="SignUp_main">
                <div className="SignUp_header">
                  <img src={logo} alt="" />

                    <div className="SignUp_text_main">Face Liveness </div>
                    <div className="SignUp_text">Sign Up</div>
                    
                </div>
                <div className="SignUp_inputs">
                    <div className="SignUp_input">
                      <input placeholder="Enter Your Name" type="text" /> 
                    </div>
                    <div className="SignUp_input">
                      <input type="number" placeholder="Enter Your Phone Number" />
                    </div>
                    <div className="SignUp_input">
                      <input placeholder="Enter Your Email" type="email" />
                    </div>
                    <div className="SignUp_input">
                     <input placeholder="Enter Your Password" type="password"  /><FaEye />
                    </div>
                    <div className="SignUp_input">
                    <input type="password" placeholder="Confirm Your Password" /><FaEye />
                    </div>
                </div>
                    <div className="SignUp_submit_container">
                        <button className="SignUp_submit">SIGN UP</button>
                        <button className="SignUp_submit">LOG IN</button>
                    </div>
            </div>
         </div>
    );
}