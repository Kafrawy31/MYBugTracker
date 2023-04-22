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
        <h2 className="Register--Title">Login</h2>
        <div className="Wrap--Register">
          <form onSubmit={userLogin}>
            <div className="username">
              <label htmlFor="formGroupExampleInput">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                name="username"
              />
            </div>
            <div className="password">
              <label htmlFor="formGroupExampleInput2">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
              />
            </div>
            <div>
              <input className="Login" value="Login" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
