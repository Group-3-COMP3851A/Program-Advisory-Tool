import React from "react";
import { Password } from "../../components/Password";
import { Username } from "../../components/Username";
import "./style.css";

// TODO: Fix project dependency linking
// Should be outside of src, but it won't work for some reason
import background from "../../static/img/low-fidelity-1.png";

export const LogIn = () => {
  return (
    <div className="log-in">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="background" />
          <img className="low-fidelity" alt="Low fidelity" src={background} />
          <div className="rectangle-wrapper">
            <div className="rectangle-3" />
          </div>
          <div className="group">
            <div className="overlap-2">
              <div className="text-wrapper">Login</div>
              <Username className="username-instance" property1="default" />
            </div>
            <button className="login-button">
              <div className="div-wrapper">
                <div className="text-wrapper-2">Login</div>
              </div>
            </button>
          </div>
          <Password className="password-instance" property1="default" />
          <div className="change">Forgot Password?</div>
        </div>
      </div>
    </div>
  );
};
