import React, { useContext } from "react";
import Header from "../components/Header.js";
import AuthContext from "../context/AuthContext.js";

export default function Login() {
  let { userLogin, user } = useContext(AuthContext);
  return (
    <div>
      <Header />
      <div className="Wrap--Register--Page">
        <h2 className="SignUp--Title">Login</h2>
        <div className="Wrap--Register">
          <form onSubmit={userLogin}>
            <div className="Register--Input">
              <label htmlFor="formGroupExampleInput">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                name="username"
              />
            </div>
            <div className="Register--Input">
              <label htmlFor="formGroupExampleInput2">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
              />
            </div>
            <div>
              <input type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
