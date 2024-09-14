import React from "react";
import './SignUp.css';
import { FaEye } from "react-icons/fa";
//import email from "../Assets/email.png"
//import password from "../Assets/password.png"
//import call from "../Assets/call.png"
//import user from "../Assets/user.png"

export default function SignUp(){
    return(
        <div className="SignUp_body">
            <div className="SignUp_main">
                <div className="SignUp_header">
                    <div className="SignUp_text">SIGN UP</div>
                    <div className="SignUp_underline"></div>
                </div>
                <div className="SignUp_inputs">
                    <div className="SignUp_input">
                      <input placeholder="name" type="text" /> 
                    </div>
                    <div className="SignUp_input">
                      <input type="number" placeholder="number" />
                    </div>
                    <div className="SignUp_input">
                      <input placeholder="email" type="email" />
                    </div>
                    <div className="SignUp_input">
                     <input placeholder="password" type="password"  /><FaEye />
                    </div>
                    <div className="SignUp_input">
                    <input type="password" placeholder="confirm password" /><FaEye />
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