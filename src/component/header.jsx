import React from "react";
import "../styles/component/header.css";
import { Link, NavLink } from "react-router-dom";
const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header_inner">
          <Link className="logo" to="/">
            <img src="/logo.svg" alt="" />
            <span>Health care</span>
          </Link>
          <nav className="nav">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact us</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
            <NavLink to="/sidebar">Doctor Dashboard</NavLink>
            <NavLink to="/psidebar">Patient Dashboard</NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
