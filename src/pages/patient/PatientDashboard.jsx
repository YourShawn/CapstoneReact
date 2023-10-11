import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";


function DashboardContent() {


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
              <Card.Title>Hello, Patient Name</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      
    </Container>
  );
}

export default DashboardContent;
