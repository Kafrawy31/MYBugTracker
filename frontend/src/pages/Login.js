import React, { useContext } from "react";
import Header from "../components/Header.js";
import AuthContext from "../context/AuthContext.js";
import { useNavigate } from "react-router-dom";

export default function Login() {
  let { userLogin, user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (user) {
    navigate("/homepage");
  }
  return (
    <div className="Reg--Page">
      <Header />
      <div className="Wrap--Register--Page">
        <div className="form--container">
          <form className="Wrap--Form" onSubmit={userLogin}>
            <h2 className="Register--Title">Login</h2>
            <div className="username">
              <label htmlFor="formGroupExampleInput"></label>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                name="username"
              />
            </div>
            <div className="password">
              <label htmlFor="formGroupExampleInput2"></label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
              />
            </div>
            <div className="login-util">
              <input type="checkbox" className="check-box" />
              <p className="remember-me">Remember Me</p>
              <p>
                <a href="" className="forgot-password">
                  Forgot Password
                </a>
              </p>
            </div>
            <input className="Login" value="Login" type="submit" />
            <p className="a--register">
              Dont have an account?{" "}
              <span>
                <a href="/">Register</a>
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
