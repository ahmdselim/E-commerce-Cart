import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import CartIcon from "../Cart/CartIcon";

const Index = () => {
  return (
    <div className="container">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>
          <Link to="/">
            <span role="img" aria-label="Fire">
              E-commerce 🔥🐼
            </span>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Navbar.Brand>
              <Link to="/">Home</Link>
            </Navbar.Brand>
            <Navbar.Brand>
              <Link to="/products">Products</Link>
            </Navbar.Brand>
          </Nav>
          <CartIcon />
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Index;
