import React from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";

function DashboardContent({ username, upcomingAppointments }) {
  const doctorNameStyle = {
    color: "#035e55",
    backgroundColor: "white",
    padding: "10px",
  };

  return (
    <Container>

      <Row className="mb-4">
        <Col>
          <Card style={doctorNameStyle}>
            <Card.Body>
              <Card.Title>Hello, {username}</Card.Title>
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
                  <ListGroup.Item key={appointment.id}>
                    <strong>{appointment.doctor}</strong> - {appointment.date}, {appointment.time}
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
  const patientUsername = "Kabir";
  const patientUpcomingAppointments = [
    { id: 1, doctor: "Dr. Smith", date: "2023-11-20", time: "2:30 PM" },
    { id: 2, doctor: "Dr. Johnson", date: "2023-11-22", time: "11:00 AM" },
  ];

  return (
    <div>
      <h2>Patient Dashboard</h2>
      <DashboardContent username={patientUsername} upcomingAppointments={patientUpcomingAppointments} />
    </div>
  );
};

export default PatientDashboard;
