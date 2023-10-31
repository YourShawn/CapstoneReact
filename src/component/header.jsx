import React, { useState } from "react";
import "../styles/component/header.css";
import { Link, NavLink } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";
import { List } from "react-bootstrap-icons";
const Header = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <header className="header">
      <div className="container">
        <div className="header_inner">
          <Link className="logo" to="/">
            <img src="/logo1.png" alt="" />
            <span>Health care</span>
          </Link>
          <button className="toggleIcon btn" type="button" onClick={handleShow}>
            <List />
          </button>
          <Offcanvas
            className="header_mobile"
            show={show}
            onHide={handleClose}
            responsive="lg"
          >
            <nav className="nav">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/contact">Contact us</NavLink>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/signup">Sign Up</NavLink>
              <NavLink to="/profile">Profile</NavLink>
              <NavLink to="/doctor-dashboard">Doctor Dashboard</NavLink>
              <NavLink to="/patient-dashboard">Patient Dashboard</NavLink>
            </nav>
          </Offcanvas>
        </div>
      </div>
    </header>
  );
};

export default Header;
