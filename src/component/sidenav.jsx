import React, { useState } from "react";

const SideNav = ({ setActiveOption }) => {
  const options = [
    "Patient Management",
    "Record of Patients",
    "EMR",
    "Lab Tests",
    "Tracking Patient Details",
    "Appointment Management",
    "Prescription Management",
  ];

  return (
    <nav className="side-nav">
      <ul>
        {options.map((option, index) => (
          <li key={index} onClick={() => setActiveOption(option)}>
            {option}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideNav;
