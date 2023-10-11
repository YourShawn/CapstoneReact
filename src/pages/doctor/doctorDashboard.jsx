import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { PersonFill, Calendar } from "react-bootstrap-icons";
import { BarChart } from '@mui/x-charts/BarChart';

function DashboardContent() {
  const bigNumberStyle = {
    fontSize: "36px", // Adjust the font size as needed
    fontWeight: "bold",
  };

  const smallLabelStyle = {
    fontSize: "18px", // Adjust the font size as needed
  };

  const doctorNameStyle = {
    color: "#035e55",        // Text color
    backgroundColor: "white", // Background color
    padding: "10px",          // Padding for better contrast
  };

  return (
    <Container>
      {/* Welcome Message */}
      <Row className="mb-4">
        <Col>
          <Card style={doctorNameStyle}>
            <Card.Body>
              <Card.Title>Hello, Doctor Name</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Patient and Appointment Rows */}
      <Row>
        {/* Total Patients */}
        <Col md={6} className="mb-4">
          <Card bg="danger" text="white">
            <Card.Body>
              <div style={bigNumberStyle}>123</div>
              <div style={smallLabelStyle}>
                <PersonFill size={20} />  Patients
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Total Appointments */}
        <Col md={6} className="mb-4">
          <Card bg="success" text="white">
            <Card.Body>
              <div style={bigNumberStyle}>456</div>
              <div style={smallLabelStyle}>
                <Calendar size={20} />  Appointments
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <Card >
            <Card.Body>
            <Card.Title>Appointments Per Year</Card.Title>
              <BarChart
                xAxis={[
                  {
                    id: 'barCategories',
                    data: ['2020','2021', '2022', '2023'],
                    scaleType: 'band',
                  },
                ]}
                series={[
                  {
                    data: [150,200, 500, 300],
                  },
                ]}
                width={500}
                height={300}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default DashboardContent;
