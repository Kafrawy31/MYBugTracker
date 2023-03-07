import React from "react";
import { Button } from "react-bootstrap/";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="Wrap--Register--Page">
      <h2 className="SignUp--Title">Sign Up</h2>
      <div className="Wrap--Register">
        <form>
          <div className="Register--Input">
            <label htmlFor="formGroupExampleInput">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
            />
          </div>
          <div className="Register--Input">
            <label htmlFor="formGroupExampleInput2">Email</label>
            <input type="email" className="form-control" placeholder="Email" />
          </div>
          <div className="Register--Input">
            <label htmlFor="formGroupExampleInput2">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
            />
          </div>
          <div className="Register--Input">
            <label htmlFor="formGroupExampleInput2">Re-Enter Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Re-Enter Password"
            />
          </div>
          <div>
            <Link to="/login">
              <Button className="Register--Button" variant="outline-success">
                Success
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
