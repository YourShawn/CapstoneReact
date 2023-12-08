import React, { useState } from "react";
import "../../styles/sidebar.css";
import { Nav, Navbar, Col } from "react-bootstrap";
import {
  HouseDoorFill,
  Calendar,
  Person,
  ChatSquareDots,
  BoxArrowRight,
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";


function SidebarComponent() {
   const nav = useNavigate();
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

   const loginOut = () => {
     localStorage.removeItem("loginToken")
     nav("/login")
   };
 

  return (
    <Col md={2} className="sidebar">
      <Navbar expand="md">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="flex-column custom-nav">
            <Nav.Link
              href="#"
              onClick={() => handleMenuItemClick("dashboard")}
              className={activeMenuItem === "dashboard" ? "active-link" : ""}
            >
              <HouseDoorFill /> Dashboard
            </Nav.Link>
            <Nav.Link
              href="#"
              onClick={() => handleMenuItemClick("appointments")}
              className={activeMenuItem === "appointments" ? "active-link" : ""}
            >
              <Calendar /> Appointments
            </Nav.Link>
            <Nav.Link
              href="#"
              onClick={() => handleMenuItemClick("patients")}
              className={activeMenuItem === "patients" ? "active-link" : ""}
            >
              <Person /> Patients
            </Nav.Link>
            <Nav.Link
              href="#"
              onClick={() => handleMenuItemClick("doctors")}
              className={activeMenuItem === "doctors" ? "active-link" : ""}
            >
              <ChatSquareDots /> Doctors
            </Nav.Link>
            <Nav.Link
              href="#"
              onClick={() => handleMenuItemClick("users")}
              className={activeMenuItem === "users" ? "active-link" : ""}
            >
              <ChatSquareDots /> Users
            </Nav.Link>
            <Nav.Link
              href="#"
              onClick={() => loginOut()}
              className={activeMenuItem === "logout" ? "active-link" : ""}
            >
              <BoxArrowRight /> Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Col>
  );
}

export default SidebarComponent;
