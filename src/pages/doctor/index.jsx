import React, { useState } from "react";
import {
  BoxArrowRight,
  Calendar,
  Capsule,
  ChatSquareDots,
  FileEarmarkText,
  Gear,
  HouseDoorFill,
  Person,
} from "react-bootstrap-icons";
import Footer from "../../component/footer";
import Header from "../../component/header";
import styles from "../../styles/pages/dashboard.module.scss";
// Import individual content components
import Sidebar from "../../component/sidebar";
import Appointment from "./Appointment";
import DoctorDocuments from "./Documents";
import Medication from "./Medication";
import Messeges from "./Messeges";
import Patients from "./Patients";
import DashboardContent from "./doctorDashboard";
import Settings from "./settings";

function DoctorPanel() {
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
      id: "patients",
      navIcon: <Person />,
      navText: "patients",
    },
    {
      id: "messages",
      navIcon: <ChatSquareDots />,
      navText: "messages",
    },
    {
      id: "medications",
      navIcon: <Capsule />,
      navText: "medications",
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
    dashboard: <DashboardContent />,
    appointments: <Appointment />,
    patients: <Patients />,
    messages: <Messeges />,
    medications: <Medication />,
    documents: <DoctorDocuments />,
    settings: <Settings />,
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
  );
}

export default DoctorPanel;
