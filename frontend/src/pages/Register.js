import React, { useContext, useState, useEffect } from "react";
import { Button } from "react-bootstrap/";
import { Link } from "react-router-dom";
import ProjectContext from "../context/ProjectContext.js";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  let { register } = useContext(ProjectContext);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    register(username, email, password);
  };

  return (
    <div className="Wrap--Register--Page">
      <h2 className="SignUp--Title">Sign Up</h2>
      <div className="Wrap--Register">
        <form onSubmit={handleSubmit}>
          <div className="Register--Input">
            <label htmlFor="formGroupExampleInput">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="Register--Input">
            <label htmlFor="formGroupExampleInput2">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="Register--Input">
            <label htmlFor="formGroupExampleInput2">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="registerbuttons">
            <Button
              type="submit"
              className="Register--Button"
              variant="outline-success"
            >
              Sign up
            </Button>
            <Link to="/login">
              <Button className="Register--Button" variant="outline-secondary">
                Login
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
