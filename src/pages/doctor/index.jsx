import React, { useState } from "react";
import {
  BoxArrowRight,
  Calendar,
  Gear,
  HouseDoorFill,
  Person,
} from "react-bootstrap-icons";
import { useParams, Routes, Route, Outlet, useNavigate } from "react-router-dom";
import Footer from "../../component/footer";
import Header from "../../component/header";
import styles from "../../styles/pages/dashboard.module.scss";

import Sidebar from "../../component/sidebar";
import Appointment from "./Appointment";
import Patients from "./Patients";
import DashboardContent from "./doctorDashboard";
import Settings from "./settings";
import AddPatient from "./AddPatient";
import PatientDetails from "./PatientDetails";

function DoctorPanel() {
  const { page = "dashboard" } = useParams(); // Set default value for page
  const [activeList, setActiveList] = useState(page);
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
      id: "patients",
      navIcon: <Person />,
      navText: "patients",
      subNav: [
        { id: "patient-list", text: "Patient List", to: "/doctor/patients" },
        { id: "add-patient", text: "Add Patient", to: "/doctor/patients/add-patient" },
      ],
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
        <Route path="patient/:patientId" element={<Outlet />}>
          <Route index element={<PatientDetails />} />
        </Route>
      </Routes>
    ),

    settings: <Settings />,
    "add-patient": <AddPatient />,
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
}

export default DoctorPanel;
