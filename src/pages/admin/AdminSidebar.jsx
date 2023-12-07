import React, { useState } from "react";
import Footer from "../../component/footer";
import "../../styles/sidebar.css";
import { Container, Row, Col, Nav, Navbar } from "react-bootstrap";
import {
  HouseDoorFill,
  Calendar,
  Person,
  ChatSquareDots,
  BoxArrowRight,
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";


// Import individual content components
import DashboardContent from "./AdminDashboard";
import Appointment from "./AdminAppointment";
import Patients from "./AdminPatients";
import Doctors from "./AdminDoctors";

function Sidebar() {
   const nav = useNavigate();
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

   const loginOut = () => {
     localStorage.removeItem("loginToken")
     nav("/login")
   };
  // Define content for each menu item
  const menuContent = {
    dashboard: <DashboardContent />,
    appointments: <Appointment />,
    patients: <Patients />,
    doctors: <Doctors />,
  };

  return (
    <div className="sidebar-container">
      {/* <Header /> */}
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
                    className={
                      activeMenuItem === "dashboard" ? "active-link" : ""
                    }
                  >
                    <HouseDoorFill /> Dashboard
                  </Nav.Link>
                  <Nav.Link
                    href="#"
                    onClick={() => handleMenuItemClick("appointments")}
                    className={
                      activeMenuItem === "appointments" ? "active-link" : ""
                    }
                  >
                    <Calendar /> Appointments
                  </Nav.Link>
                  <Nav.Link
                    href="#"
                    onClick={() => handleMenuItemClick("patients")}
                    className={
                      activeMenuItem === "patients" ? "active-link" : ""
                    }
                  >
                    <Person /> Patients
                  </Nav.Link>
                  <Nav.Link
                    href="#"
                    onClick={() => handleMenuItemClick("doctors")}
                    className={
                      activeMenuItem === "doctors" ? "active-link" : ""
                    }
                  >
                    <ChatSquareDots /> Doctors
                  </Nav.Link>
                  <Nav.Link
                    href="#"
                    onClick={() => loginOut()}
                    className={activeMenuItem === "logout" ? "active-link" : ""}
                  >
                    <BoxArrowRight /> Logout
                  </Nav.Link>
                  {/* <Nav.Link
                    href="#"
                    onClick={() => handleMenuItemClick("medications")}
                    className={
                      activeMenuItem === "medications" ? "active-link" : ""
                    }
                  >
                    <Capsule /> Medications
                  </Nav.Link>
                  <Nav.Link
                    href="#"
                    onClick={() => handleMenuItemClick("documents")}
                    className={
                      activeMenuItem === "documents" ? "active-link" : ""
                    }
                  >
                    <FileEarmarkText /> Documents
                  </Nav.Link>
                  <Nav.Link
                    href="#"
                    onClick={() => handleMenuItemClick("settings")}
                    className={
                      activeMenuItem === "settings" ? "active-link" : ""
                    }
                  >
                    <Gear /> Settings
                  </Nav.Link>
                  <Nav.Link
                    href="#"
                    onClick={() => handleMenuItemClick("logout")}
                    className={activeMenuItem === "logout" ? "active-link" : ""}
                  >
                    <BoxArrowRight /> Logout
                  </Nav.Link> */}
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

export default Sidebar;
