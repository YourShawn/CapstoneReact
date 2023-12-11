import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import PatientService from "../../services/PatientService";

function DashboardContent({ upcomingAppointments }) {
  const doctorNameStyle = {
    color: "#035e55",
    backgroundColor: "white",
    padding: "10px",
  };
  const [patientName, setPatientName] = useState('');

  useEffect(() => {
    PatientService.getPatientDetail()
      .then((response) => {
        if (response.data && response.data.data[0]) {
          const name = response.data.data[0].firstName + " " + response.data.data[0].lastName;
          setPatientName(name);
        }
      })
      .catch((error) => {
        console.error('Error fetching patient name:', error);
      });
  }, []);

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <Card style={doctorNameStyle}>
            <Card.Body>
              <Card.Title>Hello, {patientName}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Upcoming Appointments</Card.Title>
              <ListGroup variant="flush">
                {upcomingAppointments.map((appointment) => (
                  <ListGroup.Item key={appointment.doctorName}>
                    <strong>{appointment.appointmentDateTime}</strong> - {appointment.doctorName}
                  </ListGroup.Item>
                ))}
              </ListGroup>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

const PatientDashboard = () => {
  const [patientUpcomingAppointments, setPatientUpcomingAppointments] = useState([]);

  useEffect(() => {
    // Call the getUpcomingAppointments method and update the state
    PatientService.getUpcomingAppointments()
      .then((response) => {
        if (response.data && response.data.success) {
          setPatientUpcomingAppointments(response.data.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching upcoming appointments:', error);
      });
  }, []);

  return (
    <div>
      <h2>Patient Dashboard</h2>
      <DashboardContent upcomingAppointments={patientUpcomingAppointments} />
    </div>
  );
};

export default PatientDashboard;
