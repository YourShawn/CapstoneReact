import React, { useState } from "react";
import Header from "../../component/header";
import Footer from "../../component/footer";
import "../../styles/sidebar.css";
import { Container, Row, Col, Nav, Navbar } from "react-bootstrap";
import {
  HouseDoorFill,
  Calendar,
  ChatSquareDots,
  Capsule,
  FileEarmarkText,
  Gear,
  BoxArrowRight,
} from "react-bootstrap-icons";

// Import individual content components
import PatientDashboard from "./PatientDashboard";
import Appointment from "./Appointment";


function PSidebar() {
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  // Define content for each menu item
  const menuContent = {
    dashboard: <PatientDashboard />,
    appointments: <Appointment />,
    
  };

  return (
    <div className="sidebar-container">
      <Header />
      <Container fluid>
        <Row>
          {/* Vertical Navbar */}
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
                    onClick={() => handleMenuItemClick("prescriptions")}
                    className={activeMenuItem === "prescriptions" ? "active-link" : ""}
                  >
                    <Capsule /> Prescriptions
                  </Nav.Link>
                  <Nav.Link
                    href="#"
                    onClick={() => handleMenuItemClick("messages")}
                    className={activeMenuItem === "messages" ? "active-link" : ""}
                  >
                    <ChatSquareDots /> Messages
                  </Nav.Link>
                  
                  <Nav.Link
                    href="#"
                    onClick={() => handleMenuItemClick("documents")}
                    className={activeMenuItem === "documents" ? "active-link" : ""}
                  >
                    <FileEarmarkText /> Documents
                  </Nav.Link>
                  <Nav.Link
                    href="#"
                    onClick={() => handleMenuItemClick("settings")}
                    className={activeMenuItem === "settings" ? "active-link" : ""}
                  >
                    <Gear /> Settings
                  </Nav.Link>
                  <Nav.Link
                    href="#"
                    onClick={() => handleMenuItemClick("logout")}
                    className={activeMenuItem === "logout" ? "active-link" : ""}
                  >
                    <BoxArrowRight /> Logout
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Col>

          {/* Main Content */}
          <Col md={10} className="p-4">
            {/* Render content based on the activeMenuItem */}
            {menuContent[activeMenuItem]}
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default PSidebar;
