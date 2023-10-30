import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { PersonFill, Calendar } from "react-bootstrap-icons";
import { BarChart } from "@mui/x-charts/BarChart";
import styles from "./doctor.module.scss";

const SingleCard = ({ icon, title, count }) => {
  return (
    <div class={styles.dash_card}>
      <div class={styles.dash_cardImg}>{icon}</div>
      <div>
        <h3>{count}</h3>
        <h5>{title}</h5>
      </div>
    </div>
  );
};

function DashboardContent() {
  return (
    <Container>
      {/* Welcome Message */}
      <div className={styles.doctorName}>
        <h5>Hello, Doctor Name</h5>
      </div>

      {/* Patient and Appointment Rows */}
      <Row>
        {/* Total Patients */}
        <Col md={6} className="mb-4">
          <SingleCard title="Total Employs" count={43} icon={<PersonFill />} />
        </Col>
        {/* Total Appointments */}
        <Col md={6} className="mb-4">
          <SingleCard title="Appointments" count={32} icon={<Calendar />} />
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
