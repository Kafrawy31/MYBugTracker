import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap/";
import { Link } from "react-router-dom";
import ProjectContext from "../context/ProjectContext.js";
import Header from "../components/Header.js";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext.js";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  let { register } = useContext(ProjectContext);
  let { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (user) {
    navigate("/homepage");
  }

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
    navigate("/Login");
  };

  return (
    <div className="Reg--Page">
      <Header />
      <div className="Wrap--Register--Page">
        <div className="form--container">
          <form className="Wrap--Form" onSubmit={handleSubmit}>
            <h1 className="Register--Title">Sign Up</h1>
            <div className="username">
              <label htmlFor="formGroupExampleInput"></label>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div className="email">
              <label htmlFor="formGroupExampleInput2"></label>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="password">
              <label htmlFor="formGroupExampleInput2"></label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="Register--Buttons">
              <Button type="submit" className="Register--Button--1">
                Sign up
              </Button>
              <Link to="/login">
                <Button
                  className="Register--Button--2"
                  variant="outline-secondary"
                >
                  Login
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
