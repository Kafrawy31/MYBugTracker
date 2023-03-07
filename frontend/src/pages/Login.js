import React, { useContext } from "react";
import { Button } from "react-bootstrap/";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext.js";

export default function Login() {
  let { userLogin } = useContext(AuthContext);
  return (
    <div className="Wrap--Register--Page">
      <h2 className="SignUp--Title">Sign Up</h2>
      <div className="Wrap--Register">
        <form onSubmit={userLogin}>
          <div className="Register--Input">
            <label htmlFor="formGroupExampleInput">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
            />
          </div>
          <div className="Register--Input">
            <label htmlFor="formGroupExampleInput2">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
            />
          </div>
          <div>
            <input type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
