import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { PersonFill, Calendar } from "react-bootstrap-icons";
import { BarChart } from "@mui/x-charts/BarChart";
import styles from "./doctor.module.scss";
import DoctorService from "../../services/doctorservices";

const SingleCard = ({ icon, title, count }) => {
  return (
    <div className={styles.dash_card}>
      <div className={styles.dash_cardImg}>{icon}</div>
      <div>
        <h3>{count}</h3>
        <h5>{title}</h5>
      </div>
    </div>
  );
};

function DashboardContent() {
  const [counts, setCounts] = useState({ patientCount: 0, appointmentCount: 0 });
  const [doctorName, setDoctorName] = useState('');

  useEffect(() => {
    // Use the DoctorService to fetch patient count
    DoctorService.getPatientList()
      .then((response) => {
        setCounts((prevCounts) => ({ ...prevCounts, patientCount: response.data.data.length }));
      })
      .catch((error) => {
        console.error("Error fetching patient count:", error);
      });

    DoctorService.getAppointmentList()
      .then((response) => {
        setCounts((prevCounts) => ({ ...prevCounts, appointmentCount: response.data.data.length }));
      })
      .catch((error) => {
        console.error("Error fetching appointment count:", error);
      });

      DoctorService.getDoctorName()
      .then((response) => {
        const name = response.data.data; // Assuming the response directly contains the doctor's name
        setDoctorName(name);
      })
      .catch((error) => {
        console.error('Error fetching doctor name:', error);
      });
  }, []);

  return (
    <Container>
      {/* Welcome Message */}
      <div className={styles.doctorName}>
        <h5>Hello, {doctorName}</h5>
      </div>

      {/* Patient and Appointment Rows */}
      <Row>
        {/* Total Patients */}
        <Col md={6} className="mb-4">
          <SingleCard title="Patients" count={counts.patientCount} icon={<PersonFill />} />
        </Col>
        {/* Total Appointments */}
        <Col md={6} className="mb-4">
          <SingleCard title="Appointments" count={counts.appointmentCount} icon={<Calendar />} />
        </Col>
      </Row>
      <div className={styles.dash_graph}>
        <h5>Appointments Per Year</h5>
        <BarChart
          xAxis={[
            {
              id: "barCategories",
              data: ["2020", "2021", "2022", "2023"],
              scaleType: "band",
            },
          ]}
          series={[
            {
              data: [150, 200, 500, 300],
            },
          ]}
          width={500}
          height={300}
        />
      </div>
    </Container>
  );
}

export default DashboardContent;
