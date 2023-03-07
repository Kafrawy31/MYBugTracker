import React, { useContext } from "react";
import { Container } from "react-bootstrap/";
import { Nav } from "react-bootstrap/";
import { Navbar } from "react-bootstrap/";
import { NavDropdown } from "react-bootstrap/";
import AuthContext from "../context/AuthContext.js";
import { Link } from "react-router-dom";

function Header() {
  let { user, userLogout } = useContext(AuthContext);
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Bug Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            {user ? (
              <Link to="/Login">
                <Nav.Link onClick={userLogout}>Logout</Nav.Link>
              </Link>
            ) : (
              <Nav.Link href="#link">Login</Nav.Link>
            )}
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
