import React, { useState } from "react";
import {
  BoxArrowRight,
  Calendar,
  Capsule,
  ChatSquareDots,
  FileEarmarkText,
  Gear,
  HouseDoorFill,
  CreditCard
} from "react-bootstrap-icons";
import Footer from "../../component/footer";
import Header from "../../component/header";
import styles from "../../styles/pages/dashboard.module.scss";
// Import individual content components
import Appointment from "./Appointment";
import PatientDashboard from "./PatientDashboard";
import Sidebar from "../../component/sidebar";
import Payments from "./payments";
import App from "./pastPrescriptions";

const PatientPanel = () => {
  const [activeList, setActiveList] = useState("dashboard");
  


  const sidebarOptions = [
    {
      id: "dashboard",
      navIcon: <HouseDoorFill />,
      navText: "dashboard",
    },
    {
      id: "appointments",
      navIcon: <Calendar />,
      navText: "appointments",
    },
    {
      id: "payments",
      navIcon: <CreditCard />,
      navText: "payments",
    },
    {
      id: "prescriptions",
      navIcon: <Capsule />,
      navText: "prescriptions",
    },
    {
      id: "messages",
      navIcon: <ChatSquareDots />,
      navText: "messages",
    },
    {
      id: "documents",
      navIcon: <FileEarmarkText />,
      navText: "documents",
    },
    {
      id: "settings",
      navIcon: <Gear />,
      navText: "settings",
    },
    {
      id: "logout",
      navIcon: <BoxArrowRight />,
      navText: "logout",
    },
  ];
  const menuContent = {
    dashboard: <PatientDashboard />,
    appointments: <Appointment />,
    payments: <Payments />,
    prescriptions: <App/>
    // prescriptions: <Patients />,
    // messages: <Messeges />,
    // documents: <DoctorDocuments />,
    // settings: <Settings />,
  };

  const handleNavClick = (id) => {
    setActiveList(id);
  };

  return (
    <div>
      <Header />
      {/* Vertical Navbar */}
      <div className={styles.dashboard_wrapper}>
        <div className={styles.sidebar}>
          <Sidebar
            handleNavClick={handleNavClick}
            option={sidebarOptions}
            activeList={activeList}
          />
        </div>
        <div className={styles.dashboard_content}>
          {menuContent[activeList]}
        </div>
      </div>
      <Footer />
    </div>
    // <div className="sidebar-container">
    //   <Header />
    //   <Container fluid>
    //     <Row>
    //       {/* Vertical Navbar */}
    //       <Col md={2} className="sidebar">
    //         <Navbar expand="md">
    //           <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //           <Navbar.Collapse id="basic-navbar-nav">
    //             <Nav className="flex-column custom-nav">
    //               <Nav.Link
    //                 href="#"
    //                 onClick={() => handleMenuItemClick("dashboard")}
    //                 className={
    //                   activeMenuItem === "dashboard" ? "active-link" : ""
    //                 }
    //               >
    //                 <HouseDoorFill /> Dashboard
    //               </Nav.Link>
    //               <Nav.Link
    //                 href="#"
    //                 onClick={() => handleMenuItemClick("appointments")}
    //                 className={
    //                   activeMenuItem === "appointments" ? "active-link" : ""
    //                 }
    //               >
    //                 <Calendar /> Appointments
    //               </Nav.Link>
    //               <Nav.Link
    //                 href="#"
    //                 onClick={() => handleMenuItemClick("prescriptions")}
    //                 className={
    //                   activeMenuItem === "prescriptions" ? "active-link" : ""
    //                 }
    //               >
    //                 <Capsule /> Prescriptions
    //               </Nav.Link>
    //               <Nav.Link
    //                 href="#"
    //                 onClick={() => handleMenuItemClick("messages")}
    //                 className={
    //                   activeMenuItem === "messages" ? "active-link" : ""
    //                 }
    //               >
    //                 <ChatSquareDots /> Messages
    //               </Nav.Link>

    //               <Nav.Link
    //                 href="#"
    //                 onClick={() => handleMenuItemClick("documents")}
    //                 className={
    //                   activeMenuItem === "documents" ? "active-link" : ""
    //                 }
    //               >
    //                 <FileEarmarkText /> Documents
    //               </Nav.Link>
    //               <Nav.Link
    //                 href="#"
    //                 onClick={() => handleMenuItemClick("settings")}
    //                 className={
    //                   activeMenuItem === "settings" ? "active-link" : ""
    //                 }
    //               >
    //                 <Gear /> Settings
    //               </Nav.Link>
    //               <Nav.Link
    //                 href="#"
    //                 onClick={() => handleMenuItemClick("logout")}
    //                 className={activeMenuItem === "logout" ? "active-link" : ""}
    //               >
    //                 <BoxArrowRight /> Logout
    //               </Nav.Link>
    //             </Nav>
    //           </Navbar.Collapse>
    //         </Navbar>
    //       </Col>

    //       {/* Main Content */}
    //       <Col md={10} className="p-4">
    //         {/* Render content based on the activeMenuItem */}
    //         {menuContent[activeMenuItem]}
    //       </Col>
    //     </Row>
    //   </Container>
    //   <Footer />
    // </div>
  );
};

export default PatientPanel;
