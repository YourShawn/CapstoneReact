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
import { useParams, Routes, Route } from "react-router-dom";
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
import AddPatient from "./AddPatient";

function DoctorPanel() {
  const { page = "dashboard" } = useParams(); // Set default value for page
  const [activeList, setActiveList] = useState(page);

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
      subNav: [
        { id: "patient-list", text: "Patient List", to: "/doctor/patients" },
        { id: "add-patient", text: "Add Patient", to: "/doctor/patients/add-patient" },
      ],
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
    patients: (
      <Routes>
        <Route path="/" element={<Patients />} />
        <Route path="add-patient" element={<AddPatient />} />
      </Routes>
    ),
    messages: <Messeges />,
    medications: <Medication />,
    documents: <DoctorDocuments />,
    settings: <Settings />,
    "add-patient": <AddPatient />,
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
