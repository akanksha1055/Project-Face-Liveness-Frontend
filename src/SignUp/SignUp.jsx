import React from "react";
import './SignUp.css';
import email from "../Assets/email.png"
import password from "../Assets/password.png"
import call from "../Assets/call.png"
import user from "../Assets/user.png"

export default function SignUp(){
    return(
        <div>
            <div className="main">
                <div className="header">
                    <div className="text">SIGN UP</div>
                    <div className="underline"></div>
                </div>
                <div className="inputs">
                    <div className="input">
                        <img src={user} alt="" />
                        <input placeholder="name" type="text" />
                    </div>
                    <div className="input">
                        <img src={call} alt="" />
                        <input type="number" placeholder="number" />
                    </div>
                    <div className="input">
                        <img src={email} alt="" />
                        <input placeholder="email" type="email" />
                    </div>
                    <div className="input">
                        <img src={password} alt="" />
                        <input placeholder="password" type="password" />
                    </div>
                    <div className="input">
                        <img src={password} alt="" />
                        <input type="password" placeholder="confirm password" />
                    </div>
                    <div className="submit_container">
                        <button className="submit">SIGN UP</button>
                        <button className="submit">LOG IN</button>
                    </div>

                </div>
            </div>

        </div>
    );
}