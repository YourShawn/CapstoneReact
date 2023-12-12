import React, { useState } from "react";
import {
  BoxArrowRight,
  Calendar,
  Capsule,
  HouseDoorFill,
  CreditCard
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import Footer from "../../component/footer";
import Header from "../../component/header";
import styles from "../../styles/pages/dashboard.module.scss";
import Appointment from "./Appointment";
import PatientDashboard from "./PatientDashboard";
import Sidebar from "../../component/sidebar";
import Payments from "./payments";
import App from "./pastPrescriptions";

const PatientPanel = () => {
  const [activeList, setActiveList] = useState("dashboard");
  const navigate = useNavigate();
  const loginOut = () => {
    localStorage.removeItem("loginToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    navigate("/login");
  };


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
  };

  const handleNavClick = (id) => {
    if (id === "logout") {
      loginOut();
    }
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
  );
};

export default PatientPanel;
